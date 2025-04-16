"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface AsyncStateProviderProps {
  children: React.ReactNode;
  devtools?: boolean;
}
export function AsyncStateProvider(
  {
    children,
    devtools = true,
  }: AsyncStateProviderProps) {
  // Initialize the query client once per session
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {devtools && (
        <ReactQueryDevtools
          initialIsOpen={false}
        />
      )}
    </QueryClientProvider>
  );
}