import { motion } from 'framer-motion';
import { DeviceMobile, AndroidLogo, AppleLogo, DeviceTablet, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const MobileApps = () => {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="mb-24 pt-10 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-medium mb-6 border border-green-500/20"
                >
                    <DeviceMobile size={16} weight="bold" />
                    Mobile App Development
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
                >
                    Apps that users <br /> <span className="text-green-400">love to use.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-secondary mb-10 leading-relaxed"
                >
                    Native and cross-platform mobile applications designed for engagement and performance.
                    We bring your ideas to the App Store and Google Play.
                </motion.p>
            </div>

            {/* Platforms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-surface p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                        <AppleLogo size={120} weight="fill" />
                    </div>
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                        <AppleLogo size={40} weight="fill" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">iOS Development</h3>
                    <p className="text-secondary text-lg mb-8">
                        Premium experiences for iPhone and iPad using Swift and SwiftUI.
                        Leveraging the latest iOS features for maximum performance.
                    </p>
                    <ul className="space-y-3">
                        {['Swift & SwiftUI', 'Core ML & ARKit', 'App Store Optimization', 'TestFlight Beta Testing'].map(item => (
                            <li key={item} className="flex items-center gap-3 text-gray-300">
                                <div className="w-2 h-2 rounded-full bg-white" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-surface p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                        <AndroidLogo size={120} weight="fill" />
                    </div>
                    <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 mb-8">
                        <AndroidLogo size={40} weight="fill" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Android Development</h3>
                    <p className="text-secondary text-lg mb-8">
                        Scalable and robust apps for the diverse Android ecosystem.
                        Built with Kotlin and Jetpack Compose for modern UI.
                    </p>
                    <ul className="space-y-3">
                        {['Kotlin & Java', 'Jetpack Compose', 'Material Design 3', 'Google Play Console'].map(item => (
                            <li key={item} className="flex items-center gap-3 text-gray-300">
                                <div className="w-2 h-2 rounded-full bg-green-400" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Cross Platform */}
            <div className="bg-surface rounded-[3rem] border border-white/10 p-12 md:p-20 mb-32 flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
                        <DeviceTablet size={16} weight="bold" />
                        Cross-Platform Solutions
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">One Codebase,<br />Every Device.</h2>
                    <p className="text-lg text-secondary mb-8">
                        We specialize in React Native and Flutter development to help you reach more users with less code.
                        Perfect for startups and businesses looking for efficiency without compromising quality.
                    </p>
                    <div className="flex gap-4">
                        <div className="px-6 py-3 bg-black/30 rounded-xl border border-white/10 text-blue-400 font-semibold">React Native</div>
                        <div className="px-6 py-3 bg-black/30 rounded-xl border border-white/10 text-blue-400 font-semibold">Flutter</div>
                    </div>
                </div>
                <div className="flex-1 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 blur-[80px] rounded-full pointer-events-none" />
                    <img
                        src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
                        alt="Mobile Development"
                        className="relative rounded-3xl border border-white/10 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                    />
                </div>
            </div>

            {/* CTA */}
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-8">Ready to build your app?</h2>
                <Link to="/contact">
                    <button className="bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-200 transition-colors inline-flex items-center gap-3">
                        Get in Touch
                        <ArrowRight size={24} />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default MobileApps;
