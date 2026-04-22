import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Key, Eye, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="bg-nebula-base text-white antialiased min-h-[100dvh] flex items-center justify-center relative overflow-hidden">
            
    <div className="bg-noise"></div>
    <div className="bg-holographic absolute inset-0 animate-aurora"></div>

    {/*  Back to Home  */}
    <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors z-20 group font-mono text-sm">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Return to Orbit
    </Link>

    <div className="w-full max-w-md px-6 relative z-10 animate-float">
        {/*  Logo  */}
        <div className="flex justify-center mb-10">
            <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-md group-hover:border-nebula-cyan/50 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.15)] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] relative">
                    <div className="absolute inset-0 bg-nebula-cyan/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-3 h-3 bg-white rounded-full group-hover:bg-nebula-cyan transition-colors relative z-10 animate-pulse"></div>
                </div>
                <span className="font-display font-bold text-3xl tracking-widest text-white">NEBULA</span>
            </div>
        </div>

        {/*  Login Card  */}
        <div className="glass-panel p-8 rounded-[32px] relative">
            {/*  Corner Accents  */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20 m-6"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20 m-6"></div>
            
            <div className="text-center mb-10 mt-4">
                <h2 className="font-display text-3xl font-bold mb-2">Authenticate</h2>
                <p className="text-gray-400 text-sm font-medium">Enter your credentials to access the mesh network.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate("/home"); }} method="GET">
                <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Mail className="w-3 h-3" /> Operator ID
                    </label>
                    <input type="email" required placeholder="name@company.com" className="w-full input-cyber rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-600 focus:bg-black/50" />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Key className="w-3 h-3" /> Passkey
                        </label>
                        <Link to="#" className="text-xs font-mono text-nebula-cyan hover:text-white transition-colors">Lost Key?</Link>
                    </div>
                    <div className="relative">
                        <input type="password" required placeholder="••••••••" className="w-full input-cyber rounded-xl px-4 py-3.5 text-sm placeholder:text-gray-600 focus:bg-black/50" />
                        <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                            <Eye className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <button type="submit" className="w-full btn-cyber py-4 rounded-xl font-display font-bold tracking-wide text-lg flex items-center justify-center gap-2 mt-4">
                    Initialize Connection <ArrowRight className="w-5 h-5" />
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-sm text-gray-400">
                    New to the network? <Link to="#" className="text-white font-bold hover:text-nebula-purple transition-colors border-b border-transparent hover:border-nebula-purple pb-0.5">Request Access</Link>
                </p>
            </div>
        </div>

        {/*  Security Badge  */}
        <div className="flex items-center justify-center gap-2 mt-8 text-xs font-mono text-gray-500">
            <ShieldCheck className="w-4 h-4 text-nebula-emerald" />
            <span>End-to-End Encrypted Session</span>
        </div>
    </div>

    

        </div>
    );
}
