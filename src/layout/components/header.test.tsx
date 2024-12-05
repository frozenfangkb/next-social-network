import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './header';

describe('Header', () => {
  it('renders the header with correct title', () => {
    render(<Header />, { wrapper: MemoryRouter });
    expect(screen.getByText('Next Social Network')).toBeInTheDocument();
  });

  it('contains a link to Home', () => {
    render(<Header />, { wrapper: MemoryRouter });
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });
});
