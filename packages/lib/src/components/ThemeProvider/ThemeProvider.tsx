"use client"

import * as React from "react"
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes";

export const themes = [
  "light",
  "dark",
  "theme-ruby",
  "theme-ruby-dark",
  "theme-amethyst",
  "theme-amethyst-dark",
] as const;

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      themes={themes as unknown as string[]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export function useTheme() {
  const nextTheme = useNextTheme()

  return nextTheme;
}