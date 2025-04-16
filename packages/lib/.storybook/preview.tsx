import React from 'react';
import type { Preview } from '@storybook/react';
import "../globals.css";
import { ThemeProvider, AsyncStateProvider } from "../src/providers";
import basePreview from "@omariosouto/storybook/.storybook/preview";

const preview: Preview = {
  ...basePreview,
  parameters: {
    ...basePreview.parameters,
    asyncStateDevtools: false,
  },
  decorators: [
    // 👇 Defining the decorator in the preview file applies it to all stories
    (Story, { parameters }) => {
      return (
        <ThemeProvider>
          <AsyncStateProvider devtools={parameters.asyncStateDevtools}>
            <Story />
          </AsyncStateProvider>
        </ThemeProvider>
      )
    },
  ],
};

export default preview;