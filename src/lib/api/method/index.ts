import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { ZodTypeAny } from "zod";

// Type Definitions
/**
 * Type definition for a function that returns a promise of a specific type.
 * @template T The type of the data returned from the query.
 */
type QueryFunction<T> = () => Promise<T>;

/**
 * Type definition for a function that accepts variables and returns a promise of a specific type.
 * @template T The type of the data returned from the mutation.
 * @template V The type of the variables passed to the mutation function.
 */
type MutationFunction<T, V> = (variables: V) => Promise<T>;

// Options Interfaces
/**
 * Options for creating a query method.
 * @template T The type of the data returned from the query.
 * @template S The optional Zod schema used to validate the query result.
 */
interface CreateQueryOptions<T, S extends ZodTypeAny | undefined = undefined> {
  /** An optional Zod schema used for validation of the query result */
  schema?: S;
  /** The key used to identify the query */
  key: string | unknown[];
  /** The function that performs the query */
  fn: QueryFunction<T>;
  /** Additional options for the query, such as caching, retries, etc */
  options?: UseQueryOptions<T, Error>;
}

/**
 * Options for creating a mutation method.
 * @template T The type of the data returned from the mutation.
 * @template V The type of the variables passed to the mutation function.
 * @template S The optional Zod schema used to validate the mutation result.
 */
interface CreateMutationOptions<
  T,
  V = void,
  S extends ZodTypeAny | undefined = undefined,
> {
  /** An optional Zod schema used for validation of the mutation result */
  schema?: S;
  /** The key used to identify the mutation */
  key: string | unknown[];
  /** The function that performs the mutation */
  fn: MutationFunction<T, V>;
  /** Additional options for the mutation, such as error handling, retries, etc */
  options?: UseMutationOptions<T, Error, V>;
}

// Utility Functions
const normalizeQueryKey = (key: string | unknown[]): unknown[] =>
  Array.isArray(key) ? key : [key];

// Query Factory
/**
 * Creates a query method using React Query's `useQuery` hook.
 *
 * @template T The type of the data returned from the query.
 * @template S The optional Zod schema used to validate the query result.
 *
 * @param options The options to configure the query method.
 * @returns An object containing a hook to be used in a component.
 */
function createQueryMethod<T, S extends ZodTypeAny | undefined = undefined>({
  schema,
  key,
  fn,
  options,
}: CreateQueryOptions<T, S>) {
  const useQueryHook = () => {
    return useQuery({
      queryKey: normalizeQueryKey(key),
      queryFn: async () => {
        const data = await fn();
        return schema ? schema.parse(data) : data;
      },
      ...options,
    });
  };

  return { useHook: useQueryHook };
}

// Mutation Factory
/**
 * Creates a mutation method using React Query's `useMutation` hook.
 *
 * @template T The type of the data returned from the mutation.
 * @template V The type of the variables passed to the mutation function.
 * @template S The optional Zod schema used to validate the mutation result.
 *
 * @param options The options to configure the mutation method.
 * @returns An object containing a hook to be used in a component.
 */
function createMutationMethod<
  T,
  V = void,
  S extends ZodTypeAny | undefined = undefined,
>({ schema, key, fn, options }: CreateMutationOptions<T, V, S>) {
  const useMutationHook = () => {
    return useMutation({
      mutationKey: normalizeQueryKey(key),
      mutationFn: async (variables: V) => {
        const data = await fn(variables);
        return schema ? schema.parse(data) : data;
      },
      ...options,
    });
  };

  return { useHook: useMutationHook };
}

export { createMutationMethod, createQueryMethod };
