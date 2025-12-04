import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Flask, CheckSquare, LockKey, SignIn, UserPlus, GameController, CloudSun, Receipt } from '@phosphor-icons/react';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';

const experiments = [
    {
        id: 1,
        name: "Enterprise Task Manager",
        description: "A robust, real-time to-do application with priority management, due dates, and strict data isolation.",
        icon: <CheckSquare size={32} weight="duotone" className="text-mint" />,
        status: "Live Demo",
        color: "from-mint/20 to-blue-500/20",
        locked: true,
        link: "/extras/todo"
    },
    {
        id: 2,
        name: "Global Weather",
        description: "Real-time weather updates and 5-day forecast for any city in the world. Powered by WeatherAPI.com.",
        icon: <CloudSun size={32} weight="duotone" className="text-blue-400" />,
        status: "New",
        color: "from-blue-400/20 to-purple-500/20",
        locked: false,
        link: "/extras/weather"
    },
    {
        id: 3,
        name: "Expense Tracker",
        description: "Enterprise-grade expense management with budget tracking, analytics, and detailed reporting.",
        icon: <Receipt size={32} weight="duotone" className="text-orange-400" />,
        status: "Enterprise",
        color: "from-orange-400/20 to-red-500/20",
        locked: false,
        link: "/extras/expense-tracker"
    }
];

const Extras = () => {
    const { user } = useSupabaseAuth();

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 mb-6"
                >
                    <div className="p-3 rounded-2xl bg-accent/10 text-accent">
                        <Flask size={32} weight="fill" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold">
                        Extras
                    </h1>
                </motion.div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-secondary max-w-2xl"
                    >
                        Welcome to my digital playground. This is where I keep my weird experiments,
                        unfinished prototypes, and fun little toys. Feel free to break things.
                    </motion.p>

                    {!user && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex gap-4"
                        >
                            <Link to="/login">
                                <Button variant="outline" className="gap-2">
                                    <SignIn size={18} />
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="mint" className="gap-2">
                                    <UserPlus size={18} />
                                    Register
                                </Button>
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiments.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className="relative p-8 h-full flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-secondary">
                                    {item.status}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-white transition-colors">
                                {item.name}
                            </h3>

                            <p className="text-secondary leading-relaxed mb-6 flex-grow">
                                {item.description}
                            </p>

                            {item.locked && !user ? (
                                <Link to="/login" className="w-full">
                                    <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-secondary hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center gap-2">
                                        <LockKey size={18} weight="fill" />
                                        Login to Access
                                    </button>
                                </Link>
                            ) : (
                                <Link to={item.link} className="w-full">
                                    <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors flex items-center justify-center gap-2 group-hover:bg-white group-hover:text-black">
                                        Launch App
                                        <GameController size={18} weight="fill" />
                                    </button>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Extras;
