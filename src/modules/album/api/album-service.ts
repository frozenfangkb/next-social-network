import { AlbumSchema } from './types.ts';
import { api } from '@/api/api';

export const getUserAlbums = async (userId: string): Promise<AlbumSchema[]> => {
  const response = await api.get<AlbumSchema[]>(`/users/${userId}/albums`);

  return response.data;
};
