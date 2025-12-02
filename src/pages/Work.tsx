import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const Work = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-24 pt-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-bold mb-8 tracking-tight"
                >
                    Selected <br /> <span className="text-secondary">Work.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-secondary max-w-2xl leading-relaxed"
                >
                    A collection of projects that define my approach to digital product design and development.
                    Focusing on performance, accessibility, and user-centric experiences.
                </motion.p>
            </div>

            <div className="space-y-32">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="group"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <div className={`order-2 ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                                <Link to={"/work/" + project.id}>
                                    <div className="overflow-hidden rounded-[2.5rem] border border-white/10 relative aspect-[4/3]">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </Link>
                            </div>

                            <div className={`order-1 ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                                <div className="flex items-center gap-4 mb-6 text-sm font-medium text-accent">
                                    <span>{project.category}</span>
                                    <span className="w-1 h-1 rounded-full bg-current" />
                                    <span>{project.year}</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-bold mb-6 group-hover:text-accent transition-colors">
                                    <Link to={"/work/" + project.id}>
                                        {project.title}
                                    </Link>
                                </h2>

                                <p className="text-lg text-secondary mb-8 leading-relaxed line-clamp-3">
                                    {project.overview}
                                </p>

                                <div className="flex flex-wrap gap-3 mb-10">
                                    {project.techStack.slice(0, 4).map(tag => (
                                        <span key={tag} className="px-4 py-2 rounded-full bg-surface border border-white/10 text-sm text-gray-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <Link
                                    to={"/work/" + project.id}
                                    className="inline-flex items-center gap-2 text-lg font-semibold hover:gap-4 transition-all"
                                >
                                    View Case Study
                                    <ArrowUpRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-32 p-12 md:p-24 bg-surface rounded-[3rem] border border-white/10 text-center relative overflow-hidden">
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">Have a project in mind?</h2>
                    <p className="text-xl text-secondary mb-12">
                        Let's collaborate to build something exceptional. I'm currently available for new projects in 2025.
                    </p>
                    <Link to="/contact">
                        <button className="bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-200 transition-colors inline-flex items-center gap-3">
                            Start a Conversation
                            <ArrowRight size={24} />
                        </button>
                    </Link>
                </div>

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
            </div>
        </div>
    );
};

export default Work;
