import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UsersList } from './users-list';
import { useUsers } from '@/modules/user/api/hooks/use-users.ts';
import { Company, User } from '@/modules/user/models/user.ts';

vi.mock('@/modules/user/api/hooks/use-users.ts');

const mockUseUsersValue = {
  useUsers: vi.fn(),
} as unknown as ReturnType<typeof useUsers>;

const mockedUseUsers = vi.mocked(useUsers).mockReturnValue(mockUseUsersValue);

describe('UsersList', () => {
  it('renders loading state when fetching data', () => {
    mockedUseUsers.mockReturnValue({
      ...mockUseUsersValue,
      data: [],
      isFetching: true,
    });

    render(<UsersList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders "No users found" when there are no users', () => {
    mockedUseUsers.mockReturnValue({
      ...mockUseUsersValue,
      data: [],
      isFetching: false,
    });

    render(<UsersList />);

    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('renders a list of users when data is available', () => {
    mockedUseUsers.mockReturnValue({
      ...mockUseUsersValue,
      data: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          company: { name: 'Company A' } as unknown as Company,
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          company: { name: 'Company B' } as unknown as Company,
        },
      ] as unknown as User[],
      isFetching: false,
    });

    render(<UsersList />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(
      screen.getByText('john.doe@example.com · Company A'),
    ).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(
      screen.getByText('jane.smith@example.com · Company B'),
    ).toBeInTheDocument();
  });
});
