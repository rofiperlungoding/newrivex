import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Envelope, LockKey, ArrowRight } from '@phosphor-icons/react';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signIn } = useSupabaseAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signIn(email, password);
            navigate('/extras');
        } catch (err: any) {
            setError(err.message || 'Failed to sign in');
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
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                            <p className="text-secondary">Sign in to access your account</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
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

                            <div className="flex justify-end">
                                <Link to="/forgot-password" className="text-xs text-secondary hover:text-primary transition-colors">
                                    Forgot password?
                                </Link>
                            </div>

                            {error && (
                                <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full" size="lg" variant="mint" disabled={loading}>
                                {loading ? 'Signing in...' : 'Sign In'}
                                <ArrowRight className="ml-2" size={18} />
                            </Button>
                        </form>

                        <div className="mt-8 text-center text-sm text-secondary">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary font-medium hover:underline">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
