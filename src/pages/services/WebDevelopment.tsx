import { motion } from 'framer-motion';
import { Code, Desktop, Rocket, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const WebDevelopment = () => {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="mb-24 pt-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
                        <Code size={16} weight="bold" />
                        Web Development Services
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                        Building the <br /> <span className="text-blue-400">Future Web.</span>
                    </h1>
                    <p className="text-xl text-secondary mb-10 leading-relaxed max-w-lg">
                        We craft high-performance, scalable, and secure web applications tailored to your business needs. From simple landing pages to complex enterprise solutions.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/contact">
                            <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors">
                                Start Your Project
                            </button>
                        </Link>
                        <a href="#process" className="px-8 py-4 rounded-full font-bold text-lg border border-white/10 hover:bg-white/5 transition-colors">
                            Our Process
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
                    <div className="relative bg-surface border border-white/10 rounded-3xl p-8 shadow-2xl">
                        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="space-y-4 font-mono text-sm">
                            <div className="flex gap-4">
                                <span className="text-gray-500">1</span>
                                <span className="text-purple-400">import</span> <span className="text-yellow-300">{'{ Future }'}</span> <span className="text-purple-400">from</span> <span className="text-green-300">'@rivex/web'</span>;
                            </div>
                            <div className="flex gap-4">
                                <span className="text-gray-500">2</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-gray-500">3</span>
                                <span className="text-purple-400">const</span> <span className="text-blue-400">App</span> = () <span className="text-purple-400">=&gt;</span> {'{'}
                            </div>
                            <div className="flex gap-4">
                                <span className="text-gray-500">4</span>
                                <span className="pl-4 text-purple-400">return</span> (
                            </div>
                            <div className="flex gap-4">
                                <span className="text-gray-500">5</span>
                                <span className="pl-8 text-blue-300">&lt;Performance&gt;</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-gray-500">6</span>
                                <span className="pl-12 text-white">Scalable Solutions</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-gray-500">7</span>
                                <span className="pl-8 text-blue-300">&lt;/Performance&gt;</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-gray-500">8</span>
                                <span className="pl-4">);</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-gray-500">9</span>
                                {'}'};
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                {[
                    {
                        icon: <Desktop size={32} />,
                        title: "Frontend Engineering",
                        desc: "Pixel-perfect, responsive interfaces using React, Vue, or Angular."
                    },
                    {
                        icon: <Code size={32} />,
                        title: "Backend Development",
                        desc: "Robust APIs and server-side logic with Node.js, Python, or Go."
                    },
                    {
                        icon: <Rocket size={32} />,
                        title: "Performance Tuning",
                        desc: "Optimization for speed, SEO, and Core Web Vitals."
                    }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-surface p-8 rounded-3xl border border-white/10 hover:border-blue-500/30 transition-colors"
                    >
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                        <p className="text-secondary">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Tech Stack */}
            <div className="mb-32">
                <h2 className="text-3xl font-bold mb-12 text-center">Our Technology Stack</h2>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'GraphQL', 'AWS', 'Docker'].map((tech) => (
                        <div key={tech} className="px-6 py-3 bg-surface border border-white/10 rounded-full text-lg font-medium text-gray-300">
                            {tech}
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-[3rem] p-12 md:p-24 text-center border border-white/10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to scale your business?</h2>
                <p className="text-xl text-secondary mb-10 max-w-2xl mx-auto">
                    Let's discuss how our web development services can help you achieve your goals in 2025.
                </p>
                <Link to="/contact">
                    <button className="bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-200 transition-colors inline-flex items-center gap-3">
                        Get a Free Consultation
                        <ArrowRight size={24} />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default WebDevelopment;
