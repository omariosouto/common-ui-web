import { describe, it, expect } from 'vitest';
import { render, screen } from "@omariosouto/common-ui-web/test";
import HomeScreen from "./page";

describe('<HomeScreen>', () => {
  it('renders as expected', () => {
    render(<HomeScreen />)
    expect(screen.getByText('Click me!')).toBeInTheDocument();
    expect(screen.getByText('Click me!')).toMatchSnapshot();
  });
})