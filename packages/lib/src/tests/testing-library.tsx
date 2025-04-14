import React from "react";
import { render, RenderOptions, RenderResult } from '@testing-library/react';

// Define the props type for AllTheProviders
type AllTheProvidersProps = {
  children: React.ReactNode;
};

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => {
  return <>{children}</>;
};

// Customize the render method by accepting a React element and additional options.
// We omit the `wrapper` key from RenderOptions since we always supply our own wrapper.
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): RenderResult =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from @testing-library/react...
export * from '@testing-library/react';

// Override the default render method with our custom version.
export { customRender as render };
