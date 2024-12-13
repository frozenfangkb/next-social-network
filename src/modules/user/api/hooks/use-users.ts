import { useFetchUsersQuery } from '../user-slice.ts';

export const useUsers = () => {
  const { data, isFetching, isError } = useFetchUsersQuery();

  const getUserData = (userId: number | undefined) =>
    data?.find(user => user.id === userId);

  return {
    data: data ?? [],
    getUserData,
    isFetching,
    isError,
  };
};
