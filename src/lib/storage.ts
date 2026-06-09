import type { Todo } from '../types';

const STORAGE_KEY = 'todo-app-todos';
const CATEGORIES_KEY = 'todo-app-categories';

export function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Todo[];
  } catch {
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function loadCategories(): string[] {
  try {
    const raw = localStorage.getItem(CATEGORIES_KEY);
    if (!raw) return ['Personal', 'Work', 'Shopping'];
    return JSON.parse(raw) as string[];
  } catch {
    return ['Personal', 'Work', 'Shopping'];
  }
}

export function saveCategories(categories: string[]): void {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}
