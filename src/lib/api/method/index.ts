import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { ZodTypeAny } from "zod";

type QueryFunction<T> = () => Promise<T>;
type MutationFunction<T, V> = (variables: V) => Promise<T>;

type CreateMethodOptions<
  T,
  V = void,
  S extends ZodTypeAny | undefined = undefined,
> = {
  schema?: S;
  key: string | unknown[];
  type: "query" | "mutation";
  fn: QueryFunction<T> | MutationFunction<T, V>;
  options?: UseQueryOptions<T> | UseMutationOptions<T, Error, V>;
};

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

    type SchemaType = S extends ZodTypeAny ? S["_type"] : T;

    return {
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
