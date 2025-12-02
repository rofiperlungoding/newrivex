import { motion } from 'framer-motion';

const testimonials = [
    {
        quote: "I'm more happy with everything and will be booking projects on my daughter's ideas! Rivex took our vision from the first call and built a site that was perfect.",
        author: "Sarah Jenkins",
        role: "CEO, TechStart",
        bg: "bg-primary"
    },
    {
        quote: "Rivex has become a great way to make money on the side while being incredibly rewarding with my own schedule. The best dev team I've worked with.",
        author: "David Carter",
        role: "Freelance Designer",
        bg: "bg-[#8B8B5C]" // Olive green from reference
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h4 className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">
                        Testimonials
                    </h4>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                        What our Clients <br />
                        is saying
                    </h2>
                    <p className="mt-4 text-lg text-secondary">
                        Rivex steps in when things come up.
                    </p>

                    <div className="flex gap-4 mt-8">
                        <button className="p-3 rounded-full border border-white/10 hover:border-primary hover:text-primary transition-colors text-white">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                        </button>
                        <button className="p-3 rounded-full border border-white/10 hover:border-primary hover:text-primary transition-colors text-white">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className={`${item.bg} p-10 rounded-3xl text-white relative overflow-hidden min-h-[300px] flex flex-col justify-between`}
                        >
                            <p className="text-xl md:text-2xl font-medium leading-relaxed z-10 relative">
                                "{item.quote}"
                            </p>
                            <div className="mt-8 z-10 relative">
                                <p className="font-bold">{item.author}</p>
                                <p className="text-white/80 text-sm">{item.role}</p>
                            </div>

                            {/* Decorative circle */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
