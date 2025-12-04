import { supabase } from '../lib/supabaseClient';

// Types matching database schema
export type ExpenseCategory = 'Travel' | 'Food' | 'Office' | 'Software' | 'Marketing' | 'Equipment' | 'Other';
export type ExpenseStatus = 'Pending' | 'Approved' | 'Rejected' | 'Paid';
export type NotificationType = 'info' | 'warning' | 'success' | 'error';

export interface Expense {
    id: string;
    user_id: string;
    date: string;
    merchant: string;
    amount: number;
    currency: string;
    category: ExpenseCategory;
    description: string | null;
    status: ExpenseStatus;
    receipt_url: string | null;
    requested_by: string | null;
    project: string | null;
    created_at: string;
    updated_at: string;
}

export interface Budget {
    id: string;
    user_id: string;
    category: ExpenseCategory;
    budget_limit: number;
    spent: number;
    period: string;
    created_at: string;
    updated_at: string;
}

export interface ExpenseNotification {
    id: string;
    user_id: string;
    title: string;
    message: string;
    date: string;
    read: boolean;
    type: NotificationType;
    created_at: string;
}

// Input types for creating/updating
export interface CreateExpenseInput {
    date?: string;
    merchant: string;
    amount: number;
    currency?: string;
    category: ExpenseCategory;
    description?: string;
    receipt_url?: string;
    requested_by?: string;
    project?: string;
}

export interface UpdateExpenseInput {
    date?: string;
    merchant?: string;
    amount?: number;
    currency?: string;
    category?: ExpenseCategory;
    description?: string;
    status?: ExpenseStatus;
    receipt_url?: string;
    requested_by?: string;
    project?: string;
}

export const expenseApi = {
    // ============ EXPENSES ============
    async fetchExpenses(): Promise<Expense[]> {
        const { data, error } = await supabase
            .from('expenses')
            .select('*')
            .order('date', { ascending: false });

        if (error) throw error;
        return data as Expense[];
    },

    async createExpense(expense: CreateExpenseInput): Promise<Expense> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
            .from('expenses')
            .insert([{
                ...expense,
                user_id: user.id,
                date: expense.date || new Date().toISOString(),
                currency: expense.currency || 'IDR',
                status: 'Pending'
            }])
            .select()
            .single();

        if (error) throw error;

        // Update budget spent amount
        await this.updateBudgetSpent(expense.category, expense.amount);

        return data as Expense;
    },

    async updateExpense(id: string, updates: UpdateExpenseInput): Promise<Expense> {
        const { data, error } = await supabase
            .from('expenses')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data as Expense;
    },

    async deleteExpense(id: string): Promise<void> {
        // Get expense first to update budget
        const { data: expense } = await supabase
            .from('expenses')
            .select('category, amount')
            .eq('id', id)
            .single();

        const { error } = await supabase
            .from('expenses')
            .delete()
            .eq('id', id);

        if (error) throw error;

        // Revert budget spent amount
        if (expense) {
            await this.updateBudgetSpent(expense.category, -expense.amount);
        }
    },

    // ============ BUDGETS ============
    async fetchBudgets(): Promise<Budget[]> {
        const { data, error } = await supabase
            .from('budgets')
            .select('*')
            .order('category');

        if (error) throw error;
        return data as Budget[];
    },

    async setBudgetLimit(category: ExpenseCategory, limit: number): Promise<Budget> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // Upsert: update if exists, insert if not
        const { data, error } = await supabase
            .from('budgets')
            .upsert({
                user_id: user.id,
                category,
                budget_limit: limit,
                period: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            }, {
                onConflict: 'user_id,category,period'
            })
            .select()
            .single();

        if (error) throw error;
        return data as Budget;
    },

    async updateBudgetSpent(category: ExpenseCategory, amountDelta: number): Promise<void> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const period = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        // Get current budget
        const { data: budget } = await supabase
            .from('budgets')
            .select('spent')
            .eq('user_id', user.id)
            .eq('category', category)
            .eq('period', period)
            .single();

        if (budget) {
            await supabase
                .from('budgets')
                .update({ spent: Math.max(0, budget.spent + amountDelta) })
                .eq('user_id', user.id)
                .eq('category', category)
                .eq('period', period);
        }
    },

    async initializeBudgets(): Promise<Budget[]> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const period = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        const categories: ExpenseCategory[] = ['Travel', 'Food', 'Office', 'Software', 'Marketing', 'Equipment', 'Other'];
        const defaultLimits: Record<ExpenseCategory, number> = {
            Travel: 0,
            Food: 0,
            Office: 0,
            Software: 0,
            Marketing: 0,
            Equipment: 0,
            Other: 0
        };

        const budgetsToInsert = categories.map(category => ({
            user_id: user.id,
            category,
            budget_limit: defaultLimits[category],
            spent: 0,
            period
        }));

        const { data, error } = await supabase
            .from('budgets')
            .upsert(budgetsToInsert, { onConflict: 'user_id,category,period' })
            .select();

        if (error) throw error;
        return data as Budget[];
    },

    // ============ NOTIFICATIONS ============
    async fetchNotifications(): Promise<ExpenseNotification[]> {
        const { data, error } = await supabase
            .from('expense_notifications')
            .select('*')
            .order('date', { ascending: false })
            .limit(20);

        if (error) throw error;
        return data as ExpenseNotification[];
    },

    async markNotificationAsRead(id: string): Promise<void> {
        const { error } = await supabase
            .from('expense_notifications')
            .update({ read: true })
            .eq('id', id);

        if (error) throw error;
    },

    async markAllNotificationsAsRead(): Promise<void> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('expense_notifications')
            .update({ read: true })
            .eq('user_id', user.id);

        if (error) throw error;
    },

    async clearAllNotifications(): Promise<void> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('expense_notifications')
            .delete()
            .eq('user_id', user.id);

        if (error) throw error;
    },

    async createNotification(notification: { title: string; message: string; type: NotificationType }): Promise<ExpenseNotification> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
            .from('expense_notifications')
            .insert([{
                ...notification,
                user_id: user.id,
                read: false
            }])
            .select()
            .single();

        if (error) throw error;
        return data as ExpenseNotification;
    },

    // ============ REALTIME SUBSCRIPTIONS ============
    subscribeToExpenses(callback: (payload: any) => void) {
        return supabase
            .channel('expenses-channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'expenses' }, callback)
            .subscribe();
    },

    subscribeToBudgets(callback: (payload: any) => void) {
        return supabase
            .channel('budgets-channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'budgets' }, callback)
            .subscribe();
    },

    subscribeToNotifications(callback: (payload: any) => void) {
        return supabase
            .channel('expense-notifications-channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'expense_notifications' }, callback)
            .subscribe();
    }
};
