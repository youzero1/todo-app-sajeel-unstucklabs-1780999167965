import { Trash2 } from 'lucide-react';
import type { Todo, FilterType, Priority } from '@/types';
import TodoItem from '@/components/TodoItem';

type TodoListProps = {
  todos: Todo[];
  categories: string[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, priority: Priority, category: string, dueDate: string | null) => void;
  onClearCompleted: () => void;
  onAddCategory: (name: string) => void;
};

export default function TodoList({
  todos, categories, filter, onToggle, onDelete, onEdit, onClearCompleted, onAddCategory
}: TodoListProps) {
  const hasCompleted = todos.some(t => t.completed);

  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
        <div className="text-5xl mb-4">✅</div>
        <p className="text-slate-500 font-medium">
          {filter === 'completed' ? 'No completed tasks yet.' :
           filter === 'active' ? 'No active tasks. All done!' :
           'No tasks yet. Add one above!'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          categories={categories}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onAddCategory={onAddCategory}
        />
      ))}
      {hasCompleted && (
        <div className="flex justify-end pt-2">
          <button
            onClick={onClearCompleted}
            className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-600 transition-colors font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Clear completed
          </button>
        </div>
      )}
    </div>
  );
}
