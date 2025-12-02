import { Button } from '../ui/Button';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const showBanner = location.pathname !== '/news';

    return (
        <footer className="bg-background pt-20 pb-10">
            {/* Banner Section */}
            {showBanner && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                    <div className="bg-surface border border-white/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
                                The bright side <br /> of web development
                            </h2>
                            <p className="text-lg text-secondary max-w-2xl mx-auto mb-8">
                                Get reliable development and design from trusted experts in your community.
                            </p>
                            <Link to="/contact">
                                <Button variant="mint" size="lg" className="rounded-full px-10 text-lg font-semibold">
                                    Get Started
                                </Button>
                            </Link>
                        </div>

                        {/* Decorative blobs */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 pt-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
                    <div className="col-span-2 lg:col-span-1">
                        <Link to="/" className="text-2xl font-bold text-primary tracking-tighter">
                            rivex.
                        </Link>
                    </div>

                    <div>
                        <h3 className="font-semibold text-primary mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-secondary">
                            <li><Link to="/work" className="hover:text-primary">Work</Link></li>
                            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
                            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-primary mb-4">Services</h3>
                        <ul className="space-y-2 text-sm text-secondary">
                            <li><Link to="/services/web-development" className="hover:text-primary">Web Development</Link></li>
                            <li><Link to="/services/mobile-apps" className="hover:text-primary">Mobile Apps</Link></li>
                            <li><Link to="/services/ui-ux-design" className="hover:text-primary">UI/UX Design</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-primary mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm text-secondary">
                            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
                            <li><Link to="/careers" className="hover:text-primary">Careers</Link></li>
                            <li><Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-primary mb-4">Connect</h3>
                        <ul className="space-y-2 text-sm text-secondary">
                            <li><a href="#" className="hover:text-primary">Twitter</a></li>
                            <li><a href="#" className="hover:text-primary">Instagram</a></li>
                            <li><a href="#" className="hover:text-primary">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-secondary">
                    <p>&copy; 2025 Rivex Inc. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-primary">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
