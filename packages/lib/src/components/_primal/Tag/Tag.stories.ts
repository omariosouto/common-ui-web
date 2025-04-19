import type { Meta, StoryObj } from '@storybook/react';

import { motion } from "../../../animation";

import { Tag } from './Tag';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Tag> = {
  title: 'Primal Components/Tag',
  component: Tag,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: `I'm a tag with content inside it`,
  },
};

export const AnimatedTag: Story = {
  args: {
    as: motion.div,
    animate: { opacity: 1 },
    initial: { opacity: 0 },
    transition: { duration: 3 },
    children: `I'm a tag with \`motion.div\` `,
  },
};