import { renderHook } from '@testing-library/react';
import { vi, expect, describe, it } from 'vitest';
import { useFetchUsersQuery } from '../user-slice.ts';
import { useUsers } from './use-users.ts';

vi.mock('../user-slice.ts');

const mockUseFetchUsersQuery = vi.mocked(useFetchUsersQuery).mockReturnValue({
  useFetchUsersQuery: vi.fn(),
} as unknown as ReturnType<typeof useFetchUsersQuery>);

describe('useUsers', () => {
  it('should return default data when no users are fetched', () => {
    mockUseFetchUsersQuery.mockReturnValue({
      data: undefined,
      isFetching: false,
      isError: false,
    } as unknown as ReturnType<typeof useFetchUsersQuery>);

    const { result } = renderHook(() => useUsers());
    expect(result.current).toEqual({
      data: [],
      isFetching: false,
      isError: false,
    });
  });

  it('should return user data when users are fetched', () => {
    const users = [{ id: 1, name: 'Alice' }];
    mockUseFetchUsersQuery.mockReturnValue({
      data: users,
      isFetching: false,
      isError: false,
    } as unknown as ReturnType<typeof useFetchUsersQuery>);

    const { result } = renderHook(() => useUsers());
    expect(result.current).toEqual({
      data: users,
      isFetching: false,
      isError: false,
    });
  });

  it('should indicate when data is being fetched', () => {
    mockUseFetchUsersQuery.mockReturnValue({
      data: undefined,
      isFetching: true,
      isError: false,
    } as unknown as ReturnType<typeof useFetchUsersQuery>);

    const { result } = renderHook(() => useUsers());
    expect(result.current).toEqual({
      data: [],
      isFetching: true,
      isError: false,
    });
  });

  it('should indicate when an error occurs', () => {
    mockUseFetchUsersQuery.mockReturnValue({
      data: undefined,
      isFetching: false,
      isError: true,
    } as unknown as ReturnType<typeof useFetchUsersQuery>);

    const { result } = renderHook(() => useUsers());
    expect(result.current).toEqual({
      data: [],
      isFetching: false,
      isError: true,
    });
  });
});
