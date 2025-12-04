import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-background pt-20 pb-10">
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
                            <li><Link to="/extras" className="hover:text-primary">Extras</Link></li>
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
