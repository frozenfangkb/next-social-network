import { api } from '@/api/api.ts';
import { ToDoSchema } from '@/modules/todo/api/types.ts';

export const getToDos = async () => {
  const response = await api.get<ToDoSchema[]>('/todos');

  return response.data;
};
