"use client";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";


interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackRender?: (props: FallbackProps) => React.ReactNode;
}
export function ErrorBoundaryContainer({
  children,
}: ErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div>
          <p>Something went wrong:</p>
          <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}