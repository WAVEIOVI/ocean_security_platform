import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Login() {
    const [email, setEmail] = useState('demo@oceansecurity.tn');
    const [password, setPassword] = useState('demo123456');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (email === 'demo@oceansecurity.tn' && password === 'demo123456') {
                await login(email);
                navigate(from, { replace: true });
            } else {
                // Simulate network delay even for error
                setTimeout(() => {
                    setError('Invalid email or password');
                    setLoading(false);
                }, 800);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex w-full">
            {/* Left Panel - Brand */}
            <div className="hidden lg:flex w-1/2 bg-brand-primary relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-no-repeat bg-center opacity-5 scale-150 blur-sm" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}assets/logoocean.png)` }}></div>

                <div className="relative z-10 p-12 text-white max-w-lg">
                    <img src={`${import.meta.env.BASE_URL}assets/logoocean.png`} alt="Ocean Security" className="h-24 w-auto mb-8 bg-white/10 p-4 rounded-xl backdrop-blur-sm" />
                    <h1 className="text-4xl font-bold mb-4">{t('login.title')}</h1>
                    <p className="text-blue-100 text-lg mb-8">
                        {t('login.subtitle')}
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                <Lock size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold">{t('login.security')}</h3>
                                <p className="text-sm text-blue-200">{t('login.encrypted')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
                <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
                    <div className="text-center lg:text-left">
                        <img
                            src={`${import.meta.env.BASE_URL}assets/logoocean.png`}
                            alt="Ocean Security"
                            className="h-16 mx-auto lg:mx-0 mb-6 lg:hidden"
                        />
                        <h2 className="text-2xl font-bold text-slate-900">{t('login.welcome')}</h2>
                        <p className="text-slate-500 text-sm mt-2">{t('login.signin_text')}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">{t('login.email')}</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 text-slate-400" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-slate-700">{t('login.password')}</label>
                                <a href="#" className="text-xs text-brand-secondary font-medium hover:underline">{t('login.forgot')}</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 text-slate-400" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-sm text-red-600 animate-in fade-in">
                                <AlertCircle size={16} /> {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full py-6 text-base shadow-lg shadow-brand-primary/20"
                            disabled={loading}
                        >
                            {loading ? (
                                <><Loader2 size={20} className="mr-2 animate-spin" /> {t('login.signin')}...</>
                            ) : (
                                <>{t('login.signin')} <ArrowRight size={20} className="ml-2" /></>
                            )}
                        </Button>
                    </form>

                    <div className="text-center">
                        <p className="text-xs text-slate-400">
                            Demo Credentials: <br />
                            Email: <code className="bg-slate-100 px-1 py-0.5 rounded">demo@oceansecurity.tn</code> <br />
                            Password: <code className="bg-slate-100 px-1 py-0.5 rounded">demo123456</code>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
