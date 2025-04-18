import React from "react";
import {
  DataTag,
  DefaultError,
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  UseSuspenseQueryResult,
  useQuery,
} from "@tanstack/react-query";


type UseAsyncStateQueryInput<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  suspendRenderization extends boolean = false
> = {
  // Default
  queryFn?: QueryFunction<TQueryFnData, TQueryKey>;
  queryKey?: TQueryKey;
  // Custom
  /** 
    @deprecated
    For now we don't offer a way to use this
  */
  suspendRenderization?: suspendRenderization;
} & Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryKey" | "queryFn"
>;

export function useAsyncStateQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  suspendRenderization extends boolean = false
>({
  queryKey,
  queryFn,
  ...queryInput
}: UseAsyncStateQueryInput<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  suspendRenderization
>) {
  const dynamicStateQueryKey = [React.useId()] as unknown as DataTag<TQueryKey, TQueryFnData, TError>;
  const stateQueryKey = queryKey || dynamicStateQueryKey;

  const query = useQuery<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  >({
    queryKey: stateQueryKey,
    queryFn,
    ...queryInput
  }) as suspendRenderization extends true
    ? UseSuspenseQueryResult<TData, TError>
    : UseQueryResult<TData, TError>;
  return {
    ...query,
    queryKey,
  };
}