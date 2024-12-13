import { renderHook } from '@testing-library/react';
import { usePhotos } from './use-photos';
import { describe, expect, it, vi } from 'vitest';
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

const mockData = [
  { id: 1, albumId: 1, title: 'Photo 1' },
  { id: 2, albumId: 2, title: 'Photo 2' },
  { id: 3, albumId: 1, title: 'Photo 3' },
];

describe('usePhotos', () => {
  it('should return the correct photo for a given albumId', () => {
    useFetchPhotosMocked.mockReturnValue({
      ...useFetchPhotosQueryValue,
      data: mockData,
    });

    const { result } = renderHook(() => usePhotos());
    const photo = result.current.getAlbumPhoto(1);

    expect(photo).toEqual(mockData[0]);
  });

  it('should return undefined if the albumId does not exist', () => {
    useFetchPhotosMocked.mockReturnValue({
      ...useFetchPhotosQueryValue,
      data: mockData,
    });

    const { result } = renderHook(() => usePhotos());
    const photo = result.current.getAlbumPhoto(999);

    expect(photo).toBeUndefined();
  });

  it('should return undefined if data is undefined', () => {
    useFetchPhotosMocked.mockReturnValue({ ...useFetchPhotosQueryValue });

    const { result } = renderHook(() => usePhotos());
    const photo = result.current.getAlbumPhoto(1);

    expect(photo).toBeUndefined();
  });
});
