"use client";

import { Box, Button, Text, useTheme } from "@omariosouto/common-ui-web";

export function ToggleTheme() {
  const { setTheme } = useTheme();

  return (
    <Box
      className="flex gap-10"
    >
      <Button
        onClick={() => setTheme("light")}
      >
        Light
      </Button>
      <Button
        onClick={() => setTheme("dark")}
      >
        Dark
      </Button>
      <Button
        onClick={() => setTheme("system")}
      >
        System
      </Button>
      <Text>
        Current theme:
        <Text tag="span" className="hidden dark:block text-red-500">dark</Text>
        {/* <Text tag="span" className="block dark:hidden">light</Text> */}
      </Text>
      <div className="bg-warning text-warning-foreground">
        aaa
      </div>
    </Box>
  );
}