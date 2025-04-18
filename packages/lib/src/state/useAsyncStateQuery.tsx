import React from "react";
import {
  DataTag,
  DefaultError,
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  UseSuspenseQueryOptions,
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
  // Custom
  suspendRenderization?: suspendRenderization;
} & (
    suspendRenderization extends true
    ? {
      queryKey: TQueryKey;
    } & Omit<
      UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    >
    : {
      queryKey?: TQueryKey;
    } & Omit<
      UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    // how to ommit "throwOnError" from UseQueryOptions IF suspendRenderization is true?
    >
  );

export function useAsyncStateQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  suspendRenderization extends boolean = boolean
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
>): suspendRenderization extends true
  ? UseSuspenseQueryResult<TData, TError> & { queryKey: TQueryKey }
  : UseQueryResult<TData, TError> & { queryKey: TQueryKey } {
  const dynamicStateQueryKey = [React.useId()] as unknown as DataTag<TQueryKey, TQueryFnData, TError>;
  const stateQueryKey = queryKey || dynamicStateQueryKey;
  const queryOptions = {
    queryKey: stateQueryKey,
    queryFn,
    ...queryInput
  };

  const isSuspendedQuery = suspendRenderization;
  if (isSuspendedQuery) {
    const query = useSuspenseQuery<
      TQueryFnData,
      TError,
      TData,
      TQueryKey
    >({
      ...queryOptions,
    });
    return {
      ...query,
      queryKey: stateQueryKey,
    } as UseAsyncStateQueryOutput<
      suspendRenderization,
      TData,
      TError,
      TQueryKey
    >
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
  } as UseAsyncStateQueryOutput<
    suspendRenderization,
    TData,
    TError,
    TQueryKey
  >;
}

type UseAsyncStateQueryOutput<
  suspendRenderization,
  TData = unknown,
  TError = DefaultError,
  TQueryKey extends QueryKey = QueryKey
> = suspendRenderization extends true
  ? UseSuspenseQueryResult<TData, TError> & { queryKey: TQueryKey }
  : UseQueryResult<TData, TError> & { queryKey: TQueryKey };