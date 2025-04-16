"use client";

import { Box, Button, Text, themeModes, themes, useTheme } from "@omariosouto/common-ui-web/components";
import { localThemes } from "./consts";
import React from "react";

export function ToggleTheme() {
  const { setTheme, getMode } = useTheme();

  return (
    <Box
      className="flex flex-col"
    >
      <Text>
        Current mode:
        <Text tag="span" className="hidden dark:block text-red-500">dark</Text>
        <Text tag="span" className="block dark:hidden text-blue-500">light</Text>
      </Text>
      <Button
        onClick={() => setTheme("system")}
      >
        system
      </Button>
      {[
        ...themes,
        ...localThemes,
      ].map((theme) => (
        <Button
          key={theme}
          onClick={() => setTheme(theme)}
        >
          {theme}
        </Button>
      ))}
      <SubTheme themeName="emerald">
        <div className="bg-warning text-warning-foreground">
          <Button suppressHydrationWarning>
            Sample button on emerald theme always
          </Button>
        </div>
      </SubTheme>
    </Box>
  );
}

function SubTheme({
  themeName,
  children,
}: {
  themeName: string;
  children: React.ReactNode;
}) {
  const { getMode } = useTheme();
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const currentMode = mode;

  React.useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => {
      setMode(e.matches ? "dark" : "light");
    };
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const isDark = mediaQuery.matches;
    const browserMode = isDark ? "dark" : "light";
    setMode(browserMode);
    mediaQuery.addEventListener("change", handleChange);

    console.log(browserMode);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [setMode]);

  console.log("[render:mode]", mode, getMode(), currentMode);

  return (
    <div
      className={`theme-${themeName}-${currentMode}`}
    >
      {children}
    </div>
  );
}