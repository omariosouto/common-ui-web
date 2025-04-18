import React from "react";
import { Button } from "../Button/Button";
import { ErrorBoundary as ErrorBoundaryModule } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

interface RootErrorBoundaryProps {
  children: React.ReactNode;
}
export function RootErrorBoundary({
  children,
}: RootErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();
  const [retries, setRetries] = React.useState(1);
  const MAX_RETRIES = 2;
  return (
    <ErrorBoundaryModule
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => {
        console.error(error);

        return (
          <div className="bg-background text-foreground">
            <p>Root: Something went wrong 😔</p>
            <pre>
              {error.message}
            </pre>
            <Button
              onClick={() => {
                if (retries < MAX_RETRIES) {
                  setRetries((prev) => prev + 1);
                  resetErrorBoundary();
                  return;
                }
                window.location.reload();
              }}
            >
              {retries < MAX_RETRIES ? "Try again" : "Reload"}
            </Button>
          </div>
        );
      }}
    >
      {children}
    </ErrorBoundaryModule>
  );
};