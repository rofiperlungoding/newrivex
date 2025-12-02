import { motion } from 'framer-motion';
import { Browsers, Lightning, CodeBlock, CheckCircle, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const services = [
    {
        icon: <Browsers size={32} weight="duotone" />,
        title: "Landing Pages",
        description: "High-converting, pixel-perfect landing pages tailored to your brand. Built to impress and perform.",
        features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern Animations"],
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20"
    },
    {
        icon: <CodeBlock size={32} weight="duotone" />,
        title: "Web Applications",
        description: "Complex frontend logic for dashboards, SaaS platforms, and interactive tools using React.",
        features: ["Component Architecture", "State Management", "API Integration", "Clean Code"],
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20"
    },
    {
        icon: <Lightning size={32} weight="duotone" />,
        title: "Performance Optimization",
        description: "Speed up your existing website. Better performance means better user experience and SEO.",
        features: ["Core Web Vitals", "Code Splitting", "Image Optimization", "Caching Strategies"],
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20"
    }
];

const Services = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center max-w-3xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold mb-6"
                >
                    Frontend Services
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-secondary"
                >
                    I help businesses and individuals bring their ideas to life with modern, performant, and beautiful frontend code.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                {services.map((service, index) => (
                    <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-surface rounded-3xl p-8 border ${service.border} hover:border-opacity-50 transition-colors flex flex-col`}
                    >
                        <div className={`w-14 h-14 rounded-2xl ${service.bg} ${service.color} flex items-center justify-center mb-6`}>
                            {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                        <p className="text-secondary mb-8 leading-relaxed flex-grow">
                            {service.description}
                        </p>
                        <ul className="space-y-3 pt-6 border-t border-white/5">
                            {service.features.map(feature => (
                                <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                                    <CheckCircle size={16} weight="fill" className={service.color} />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            {/* CTA Section */}
            <div className="bg-surface rounded-[3rem] p-12 md:p-20 border border-white/10 relative overflow-hidden text-center">
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold mb-6">Ready to start a project?</h2>
                    <p className="text-lg text-secondary mb-8">
                        Whether you need a simple landing page or a complex web application, I'm here to help.
                    </p>
                    <Link to="/contact">
                        <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors inline-flex items-center gap-2">
                            Request a Quote
                            <ArrowRight size={20} />
                        </button>
                    </Link>
                </div>

                {/* Background decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>
            </div>
        </div>
    );
};

export default Services;
