import { useState, useEffect, useCallback } from 'react';
import type { Todo, FilterType, SortType, Priority } from '@/types';
import { loadTodos, saveTodos, loadCategories, saveCategories } from '@/lib/storage';
import { generateId, priorityOrder } from '@/lib/utils';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const [categories, setCategories] = useState<string[]>(() => loadCategories());
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('created');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  const addTodo = useCallback((text: string, priority: Priority, category: string, dueDate: string | null) => {
    const newTodo: Todo = {
      id: generateId(),
      text: text.trim(),
      completed: false,
      priority,
      category,
      createdAt: Date.now(),
      dueDate,
    };
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  const editTodo = useCallback((id: string, text: string, priority: Priority, category: string, dueDate: string | null) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text, priority, category, dueDate } : t));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(t => !t.completed));
  }, []);

  const addCategory = useCallback((name: string) => {
    const trimmed = name.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories(prev => [...prev, trimmed]);
    }
  }, [categories]);

  const filteredAndSorted = (() => {
    let result = [...todos];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => t.text.toLowerCase().includes(q));
    }

    // Status filter
    if (filter === 'active') result = result.filter(t => !t.completed);
    if (filter === 'completed') result = result.filter(t => t.completed);

    // Category filter
    if (categoryFilter !== 'all') result = result.filter(t => t.category === categoryFilter);

    // Sort
    if (sort === 'priority') {
      result.sort((a, b) => priorityOrder(a.priority) - priorityOrder(b.priority));
    } else if (sort === 'alphabetical') {
      result.sort((a, b) => a.text.localeCompare(b.text));
    } else {
      result.sort((a, b) => b.createdAt - a.createdAt);
    }

    return result;
  })();

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
  };

  return {
    todos: filteredAndSorted,
    categories,
    filter,
    sort,
    categoryFilter,
    searchQuery,
    stats,
    setFilter,
    setSort,
    setCategoryFilter,
    setSearchQuery,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    addCategory,
  };
}
