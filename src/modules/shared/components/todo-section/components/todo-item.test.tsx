import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { TodoItem } from './todo-item';

describe('TodoItem', () => {
  it('renders the todo item properly', () => {
    const todo = { id: 1, title: 'Test Todo', userId: 1, completed: false };
    const removeTodoAction = vi.fn();

    render(<TodoItem todo={todo} removeTodoAction={removeTodoAction} />);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'X' })).toBeInTheDocument();
  });

  it('calls `removeTodoAction` with the correct id when the button is clicked', () => {
    const todo = { id: 1, title: 'Test Todo', userId: 1, completed: false };
    const removeTodoAction = vi.fn();

    render(<TodoItem todo={todo} removeTodoAction={removeTodoAction} />);

    fireEvent.click(screen.getByRole('button', { name: 'X' }));
    expect(removeTodoAction).toHaveBeenCalledOnce();
    expect(removeTodoAction).toHaveBeenCalledWith(1);
  });
});
