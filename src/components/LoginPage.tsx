import React, { useState } from 'react';
import { Shield, Lock, User, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginPageProps {
    onLogin: (user: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simple mock authentication
        setTimeout(() => {
            if (username === 'admin' && password === 'admin123') {
                onLogin(username);
            } else {
                setError('Authentication Failed: Invalid credentials or unauthorized access point.');
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className="h-screen w-screen bg-[#020617] flex items-center justify-center p-4 overflow-hidden font-sans">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[420px] glass-card bg-slate-900/40 border border-slate-800 p-8 relative z-10 backdrop-blur-2xl rounded-2xl shadow-2xl"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/10">
                        <Shield className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-widest uppercase">KAVACH TERMINAL</h1>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">Admin Security Gateway</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Officer Identity</label>
                        <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                className="w-full bg-slate-950/50 border border-slate-800 text-white rounded-xl py-3.5 pl-10 pr-4 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-medium placeholder:text-slate-600"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Protocol</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full bg-slate-950/50 border border-slate-800 text-white rounded-xl py-3.5 pl-10 pr-4 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-medium placeholder:text-slate-600"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg flex items-start gap-3"
                        >
                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-rose-200 font-medium leading-relaxed">{error}</p>
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-black text-[11px] uppercase tracking-[0.2em] py-4 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? 'Initializing Stream...' : 'Authorize Access'}
                    </button>
                </form>

                <div className="mt-10 flex items-center justify-between border-t border-slate-800 pt-6 opacity-50">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">System Ready</span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Node: V-742-AQ</span>
                </div>
            </motion.div>

            {/* Custom Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-scanline pointer-events-none" />
            <style>{`
                .glass-card {
                    box-shadow: 0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.02);
                }
                .bg-scanline {
                    background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 50%);
                    background-size: 100% 4px;
                }
            `}</style>
        </div>
    );
};
