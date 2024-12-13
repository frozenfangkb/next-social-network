import { apiSlice } from '@/store/slices/api-slice.ts';
import { Photo } from '@/modules/photo/models/photo.ts';
import { getPhotos } from '@/modules/photo/api/photo-service.ts';
import { adaptPhotoSchemaToModel } from '@/modules/photo/api/photo-adapters.ts';

const PhotoSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    fetchPhotos: query<Photo[], void>({
      queryFn: async () => {
        try {
          const response = await getPhotos();

          return { data: response.map(adaptPhotoSchemaToModel) };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useFetchPhotosQuery } = PhotoSlice;
