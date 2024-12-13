import { useFetchPhotosQuery } from '@/modules/photo/api/photo-slice.ts';
import { useCallback } from 'react';

export const usePhotos = () => {
  const { data } = useFetchPhotosQuery();

  const getAlbumPhoto = useCallback(
    (albumId: number) => {
      return data?.find(photo => photo.albumId === albumId);
    },
    [data],
  );

  const getAlbumPhotos = useCallback(
    (albumId: number) => {
      return data?.filter(photo => photo.albumId === albumId);
    },
    [data],
  );

  return { getAlbumPhoto, getAlbumPhotos };
};
