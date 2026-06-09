export type Priority = 'low' | 'medium' | 'high';

export type FilterType = 'all' | 'active' | 'completed';

export type SortType = 'created' | 'priority' | 'alphabetical';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  category: string;
  createdAt: number;
  dueDate: string | null;
}
