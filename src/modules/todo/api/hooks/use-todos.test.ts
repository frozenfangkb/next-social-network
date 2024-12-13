import { renderHook } from '@testing-library/react';
import { useTodos } from './use-todos';
import { describe, expect, it, vi } from 'vitest';
import { useFetchTodosQuery } from '@/modules/todo/api/todo-slice.ts';

vi.mock('@/modules/todo/api/todo-slice.ts');

const useFetchTodosQueryMockedValue = {
  data: [
    { id: 1, userId: 1, title: 'Todo 1', completed: false },
    { id: 2, userId: 2, title: 'Todo 2', completed: true },
  ],
  isFetching: false,
} as unknown as ReturnType<typeof useFetchTodosQuery>;

const useFetchTodosMocked = vi
  .mocked(useFetchTodosQuery)
  .mockReturnValue(useFetchTodosQueryMockedValue);

describe('useTodos', () => {
  it('should return data and isFetching status correctly', () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.data).toEqual([
      { id: 1, userId: 1, title: 'Todo 1', completed: false },
      { id: 2, userId: 2, title: 'Todo 2', completed: true },
    ]);
    expect(result.current.isFetching).toBe(false);
  });

  it('getUserTodos should filter todos based on userId', () => {
    const { result } = renderHook(() => useTodos());
    const userTodos = result.current.getUserTodos(1);
    expect(userTodos).toEqual([
      { id: 1, userId: 1, title: 'Todo 1', completed: false },
    ]);
  });

  it('getUserTodos should return an empty array if userId is not provided', () => {
    const { result } = renderHook(() => useTodos());
    const userTodos = result.current.getUserTodos();
    expect(userTodos).toEqual([]);
  });

  it('should return empty data array when data is undefined', () => {
    useFetchTodosMocked.mockReturnValueOnce({
      ...useFetchTodosQueryMockedValue,
      data: [],
      isFetching: true,
    });
    const { result } = renderHook(() => useTodos());
    expect(result.current.data).toEqual([]);
    expect(result.current.isFetching).toBe(true);
  });
});
