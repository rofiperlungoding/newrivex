import { useState, useRef, useEffect } from 'react';
import { useExpenseStore } from '../store/expenseStore';
import { Check, Trash } from '@phosphor-icons/react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    Layout,
    Receipt,
    ChartPieSlice,
    Gear,
    Bell,
    MagnifyingGlass,
    Plus,
    CaretLeft,
    SignOut
} from '@phosphor-icons/react';
import { cn } from '../../../../lib/utils';
import { motion } from 'framer-motion';
import { useSupabaseAuth } from '../../../../hooks/useSupabaseAuth';

export default function ExpenseLayout() {
    const [isSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, signOut } = useSupabaseAuth();
    const { notifications, markAllRead, clearNotifications, fetchAll, isInitialized, reset } = useExpenseStore();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    // Fetch all data on mount
    useEffect(() => {
        if (!isInitialized) {
            fetchAll();
        }
    }, [isInitialized, fetchAll]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        { path: '/extras/expense-tracker/dashboard', icon: Layout, label: 'Dashboard' },
        { path: '/extras/expense-tracker/expenses', icon: Receipt, label: 'Expenses' },
        { path: '/extras/expense-tracker/analytics', icon: ChartPieSlice, label: 'Analytics' },
        { path: '/extras/expense-tracker/settings', icon: Gear, label: 'Settings' },
    ];

    const getPageTitle = () => {
        const path = location.pathname;
        if (path.includes('dashboard')) return 'Dashboard';
        if (path.includes('expenses')) return 'All Expenses';
        if (path.includes('analytics')) return 'Analytics & Reports';
        if (path.includes('settings')) return 'Settings';
        return 'Expense Tracker';
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-mint/30 selection:text-white flex">

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className="h-screen border-r border-white/5 bg-[#111111] flex flex-col sticky top-0 z-20"
            >
                {/* Logo Area */}
                <div className="h-20 flex items-center px-6 border-b border-white/5 shrink-0">
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-mint to-blue-500 flex items-center justify-center shrink-0">
                        <span className="font-bold text-black text-lg">E</span>
                    </div>
                    {isSidebarOpen && (
                        <div className="ml-3">
                            <h1 className="font-bold text-lg leading-none">Expense<span className="text-mint">Flow</span></h1>
                            <p className="text-[10px] text-secondary uppercase tracking-wider mt-0.5">Enterprise Edition</p>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-hide">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "bg-mint text-black font-semibold shadow-lg shadow-mint/20"
                                    : "text-secondary hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon size={22} weight={location.pathname.includes(item.path) ? "fill" : "regular"} className="shrink-0" />
                            {isSidebarOpen && (
                                <span className="whitespace-nowrap">{item.label}</span>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-white/5 shrink-0">
                    <div className={cn(
                        "flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5",
                        !isSidebarOpen && "justify-center p-0 h-10 w-10 rounded-full"
                    )}>
                        <img
                            src="https://ui-avatars.com/api/?name=Admin+User&background=6EE7B7&color=000"
                            alt="User"
                            className="h-8 w-8 rounded-full"
                        />
                        {isSidebarOpen && (
                            <div className="overflow-hidden flex-1">
                                <p className="text-sm font-medium truncate">{user?.email?.split('@')[0] || 'User'}</p>
                                <p className="text-xs text-secondary truncate">{user?.email || 'No Email'}</p>
                            </div>
                        )}
                        {isSidebarOpen && (
                            <button
                                onClick={async () => {
                                    await signOut();
                                    reset();
                                }}
                                className="p-2 hover:bg-white/10 rounded-lg text-secondary hover:text-red-500 transition-colors"
                                title="Sign Out"
                            >
                                <SignOut size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen relative">
                {/* Top Header */}
                <header className="h-20 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <NavLink to="/extras" className="p-2 rounded-lg hover:bg-white/5 text-secondary hover:text-white transition-colors">
                            <CaretLeft size={20} />
                        </NavLink>
                        <h2 className="text-xl font-semibold">{getPageTitle()}</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                            <input
                                type="text"
                                placeholder="Search expenses..."
                                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-mint/50 focus:bg-white/10 transition-all w-64"
                            />
                        </div>

                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="relative p-2 rounded-full hover:bg-white/5 text-secondary hover:text-white transition-colors"
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border border-[#0A0A0A]"></span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {isNotificationsOpen && (
                                <div className="absolute right-0 top-full mt-2 w-80 bg-[#111111] border border-white/5 rounded-xl shadow-xl z-50 overflow-hidden">
                                    <div className="p-4 border-b border-white/5 flex items-center justify-between">
                                        <h3 className="font-bold text-sm">Notifications</h3>
                                        <div className="flex gap-2">
                                            <button onClick={markAllRead} className="p-1 hover:bg-white/5 rounded text-secondary hover:text-white" title="Mark all as read">
                                                <Check size={16} />
                                            </button>
                                            <button onClick={clearNotifications} className="p-1 hover:bg-white/5 rounded text-secondary hover:text-red-500" title="Clear all">
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="p-8 text-center text-secondary text-xs">
                                                No notifications
                                            </div>
                                        ) : (
                                            notifications.map(notification => (
                                                <div key={notification.id} className={`p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${!notification.read ? 'bg-white/[0.02]' : ''}`}>
                                                    <div className="flex items-start gap-3">
                                                        <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${notification.type === 'warning' ? 'bg-orange-500' :
                                                            notification.type === 'success' ? 'bg-green-500' :
                                                                notification.type === 'error' ? 'bg-red-500' :
                                                                    'bg-blue-500'
                                                            }`} />
                                                        <div>
                                                            <p className={`text-sm ${!notification.read ? 'font-semibold text-white' : 'text-secondary'}`}>{notification.title}</p>
                                                            <p className="text-xs text-secondary mt-0.5">{notification.message}</p>
                                                            <p className="text-[10px] text-secondary/50 mt-2">{new Date(notification.date).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => navigate('/extras/expense-tracker/expenses')}
                            className="flex items-center gap-2 bg-mint text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-mint/90 transition-colors shadow-lg shadow-mint/20"
                        >
                            <Plus size={16} weight="bold" />
                            <span>New Expense</span>
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
