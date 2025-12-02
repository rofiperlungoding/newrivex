import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { Code, Layout, Smartphone } from 'lucide-react';

const Services = () => {
    return (
        <section id="services" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h4 className="text-sm font-bold tracking-widest text-secondary uppercase mb-4">
                            What We Do
                        </h4>
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                            We help brands find <br />
                            <span className="text-teal-600">reliable, flexible</span> <br />
                            web solutions.
                        </h2>
                        <p className="text-lg text-secondary mb-8 max-w-md">
                            We'll match you with the perfect tech stack based on your brand's needs and our availability.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-accent/30 rounded-full text-primary">
                                    <Code size={20} />
                                </div>
                                <span className="font-medium text-gray-300">Custom Web Development</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-secondary/30 rounded-full text-primary">
                                    <Layout size={20} />
                                </div>
                                <span className="font-medium text-gray-300">UI/UX Design</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-primary/10 rounded-full text-primary">
                                    <Smartphone size={20} />
                                </div>
                                <span className="font-medium text-gray-300">Responsive Mobile Apps</span>
                            </div>
                        </div>

                        <Button variant="outline" className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white">
                            See Services
                        </Button>
                    </motion.div>

                    {/* Visual Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/3]">
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Team working"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                                <p className="text-sm font-medium text-black">
                                    "Rivex helped us scale our platform to 10k users without a hitch."
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-xs text-gray-500">Verified Client</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Services;
