"use client";
import { useQuery, UseQueryResult, QueryKey, UseQueryOptions, DefaultError } from "@tanstack/react-query";
import { useId } from "react";

type useAsyncStateInput<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Pick<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "initialData"
> & {
  key: TQueryKey;
  asyncFn: () => Promise<TQueryFnData>;
};

type useAsyncStatePropsOutput<TData = unknown, TError = Error> = UseQueryResult<TData, TError>;

export function useAsyncState<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  config: useAsyncStateInput<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  >
): useAsyncStatePropsOutput<TData, TError> {
  const id = useId();

  const queryKey = Array.isArray(config.key)
    ? config.key
    : [id];

  return useQuery({
    queryKey,
    queryFn: async () => {
      return config.asyncFn();
    },
    ...config,
  });
};