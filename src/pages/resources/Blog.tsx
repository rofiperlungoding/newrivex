import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const posts = [
    {
        id: 1,
        title: "The Future of Frontend Development in 2025",
        excerpt: "Exploring the rise of AI-assisted coding, server components, and the next generation of build tools.",
        date: "Jan 15, 2025",
        author: "Rivex Team",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
        id: 2,
        title: "Mastering Tailwind CSS v4",
        excerpt: "A deep dive into the new features, performance improvements, and best practices for the latest version.",
        date: "Dec 28, 2024",
        author: "Dev Team",
        category: "Tutorial",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=2031&q=80"
    },
    {
        id: 3,
        title: "Designing for Accessibility",
        excerpt: "Why inclusive design matters and practical steps to make your web applications accessible to everyone.",
        date: "Dec 10, 2024",
        author: "Design Team",
        category: "Design",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    }
];

const Blog = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-24 pt-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold mb-6"
                >
                    Insights & <br /> <span className="text-accent">Thoughts.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-secondary max-w-2xl mx-auto"
                >
                    Stories about design, development, and the future of the web.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                {posts.map((post, index) => (
                    <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-surface rounded-3xl overflow-hidden border border-white/10 hover:border-accent/50 transition-colors"
                    >
                        <div className="aspect-[16/9] overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-8">
                            <div className="flex items-center gap-4 text-sm text-secondary mb-4">
                                <span className="text-accent font-medium">{post.category}</span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                    <Calendar size={16} />
                                    {post.date}
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-secondary mb-6 line-clamp-3">
                                {post.excerpt}
                            </p>
                            <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 font-medium hover:gap-3 transition-all">
                                Read Article
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </motion.article>
                ))}
            </div>

            {/* Newsletter */}
            <div className="bg-surface rounded-[3rem] border border-white/10 p-12 md:p-20 text-center max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Subscribe to our newsletter</h2>
                <p className="text-secondary mb-8 max-w-xl mx-auto">
                    Get the latest articles, tutorials, and updates delivered straight to your inbox. No spam, ever.
                </p>
                <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 bg-black/30 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-accent transition-colors"
                    />
                    <button className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Blog;
