import { ToDo } from '@/modules/todo/models/todo.ts';

import styles from '../todo-section.module.scss';

interface TodoItemProps {
  todo: ToDo;
  removeTodoAction: (id: number) => void;
  changeTodoCompleted: (id: number) => void;
}

export const TodoItem = ({
  todo,
  removeTodoAction,
  changeTodoCompleted,
}: TodoItemProps) => {
  return (
    <div className={styles.item}>
      <button onClick={() => removeTodoAction(todo.id)}>X</button>
      <p>{todo.title}</p>
      <div className='self-end'>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => changeTodoCompleted(todo.id)}
        />
      </div>
    </div>
  );
};
