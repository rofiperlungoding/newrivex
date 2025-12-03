import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, ListDashes, Warning } from '@phosphor-icons/react';
import { todoApi } from '../../services/todoApi';
import type { Todo, TodoPriority } from '../../services/todoApi';
import { TodoItem } from '../../components/todo/TodoItem';
import { TodoForm } from '../../components/todo/TodoForm';
import { TodoFilters } from '../../components/todo/TodoFilters';
import { TodoStats } from '../../components/todo/TodoStats';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';

const TodoApp = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [loading, setLoading] = useState(true);
    const { user } = useSupabaseAuth();

    useEffect(() => {
        if (user) {
            loadTodos();
            const subscription = todoApi.subscribeTodos(() => {
                loadTodos();
            });
            return () => {
                subscription.unsubscribe();
            };
        }
    }, [user]);

    const loadTodos = async () => {
        try {
            const data = await todoApi.fetchTodos();
            setTodos(data);
        } catch (error) {
            console.error('Error loading todos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTodo = async (data: { title: string; description: string; priority: TodoPriority; due_date: string }) => {
        try {
            const newTodo = await todoApi.createTodo(data);
            setTodos([newTodo, ...todos]);
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    const handleToggleTodo = async (id: string, isCompleted: boolean) => {
        // Optimistic update
        setTodos(todos.map(t => t.id === id ? { ...t, is_completed: isCompleted } : t));
        try {
            await todoApi.updateTodo(id, { is_completed: isCompleted });
        } catch (error) {
            console.error('Error updating todo:', error);
            loadTodos(); // Revert on error
        }
    };

    const handleDeleteTodo = async (id: string) => {
        // Optimistic update
        setTodos(todos.filter(t => t.id !== id));
        try {
            await todoApi.deleteTodo(id);
        } catch (error) {
            console.error('Error deleting todo:', error);
            loadTodos(); // Revert on error
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.is_completed;
        if (filter === 'completed') return todo.is_completed;
        return true;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-mint"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-mint/10 text-mint">
                    <CheckSquare size={32} weight="fill" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Enterprise Tasks</h1>
                    <p className="text-secondary">Manage your projects with precision</p>
                </div>
            </div>

            <TodoStats todos={todos} />

            <div className="grid lg:grid-cols-[350px,1fr] gap-8 items-start">
                <div className="space-y-6 sticky top-24">
                    <TodoForm onSubmit={handleCreateTodo} />

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                        <h3 className="text-sm font-medium text-secondary mb-4 uppercase tracking-wider">Quick Filters</h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${filter === 'all' ? 'bg-white/10 text-white' : 'text-secondary hover:bg-white/5 hover:text-primary'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <ListDashes size={18} />
                                    <span>All Tasks</span>
                                </div>
                                <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full">{todos.length}</span>
                            </button>
                            <button
                                onClick={() => setFilter('active')}
                                className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${filter === 'active' ? 'bg-white/10 text-white' : 'text-secondary hover:bg-white/5 hover:text-primary'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <Warning size={18} />
                                    <span>Pending</span>
                                </div>
                                <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full">{todos.filter(t => !t.is_completed).length}</span>
                            </button>
                            <button
                                onClick={() => setFilter('completed')}
                                className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${filter === 'completed' ? 'bg-white/10 text-white' : 'text-secondary hover:bg-white/5 hover:text-primary'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <CheckSquare size={18} />
                                    <span>Completed</span>
                                </div>
                                <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full">{todos.filter(t => t.is_completed).length}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            {filter === 'all' ? 'All Tasks' : filter === 'active' ? 'Pending Tasks' : 'Completed Tasks'}
                        </h2>
                        <TodoFilters currentFilter={filter} onFilterChange={setFilter} />
                    </div>

                    <div className="space-y-3">
                        <AnimatePresence mode="popLayout">
                            {filteredTodos.length > 0 ? (
                                filteredTodos.map((todo) => (
                                    <TodoItem
                                        key={todo.id}
                                        todo={todo}
                                        onToggle={handleToggleTodo}
                                        onDelete={handleDeleteTodo}
                                    />
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-12 border border-dashed border-white/10 rounded-2xl"
                                >
                                    <p className="text-secondary">No tasks found</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoApp;
