import { useFetchTodosQuery } from '@/modules/todo/api/todo-slice.ts';
import { useCallback } from 'react';

export const useTodos = () => {
  const { data, isFetching } = useFetchTodosQuery();

  const getUserTodos = useCallback(
    (userId?: number) => data?.filter(todo => todo.userId === userId),
    [data],
  );

  return { data: data ?? [], isFetching, getUserTodos };
};
