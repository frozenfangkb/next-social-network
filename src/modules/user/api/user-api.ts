import { User } from '../models/user.ts';
import { api } from '../../../api/api.ts';
import { UserSchema } from './types.ts';
import { adaptUserSchemaToModel } from './user-adapters.ts';

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<UserSchema[]>('/users');

  return response.data.map(adaptUserSchemaToModel);
};
