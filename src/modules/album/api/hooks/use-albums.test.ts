import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAlbums } from './use-albums';
import { useFetchAlbumsQuery } from '@/modules/album/api/album-slice.ts';

// Mock the useFetchAlbumsQuery function
vi.mock('@/modules/album/api/album-slice.ts');

const useFetchAlbumsQueryValue = {
  data: undefined,
  isFetching: false,
  isError: false,
} as unknown as ReturnType<typeof useFetchAlbumsQuery>;

const useFetchAlbumsQueryMocked = vi
  .mocked(useFetchAlbumsQuery)
  .mockReturnValue(useFetchAlbumsQueryValue);

describe('useAlbums', () => {
  it('returns data when useFetchAlbumsQuery provides data', () => {
    useFetchAlbumsQueryMocked.mockReturnValue({
      ...useFetchAlbumsQueryValue,
      data: [
        { id: 1, title: 'Album 1' },
        { id: 2, title: 'Album 2' },
      ],
      isFetching: false,
    });

    const { result } = renderHook(() => useAlbums('123'));
    expect(result.current.data).toEqual([
      { id: 1, title: 'Album 1' },
      { id: 2, title: 'Album 2' },
    ]);
    expect(result.current.isFetching).toBe(false);
  });

  it('returns an empty array when useFetchAlbumsQuery provides undefined data', () => {
    useFetchAlbumsQueryMocked.mockReturnValue({
      ...useFetchAlbumsQueryValue,
      data: undefined,
      isFetching: false,
    });

    const { result } = renderHook(() => useAlbums('123'));
    expect(result.current.data).toEqual([]);
    expect(result.current.isFetching).toBe(false);
  });

  it('returns isFetching as true when useFetchAlbumsQuery is still fetching', () => {
    useFetchAlbumsQueryMocked.mockReturnValue({
      ...useFetchAlbumsQueryValue,
      data: undefined,
      isFetching: true,
    });

    const { result } = renderHook(() => useAlbums('123'));
    expect(result.current.data).toEqual([]);
    expect(result.current.isFetching).toBe(true);
  });
});
