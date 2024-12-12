import { useFetchUsersQuery } from '../user-slice.ts';

export const useUsers = () => {
  const { data, isFetching, isError } = useFetchUsersQuery();

  return {
    data: data ?? [],
    isFetching,
    isError,
  };
};
