import { CheckCircle, Circle, Clock, Warning } from '@phosphor-icons/react';
import type { Todo } from '../../services/todoApi';

interface TodoStatsProps {
    todos: Todo[];
}

export const TodoStats = ({ todos }: TodoStatsProps) => {
    const total = todos.length;
    const completed = todos.filter(t => t.is_completed).length;
    const pending = total - completed;
    const highPriority = todos.filter(t => !t.is_completed && t.priority === 'high').length;

    const stats = [
        {
            label: 'Total Tasks',
            value: total,
            icon: Circle,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10 border-blue-500/20'
        },
        {
            label: 'Completed',
            value: completed,
            icon: CheckCircle,
            color: 'text-green-400',
            bg: 'bg-green-500/10 border-green-500/20'
        },
        {
            label: 'Pending',
            value: pending,
            icon: Clock,
            color: 'text-yellow-400',
            bg: 'bg-yellow-500/10 border-yellow-500/20'
        },
        {
            label: 'High Priority',
            value: highPriority,
            icon: Warning,
            color: 'text-red-400',
            bg: 'bg-red-500/10 border-red-500/20'
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
                <div key={stat.label} className={`p-4 rounded-xl border ${stat.bg} flex items-center gap-4`}>
                    <div className={`p-2 rounded-lg bg-black/20 ${stat.color}`}>
                        <stat.icon size={24} weight="duotone" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs font-medium text-secondary uppercase tracking-wider">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
