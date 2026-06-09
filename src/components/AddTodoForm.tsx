import { useState } from 'react';
import { Plus, Tag, Flag, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Priority } from '../types';

type AddTodoFormProps = {
  categories: string[];
  onAdd: (text: string, priority: Priority, category: string, dueDate: string | null) => void;
  onAddCategory: (name: string) => void;
  onCancel: () => void;
};

const PRIORITIES: { label: string; value: Priority; color: string }[] = [
  { label: 'Low', value: 'low', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { label: 'Medium', value: 'medium', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { label: 'High', value: 'high', color: 'bg-red-100 text-red-700 border-red-300' },
];

export default function AddTodoForm({ categories, onAdd, onAddCategory, onCancel }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState(categories[0] || 'Personal');
  const [dueDate, setDueDate] = useState('');
  const [newCatInput, setNewCatInput] = useState('');
  const [showNewCat, setShowNewCat] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim(), priority, category, dueDate || null);
    setText('');
    setPriority('medium');
    setDueDate('');
  }

  function handleAddCategory() {
    if (newCatInput.trim()) {
      onAddCategory(newCatInput.trim());
      setCategory(newCatInput.trim());
      setNewCatInput('');
      setShowNewCat(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-indigo-200 p-5 space-y-4"
    >
      <h2 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">New Task</h2>

      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        autoFocus
        className="w-full px-4 py-3 text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 placeholder-slate-400"
      />

      <div>
        <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-2">
          <Flag className="w-3.5 h-3.5" /> Priority
        </label>
        <div className="flex gap-2">
          {PRIORITIES.map(p => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPriority(p.value)}
              className={cn(
                'flex-1 py-1.5 text-sm font-medium rounded-lg border transition-all',
                priority === p.value ? p.color + ' ring-2 ring-offset-1 ring-indigo-300' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-2">
            <Tag className="w-3.5 h-3.5" /> Category
          </label>
          {showNewCat ? (
            <div className="flex gap-1">
              <input
                type="text"
                placeholder="Category name"
                value={newCatInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCatInput(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                className="flex-1 px-2 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                autoFocus
              />
              <button type="button" onClick={handleAddCategory} className="px-2 py-1.5 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600">
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => setShowNewCat(false)} className="px-2 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-lg hover:bg-slate-200">
                ✕
              </button>
            </div>
          ) : (
            <div className="flex gap-1">
              <select
                value={category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-700"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button type="button" onClick={() => setShowNewCat(true)} className="px-2 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-lg hover:bg-slate-200 font-medium">
                +
              </button>
            </div>
          )}
        </div>

        <div className="flex-1">
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-2">
            <Calendar className="w-3.5 h-3.5" /> Due Date (optional)
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
            className="w-full px-2 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-700"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex-1 py-2.5 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-sm"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
