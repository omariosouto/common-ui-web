import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest'
import { Text } from "./Text";

describe('<Text>', () => {
  it('renders as expected', () => {
    render(<Text className="text-2xl">Sample</Text>)
    expect(screen.getByText('Sample')).toBeInTheDocument();

    expect(screen.getByText('Sample')).toMatchSnapshot();
  });
})