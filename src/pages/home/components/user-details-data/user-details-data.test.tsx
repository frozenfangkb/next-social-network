import { vi, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserDetailsData } from './user-details-data';
import { User } from '@/modules/user/models/user';

const mockStyles = {
  userDetailsSection: 'userDetailsSection',
  userDetailsSectionRow: 'userDetailsSectionRow',
  userDetailsLabel: 'userDetailsLabel',
  userDetailsValue: 'userDetailsValue',
};

// Mock the styles since CSS modules aren't parsed in tests
vi.mock('./user-details-data.module.css', () => ({ default: mockStyles }));

describe('UserDetailsData', () => {
  it('renders user city, username, website, and company name when data is provided', () => {
    const userData = {
      address: { city: 'New York' },
      username: 'john_doe',
      website: 'johndoe.com',
      company: { name: 'Tech Co.' },
    } as unknown as User;

    render(<UserDetailsData userData={userData} />);

    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('john_doe')).toBeInTheDocument();
    expect(screen.getByText('Website')).toBeInTheDocument();
    expect(screen.getByText('johndoe.com')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Tech Co.')).toBeInTheDocument();
  });

  it('renders empty fields when userData is undefined', () => {
    render(<UserDetailsData userData={undefined} />);

    expect(screen.queryByText('City')).toBeInTheDocument();
    expect(screen.queryByText('Username')).toBeInTheDocument();
    expect(screen.queryByText('Website')).toBeInTheDocument();
    expect(screen.queryByText('Company')).toBeInTheDocument();
  });

  it('renders empty fields when userData properties are undefined', () => {
    const userData = {} as unknown as User;

    render(<UserDetailsData userData={userData} />);

    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.queryByText('undefined')).toBeNull();
  });
});
