import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Envelope, LockKey, User, ArrowRight } from '@phosphor-icons/react';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signUp } = useSupabaseAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signUp(email, password);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            setError(err.message || 'Failed to sign up');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
            >
                <div className="bento-card relative overflow-hidden">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                            <p className="text-secondary">Join us to explore more features</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-secondary ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={20} />
                                    <Input
                                        type="text"
                                        placeholder="John Doe"
                                        className="pl-10 bg-black/40 border-white/10 focus:border-accent/50 transition-colors"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-secondary ml-1">Email</label>
                                <div className="relative">
                                    <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={20} />
                                    <Input
                                        type="email"
                                        placeholder="hello@example.com"
                                        className="pl-10 bg-black/40 border-white/10 focus:border-accent/50 transition-colors"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-secondary ml-1">Password</label>
                                <div className="relative">
                                    <LockKey className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={20} />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 bg-black/40 border-white/10 focus:border-accent/50 transition-colors"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {success && (
                                <div className="text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                                    Account created! Redirecting to login...
                                </div>
                            )}

                            {error && (
                                <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full mt-4" size="lg" variant="mint" disabled={loading}>
                                {loading ? 'Creating Account...' : success ? 'Success!' : 'Create Account'}
                                <ArrowRight className="ml-2" size={18} />
                            </Button>
                        </form>

                        <div className="mt-8 text-center text-sm text-secondary">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary font-medium hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
