import { describe, expect, it } from 'vitest';
import { adaptTodoSchemaToModel } from './todo-adapters';
import { ToDo } from '@/modules/todo/models/todo.ts';
import { ToDoSchema } from '@/modules/todo/api/types.ts';

describe('adaptTodoSchemaToModel', () => {
  it('should correctly adapt a ToDoSchema object to a ToDo object', () => {
    const todoSchema: ToDoSchema = {
      userId: 1,
      id: 101,
      title: 'Test ToDo',
      completed: false,
    };

    const adaptedTodo = adaptTodoSchemaToModel(todoSchema);

    expect(adaptedTodo).toEqual<ToDo>({
      userId: 1,
      id: 101,
      title: 'Test ToDo',
      completed: false,
    });
  });

  it('should handle an empty schema object gracefully when types align', () => {
    const emptySchema: ToDoSchema = {
      userId: 0,
      id: 0,
      title: '',
      completed: false,
    };

    const adaptedTodo = adaptTodoSchemaToModel(emptySchema);

    expect(adaptedTodo).toEqual<ToDo>({
      userId: 0,
      id: 0,
      title: '',
      completed: false,
    });
  });
});
