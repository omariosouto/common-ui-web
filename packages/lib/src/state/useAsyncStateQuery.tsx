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
  useSuspenseQuery,
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
  suspendRenderization = false as suspendRenderization,
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
  const queryOptions = {
    queryKey: stateQueryKey,
    queryFn,
    ...queryInput
  };

  const isSuspendedQuery = suspendRenderization;
  if (isSuspendedQuery) {
    /**
     *  TODO: Fix the error that happens when an error ocurrs in the suspensed query with nextjs
    */
    const query = useSuspenseQuery<
      TQueryFnData,
      TError,
      TData,
      TQueryKey
    >(queryOptions);
    return {
      ...query,
      queryKey: stateQueryKey,
    };
  }

  const query = useQuery<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  >(queryOptions);
  return {
    ...query,
    queryKey: stateQueryKey,
  } as useAsyncStateQueryOutput<
    TError,
    TData,
    TQueryKey,
    suspendRenderization
  >;

  type useAsyncStateQueryOutput<
    TError,
    TData,
    TQueryKey,
    suspendRenderization extends boolean
  > = suspendRenderization extends true
    ? UseSuspenseQueryResult<TData, TError> & { queryKey: TQueryKey }
    : UseQueryResult<TData, TError> & { queryKey: TQueryKey };
}