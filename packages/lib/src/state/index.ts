import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

export const AsyncStateClient = QueryClient;
export const AsyncStateProvider = QueryClientProvider;
export const useAsyncState = useQuery;