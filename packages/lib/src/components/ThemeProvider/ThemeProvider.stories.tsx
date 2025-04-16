import type { Meta, StoryObj } from '@storybook/react';

import { ThemeProvider, themes, useTheme } from './ThemeProvider';
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
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <div
      className="bg-background text-foreground w-full h-full flex flex-col items-center justify-center p-10"
    >
      <h1>
        Theme Switcher
      </h1>
      <div 
        className="mb-10"
      >
        <Button onClick={() => setTheme('light')}>
          Default Light
        </Button>
        <Button onClick={() => setTheme('dark')}>
          Default Dark
        </Button>
        <Button onClick={() => setTheme('system')}>
          Default System
        </Button>
      </div>
      {themes.map((theme) => (
        <ThemeView key={theme} theme={theme} />
      ))}
    </div>
  );

  function ThemeView({
    theme
  }: {
    theme: string
  }) {
    return (
      <Box className={cn(
        theme,
        "w-full bg-background text-foreground"
      )}>
        <Text>
          [sub-theme][{theme}] - [theme][{resolvedTheme}]
        </Text>
        <Button onClick={() => setTheme(theme)}>
          Button
        </Button>
      </Box>
    )
  }
}