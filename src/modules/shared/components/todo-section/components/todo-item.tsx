import { ToDo } from '@/modules/todo/models/todo.ts';

import styles from '../todo-section.module.scss';

interface TodoItemProps {
  todo: ToDo;
  removeTodoAction: (id: number) => void;
}

export const TodoItem = ({ todo, removeTodoAction }: TodoItemProps) => {
  return (
    <div className={styles.item}>
      <button onClick={() => removeTodoAction(todo.id)}>X</button>
      <p>{todo.title}</p>
    </div>
  );
};
