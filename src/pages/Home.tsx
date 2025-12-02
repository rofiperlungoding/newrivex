import { motion } from 'framer-motion';
import { ArrowUpRight, GithubLogo, UserCircle, Code, GlobeHemisphereWest, EnvelopeSimple } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { NewsCarouselWidget } from '../components/news/NewsCarouselWidget';

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

                {/* 1. Hero / Intro - Large, spans 2x2 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bento-card flex flex-col justify-between group"
                >
                    <div className="space-y-4 z-10">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-black mb-4">
                            <UserCircle size={32} weight="fill" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                            Hi, I'm <span className="text-gray-400">Rivex</span>. <br />
                            Frontend Developer.
                        </h1>
                        <p className="text-secondary text-lg max-w-md">
                            I build pixel-perfect websites and explore the latest in web technology. Welcome to my digital garden.
                        </p>
                    </div>
                    <div className="flex gap-4 mt-8">
                        <Link to="/about">
                            <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform">
                                More About Me
                            </button>
                        </Link>
                    </div>

                    {/* Abstract Background Decoration */}
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-20 group-hover:scale-110 transition-transform duration-700"></div>
                </motion.div>

                {/* 2. News Hub Preview */}
                <Link to="/news" className="col-span-1 md:col-span-1 row-span-2 bento-card bg-surface border-white/10 hover:border-white/30 transition-all group cursor-pointer block">
                    <NewsCarouselWidget />
                </Link>

                {/* 3. GitHub / Projects */}
                <Link to="/projects" className="col-span-1 bento-card bg-surface border-white/10 hover:border-white/30 transition-all group cursor-pointer block">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="h-full flex flex-col"
                    >
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-white/10 rounded-2xl text-white">
                                <GithubLogo size={24} weight="duotone" />
                            </div>
                            <ArrowUpRight size={24} className="text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                        <div className="mt-auto pt-8">
                            <h3 className="text-xl font-bold text-white">Open Source</h3>
                            <p className="text-secondary text-sm mt-1">Check out my code.</p>
                        </div>
                    </motion.div>
                </Link>

                {/* 4. Services */}
                <Link to="/services" className="col-span-1 bento-card bg-surface border-blue-500/20 hover:border-blue-500/40 transition-colors group cursor-pointer block">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="h-full flex flex-col"
                    >
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
                                <Code size={24} weight="duotone" />
                            </div>
                            <ArrowUpRight size={24} className="text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                        <div className="mt-auto pt-8">
                            <h3 className="text-xl font-bold text-blue-100">Services</h3>
                            <p className="text-blue-400/80 text-sm mt-1">Need a website?</p>
                        </div>
                    </motion.div>
                </Link>

                {/* 5. Contact CTA */}
                <Link to="/contact" className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bento-card p-0 relative group cursor-pointer block overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50 group-hover:scale-105 transition-transform duration-700"></div>
                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-start z-10">
                        <h3 className="text-2xl font-bold text-white mb-2">Let's Collaborate</h3>
                        <p className="text-gray-300 max-w-md">Have a project in mind? Let's build something amazing together.</p>
                    </div>
                    <div className="absolute bottom-8 right-8 bg-white text-black p-3 rounded-full group-hover:scale-110 transition-transform">
                        <EnvelopeSimple size={24} weight="fill" />
                    </div>
                </Link>

                {/* 6. Location / Map */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="col-span-1 md:col-span-2 bento-card p-0 relative overflow-hidden min-h-[200px]"
                >
                    <div className="absolute inset-0 bg-surface">
                        {/* Abstract Map Representation */}
                        <div className="w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping absolute"></div>
                            <div className="w-4 h-4 bg-blue-500 rounded-full relative border-2 border-white shadow-lg"></div>
                        </div>
                    </div>
                    <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm flex items-center gap-2 border border-white/10">
                        <GlobeHemisphereWest size={16} weight="fill" className="text-blue-500" />
                        <span className="text-sm font-semibold text-primary">Jakarta, Indonesia</span>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Home;
