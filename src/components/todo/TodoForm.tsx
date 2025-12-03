import { useState } from 'react';
import { Plus } from '@phosphor-icons/react';
import { DateTimePicker } from '../ui/DateTimePicker';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import type { TodoPriority } from '../../services/todoApi';
import { cn } from '../../lib/utils';

interface TodoFormProps {
    onSubmit: (data: { title: string; description: string; priority: TodoPriority; due_date: string }) => Promise<void>;
}

export const TodoForm = ({ onSubmit }: TodoFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<TodoPriority>('medium');
    const [dueDate, setDueDate] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        try {
            await onSubmit({ title, description, priority, due_date: dueDate });
            setTitle('');
            setDescription('');
            setPriority('medium');
            setDueDate('');
            setIsExpanded(false);
        } catch (error) {
            console.error('Failed to create todo:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-4 transition-all">
            <div className="flex gap-4">
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onFocus={() => setIsExpanded(true)}
                    placeholder="Add a new task..."
                    className="bg-transparent border-none px-0 h-auto text-lg placeholder:text-secondary focus-visible:ring-0"
                />
                <Button
                    type="submit"
                    size="icon"
                    variant="mint"
                    disabled={!title.trim() || loading}
                    className={cn("flex-shrink-0 transition-all", !isExpanded && !title && "opacity-50")}
                >
                    <Plus size={20} weight="bold" />
                </Button>
            </div>

            {(isExpanded || title) && (
                <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description (optional)"
                        className="w-full bg-black/20 rounded-lg p-3 text-sm text-primary placeholder:text-secondary/50 border border-white/5 focus:border-white/10 focus:outline-none resize-none min-h-[80px]"
                    />

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-secondary font-medium uppercase tracking-wider">Priority</span>
                            <div className="flex bg-black/20 rounded-lg p-1 border border-white/5">
                                {(['low', 'medium', 'high'] as TodoPriority[]).map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setPriority(p)}
                                        className={cn(
                                            "px-3 py-1 rounded-md text-xs font-medium capitalize transition-all",
                                            priority === p
                                                ? "bg-white/10 text-white shadow-sm"
                                                : "text-secondary hover:text-primary hover:bg-white/5"
                                        )}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="hidden sm:block h-4 w-px bg-white/10" />

                        <div className="flex items-center gap-2 flex-grow sm:flex-grow-0">
                            <span className="text-xs text-secondary font-medium uppercase tracking-wider whitespace-nowrap">Due Date</span>
                            <div className="relative flex-grow">
                                <DateTimePicker value={dueDate} onChange={setDueDate} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
};
