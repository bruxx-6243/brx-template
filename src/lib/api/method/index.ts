import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { ZodTypeAny } from "zod";

// Type Definitions
type QueryFunction<T> = () => Promise<T>;
type MutationFunction<T, V> = (variables: V) => Promise<T>;

// Updated Options Interfaces
interface BaseQueryOptions<T> {
  placeholderData?: (previousData: T | undefined) => T | undefined;
  // Add other common options here that you want to support
}

interface CreateQueryOptions<T, S extends ZodTypeAny | undefined = undefined> {
  schema?: S;
  key: string | unknown[];
  fn: QueryFunction<T>;
  options?: Omit<UseQueryOptions<T, Error, T, unknown[]>, "queryKey"> &
    BaseQueryOptions<T>;
}

interface CreateMutationOptions<
  T,
  V = void,
  S extends ZodTypeAny | undefined = undefined,
> {
  schema?: S;
  key: string | unknown[];
  fn: MutationFunction<T, V>;
  options?: UseMutationOptions<T, Error, V>;
}

const normalizeQueryKey = (key: string | unknown[]): unknown[] =>
  Array.isArray(key) ? key : [key];

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
