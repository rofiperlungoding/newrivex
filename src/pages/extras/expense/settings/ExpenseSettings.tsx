import { useState } from 'react';
import { useExpenseStore, type ExpenseCategory } from '../store/expenseStore';
import { FloppyDisk, ArrowCounterClockwise, DownloadSimple, User, Shield, CurrencyDollar } from '@phosphor-icons/react';
import { useSupabaseAuth } from '../../../../hooks/useSupabaseAuth';
import { useEffect } from 'react';

export default function ExpenseSettings() {
    const { budgets, setBudget, expenses } = useExpenseStore();
    const { user, updateProfile } = useSupabaseAuth();
    const [localBudgets, setLocalBudgets] = useState(budgets);
    const [isSaving, setIsSaving] = useState(false);
    const [fullName, setFullName] = useState('');
    const [isSavingProfile, setIsSavingProfile] = useState(false);

    useEffect(() => {
        if (user?.user_metadata?.full_name) {
            setFullName(user.user_metadata.full_name);
        }
    }, [user]);

    const handleUpdateProfile = async () => {
        if (!user) return;
        setIsSavingProfile(true);
        try {
            await updateProfile({ data: { full_name: fullName } });
            // Show success feedback?
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsSavingProfile(false);
        }
    };

    const handleBudgetChange = (category: ExpenseCategory, value: string) => {
        const numValue = parseInt(value.replace(/\D/g, ''), 10) || 0;
        setLocalBudgets(prev => prev.map(b =>
            b.category === category ? { ...b, budget_limit: numValue } : b
        ));
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all budgets to 0?')) {
            setLocalBudgets(prev => prev.map(b => ({ ...b, budget_limit: 0 })));
        }
    };

    const saveBudgets = async () => {
        setIsSaving(true);
        try {
            for (const b of localBudgets) {
                await setBudget(b.category, b.budget_limit);
            }
        } catch (error) {
            console.error('Error saving budgets:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleExport = () => {
        const headers = ['Date', 'Merchant', 'Category', 'Amount', 'Status', 'Description'];
        const csvContent = [
            headers.join(','),
            ...expenses.map(e => [
                new Date(e.date).toISOString().split('T')[0],
                `"${e.merchant}"`,
                e.category,
                e.amount,
                e.status,
                `"${e.description || ''}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `expenses_export_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-secondary mt-1">Manage your preferences, budgets, and data.</p>
            </div>

            {/* Budget Settings */}
            <section className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <CurrencyDollar size={24} className="text-mint" />
                            Budget Limits
                        </h2>
                        <p className="text-sm text-secondary mt-1">Set monthly spending limits for each category.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleReset}
                            disabled={isSaving}
                            className="px-4 py-2.5 bg-white/5 text-white rounded-xl font-bold hover:bg-white/10 transition-all border border-white/10 disabled:opacity-50"
                        >
                            Reset to 0
                        </button>
                        <button
                            onClick={saveBudgets}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-2.5 bg-mint text-black rounded-xl font-bold hover:bg-mint/90 transition-all shadow-lg shadow-mint/20 disabled:opacity-50 disabled:shadow-none"
                        >
                            {isSaving ? <ArrowCounterClockwise className="animate-spin" size={20} /> : <FloppyDisk size={20} weight="bold" />}
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {localBudgets.map((budget) => (
                        <div key={budget.category} className="group">
                            <label className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2 block group-focus-within:text-mint transition-colors">
                                {budget.category}
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary font-medium group-focus-within:text-white transition-colors">Rp</span>
                                <input
                                    type="text"
                                    value={new Intl.NumberFormat('id-ID').format(budget.budget_limit)}
                                    onChange={(e) => handleBudgetChange(budget.category, e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-mint/50 focus:bg-black/40 transition-all font-mono text-lg font-medium"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Data Management */}
            <section className="bg-[#111111] border border-white/5 rounded-2xl p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Shield size={24} className="text-blue-500" />
                    Data Management
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white/[0.02] rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
                                <DownloadSimple size={24} weight="fill" />
                            </div>
                            <button
                                onClick={handleExport}
                                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors"
                            >
                                Download CSV
                            </button>
                        </div>
                        <h3 className="font-bold text-lg">Export Data</h3>
                        <p className="text-sm text-secondary mt-1">Download a complete record of all your expenses in CSV format for external analysis or backup.</p>
                    </div>
                </div>
            </section>

            {/* Profile Settings */}
            <section className="bg-[#111111] border border-white/5 rounded-2xl p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <User size={24} className="text-orange-500" />
                    Profile Settings
                </h2>
                <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-mint/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || user?.email || 'User')}&background=6EE7B7&color=000`}
                            alt="Profile"
                            className="h-24 w-24 rounded-full relative z-10 border-4 border-[#111111]"
                        />
                    </div>

                    <div className="flex-1 w-full space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Full Name</label>
                            <div className="flex gap-3">
                                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white">
                                    <User size={20} className="text-secondary" />
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Enter your full name"
                                        className="bg-transparent border-none focus:outline-none w-full font-medium"
                                    />
                                </div>
                                <button
                                    onClick={handleUpdateProfile}
                                    disabled={isSavingProfile}
                                    className="px-6 py-2.5 bg-white/5 text-white rounded-xl font-bold hover:bg-white/10 transition-all border border-white/10 disabled:opacity-50"
                                >
                                    {isSavingProfile ? 'Saving...' : 'Update'}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Email Address</label>
                            <div className="flex items-center gap-3 px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-secondary opacity-75 cursor-not-allowed">
                                <Shield size={20} />
                                <span className="font-medium">{user?.email}</span>
                            </div>
                            <p className="text-[10px] text-secondary mt-1">Email address cannot be changed.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
