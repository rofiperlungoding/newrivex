import { supabase } from '../lib/supabaseClient';

export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
    id: string;
    user_id: string;
    title: string;
    description: string | null;
    is_completed: boolean;
    priority: TodoPriority;
    due_date: string | null;
    created_at: string;
}

export const todoApi = {
    async fetchTodos() {
        const { data, error } = await supabase
            .from('todos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Todo[];
    },

    async createTodo(todo: { title: string; description?: string; priority?: TodoPriority; due_date?: string }) {
        console.log('Creating todo with data:', todo);

        // Get current user to ensure we have a session
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            console.error('No authenticated user found during createTodo');
            throw new Error('User not authenticated');
        }

        const { data, error } = await supabase
            .from('todos')
            .insert([{
                ...todo,
                due_date: todo.due_date || null, // Handle empty string
                user_id: user.id, // Explicitly set user_id
                is_completed: false
            }])
            .select()
            .single();

        if (error) {
            console.error('Supabase create error:', error);
            throw error;
        }

        console.log('Todo created successfully:', data);
        return data as Todo;
    },

    async updateTodo(id: string, updates: Partial<Todo>) {
        const { data, error } = await supabase
            .from('todos')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Todo;
    },

    async deleteTodo(id: string) {
        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    subscribeTodos(callback: (payload: any) => void) {
        return supabase
            .channel('todos-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'todos' },
                callback
            )
            .subscribe();
    }
};
