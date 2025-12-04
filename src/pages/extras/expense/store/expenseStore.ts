import { create } from 'zustand';
import { expenseApi, type Expense, type Budget, type ExpenseNotification, type ExpenseCategory, type CreateExpenseInput, type UpdateExpenseInput } from '../../../../services/expenseApi';

// Re-export types for convenience
export type { Expense, Budget, ExpenseNotification, ExpenseCategory };
export type ExpenseStatus = 'Pending' | 'Approved' | 'Rejected' | 'Paid';

interface ExpenseState {
    // Data
    expenses: Expense[];
    budgets: Budget[];
    notifications: ExpenseNotification[];

    // Loading states
    isLoading: boolean;
    isInitialized: boolean;
    error: string | null;

    // Actions - Data fetching
    fetchAll: () => Promise<void>;

    // Actions - Expenses
    addExpense: (expense: CreateExpenseInput) => Promise<void>;
    updateExpense: (id: string, updates: UpdateExpenseInput) => Promise<void>;
    deleteExpense: (id: string) => Promise<void>;

    // Actions - Budgets
    setBudget: (category: ExpenseCategory, limit: number) => Promise<void>;

    // Actions - Notifications
    markAllRead: () => Promise<void>;
    clearNotifications: () => Promise<void>;

    // Actions - Reset
    reset: () => void;

    // Computed helpers
    getTotalSpent: () => number;
    getBudgetProgress: (category: ExpenseCategory) => number;
}

export const useExpenseStore = create<ExpenseState>()((set, get) => ({
    // Initial state
    expenses: [],
    budgets: [],
    notifications: [],
    isLoading: false,
    isInitialized: false,
    error: null,

    // Reset state
    reset: () => set({
        expenses: [],
        budgets: [],
        notifications: [],
        isLoading: false,
        isInitialized: false,
        error: null
    }),

    // Fetch all data from Supabase
    fetchAll: async () => {
        if (get().isLoading) return;

        set({ isLoading: true, error: null });

        try {
            const [expenses, budgets, notifications] = await Promise.all([
                expenseApi.fetchExpenses(),
                expenseApi.fetchBudgets(),
                expenseApi.fetchNotifications()
            ]);

            // Initialize budgets if empty
            let finalBudgets = budgets;
            if (budgets.length === 0) {
                finalBudgets = await expenseApi.initializeBudgets();
            }

            set({
                expenses,
                budgets: finalBudgets,
                notifications,
                isLoading: false,
                isInitialized: true
            });
        } catch (error) {
            console.error('Error fetching expense data:', error);
            set({
                error: error instanceof Error ? error.message : 'Failed to load data',
                isLoading: false
            });
        }
    },

    // Add new expense
    addExpense: async (expense) => {
        set({ isLoading: true, error: null });

        try {
            const newExpense = await expenseApi.createExpense(expense);

            // Optimistically update local state
            set(state => ({
                expenses: [newExpense, ...state.expenses],
                isLoading: false
            }));

            // Refresh budgets to get updated spent amount
            const budgets = await expenseApi.fetchBudgets();
            set({ budgets });
        } catch (error) {
            console.error('Error adding expense:', error);
            set({
                error: error instanceof Error ? error.message : 'Failed to add expense',
                isLoading: false
            });
            throw error;
        }
    },

    // Update expense
    updateExpense: async (id, updates) => {
        set({ isLoading: true, error: null });

        try {
            const updatedExpense = await expenseApi.updateExpense(id, updates);

            set(state => ({
                expenses: state.expenses.map(ex =>
                    ex.id === id ? updatedExpense : ex
                ),
                isLoading: false
            }));
        } catch (error) {
            console.error('Error updating expense:', error);
            set({
                error: error instanceof Error ? error.message : 'Failed to update expense',
                isLoading: false
            });
            throw error;
        }
    },

    // Delete expense
    deleteExpense: async (id) => {
        set({ isLoading: true, error: null });

        try {
            await expenseApi.deleteExpense(id);

            set(state => ({
                expenses: state.expenses.filter(ex => ex.id !== id),
                isLoading: false
            }));

            // Refresh budgets to get updated spent amount
            const budgets = await expenseApi.fetchBudgets();
            set({ budgets });
        } catch (error) {
            console.error('Error deleting expense:', error);
            set({
                error: error instanceof Error ? error.message : 'Failed to delete expense',
                isLoading: false
            });
            throw error;
        }
    },

    // Set budget limit
    setBudget: async (category, limit) => {
        set({ isLoading: true, error: null });

        try {
            const updatedBudget = await expenseApi.setBudgetLimit(category, limit);

            set(state => ({
                budgets: state.budgets.map(b =>
                    b.category === category ? updatedBudget : b
                ),
                isLoading: false
            }));
        } catch (error) {
            console.error('Error setting budget:', error);
            set({
                error: error instanceof Error ? error.message : 'Failed to set budget',
                isLoading: false
            });
            throw error;
        }
    },

    // Mark all notifications as read
    markAllRead: async () => {
        try {
            await expenseApi.markAllNotificationsAsRead();

            set(state => ({
                notifications: state.notifications.map(n => ({ ...n, read: true }))
            }));
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    },

    // Clear all notifications
    clearNotifications: async () => {
        try {
            await expenseApi.clearAllNotifications();
            set({ notifications: [] });
        } catch (error) {
            console.error('Error clearing notifications:', error);
        }
    },

    // Computed: Get total spent
    getTotalSpent: () => {
        return get().expenses.reduce((total, ex) => total + ex.amount, 0);
    },

    // Computed: Get budget progress percentage
    getBudgetProgress: (category) => {
        const budget = get().budgets.find(b => b.category === category);
        if (!budget || budget.budget_limit === 0) return 0;
        return (budget.spent / budget.budget_limit) * 100;
    }
}));
