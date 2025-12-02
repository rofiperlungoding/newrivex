import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, GithubLogo, ArrowSquareOut, CaretRight } from '@phosphor-icons/react';
import { projects } from '../data/projects';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projects.find(p => p.id.toLowerCase() === id?.toLowerCase());

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-32">
                <h1 className="text-4xl font-bold mb-4 text-white">Project Not Found</h1>
                <p className="text-secondary mb-8">Could not find a project with ID: <span className="text-accent font-mono">{id}</span></p>

                <div className="bg-surface border border-white/10 p-6 rounded-2xl mb-8 text-left max-w-lg w-full overflow-hidden">
                    <p className="text-sm text-secondary mb-2 uppercase tracking-wider font-bold">Debug Info:</p>
                    <div className="font-mono text-xs text-gray-400 space-y-1">
                        <p>Current Route ID: {id}</p>
                        <p>Total Projects: {projects.length}</p>
                        <p>Available IDs: {projects.map(p => p.id).join(', ')}</p>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/work')}
                    className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
                >
                    Return to Work Page
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-0 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Navigation */}
                <Link to="/work" className="inline-flex items-center gap-2 text-secondary hover:text-white mb-12 transition-colors group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Work
                </Link>

                {/* Hero Section */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
                    >
                        <div>
                            <div className="flex items-center gap-3 text-accent font-medium mb-4">
                                <span>{project.category}</span>
                                <span className="w-1 h-1 rounded-full bg-current" />
                                <span>{project.year}</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold mb-4">{project.title}</h1>
                            <p className="text-2xl text-secondary">{project.subtitle}</p>
                        </div>

                        <div className="flex gap-4">
                            {project.links.demo && (
                                <a
                                    href={project.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                                >
                                    Live Demo
                                    <ArrowSquareOut size={20} />
                                </a>
                            )}
                            <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-surface border border-white/10 rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
                            >
                                <GithubLogo size={20} />
                                Source Code
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-[2.5rem] overflow-hidden border border-white/10 aspect-video relative"
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-16">
                        <section>
                            <h2 className="text-3xl font-bold mb-6">Overview</h2>
                            <p className="text-lg text-secondary leading-relaxed">
                                {project.overview}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-8">Key Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {project.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="mt-1.5 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                                        <span className="text-lg text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-8">Engineering Challenges</h2>
                            <div className="space-y-8">
                                {project.challenges.map((challenge, index) => (
                                    <div key={index} className="bg-surface border border-white/5 p-8 rounded-3xl">
                                        <h3 className="text-xl font-bold mb-3 text-white">{challenge.title}</h3>
                                        <p className="text-secondary leading-relaxed">{challenge.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">Outcome</h2>
                            <p className="text-lg text-secondary leading-relaxed border-l-4 border-accent pl-6">
                                {project.outcome}
                            </p>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary mb-6">Tech Stack</h3>
                            <div className="flex flex-wrap gap-3">
                                {project.techStack.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-surface border border-white/10 rounded-full text-sm text-gray-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary mb-6">Project Type</h3>
                            <div className="flex items-center gap-3">
                                {project.icons.map((Icon, i) => (
                                    <div key={i} className="w-12 h-12 rounded-2xl bg-surface border border-white/10 flex items-center justify-center text-accent">
                                        <Icon size={24} weight="duotone" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next Project Navigation */}
                <div className="mt-32 pt-12 border-t border-white/10 flex justify-end">
                    <Link to="/work" className="group flex items-center gap-4 text-right">
                        <div>
                            <span className="block text-sm text-secondary mb-1">More Projects</span>
                            <span className="text-2xl font-bold group-hover:text-accent transition-colors">View All Work</span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                            <CaretRight size={20} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default ProjectDetail;
