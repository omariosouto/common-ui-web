"use client"

import * as React from "react"
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes"

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