import { api } from '@/api/api.ts';
import { UserSchema } from './types.ts';

export const getUsers = async (): Promise<UserSchema[]> => {
  const response = await api.get<UserSchema[]>('/users');

  return response.data;
};
