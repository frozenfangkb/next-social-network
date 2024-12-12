import { act, renderHook } from '@testing-library/react';
import { useUsers } from './use-users';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { getUsers } from '../user-api.ts';

vi.mock('../user-api.ts', () => ({
  getUsers: vi.fn(),
}));

describe('useUsers', () => {
  const mockUsers = [{ id: 1, name: 'John Doe' }];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useUsers());
    expect(result.current.users).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);
  });

  it('should set loading to true when fetchUsers is called', async () => {
    const { result } = renderHook(() => useUsers());

    act(() => {
      result.current.fetchUsers();
    });

    expect(result.current.loading).toBe(true);
  });

  it('should fetch users successfully', async () => {
    (getUsers as jest.Mock).mockResolvedValueOnce(mockUsers);
    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.fetchUsers();
    });

    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);
  });

  it('should handle errors during fetch', async () => {
    (getUsers as jest.Mock).mockRejectedValueOnce(new Error('Error fetching users'));
    const { result } = renderHook(() => useUsers());

    await act(async () => {
      await result.current.fetchUsers();
    });

    expect(result.current.error).toBe(true);
    expect(result.current.users).toEqual([]);
    expect(result.current.loading).toBe(false);
  });
});