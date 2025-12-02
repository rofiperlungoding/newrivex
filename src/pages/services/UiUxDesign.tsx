import { motion } from 'framer-motion';
import { PenNib, Layout, Users, ArrowRight, Diamond } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const UiUxDesign = () => {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="mb-24 pt-10 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-6 border border-purple-500/20"
                >
                    <PenNib size={16} weight="bold" />
                    UI/UX Design
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
                >
                    Design that <br /> <span className="text-purple-400">inspires action.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-secondary mb-10 leading-relaxed"
                >
                    We create intuitive, engaging, and beautiful digital experiences.
                    Our design process focuses on user needs while achieving your business objectives.
                </motion.p>
            </div>

            {/* Process Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                {[
                    {
                        icon: <Users size={32} />,
                        title: "User Research",
                        desc: "Understanding your audience through interviews, surveys, and data analysis."
                    },
                    {
                        icon: <Layout size={32} />,
                        title: "Wireframing",
                        desc: "Creating the structural blueprint of your interface to ensure optimal flow."
                    },
                    {
                        icon: <Diamond size={32} />,
                        title: "Visual Design",
                        desc: "Crafting the final look and feel with typography, color, and imagery."
                    }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-surface p-8 rounded-3xl border border-white/10 hover:border-purple-500/30 transition-colors text-center"
                    >
                        <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400 mb-6 mx-auto">
                            {item.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                        <p className="text-secondary">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Tools Section */}
            <div className="bg-surface rounded-[3rem] border border-white/10 p-12 md:p-20 mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Tools of the Trade</h2>
                        <p className="text-lg text-secondary mb-8">
                            We use industry-standard tools to collaborate, prototype, and hand off designs to development teams seamlessly.
                        </p>
                        <ul className="space-y-4">
                            {['Figma for Interface Design', 'Adobe Creative Suite', 'Protopie for Advanced Interaction', 'Maze for User Testing'].map(tool => (
                                <li key={tool} className="flex items-center gap-4 text-xl font-medium">
                                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                                    {tool}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-black/30 p-8 rounded-2xl border border-white/10 flex items-center justify-center aspect-square">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" alt="Figma" className="w-20 h-20 opacity-80" />
                        </div>
                        <div className="bg-black/30 p-8 rounded-2xl border border-white/10 flex items-center justify-center aspect-square mt-12">
                            <span className="text-4xl font-bold text-white/50">Ai</span>
                        </div>
                        <div className="bg-black/30 p-8 rounded-2xl border border-white/10 flex items-center justify-center aspect-square -mt-12">
                            <span className="text-4xl font-bold text-white/50">Ps</span>
                        </div>
                        <div className="bg-black/30 p-8 rounded-2xl border border-white/10 flex items-center justify-center aspect-square">
                            <span className="text-4xl font-bold text-white/50">Xd</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-8">Need a design refresh?</h2>
                <Link to="/contact">
                    <button className="bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-200 transition-colors inline-flex items-center gap-3">
                        Start Designing
                        <ArrowRight size={24} />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default UiUxDesign;
