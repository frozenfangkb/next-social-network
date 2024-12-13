import { api } from '@/api/api.ts';
import { PhotoSchema } from '@/modules/photo/api/types.ts';

export const getPhotos = async (): Promise<PhotoSchema[]> => {
  const response = await api.get<PhotoSchema[]>('/photos');

  return response.data;
};
