import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, Lightning } from '@phosphor-icons/react';


const Careers = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-24 pt-10 text-center max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold mb-8"
                >
                    Join the <br /> <span className="text-accent">Rivex Team.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-secondary mb-10"
                >
                    We're on a mission to build the best digital experiences for our clients.
                    If you're passionate about code, design, and innovation, we'd love to meet you.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <a href="#positions" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors">
                        View Open Positions
                        <ArrowRight size={20} />
                    </a>
                </motion.div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                {[
                    {
                        icon: <Heart size={32} />,
                        title: "Passion First",
                        desc: "We love what we do, and it shows in our work. We're looking for people who care deeply about their craft."
                    },
                    {
                        icon: <Users size={32} />,
                        title: "Collaborative",
                        desc: "We believe that the best ideas come from working together. No egos, just great teamwork."
                    },
                    {
                        icon: <Lightning size={32} />,
                        title: "Fast Paced",
                        desc: "We move fast and break things (sometimes). We value iteration and continuous improvement."
                    }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-surface p-8 rounded-3xl border border-white/10"
                    >
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                        <p className="text-secondary">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Open Positions */}
            <div id="positions" className="max-w-4xl mx-auto mb-32">
                <h2 className="text-3xl font-bold mb-12">Open Positions</h2>
                <div className="space-y-4">
                    {[
                        { title: "Senior Frontend Engineer", type: "Remote", dept: "Engineering" },
                        { title: "UI/UX Designer", type: "Jakarta, ID", dept: "Design" },
                        { title: "Backend Developer", type: "Remote", dept: "Engineering" },
                        { title: "Project Manager", type: "Jakarta, ID", dept: "Product" }
                    ].map((job, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-surface border border-white/10 p-6 rounded-2xl flex items-center justify-between hover:border-accent/50 transition-colors cursor-pointer"
                        >
                            <div>
                                <h3 className="text-xl font-bold mb-1 group-hover:text-accent transition-colors">{job.title}</h3>
                                <div className="flex gap-4 text-sm text-secondary">
                                    <span>{job.dept}</span>
                                    <span>•</span>
                                    <span>{job.type}</span>
                                </div>
                            </div>
                            <ArrowRight size={24} className="text-secondary group-hover:text-white transition-colors" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Careers;
