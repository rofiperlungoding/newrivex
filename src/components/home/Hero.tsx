import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen bg-background overflow-hidden flex items-center pt-20">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
                <svg viewBox="0 0 500 500" className="w-full h-full text-accent opacity-90">
                    <path
                        fill="currentColor"
                        d="M418.3,336.8C396.4,396.6,338.4,438.4,275.6,448.7C212.8,459,145.2,437.8,98.6,394.3C52,350.8,26.4,285,42.5,224.2C58.6,163.4,116.4,107.6,177.3,78.8C238.2,50,302.2,48.2,352.4,76.4C402.6,104.6,439,162.8,446.5,225.8C454,288.8,432.6,356.6,418.3,336.8Z"
                        transform="translate(50 50) scale(0.9)"
                    />
                </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-full h-full text-secondary opacity-80">
                    <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.6,32.3C59,43.1,47.1,51.8,35.2,58.4C23.3,65,11.4,69.5,-1.2,71.6C-13.8,73.7,-28.9,73.4,-41.6,67.6C-54.3,61.8,-64.6,50.5,-72.2,37.6C-79.8,24.7,-84.7,10.2,-83.4,-3.8C-82.1,-17.8,-74.6,-31.3,-64.3,-42.6C-54,-53.9,-40.9,-63,-27.6,-70.6C-14.3,-78.2,-0.8,-84.3,13.2,-85.4L44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-white space-y-6"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                            Hi, I'm <span className="text-accent">Rofi.</span> <br />
                            Frontend Developer.
                        </h1>
                        <p className="text-lg md:text-xl text-secondary max-w-lg">
                            An adaptable engineer dedicated to crafting exceptional digital experiences. I excel in fast-paced environments, constantly seeking innovative challenges and opportunities to master cutting-edge technologies.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button variant="mint" size="lg" className="rounded-full text-lg px-8">
                                More About Me
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full text-lg px-8 bg-transparent text-white border-white hover:bg-white/10 hover:text-white">
                                View Projects
                            </Button>
                        </div>
                    </motion.div>

                    {/* Image/Visual Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        {/* Placeholder for the "kidcare" image replacement. 
                 Using a placeholder div for now, or I could generate an image. 
                 I'll use a nice rounded div with an image inside if I had one, 
                 but for now I'll use a generated placeholder style.
             */}
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 bg-secondary rounded-[3rem] transform rotate-6 opacity-50"></div>
                            <div className="absolute inset-0 bg-accent rounded-[3rem] transform -rotate-3 opacity-50"></div>
                            <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white/20">
                                <img
                                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Coding workspace"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
