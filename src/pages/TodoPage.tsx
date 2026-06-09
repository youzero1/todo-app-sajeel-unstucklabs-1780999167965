import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import Header from './components/Header';
import AddTodoForm from './components/AddTodoForm';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';
import StatsBar from './components/StatsBar';

export default function TodoPage() {
  const hook = useTodos();
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Header onAddClick={() => setShowAddForm(v => !v)} showingForm={showAddForm} />

        {showAddForm && (
          <div className="mb-6">
            <AddTodoForm
              categories={hook.categories}
              onAdd={(text, priority, category, dueDate) => {
                hook.addTodo(text, priority, category, dueDate);
                setShowAddForm(false);
              }}
              onAddCategory={hook.addCategory}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        <StatsBar stats={hook.stats} />

        <FilterBar
          filter={hook.filter}
          sort={hook.sort}
          categoryFilter={hook.categoryFilter}
          categories={hook.categories}
          searchQuery={hook.searchQuery}
          onFilterChange={hook.setFilter}
          onSortChange={hook.setSort}
          onCategoryFilterChange={hook.setCategoryFilter}
          onSearchChange={hook.setSearchQuery}
        />

        <TodoList
          todos={hook.todos}
          categories={hook.categories}
          onToggle={hook.toggleTodo}
          onDelete={hook.deleteTodo}
          onEdit={hook.editTodo}
          onClearCompleted={hook.clearCompleted}
          filter={hook.filter}
          onAddCategory={hook.addCategory}
        />
      </div>
    </div>
  );
}
