import { renderHook } from '@testing-library/react';
import { usePhotos } from './use-photos';
import { vi, describe, it, expect } from 'vitest';
import { useFetchPhotosQuery } from '@/modules/photo/api/photo-slice.ts';

vi.mock('@/modules/photo/api/photo-slice.ts');

const useFetchPhotosQueryValue = {
  data: undefined,
  isFetching: false,
  isError: false,
} as unknown as ReturnType<typeof useFetchPhotosQuery>;

const useFetchPhotosMocked = vi
  .mocked(useFetchPhotosQuery)
  .mockReturnValue(useFetchPhotosQueryValue);

describe('usePhotos', () => {
  it('should return photos for a specific albumId', () => {
    const mockData = [
      { id: 1, albumId: 1, title: 'Photo 1' },
      { id: 2, albumId: 2, title: 'Photo 2' },
      { id: 3, albumId: 1, title: 'Photo 3' },
    ];

    useFetchPhotosMocked.mockReturnValue({
      ...useFetchPhotosQueryValue,
      data: mockData,
    });

    const { result } = renderHook(() => usePhotos());
    const albumPhotos = result.current.getAlbumPhoto(1);

    expect(albumPhotos).toEqual([
      { id: 1, albumId: 1, title: 'Photo 1' },
      { id: 3, albumId: 1, title: 'Photo 3' },
    ]);
  });

  it('should return an empty array if no photos match the albumId', () => {
    const mockData = [
      { id: 1, albumId: 1, title: 'Photo 1' },
      { id: 2, albumId: 2, title: 'Photo 2' },
      { id: 3, albumId: 1, title: 'Photo 3' },
    ];

    useFetchPhotosMocked.mockReturnValue({
      ...useFetchPhotosQueryValue,
      data: mockData,
    });

    const { result } = renderHook(() => usePhotos());
    const albumPhotos = result.current.getAlbumPhoto(3);

    expect(albumPhotos).toEqual([]);
  });

  it('should return undefined if data is not available', () => {
    useFetchPhotosMocked.mockReturnValue({ ...useFetchPhotosQueryValue });

    const { result } = renderHook(() => usePhotos());
    const albumPhotos = result.current.getAlbumPhoto(1);

    expect(albumPhotos).toBeUndefined();
  });
});
