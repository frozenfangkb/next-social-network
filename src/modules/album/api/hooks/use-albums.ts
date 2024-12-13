import { useFetchAlbumsQuery } from '@/modules/album/api/album-slice.ts';

export const useAlbums = (userId: string) => {
  const { data, isFetching } = useFetchAlbumsQuery(userId);

  return { data: data ?? [], isFetching };
};
