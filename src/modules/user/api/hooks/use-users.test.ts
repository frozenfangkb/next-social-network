import { renderHook } from '@testing-library/react';
import { vi, expect, describe, it } from 'vitest';
import { useFetchUsersQuery } from '../user-slice.ts';
import { useUsers } from './use-users.ts';

vi.mock('../user-slice.ts');

const mockUseFetchUsersQueryValue = {
  data: undefined,
  isFetching: false,
  isError: false,
} as unknown as ReturnType<typeof useFetchUsersQuery>;

const mockUseFetchUsersQuery = vi
  .mocked(useFetchUsersQuery)
  .mockReturnValue(mockUseFetchUsersQueryValue);

describe('useUsers', () => {
  it('should return default data when no users are fetched', () => {
    mockUseFetchUsersQuery.mockReturnValue({
      ...mockUseFetchUsersQueryValue,
      data: undefined,
      isFetching: false,
      isError: false,
    });

    const { result } = renderHook(() => useUsers());
    expect(result.current).toEqual({
      data: [],
      isFetching: false,
      getUserData: expect.any(Function),
      isError: false,
    });
  });

  it('should return user data when users are fetched', () => {
    const users = [{ id: 1, name: 'Alice' }];
    mockUseFetchUsersQuery.mockReturnValue({
      ...mockUseFetchUsersQueryValue,
      data: users,
      isFetching: false,
      isError: false,
    });

    const { result } = renderHook(() => useUsers());
    expect(result.current).toEqual({
      data: users,
      isFetching: false,
      getUserData: expect.any(Function),
      isError: false,
    });
  });

  it('should return user data when there is data in the store', () => {
    const users = [{ id: 1, name: 'Alice' }];
    mockUseFetchUsersQuery.mockReturnValue({
      ...mockUseFetchUsersQueryValue,
      data: users,
      isFetching: false,
      isError: false,
    });

    const { result } = renderHook(() => useUsers());

    expect(result.current.getUserData(1)).toEqual(users[0]);
  });

  it("shouldn't return user data when there is data in the store but the wrong id is entered", () => {
    const users = [{ id: 1, name: 'Alice' }];
    mockUseFetchUsersQuery.mockReturnValue({
      ...mockUseFetchUsersQueryValue,
      data: users,
      isFetching: false,
      isError: false,
    });

    const { result } = renderHook(() => useUsers());

    expect(result.current.getUserData(2)).toEqual(undefined);
  });

  it('should indicate when data is being fetched', () => {
    mockUseFetchUsersQuery.mockReturnValue({
      ...mockUseFetchUsersQueryValue,
      data: undefined,
      isFetching: true,
      isError: false,
    });

    const { result } = renderHook(() => useUsers());
    expect(result.current).toEqual({
      data: [],
      isFetching: true,
      getUserData: expect.any(Function),
      isError: false,
    });
  });

  it('should indicate when an error occurs', () => {
    mockUseFetchUsersQuery.mockReturnValue({
      ...mockUseFetchUsersQueryValue,
      data: undefined,
      isFetching: false,
      isError: true,
    });

    const { result } = renderHook(() => useUsers());
    expect(result.current).toEqual({
      data: [],
      isFetching: false,
      getUserData: expect.any(Function),
      isError: true,
    });
  });
});
