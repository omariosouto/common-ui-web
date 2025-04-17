"use client";
import { useInfiniteQuery } from "@tanstack/react-query";

export { AsyncStateProvider } from "./AsyncStateProvider";
export { useAsyncState } from "./useAsyncState";

export const useAsyncPaginatedState = useInfiniteQuery;