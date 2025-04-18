import { DataTag, DefaultError, QueryFunction, QueryKey, useQuery, UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import React from "react";


type UseAsyncStateQueryInput<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = {
  // Default
  queryFn?: QueryFunction<TQueryFnData, TQueryKey>;
  queryKey?: TQueryKey;
  // Custom
  suspendRenderization?: boolean;
} & Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryKey" | "queryFn"
>;

export function useAsyncStateQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>({
  queryKey,
  queryFn,
  suspendRenderization,
  ...queryInput
}: UseAsyncStateQueryInput<
  TQueryFnData,
  TError,
  TData,
  TQueryKey
>) {
  const dynamicStateQueryKey = [React.useId()] as unknown as DataTag<TQueryKey, TQueryFnData, TError>;
  const stateQueryKey = queryKey || dynamicStateQueryKey;

  const queryHook = suspendRenderization
    ? useSuspenseQuery
    : useQuery;

  const query = queryHook<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  >({
    queryKey: stateQueryKey,
    queryFn,
    ...queryInput
  });
  return query;
}