import { apiSlice } from '@/store/slices/api-slice.ts';
import { User } from '../models/user.ts';
import { getUsers } from './user-service.ts';
import { adaptUserSchemaToModel } from './user-adapters.ts';

const UserApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    fetchUsers: query<User[], void>({
      queryFn: async () => {
        try {
          const users = await getUsers();

          return { data: users.map(adaptUserSchemaToModel) };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useFetchUsersQuery } = UserApiSlice;
