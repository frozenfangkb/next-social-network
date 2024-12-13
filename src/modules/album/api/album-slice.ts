import { apiSlice } from '@/store/slices/api-slice.ts';
import { Album } from '@/modules/album/models/album.ts';
import { getUserAlbums } from '@/modules/album/api/album-service.ts';
import { adaptAlbumSchemaToModel } from '@/modules/album/api/album-adapters.ts';

const AlbumSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    fetchAlbums: query<Album[], string | undefined>({
      queryFn: async (userId: string) => {
        if (!userId) {
          return { data: [] };
        }
        try {
          const response = await getUserAlbums(userId);

          return { data: response.map(adaptAlbumSchemaToModel) };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useFetchAlbumsQuery } = AlbumSlice;
