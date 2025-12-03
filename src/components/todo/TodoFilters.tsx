
import { cn } from '../../lib/utils';

interface TodoFiltersProps {
    currentFilter: 'all' | 'active' | 'completed';
    onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

export const TodoFilters = ({ currentFilter, onFilterChange }: TodoFiltersProps) => {
    const filters = [
        { id: 'all', label: 'All Tasks' },
        { id: 'active', label: 'Active' },
        { id: 'completed', label: 'Completed' },
    ] as const;

    return (
        <div className="flex items-center gap-2 p-1 bg-black/20 rounded-xl border border-white/5 w-fit">
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    onClick={() => onFilterChange(filter.id)}
                    className={cn(
                        "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                        currentFilter === filter.id
                            ? "bg-white/10 text-white shadow-sm"
                            : "text-secondary hover:text-primary hover:bg-white/5"
                    )}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
};
