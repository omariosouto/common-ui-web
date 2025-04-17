"use client";
import { useQuery, UseQueryResult, QueryKey, UseQueryOptions, DefaultError, QueryFunction, SkipToken } from "@tanstack/react-query";
import { useId } from "react";

type useAsyncStateInput<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never
> = 
Pick<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "initialData" | 'enabled' | 'refetchOnWindowFocus' | 'gcTime'
> & {
  key?: TQueryKey;
  asyncFn: QueryFunction<TQueryFnData, TQueryKey, TPageParam> | SkipToken;
};

type useAsyncStatePropsOutput<TData = unknown, TError = Error> = UseQueryResult<TData, TError> & {
  key: QueryKey;
};

export function useAsyncState<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  {
    key, 
    initialData,
    ...config
  }: useAsyncStateInput<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  >
): useAsyncStatePropsOutput<TData, TError> {
  const id = useId();

  const queryKey = Array.isArray(key)
    ? key
    : [id] as unknown as TQueryKey;

  const asyncState = useQuery<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  >({
    queryKey: queryKey,
    queryFn: config.asyncFn,
    initialData,
    ...config,
  });

  return {
    ...asyncState,
    key: queryKey,
  };
};

export const useAsyncDataQuery = useAsyncState;