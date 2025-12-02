import { motion } from 'framer-motion';
import { Star, GitFork, GithubLogo, ArrowSquareOut, Circle } from '@phosphor-icons/react';

const repositories = [
    {
        id: 1,
        name: "CloudDesk",
        description: "A comprehensive educational platform for managing classroom activities and resources.",
        language: "TypeScript",
        stars: 12,
        forks: 4,
        url: "https://github.com/rofiperlungoding/CloudDesk",
        demo: "https://cloud-desk.gabrielseto.dev",
        image: "/assets/images/projects/clouddesk.png"
    },
    {
        id: 2,
        name: "SiCost",
        description: "A smart cost estimation tool for website development projects.",
        language: "React",
        stars: 8,
        forks: 2,
        url: "https://github.com/rofiperlungoding/SiCost",
        demo: "https://sicost.netlify.app/",
        image: "/assets/images/projects/sicost.png"
    },
    {
        id: 3,
        name: "MathLabRofi",
        description: "Interactive mathematics learning platform with step-by-step solutions and visual explanations.",
        language: "React",
        stars: 15,
        forks: 5,
        url: "https://github.com/rofiperlungoding/mathlabrofi",
        demo: "https://rofimath.netlify.app/",
        image: "/assets/images/projects/mathlab.png"
    },
    {
        id: 4,
        name: "StatisticLabRofi",
        description: "Interactive data science platform for statistical analysis and visualization.",
        language: "TypeScript",
        stars: 10,
        forks: 3,
        url: "https://github.com/rofiperlungoding/statisticlabrofi",
        demo: "https://statisticslabrofi.netlify.app/",
        image: "/assets/images/projects/statisticlab.png"
    },
    {
        id: 5,
        name: "Setutor",
        description: "An online tutoring platform connecting students with educators.",
        language: "TypeScript",
        stars: 6,
        forks: 1,
        url: "https://github.com/rofiperlungoding/Setutor",
        demo: null,
        image: "/assets/images/projects/setutor.png"
    },
    {
        id: 6,
        name: "MoneyTrackrRofi",
        description: "Personal finance and expense tracking application.",
        language: "React",
        stars: 9,
        forks: 2,
        url: "https://github.com/rofiperlungoding/moneytrackrrofi",
        demo: null,
        image: "/assets/images/projects/moneytrackr.png"
    }
];

const languageColors: Record<string, string> = {
    TypeScript: "text-blue-400",
    React: "text-cyan-400",
    JavaScript: "text-yellow-400",
    Dart: "text-blue-500",
};

const Projects = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        Open Source
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-secondary max-w-xl"
                    >
                        Exploring code, building tools, and contributing to the community. Check out my latest repositories.
                    </motion.p>
                </div>
                <motion.a
                    href="https://github.com/rofiperlungoding"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                    <GithubLogo size={20} weight="fill" />
                    View GitHub Profile
                </motion.a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repositories.map((repo, index) => (
                    <motion.div
                        key={repo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-surface border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all hover:-translate-y-1 flex flex-col h-full"
                    >
                        <div className="aspect-video overflow-hidden bg-black/50 relative">
                            <img
                                src={repo.image}
                                alt={repo.name}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-4">
                                <a href={repo.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary font-bold text-xl group-hover:text-accent transition-colors">
                                    <GithubLogo size={24} weight="duotone" />
                                    {repo.name}
                                </a>
                                <div className="flex gap-2">
                                    {repo.demo && (
                                        <a href={repo.demo} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-white transition-colors" title="View Demo">
                                            <ArrowSquareOut size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <p className="text-secondary mb-6 flex-grow text-sm leading-relaxed">
                                {repo.description}
                            </p>

                            <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2">
                                    <Circle size={12} weight="fill" className={languageColors[repo.language] || "text-gray-400"} />
                                    <span className="text-gray-300">{repo.language}</span>
                                </div>
                                <div className="flex items-center gap-4 text-secondary">
                                    <div className="flex items-center gap-1 hover:text-white transition-colors">
                                        <Star size={16} weight="fill" />
                                        {repo.stars}
                                    </div>
                                    <div className="flex items-center gap-1 hover:text-white transition-colors">
                                        <GitFork size={16} weight="fill" />
                                        {repo.forks}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
