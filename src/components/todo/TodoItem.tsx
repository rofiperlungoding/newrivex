import { motion } from 'framer-motion';
import { Check, Trash, Clock, Flag } from '@phosphor-icons/react';
import type { Todo, TodoPriority } from '../../services/todoApi';
import { cn } from '../../lib/utils';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string, isCompleted: boolean) => void;
    onDelete: (id: string) => void;
}

const priorityColors: Record<TodoPriority, string> = {
    low: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    high: 'text-red-400 bg-red-500/10 border-red-500/20',
};

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
                "group relative flex items-start gap-4 p-4 rounded-xl border transition-all duration-200",
                todo.is_completed
                    ? "bg-white/5 border-white/5 opacity-60"
                    : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
            )}
        >
            <button
                onClick={() => onToggle(todo.id, !todo.is_completed)}
                className={cn(
                    "mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                    todo.is_completed
                        ? "bg-mint border-mint text-black"
                        : "border-white/20 hover:border-mint"
                )}
            >
                {todo.is_completed && <Check size={14} weight="bold" />}
            </button>

            <div className="flex-grow min-w-0">
                <div className="flex items-start justify-between gap-4">
                    <h3 className={cn(
                        "text-lg font-medium truncate transition-all",
                        todo.is_completed ? "text-secondary line-through" : "text-primary"
                    )}>
                        {todo.title}
                    </h3>

                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={cn(
                            "px-2 py-0.5 rounded-md text-xs font-medium border flex items-center gap-1",
                            priorityColors[todo.priority]
                        )}>
                            <Flag weight="fill" size={10} />
                            {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                        </span>
                    </div>
                </div>

                {todo.description && (
                    <p className="mt-1 text-sm text-secondary line-clamp-2">
                        {todo.description}
                    </p>
                )}

                <div className="mt-3 flex items-center gap-4 text-xs text-secondary">
                    {todo.due_date && (
                        <div className="flex items-center gap-1.5">
                            <Clock size={14} />
                            <span>
                                {new Date(todo.due_date).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={() => onDelete(todo.id)}
                className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-red-500/10 text-secondary hover:text-red-400 transition-all"
                title="Delete task"
            >
                <Trash size={18} />
            </button>
        </motion.div>
    );
};
