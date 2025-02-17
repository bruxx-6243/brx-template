import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import { ZodTypeAny } from "zod";

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

/**
 * Options for creating a query method.
 * @template T The type of the data returned from the query.
 * @template S The optional Zod schema used to validate the query result.
 */
type CreateQueryOptions<T, S extends ZodTypeAny | undefined = undefined> = {
  /**
   * An optional Zod schema used for validation of the query result.
   */
  schema?: S;
  /**
   * The key used to identify the query.
   */
  key: string | unknown[];
  /**
   * The function that performs the query.
   */
  fn: QueryFunction<T>;
  /**
   * Additional options for the query, such as caching, retries, etc.
   */
  options?: UseQueryOptions<T, Error>;
};

/**
 * Options for creating a mutation method.
 * @template T The type of the data returned from the mutation.
 * @template V The type of the variables passed to the mutation function.
 * @template S The optional Zod schema used to validate the mutation result.
 */
type CreateMutationOptions<
  T,
  V = void,
  S extends ZodTypeAny | undefined = undefined,
> = {
  /**
   * An optional Zod schema used for validation of the mutation result.
   */
  schema?: S;
  /**
   * The key used to identify the mutation.
   */
  key: string | unknown[];
  /**
   * The function that performs the mutation.
   */
  fn: MutationFunction<T, V>;
  /**
   * Additional options for the mutation, such as error handling, retries, etc.
   */
  options?: UseMutationOptions<T, Error, V>;
};

/**
 * Creates a query method using React Query's `useQuery` hook.
 *
 * @template T The type of the data returned from the query.
 * @template S The optional Zod schema used to validate the query result.
 *
 * @param options The options to configure the query method.
 * @returns An object containing a hook to be used in a component.
 */
const createQueryMethod = <T, S extends ZodTypeAny | undefined = undefined>({
  schema,
  key,
  fn,
  options,
}: CreateQueryOptions<T, S>) => {
  return {
    /**
     * A hook for executing the query with automatic validation.
     *
     * @returns The result of the `useQuery` hook.
     */
    useHook: () =>
      useQuery({
        queryKey: Array.isArray(key) ? key : [key],
        queryFn: async () => {
          const result = await fn();

          return schema ? schema.parse(result) : result;
        },
        ...options,
      }),
  };
};

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
const createMutationMethod = <
  T,
  V = void,
  S extends ZodTypeAny | undefined = undefined,
>({
  schema,
  key,
  fn,
  options,
}: CreateMutationOptions<T, V, S>) => {
  return {
    /**
     * A hook for executing the mutation with automatic validation.
     *
     * @returns The result of the `useMutation` hook.
     */
    useHook: () =>
      useMutation({
        mutationKey: Array.isArray(key) ? key : [key],
        mutationFn: async (variables) => {
          const result = await fn(variables);
          return schema ? schema.parse(result) : result;
        },
        ...options,
      }),
  };
};

export { createMutationMethod, createQueryMethod };
