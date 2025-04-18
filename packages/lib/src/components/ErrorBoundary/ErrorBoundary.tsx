"use client";
import { ErrorBoundary as ErrorBoundaryModule, FallbackProps } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Button } from "../Button/Button";


interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackRender?: (props: FallbackProps) => React.ReactNode;
}
export function ErrorBoundary({
  children,
}: ErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundaryModule
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => {
        console.error(error);

        return (
          <div
            className="bg-background text-foreground"
          >
            <p>Something went wrong 😔</p>
            <Button onClick={resetErrorBoundary}>Try again</Button>
          </div>
        );
      }}
    >
      {children}
    </ErrorBoundaryModule>
  )
}