type StatsBarProps = {
  stats: {
    total: number;
    completed: number;
    active: number;
  };
};

export default function StatsBar({ stats }: StatsBarProps) {
  const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-xs text-slate-500">Total</p>
          </div>
          <div className="w-px bg-slate-200" />
          <div className="text-center">
            <p className="text-xl font-bold text-indigo-500">{stats.active}</p>
            <p className="text-xs text-slate-500">Active</p>
          </div>
          <div className="w-px bg-slate-200" />
          <div className="text-center">
            <p className="text-xl font-bold text-emerald-500">{stats.completed}</p>
            <p className="text-xs text-slate-500">Done</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-800">{pct}%</p>
          <p className="text-xs text-slate-500">Complete</p>
        </div>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
