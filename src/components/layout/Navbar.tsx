import { useState } from 'react';
import { List, X, SignOut, User as UserIcon } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';
import { useExpenseStore } from '../../pages/extras/expense/store/expenseStore';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); // Add this
    const { user, signOut } = useSupabaseAuth();
    const resetExpenseStore = useExpenseStore(state => state.reset);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'News', href: '/news' },
        { name: 'Projects', href: '/projects' },
        { name: 'Services', href: '/services' },
        { name: 'Extras', href: '/extras' },
    ];

    const isActive = (path: string) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <div className="glass rounded-full px-6 py-3 flex items-center justify-between gap-8 md:gap-12 shadow-apple border border-white/10">
                <Link to="/" className="text-xl font-bold tracking-tight text-primary">
                    rivex.
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`text-sm font-medium transition-colors ${isActive(link.href)
                                ? 'text-primary font-semibold'
                                : 'text-secondary hover:text-primary'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {user ? (
                    <div className="hidden md:flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                            <UserIcon size={16} />
                            <span className="text-xs text-secondary max-w-[150px] truncate">{user.email}</span>
                        </div>
                        <button
                            onClick={async () => {
                                await signOut();
                                resetExpenseStore();
                                navigate('/extras');
                            }}
                            className="bg-white/10 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-colors flex items-center gap-2"
                        >
                            <SignOut size={16} />
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <Link to="/contact">
                        <button className="hidden md:block bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                            Let's Talk
                        </button>
                    </Link>
                )}

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-primary focus:outline-none"
                    >
                        {isOpen ? <X size={24} /> : <List size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="absolute top-20 left-4 right-4 bg-surface rounded-3xl p-6 shadow-2xl border border-white/10 md:hidden"
                    >
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={`text-lg font-medium ${isActive(link.href) ? 'text-primary' : 'text-secondary'
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link to="/contact" onClick={() => setIsOpen(false)}>
                                <button className="bg-white text-black w-full py-3 rounded-xl font-medium">
                                    Let's Talk
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
