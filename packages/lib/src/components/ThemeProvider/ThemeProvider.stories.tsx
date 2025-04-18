import type { Meta, StoryObj } from '@storybook/react';

import { SubTheme, ThemeProvider, themeNames, useTheme } from './ThemeProvider';
import { Button } from "../Button/Button";
import { Box } from "../Box/Box";
import { Text } from "../Text/Text";
import { cn } from "../../_reference/infra/utils";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof ThemeProvider> = {
  title: 'Example/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
    asyncStateDevtools: false,
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {},
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: (
      <>
        <ThemeSwitcher />
      </>
    ),
  },
};

function ThemeSwitcher() {
  const { setTheme, resolvedTheme, getMode } = useTheme();

  return (
    <div
      className="bg-background text-foreground w-full h-full flex flex-col items-center justify-center p-10"
    >
      <h1
        className="mb-5 text-2xl"
      >
        Theme Switcher
        <span>
          Current (mode)
          <span className="hidden dark:inline-block text-red-500">dark</span>
          <span className="inline-block dark:hidden text-blue-500">light</span>
        </span>
      </h1>
      <div
        className="mb-10"
      >
        <Button onClick={() => setTheme('light')}>
          Mode Light
        </Button>
        <Button onClick={() => setTheme('dark')}>
          Mode Dark
        </Button>
        <Button onClick={() => setTheme('system')}>
          Mode System
        </Button>
      </div>
      {resolvedTheme}
      {themeNames.map((theme) => (
        <div key={theme}>
          <ThemeView theme={`theme-${theme}-light`} mode={getMode()} />
          <ThemeView theme={`theme-${theme}-dark`} mode={getMode()} />
        </div>
      ))}
      <h2
        className="mt-10 mb-5 text-2xl"
      >
        Multiple themes on same page
        <span>
          Current (mode)
          <span className="hidden dark:inline-block text-red-500">dark</span>
          <span className="inline-block dark:hidden text-blue-500">light</span>
        </span>
      </h2>
      {resolvedTheme}
      {themeNames.map((theme) => (
        <ThemeView key={"multiple" + theme} theme={`theme-${theme}-${getMode()}`} mode={getMode()} />
      ))}
    </div>
  );

  function ThemeView({
    themeName,
    theme,
    mode,
  }: {
    themeName?: string;
    theme: string;
    mode: string;
  }) {
    return (
      <Box className={cn(
        theme,
        "w-full bg-background text-foreground"
      )}>
        <SubTheme themeName={themeName as string}>
          <Text>
            [sub-theme][{theme}] - [theme][{resolvedTheme}] - [mode][{mode}]
          </Text>
          <Button onClick={() => setTheme(theme)}>
            Button
          </Button>
        </SubTheme>
      </Box>
    )
  }
}