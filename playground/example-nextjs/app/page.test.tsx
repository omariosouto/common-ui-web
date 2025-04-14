import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest'
import HomeScreen from "./page";

describe('<HomeScreen>', () => {
  it('renders as expected', () => {
    render(<HomeScreen />)
    expect(screen.getByText('Click me!')).toBeInTheDocument();
    expect(screen.getByText('Click me!')).toMatchSnapshot();
  });
})