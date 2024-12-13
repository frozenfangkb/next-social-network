import styles from './todo-section.module.scss';
import { useTodos } from '@/modules/todo/api/hooks/use-todos.ts';
import { useEffect, useState } from 'react';
import { ToDo } from '@/modules/todo/models/todo.ts';
import { TodoItem } from '@/modules/shared/components/todo-section/components/todo-item.tsx';
import { cloneDeep } from 'lodash';

interface TodoSectionProps {
  userId?: number;
}

export const TodoSection = ({ userId }: TodoSectionProps) => {
  const { getUserTodos } = useTodos();
  const [userTodos, setUserTodos] = useState<ToDo[]>([]);

  useEffect(() => {
    setUserTodos(getUserTodos(userId) ?? []);
  }, [getUserTodos, userId]);

  const handleRemoveTodo = (id: number) => {
    setUserTodos([...userTodos.filter(item => item.id !== id)]);
  };

  const handleChangeTodoCompleted = (id: number) => {
    const todoIndex = userTodos.findIndex(todo => todo.id === id);

    if (todoIndex !== -1) {
      const todos = cloneDeep(userTodos);
      todos[todoIndex].completed = !todos[todoIndex].completed;
      setUserTodos(todos);
    }
  };

  return (
    <div className={styles.container}>
      <h1>ToDos</h1>
      <div className={styles.section}>
        {userTodos?.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            removeTodoAction={handleRemoveTodo}
            changeTodoCompleted={handleChangeTodoCompleted}
          />
        ))}
      </div>
    </div>
  );
};
