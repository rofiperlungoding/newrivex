import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
    {
        question: "What is your typical project timeline?",
        answer: "Timelines vary based on complexity. A standard website typically takes 4-6 weeks, while complex web apps can take 3-6 months. We provide a detailed schedule during the discovery phase."
    },
    {
        question: "Do you provide post-launch support?",
        answer: "Absolutely. We offer various maintenance packages to ensure your digital product remains secure, up-to-date, and performing optimally after launch."
    },
    {
        question: "How do you handle payments?",
        answer: "We typically structure payments with a 40% deposit to start, 30% at a mid-point milestone, and the final 30% upon launch and approval."
    },
    {
        question: "Can you work with our existing design team?",
        answer: "Yes! We love collaborating. We can take your designs and turn them into pixel-perfect code, or work alongside your team to enhance existing products."
    }
];

const Contact = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
                {/* Left Column: Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">Let's Talk</h1>
                    <p className="text-xl text-secondary mb-12 max-w-md">
                        Have a project in mind? We'd love to hear about it. Send us a message and let's build something amazing together.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center shrink-0">
                                <Mail className="text-white" size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Email</h3>
                                <p className="text-secondary">hello@rivex.com</p>
                                <p className="text-secondary">careers@rivex.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center shrink-0">
                                <Phone className="text-white" size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Phone</h3>
                                <p className="text-secondary">+62 812 3456 7890</p>
                                <p className="text-secondary text-sm mt-1 text-gray-500">Mon-Fri from 9am to 6pm</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center shrink-0">
                                <MapPin className="text-white" size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Office</h3>
                                <p className="text-secondary">Jakarta, Indonesia</p>
                                <p className="text-secondary">South Quarter, Tower A</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-surface rounded-[2rem] p-8 md:p-10 border border-white/10"
                >
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Service Interest</label>
                                <select className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none">
                                    <option>Web Development</option>
                                    <option>Mobile App</option>
                                    <option>UI/UX Design</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Budget Range</label>
                                <select className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors appearance-none">
                                    <option>$5k - $10k</option>
                                    <option>$10k - $25k</option>
                                    <option>$25k - $50k</option>
                                    <option>$50k+</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Message</label>
                            <textarea
                                rows={4}
                                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none"
                                placeholder="Tell us about your project..."
                            ></textarea>
                        </div>

                        <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                            Send Message
                            <ArrowRight size={18} />
                        </button>
                    </form>
                </motion.div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto mb-20">
                <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-surface border border-white/10 rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-medium text-lg">{faq.question}</span>
                                {openFaq === index ? <Minus size={20} className="text-secondary" /> : <Plus size={20} className="text-secondary" />}
                            </button>
                            {openFaq === index && (
                                <div className="px-6 pb-6 text-secondary leading-relaxed">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contact;
