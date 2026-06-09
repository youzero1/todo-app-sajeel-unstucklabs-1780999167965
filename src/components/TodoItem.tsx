import { useState } from 'react';
import { Trash2, Edit3, Check, X, Calendar, Tag, Flag } from 'lucide-react';
import { cn, priorityBg } from '@/lib/utils';
import type { Todo, Priority } from '@/types';

type TodoItemProps = {
  todo: Todo;
  categories: string[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, priority: Priority, category: string, dueDate: string | null) => void;
  onAddCategory: (name: string) => void;
};

const PRIORITIES: { label: string; value: Priority }[] = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

export default function TodoItem({ todo, categories, onToggle, onDelete, onEdit, onAddCategory }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');
  const [newCatInput, setNewCatInput] = useState('');
  const [showNewCat, setShowNewCat] = useState(false);

  function handleSave() {
    if (!editText.trim()) return;
    onEdit(todo.id, editText.trim(), editPriority, editCategory, editDueDate || null);
    setEditing(false);
  }

  function handleCancel() {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setEditCategory(todo.category);
    setEditDueDate(todo.dueDate || '');
    setEditing(false);
    setShowNewCat(false);
  }

  function handleAddCategory() {
    if (newCatInput.trim()) {
      onAddCategory(newCatInput.trim());
      setEditCategory(newCatInput.trim());
      setNewCatInput('');
      setShowNewCat(false);
    }
  }

  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date(new Date().toDateString());

  if (editing) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-indigo-200 p-4 space-y-3">
        <input
          type="text"
          value={editText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') handleCancel(); }}
          className="w-full px-3 py-2 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
          autoFocus
        />
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="flex items-center gap-1 text-xs text-slate-400 mb-1"><Flag className="w-3 h-3" /> Priority</label>
            <select
              value={editPriority}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEditPriority(e.target.value as Priority)}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="flex items-center gap-1 text-xs text-slate-400 mb-1"><Tag className="w-3 h-3" /> Category</label>
            {showNewCat ? (
              <div className="flex gap-1">
                <input
                  type="text"
                  value={newCatInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCatInput(e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                  placeholder="New category"
                  className="flex-1 text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  autoFocus
                />
                <button type="button" onClick={handleAddCategory} className="px-2 py-1 bg-indigo-500 text-white text-xs rounded-lg">+</button>
                <button type="button" onClick={() => setShowNewCat(false)} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg">✕</button>
              </div>
            ) : (
              <div className="flex gap-1">
                <select
                  value={editCategory}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEditCategory(e.target.value)}
                  className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <button type="button" onClick={() => setShowNewCat(true)} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg font-bold">+</button>
              </div>
            )}
          </div>
          <div className="flex-1">
            <label className="flex items-center gap-1 text-xs text-slate-400 mb-1"><Calendar className="w-3 h-3" /> Due Date</label>
            <input
              type="date"
              value={editDueDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditDueDate(e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <button onClick={handleCancel} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all">
            <X className="w-3.5 h-3.5" /> Cancel
          </button>
          <button onClick={handleSave} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-all">
            <Check className="w-3.5 h-3.5" /> Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-sm border transition-all duration-200 p-4 flex items-start gap-3 group',
        todo.completed ? 'border-slate-100 opacity-70' : 'border-slate-200 hover:border-indigo-200 hover:shadow-md'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={cn(
          'mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all',
          todo.completed
            ? 'bg-emerald-500 border-emerald-500'
            : 'border-slate-300 hover:border-indigo-400'
        )}
      >
        {todo.completed && <Check className="w-3 h-3 text-white" />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={cn(
          'text-sm font-medium leading-snug break-words',
          todo.completed ? 'line-through text-slate-400' : 'text-slate-800'
        )}>
          {todo.text}
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', priorityBg(todo.priority))}>
            {todo.priority}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">
            {todo.category}
          </span>
          {todo.dueDate && (
            <span className={cn(
              'flex items-center gap-1 text-xs font-medium',
              isOverdue ? 'text-red-500' : 'text-slate-400'
            )}>
              <Calendar className="w-3 h-3" />
              {todo.dueDate}
              {isOverdue && <span className="text-red-500">(overdue)</span>}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setEditing(true)}
          className="p-1.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all"
          title="Edit"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
