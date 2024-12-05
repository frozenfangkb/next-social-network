import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './card';

describe('Card component', () => {
  it('renders the title correctly', () => {
    const titleText = 'Test Title';
    render(<Card title={titleText}>Sample Children</Card>);

    const titleElement = screen.getByText(titleText);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    const childrenText = 'Sample Children';
    render(<Card title='Test Title'>{childrenText}</Card>);

    const childrenElement = screen.getByText(childrenText);
    expect(childrenElement).toBeInTheDocument();
  });
});
