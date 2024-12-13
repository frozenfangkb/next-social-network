import styles from './todo-section.module.scss';
import { useTodos } from '@/modules/todo/api/hooks/use-todos.ts';
import { useEffect, useState } from 'react';
import { ToDo } from '@/modules/todo/models/todo.ts';
import { TodoItem } from '@/modules/shared/components/todo-section/components/todo-item.tsx';

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

  return (
    <div className={styles.container}>
      <h1>ToDos</h1>
      <div className={styles.section}>
        {userTodos?.map(todo => (
          <TodoItem todo={todo} removeTodoAction={handleRemoveTodo} />
        ))}
      </div>
    </div>
  );
};
