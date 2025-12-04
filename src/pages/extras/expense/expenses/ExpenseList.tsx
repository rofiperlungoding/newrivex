import { useState } from 'react';
import { useExpenseStore, type ExpenseCategory } from '../store/expenseStore';
import { MagnifyingGlass, Funnel, DownloadSimple, Plus, Trash, PencilSimple, Check, X } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExpenseList() {
  const { expenses, deleteExpense, addExpense } = useExpenseStore();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ExpenseCategory | 'All'>('All');
  const [selectedExpenses, setSelectedExpenses] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    merchant: '',
    amount: '',
    category: 'Other' as ExpenseCategory,
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.merchant.toLowerCase().includes(search.toLowerCase()) ||
      (expense.description || '').toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || expense.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleSelectAll = () => {
    if (selectedExpenses.length === filteredExpenses.length) {
      setSelectedExpenses([]);
    } else {
      setSelectedExpenses(filteredExpenses.map(e => e.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedExpenses.includes(id)) {
      setSelectedExpenses(selectedExpenses.filter(e => e !== id));
    } else {
      setSelectedExpenses([...selectedExpenses, id]);
    }
  };

  const categories: (ExpenseCategory | 'All')[] = ['All', 'Travel', 'Food', 'Office', 'Software', 'Marketing', 'Equipment', 'Other'];
  const expenseCategories: ExpenseCategory[] = ['Travel', 'Food', 'Office', 'Software', 'Marketing', 'Equipment', 'Other'];

  const handleExport = () => {
    const headers = ['Date', 'Merchant', 'Category', 'Amount', 'Currency', 'Status', 'Description'];
    const csvContent = [
      headers.join(','),
      ...expenses.map(e => [
        new Date(e.date).toISOString().split('T')[0],
        `"${e.merchant}"`,
        e.category,
        e.amount,
        e.currency,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.merchant || !formData.amount) return;

    setIsSubmitting(true);
    try {
      await addExpense({
        merchant: formData.merchant,
        amount: parseFloat(formData.amount.replace(/\D/g, '')) || 0,
        category: formData.category,
        description: formData.description,
        date: formData.date
      });
      setIsModalOpen(false);
      setFormData({
        merchant: '',
        amount: '',
        category: 'Other',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error adding expense:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 flex flex-col">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold">All Expenses</h1>
          <p className="text-secondary mt-1">Manage and track all your organization's expenses.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium"
          >
            <DownloadSimple size={18} />
            Export
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-mint text-black hover:bg-mint/90 transition-colors text-sm font-bold shadow-lg shadow-mint/20"
          >
            <Plus size={18} weight="bold" />
            Add Expense
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-[#111111] border border-white/5 p-4 rounded-2xl shrink-0">
        <div className="relative flex-1">
          <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search by merchant or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-mint/50 focus:bg-black/40 transition-all placeholder:text-secondary/50"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <Funnel size={18} className="text-secondary shrink-0 mr-2" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${categoryFilter === cat
                ? 'bg-mint text-black border-mint shadow-lg shadow-mint/20'
                : 'bg-white/5 border-transparent text-secondary hover:bg-white/10 hover:text-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl">
        <div className="">
          <table className="w-full text-left text-sm relative border-collapse">
            <thead className="bg-[#111111] text-secondary font-semibold uppercase text-[11px] tracking-wider sticky top-0 z-10 shadow-sm shadow-black/50">
              <tr>
                <th className="p-4 w-14 bg-[#111111] border-b border-white/5 rounded-tl-2xl">
                  <div className="flex items-center justify-center">
                    <div
                      onClick={toggleSelectAll}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer ${selectedExpenses.length === filteredExpenses.length && filteredExpenses.length > 0
                        ? 'bg-mint border-mint text-black shadow-[0_0_10px_rgba(110,231,183,0.3)]'
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                        }`}
                    >
                      {selectedExpenses.length === filteredExpenses.length && filteredExpenses.length > 0 && (
                        <Check size={12} weight="bold" />
                      )}
                    </div>
                  </div>
                </th>
                <th className="p-4 bg-[#111111] border-b border-white/5">Date</th>
                <th className="p-4 bg-[#111111] border-b border-white/5">Merchant</th>
                <th className="p-4 bg-[#111111] border-b border-white/5">Category</th>
                <th className="p-4 bg-[#111111] border-b border-white/5">Description</th>
                <th className="p-4 text-right bg-[#111111] border-b border-white/5">Amount</th>
                <th className="p-4 text-center bg-[#111111] border-b border-white/5">Status</th>
                <th className="p-4 text-right bg-[#111111] border-b border-white/5 rounded-tr-2xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredExpenses.map((expense) => (
                  <motion.tr
                    key={expense.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`group hover:bg-white/[0.02] transition-colors ${selectedExpenses.includes(expense.id) ? 'bg-mint/[0.03]' : ''}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center justify-center">
                        <div
                          onClick={() => toggleSelect(expense.id)}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer ${selectedExpenses.includes(expense.id)
                            ? 'bg-mint border-mint text-black shadow-[0_0_10px_rgba(110,231,183,0.3)]'
                            : 'border-white/20 bg-white/5 hover:border-white/40 group-hover:border-white/30'
                            }`}
                        >
                          {selectedExpenses.includes(expense.id) && (
                            <Check size={12} weight="bold" />
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-secondary whitespace-nowrap font-mono text-xs">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-medium text-white">
                      {expense.merchant}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-secondary">
                        {expense.category}
                      </span>
                    </td>
                    <td className="p-4 text-secondary max-w-xs truncate text-xs">
                      {expense.description}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      {(() => {
                        const parts = new Intl.NumberFormat('id-ID', { style: 'currency', currency: expense.currency }).formatToParts(expense.amount);
                        return (
                          <>
                            <span className="text-secondary text-xs font-medium mr-1 align-top relative top-0.5">
                              {parts.find(p => p.type === 'currency')?.value}
                            </span>
                            <span className="text-white font-bold tabular-nums tracking-tight text-sm">
                              {parts.filter(p => p.type !== 'currency').map(p => p.value).join('')}
                            </span>
                          </>
                        );
                      })()}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${expense.status === 'Approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                        expense.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                          expense.status === 'Paid' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                            'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${expense.status === 'Approved' ? 'bg-green-500' :
                          expense.status === 'Pending' ? 'bg-yellow-500' :
                            expense.status === 'Paid' ? 'bg-blue-500' :
                              'bg-red-500'
                          }`}></span>
                        {expense.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg hover:bg-white/10 text-secondary hover:text-white transition-colors">
                          <PencilSimple size={16} />
                        </button>
                        <button
                          onClick={() => deleteExpense(expense.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-secondary hover:text-red-500 transition-colors"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {filteredExpenses.length === 0 && (
            <div className="p-12 text-center text-secondary">
              <p>No expenses found matching your filters.</p>
            </div>
          )}
        </div>

        {/* Pagination (Mock) */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-secondary bg-[#111111] rounded-b-2xl">
          <span>Showing {filteredExpenses.length} of {expenses.length} results</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-50 transition-colors" disabled>Previous</button>
            <button className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-50 transition-colors" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-xl font-bold">Add New Expense</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg text-secondary hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2 block">
                      Merchant / Vendor *
                    </label>
                    <input
                      type="text"
                      value={formData.merchant}
                      onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                      placeholder="e.g. Starbucks, Grab, etc."
                      required
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-mint/50 focus:bg-black/40 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2 block">
                      Amount (IDR) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary font-medium">Rp</span>
                      <input
                        type="text"
                        value={formData.amount}
                        onChange={(e) => {
                          const numValue = e.target.value.replace(/\D/g, '');
                          setFormData({ ...formData, amount: numValue ? new Intl.NumberFormat('id-ID').format(parseInt(numValue)) : '' });
                        }}
                        placeholder="0"
                        required
                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-mint/50 focus:bg-black/40 transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2 block">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-mint/50 focus:bg-black/40 transition-all"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2 block">
                      Category
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {expenseCategories.map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: cat })}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${formData.category === cat
                            ? 'bg-mint text-black border-mint'
                            : 'bg-white/5 border-white/10 text-secondary hover:bg-white/10 hover:text-white'
                            }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2 block">
                      Description (Optional)
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Add notes or description..."
                      rows={3}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-mint/50 focus:bg-black/40 transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 font-semibold hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.merchant || !formData.amount}
                    className="flex-1 px-4 py-3 rounded-xl bg-mint text-black font-bold hover:bg-mint/90 transition-colors shadow-lg shadow-mint/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus size={18} weight="bold" />
                        Add Expense
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
