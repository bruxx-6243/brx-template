import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { ZodTypeAny } from "zod";

type QueryFunction<T> = () => Promise<T>;
type MutationFunction<T, V> = (variables: V) => Promise<T>;

/**
 * Options for creating a query or mutation method.
 *
 * @template T The expected return type of the query/mutation.
 * @template V The type of variables for mutations (if applicable).
 * @template S The Zod schema for type validation (optional).
 */
type CreateMethodOptions<
  T,
  V = void,
  S extends ZodTypeAny | undefined = undefined,
> = {
  /** Optional Zod schema for validating API responses. */
  schema?: S;
  /** Query/mutation key used by React Query for caching. */
  key: string | unknown[];
  /** Defines whether this method is a query or a mutation. */
  type: "query" | "mutation";
  /** Function that fetches data for queries or handles mutations. */
  fn: QueryFunction<T> | MutationFunction<T, V>;
  /** React Query options for customizing query/mutation behavior. */
  options?: UseQueryOptions<T> | UseMutationOptions<T, Error, V>;
};

/**
 * Creates a reusable React Query hook for fetching (queries) or updating (mutations) data.
 *
 * - For queries, it ensures type safety by validating responses against an optional Zod schema.
 * - For mutations, it allows flexible API interaction with React Query’s mutation system.
 *
 * @template T The expected return type of the query/mutation.
 * @template V The type of mutation variables.
 * @template S The optional Zod schema used for validation.
 *
 * @param {CreateMethodOptions<T, V, S>} options Configuration options for the query/mutation.
 * @returns An object with a `useHook` function to be used inside components.
 *
 * @example
 * ```ts
 * import { z } from "zod";
 *
 * const userSchema = z.object({
 *   id: z.number(),
 *   name: z.string(),
 * });
 *
 * const fetchUser = async (): Promise<{ id: number; name: string }> => {
 *   return { id: 1, name: "Alice" };
 * };
 *
 * const userMethod = createMethod({
 *   type: "query",
 *   key: "user",
 *   fn: fetchUser,
 *   schema: userSchema,
 * });
 *
 * const { useHook } = userMethod;
 * const { data, isLoading, error } = useHook();
 * ```
 */
const createMethod = <
  T,
  V = void,
  S extends ZodTypeAny | undefined = undefined,
>({
  type,
  key,
  fn,
  schema,
  options,
}: CreateMethodOptions<T, V, S>) => {
  if (type === "query") {
    const queryFn = fn as QueryFunction<T>;

    /** The inferred schema type if validation is provided. */
    type SchemaType = S extends ZodTypeAny ? S["_type"] : T;

    return {
      /**
       * Custom React Query hook for fetching data.
       * @returns {object} Contains `data`, `isLoading`, and `error`.
       */
      useHook: () => {
        const { data, isLoading, error } = useQuery<SchemaType, Error>({
          queryKey: Array.isArray(key) ? key : [key],
          queryFn: async () => {
            const result = await queryFn();
            return schema ? schema.parse(result) : (result as SchemaType);
          },
          ...(options && ({ ...options } as UseQueryOptions<SchemaType>)),
        });

        return { data, isLoading, error };
      },
    };
  }

  if (type === "mutation") {
    const mutationFn = fn as MutationFunction<T, V>;

    return {
      /**
       * Custom React Query hook for mutations.
       * @returns {object} Contains `data`, `isLoading`, `error`, and `mutate`.
       */
      useHook: () => {
        const { data, isPending, error, mutate } = useMutation<T, Error, V>({
          mutationKey: Array.isArray(key) ? key : [key],
          mutationFn: async (variables) => {
            const result = await mutationFn(variables);
            return schema ? schema.parse(result) : result;
          },
          ...(options as UseMutationOptions<T, Error, V>),
        });

        return { data, isLoading: isPending, error, mutate };
      },
    };
  }

  throw new Error(`Invalid type: ${type}`);
};

export default createMethod;
