import { beforeEach, describe, it, vi, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { TodoSection } from './todo-section';
import { useTodos } from '@/modules/todo/api/hooks/use-todos.ts';
import { ToDo } from '@/modules/todo/models/todo.ts';

vi.mock('@/modules/todo/api/hooks/use-todos.ts');

describe('TodoSection', () => {
  const mockGetUserTodos = vi.fn();
  const mockUseTodos = useTodos as jest.Mock;

  beforeEach(() => {
    mockUseTodos.mockReturnValue({ getUserTodos: mockGetUserTodos });
  });

  it('renders the TodoSection and displays the correct title', () => {
    render(<TodoSection userId={1} />);
    expect(screen.getByText('ToDos')).toBeInTheDocument();
  });

  it('calls getUserTodos on initial render with the correct userId', () => {
    mockGetUserTodos.mockReturnValue([]);
    render(<TodoSection userId={1} />);
    expect(mockGetUserTodos).toHaveBeenCalledWith(1);
  });

  it('renders todos returned from getUserTodos', () => {
    const mockTodos: ToDo[] = [
      { id: 1, userId: 1, title: 'Todo 1', completed: false },
      { id: 2, userId: 1, title: 'Todo 2', completed: true },
    ];
    mockGetUserTodos.mockReturnValue(mockTodos);

    render(<TodoSection userId={1} />);

    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('removes a todo when the remove action is triggered', () => {
    const mockTodos: ToDo[] = [
      { id: 1, userId: 1, title: 'Todo 1', completed: false },
      { id: 2, userId: 1, title: 'Todo 2', completed: true },
    ];
    mockGetUserTodos.mockReturnValue(mockTodos);

    render(<TodoSection userId={1} />);

    const removeButton = screen.getAllByText('X')[0];
    fireEvent.click(removeButton);

    expect(screen.queryByText('Todo 1')).not.toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });
});
