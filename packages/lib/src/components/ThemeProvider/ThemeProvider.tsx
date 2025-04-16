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


interface ThemeProviderProps extends React.ComponentProps<typeof NextThemesProvider> {
  extraThemes?: string[]
}

export function ThemeProvider({
  children,
  extraThemes,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      themes={[...themes, extraThemes] as string[]}
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