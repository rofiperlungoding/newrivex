import { useExpenseStore } from '../store/expenseStore';
import { Wallet, TrendUp, TrendDown, CreditCard, CaretRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

export default function ExpenseDashboard() {
    const { expenses, budgets, getTotalSpent } = useExpenseStore();

    // Calculate daily spending for the last 30 days
    const trendData = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        const dateString = date.toISOString().split('T')[0];

        const dailyTotal = expenses
            .filter(e => e.date.startsWith(dateString))
            .reduce((sum, e) => sum + e.amount, 0);

        return {
            name: date.getDate().toString(),
            amount: dailyTotal,
            date: dateString
        };
    });

    const totalSpent = getTotalSpent();
    const totalBudget = budgets.reduce((acc, curr) => acc + curr.budget_limit, 0);
    const budgetRemaining = totalBudget - totalSpent;
    const percentageUsed = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

    const recentExpenses = expenses.slice(0, 5);

    // Calculate Month-over-Month Growth
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const prevDate = new Date();
    prevDate.setMonth(currentMonth - 1);
    const prevMonth = prevDate.getMonth();
    const prevYear = prevDate.getFullYear();

    const currentMonthSpent = expenses
        .filter(e => {
            const d = new Date(e.date);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        })
        .reduce((sum, e) => sum + e.amount, 0);

    const prevMonthSpent = expenses
        .filter(e => {
            const d = new Date(e.date);
            return d.getMonth() === prevMonth && d.getFullYear() === prevYear;
        })
        .reduce((sum, e) => sum + e.amount, 0);

    const spendingGrowth = prevMonthSpent === 0
        ? currentMonthSpent > 0 ? 100 : 0
        : ((currentMonthSpent - prevMonthSpent) / prevMonthSpent) * 100;

    const stats = [
        {
            label: 'Total Spent',
            value: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalSpent),
            icon: Wallet,
            color: 'text-mint',
            bg: 'bg-mint/10',
            trend: `${spendingGrowth > 0 ? '+' : ''}${spendingGrowth.toFixed(1)}%`,
            trendUp: spendingGrowth > 0,
            trendLabel: 'vs last month'
        },
        {
            label: 'Budget Remaining',
            value: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(budgetRemaining),
            icon: CreditCard,
            color: 'text-blue-400',
            bg: 'bg-blue-400/10',
            trend: null, // Hide trend for now as it's less relevant
            trendUp: false
        },
        {
            label: 'Budget Usage',
            value: `${percentageUsed.toFixed(1)}%`,
            icon: TrendUp,
            color: 'text-orange-400',
            bg: 'bg-orange-400/10',
            trend: null, // Hide trend for now
            trendUp: true
        }
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-secondary mt-1">Welcome back, Admin. Here's what's happening with your expenses.</p>
            </div>

            {/* Spending Overview Mini Chart */}
            <div className="h-48 w-full bg-[#111111] border border-white/5 rounded-2xl overflow-hidden relative flex flex-col justify-end">
                <div className="absolute top-6 left-6 z-10">
                    <p className="text-sm text-secondary font-medium mb-1">Spending Trend (Last 30 Days)</p>
                    <h2 className="text-2xl font-bold">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalSpent)}
                    </h2>
                </div>

                <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6EE7B7" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6EE7B7" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1C1C1C', borderColor: '#333', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                                itemStyle={{ color: '#fff', fontWeight: 600 }}
                                formatter={(value: number) => [new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value), 'Spent']}
                                labelStyle={{ color: '#999', marginBottom: '4px' }}
                                cursor={{ stroke: '#6EE7B7', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="amount"
                                stroke="#6EE7B7"
                                strokeWidth={3}
                                fill="url(#colorTrend)"
                                animationDuration={1500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#111111] border border-white/5 p-6 rounded-2xl"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} weight="fill" />
                            </div>
                            {stat.trend && (
                                <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${stat.trendUp ? 'text-mint bg-mint/10' : 'text-red-500 bg-red-500/10'
                                    }`}>
                                    {stat.trendUp ? <TrendUp weight="bold" /> : <TrendDown weight="bold" />}
                                    {stat.trend}
                                </span>
                            )}
                        </div>
                        <p className="text-secondary text-sm font-medium">{stat.label}</p>
                        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Transactions */}
                <div className="lg:col-span-2 bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <h3 className="font-bold text-lg">Recent Transactions</h3>
                        <Link to="/extras/expense-tracker/expenses" className="text-sm text-mint hover:underline flex items-center gap-1">
                            View All <CaretRight />
                        </Link>
                    </div>
                    <div className="divide-y divide-white/5">
                        {recentExpenses.map((expense) => (
                            <div key={expense.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-xl">
                                        {expense.category === 'Food' && '🍔'}
                                        {expense.category === 'Travel' && '✈️'}
                                        {expense.category === 'Software' && '💻'}
                                        {expense.category === 'Equipment' && '🖥️'}
                                        {expense.category === 'Office' && '🏢'}
                                        {expense.category === 'Marketing' && '📢'}
                                        {expense.category === 'Other' && '📦'}
                                    </div>
                                    <div>
                                        <p className="font-medium">{expense.merchant}</p>
                                        <p className="text-xs text-secondary">{new Date(expense.date).toLocaleDateString()} • {expense.category}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: expense.currency }).format(expense.amount)}
                                    </p>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${expense.status === 'Approved' ? 'bg-green-500/10 text-green-500' :
                                        expense.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                            expense.status === 'Paid' ? 'bg-blue-500/10 text-blue-500' :
                                                'bg-red-500/10 text-red-500'
                                        }`}>
                                        {expense.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Budget Overview */}
                <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-6">Budget Status</h3>
                    <div className="space-y-6">
                        {budgets.slice(0, 5).map((budget) => {
                            const progress = budget.budget_limit > 0 ? (budget.spent / budget.budget_limit) * 100 : 0;
                            const isOverBudget = progress > 100;

                            return (
                                <div key={budget.category}>
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="font-medium">{budget.category}</span>
                                        <span className="text-secondary">
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(budget.spent)} / {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(budget.budget_limit)}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(progress, 100)}%` }}
                                            className={`h-full rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-mint'}`}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
