import { motion } from 'framer-motion';
import { GameController, Headphones, Coffee, BracketsCurly } from '@phosphor-icons/react';

const About = () => {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Header / Bio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        About Me
                    </h1>
                    <h2 className="text-2xl text-white mb-4">
                        Frontend Developer & Creative Thinker
                    </h2>
                    <p className="text-lg text-secondary leading-relaxed mb-6">
                        Hello! I'm a passionate developer based in Indonesia. I love building things for the web and exploring new technologies.
                        My journey started with a curiosity for how websites work, and it has evolved into a full-blown obsession with creating pixel-perfect user experiences.
                    </p>
                    <p className="text-lg text-secondary leading-relaxed">
                        When I'm not coding, you can find me exploring virtual worlds, listening to my favorite playlists, or hunting for the best coffee in town.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative aspect-square rounded-[3rem] overflow-hidden bg-surface border border-white/10"
                >
                    {/* Placeholder for personal image */}
                    <img
                        src="/profile.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </div>

            {/* Hobbies / Interests */}
            <div className="mb-20">
                <h3 className="text-3xl font-bold mb-8">What I Love</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-surface p-8 rounded-3xl border border-white/10"
                    >
                        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-4">
                            <GameController size={32} weight="duotone" />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Gaming</h4>
                        <p className="text-secondary">Exploring immersive worlds and competitive gameplay.</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-surface p-8 rounded-3xl border border-white/10"
                    >
                        <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 mb-4">
                            <Headphones size={32} weight="duotone" />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Music</h4>
                        <p className="text-secondary">Curating playlists and discovering new genres.</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-surface p-8 rounded-3xl border border-white/10"
                    >
                        <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 mb-4">
                            <Coffee size={32} weight="duotone" />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Coffee</h4>
                        <p className="text-secondary">Fueling my coding sessions with the perfect brew.</p>
                    </motion.div>
                </div>
            </div>

            {/* Tech Stack */}
            <div>
                <h3 className="text-3xl font-bold mb-8">Tech Stack</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Next.js', 'Vite', 'Git', 'Figma'].map((tech, index) => (
                        <motion.div
                            key={tech}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-surface border border-white/10 p-4 rounded-2xl flex items-center gap-3"
                        >
                            <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                                <BracketsCurly size={20} className="text-white/70" />
                            </div>
                            <span className="font-medium">{tech}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
