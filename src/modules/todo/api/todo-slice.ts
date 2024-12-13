import { apiSlice } from '@/store/slices/api-slice.ts';
import { ToDo } from '@/modules/todo/models/todo.ts';
import { getToDos } from '@/modules/todo/api/todo-service.ts';
import { adaptTodoSchemaToModel } from '@/modules/todo/api/todo-adapters.ts';

const TodoSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    fetchTodos: query<ToDo[], void>({
      queryFn: async () => {
        try {
          const response = await getToDos();

          return { data: response.map(adaptTodoSchemaToModel) };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useFetchTodosQuery } = TodoSlice;
