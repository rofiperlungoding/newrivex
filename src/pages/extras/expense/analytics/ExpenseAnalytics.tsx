import { useExpenseStore } from '../store/expenseStore';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    Legend
} from 'recharts';
import { ArrowDown, ArrowUp, CurrencyDollar } from '@phosphor-icons/react';

export default function ExpenseAnalytics() {
    const { budgets, expenses, getTotalSpent } = useExpenseStore();

    // --- Data Preparation ---

    // 1. Monthly Spending Trend (Last 6 Months)
    const trendData = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (5 - i));
        const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' }); // e.g., "Dec 2025"
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        const monthlyTotal = expenses
            .filter(e => {
                const expenseDate = new Date(e.date);
                return expenseDate.getMonth() === monthIndex && expenseDate.getFullYear() === year;
            })
            .reduce((sum, e) => sum + e.amount, 0);

        return {
            name: date.toLocaleString('default', { month: 'short' }), // e.g., "Dec"
            amount: monthlyTotal,
            fullName: monthYear
        };
    });

    // 2. Category Breakdown
    const categoryData = budgets.map(b => ({
        name: b.category,
        value: b.spent
    })).filter(d => d.value > 0);

    const COLORS = ['#6EE7B7', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#10B981'];

    // 3. Budget vs Actual
    const budgetComparisonData = budgets.map(b => ({
        name: b.category,
        Budget: b.budget_limit,
        Actual: b.spent
    }));

    // --- Insights ---
    const totalSpent = getTotalSpent();
    const totalBudget = budgets.reduce((acc, curr) => acc + curr.budget_limit, 0);
    const budgetUsage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

    const highestCategory = categoryData.sort((a, b) => b.value - a.value)[0];
    const highestCategoryPercentage = totalSpent > 0 && highestCategory ? (highestCategory.value / totalSpent) * 100 : 0;

    // Calculate Month-over-Month Growth
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentMonthName = currentDate.toLocaleString('default', { month: 'short' });

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

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Analytics</h1>
                <p className="text-secondary mt-1">Deep dive into your spending trends and budget performance.</p>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Spent Card */}
                <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-mint/20 transition-colors">
                    <div className="absolute top-0 right-0 p-32 bg-mint/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="p-3 bg-mint/10 text-mint rounded-xl">
                            <CurrencyDollar size={24} weight="fill" />
                        </div>
                        <div>
                            <p className="text-sm text-secondary">Total Spent ({currentMonthName})</p>
                            <h3 className="text-2xl font-bold">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalSpent)}
                            </h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm relative z-10">
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${spendingGrowth > 0 ? 'text-red-500 bg-red-500/10' : 'text-mint bg-mint/10'}`}>
                            {spendingGrowth > 0 ? <ArrowUp size={12} weight="bold" /> : <ArrowDown size={12} weight="bold" />} {Math.abs(spendingGrowth).toFixed(1)}%
                        </span>
                        <span className="text-secondary">vs last month</span>
                    </div>
                </div>

                {/* Top Category Card */}
                <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-blue-500/20 transition-colors">
                    <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
                            <ArrowUp size={24} weight="fill" />
                        </div>
                        <div>
                            <p className="text-sm text-secondary">Top Category</p>
                            <h3 className="text-xl font-bold truncate max-w-[150px]">{highestCategory ? highestCategory.name : 'N/A'}</h3>
                        </div>
                    </div>
                    <p className="text-sm text-secondary relative z-10">
                        {highestCategory ? (
                            <>
                                <span className="text-white font-medium">{highestCategoryPercentage.toFixed(1)}%</span> of total spend
                            </>
                        ) : (
                            'No data available of total spend'
                        )}
                    </p>
                </div>

                {/* Budget Status Card */}
                <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-orange-500/20 transition-colors">
                    <div className="absolute top-0 right-0 p-32 bg-orange-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl">
                            <ArrowDown size={24} weight="fill" />
                        </div>
                        <div>
                            <p className="text-sm text-secondary">Budget Status</p>
                            <h3 className="text-xl font-bold">{budgetUsage > 100 ? 'Over Budget' : 'On Track'}</h3>
                        </div>
                    </div>
                    <p className="text-sm text-secondary relative z-10">You have spent <span className={`font-medium ${budgetUsage > 100 ? 'text-red-500' : 'text-white'}`}>{budgetUsage.toFixed(1)}%</span> of your total budget.</p>
                </div>
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Spending Trend */}
                <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-6">Spending Trend (6 Months)</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6EE7B7" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6EE7B7" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#666"
                                    tick={{ fill: '#888', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#666"
                                    tick={{ fill: '#888', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(value) => `${value / 1000000}M`}
                                />
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
                                    fillOpacity={1}
                                    fill="url(#colorAmount)"
                                    strokeWidth={3}
                                    activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-6">Expense Distribution</h3>
                    <div className="h-[300px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {categoryData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1C1C1C', borderColor: '#333', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                                    itemStyle={{ color: '#fff', fontWeight: 600 }}
                                    formatter={(value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    formatter={(value) => <span className="text-secondary text-sm ml-1">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Budget vs Actual Bar Chart */}
            <div className="bg-[#111111] border border-white/5 p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-6">Budget vs Actual Spending</h3>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={budgetComparisonData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }} barSize={40}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#666"
                                tick={{ fill: '#888', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                                dy={10}
                            />
                            <YAxis
                                stroke="#666"
                                tick={{ fill: '#888', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(value) => `${value / 1000000}M`}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)', radius: 4 }}
                                contentStyle={{ backgroundColor: '#1C1C1C', borderColor: '#333', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                                itemStyle={{ color: '#fff', fontWeight: 600 }}
                                formatter={(value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)}
                            />
                            <Legend
                                verticalAlign="top"
                                align="right"
                                iconType="circle"
                                wrapperStyle={{ paddingBottom: '20px' }}
                            />
                            <Bar dataKey="Budget" fill="#333" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Actual" fill="#6EE7B7" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
