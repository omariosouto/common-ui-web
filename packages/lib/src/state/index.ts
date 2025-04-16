"use client";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

export { AsyncStateProvider } from "./AsyncStateProvider";

export const useAsyncState = useQuery;
export const useAsyncPaginatedState = useInfiniteQuery;