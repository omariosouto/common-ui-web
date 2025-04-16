"use client";

import { Box, Button, Text, SubTheme, themes, useTheme } from "@omariosouto/common-ui-web/components";
import { localThemes } from "./consts";
import React from "react";

export function ToggleTheme() {
  const { setTheme } = useTheme();

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
          <Button>
            Sample button on emerald theme always
          </Button>
        </div>
      </SubTheme>
    </Box>
  );
}