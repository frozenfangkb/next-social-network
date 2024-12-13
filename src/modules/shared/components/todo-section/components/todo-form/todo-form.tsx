import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToDo } from '@/modules/todo/models/todo.ts';

import styles from './todo-form.module.scss';

const formSchema = yup.object().shape({
  todoText: yup
    .string()
    .trim()
    .matches(/[a-zA-Z]/)
    .required(),
});

interface TodoFormSchema {
  todoText: string;
}

interface TodoFormProps {
  submitForm: (todo: ToDo) => void;
  higherTodoNumber: number;
  userId: number;
}

export const TodoForm = ({
  submitForm,
  higherTodoNumber,
  userId,
}: TodoFormProps) => {
  const { register, handleSubmit, reset } = useForm<TodoFormSchema>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<TodoFormSchema> = data => {
    submitForm({
      id: higherTodoNumber++,
      completed: false,
      title: data.todoText,
      userId,
    });
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input type='text' {...register('todoText')} />
      <button type='submit'>Add</button>
    </form>
  );
};
