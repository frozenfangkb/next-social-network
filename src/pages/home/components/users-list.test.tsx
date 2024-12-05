import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { UsersList } from './users-list';
import { useUsers } from '../../../modules/user/api/hooks/use-users.ts';

vi.mock('../../../modules/user/api/hooks/use-users.ts', () => ({
  useUsers: vi.fn(() => ({
    users: [],
    loading: false,
    fetchUsers: vi.fn(),
    error: false,
  })),
}));

describe('<UsersList />', () => {
  it('renders loading state when loading is true', () => {
    vi.mocked(useUsers).mockReturnValueOnce({
      users: [],
      loading: true,
      fetchUsers: vi.fn(),
      error: false,
    });
    render(<UsersList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders "No users found" when there are no users and loading is false', () => {
    vi.mocked(useUsers).mockReturnValueOnce({
      users: [],
      loading: false,
      fetchUsers: vi.fn(),
      error: false,
    });
    render(<UsersList />);
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('renders user items when users are available', () => {
    const users = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        company: { name: 'Acme Inc.' },
      },
    ];

    vi.mocked(useUsers).mockReturnValueOnce({
      users,
      loading: false,
      fetchUsers: vi.fn(),
    });

    render(<UsersList />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(
      screen.getByText('john@example.com · Acme Inc.'),
    ).toBeInTheDocument();
  });
});
