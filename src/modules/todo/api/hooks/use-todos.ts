import { useFetchTodosQuery } from '@/modules/todo/api/todo-slice.ts';

export const useTodos = () => {
  const { data, isFetching } = useFetchTodosQuery();

  return { data: data ?? [], isFetching };
};
