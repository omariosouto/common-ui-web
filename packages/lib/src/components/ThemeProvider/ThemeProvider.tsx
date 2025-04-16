"use client"

import * as React from "react"
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes";

export const themes = [
  "theme-default-light",
  "theme-default-dark",
  "theme-ruby-light",
  "theme-ruby-dark",
  "theme-amethyst-light",
  "theme-amethyst-dark",
] as const;

export const themeNames = [
  "default",
  "ruby",
  "amethyst",
] as const;

export const themeModes = [
  "light",
  "dark",
] as const;


interface ThemeProviderProps extends React.ComponentProps<typeof NextThemesProvider> {
  extraThemes?: string[]
}

export function ThemeProvider({
  children,
  extraThemes = [],
  ...props
}: ThemeProviderProps) {
  const appThemes = [...themes, ...extraThemes] as string[];
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      themes={appThemes}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export function useTheme() {
  const nextTheme = useNextTheme();

  return {
    ...nextTheme,
    getMode() {
      // TODO:Tem que arrumar no onload
      const [,,currentModeName] = nextTheme?.theme?.split("-") || ["theme", "default", "light"];
      
      return currentModeName;
    },
    setTheme: (newTheme: string) => {
      const [, currentThemeName] = nextTheme?.theme?.split("-") || ["theme", "default", "light"];

      if(newTheme === "light") {
        const theme = `theme-${currentThemeName}-light`;
        nextTheme.setTheme(theme)
        return;
      }

      if(newTheme === "dark") {
        const theme = `theme-${currentThemeName}-dark`;
        nextTheme.setTheme(theme)
        return; 
      }

      if(newTheme === "system") {
        const theme = `theme-${currentThemeName}-${nextTheme.systemTheme}`;
        nextTheme.setTheme(theme)
        return;
      }

      nextTheme.setTheme(newTheme)
    },
  };
}