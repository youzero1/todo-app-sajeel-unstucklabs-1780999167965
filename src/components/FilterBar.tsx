import { Search, ArrowUpDown, Tag } from 'lucide-react';
import { cn } from '../lib/utils';
import type { FilterType, SortType } from '../types';

type FilterBarProps = {
  filter: FilterType;
  sort: SortType;
  categoryFilter: string;
  categories: string[];
  searchQuery: string;
  onFilterChange: (f: FilterType) => void;
  onSortChange: (s: SortType) => void;
  onCategoryFilterChange: (c: string) => void;
  onSearchChange: (q: string) => void;
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function FilterBar({
  filter, sort, categoryFilter, categories, searchQuery,
  onFilterChange, onSortChange, onCategoryFilterChange, onSearchChange,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-4 space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 placeholder-slate-400"
        />
      </div>

      <div className="flex gap-1">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={cn(
              'flex-1 py-1.5 text-sm font-medium rounded-lg transition-all',
              filter === f.value
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="flex items-center gap-1.5 flex-1">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={sort}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onSortChange(e.target.value as SortType)}
            className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-700"
          >
            <option value="created">Newest First</option>
            <option value="priority">By Priority</option>
            <option value="alphabetical">A → Z</option>
          </select>
        </div>
        <div className="flex items-center gap-1.5 flex-1">
          <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={categoryFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onCategoryFilterChange(e.target.value)}
            className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-700"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
