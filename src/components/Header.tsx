import { CheckSquare, Plus, X } from 'lucide-react';

type HeaderProps = {
  onAddClick: () => void;
  showingForm: boolean;
};

export default function Header({ onAddClick, showingForm }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-md">
          <CheckSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 leading-tight">My Todos</h1>
          <p className="text-sm text-slate-500">Stay organized, get things done</p>
        </div>
      </div>
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all duration-150"
      >
        {showingForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        <span className="text-sm">{showingForm ? 'Cancel' : 'Add Task'}</span>
      </button>
    </div>
  );
}
