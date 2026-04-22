import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, ShieldCheck, Video, Mic } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Invite() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [name, setName] = useState('');

    return (
        <div className="bg-[#030108] text-white antialiased min-h-[100dvh] flex items-center justify-center relative overflow-hidden">
            
    {/* Subtle Tech Background */}
    <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

    <div className="w-full max-w-md px-6 relative z-10 animate-float">
        <div className="p-10 rounded-[32px] relative text-center bg-black/40 border border-white/5 backdrop-blur-xl">
            
            {/*  Host Avatar  */}
            <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-nebula-purple/20 rounded-full blur-xl animate-pulse"></div>
                <img src="https://i.pravatar.cc/150?img=3" alt="Host Avatar" className="w-24 h-24 rounded-full border border-white/10 object-cover relative z-10 shadow-2xl" />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-4 border-[#030108] z-20 flex items-center justify-center"></div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                <span>{t('invite.title')}</span>
            </div>
            
            <h2 className="font-display text-3xl font-bold mb-4 text-white tracking-tight">Q3 Product Roadmap Review</h2>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-8 font-medium">
                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-nebula-cyan" /> Oct 15, 2026</div>
                <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-nebula-purple" /> 14:00 PST</div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate("/setup"); }} method="GET">
                <div className="text-left space-y-2">
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                        {t('setup.displayName')}
                    </label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-nebula-cyan transition-colors" />
                        <input 
                            type="text" 
                            required 
                            placeholder={t('invite.namePlaceholder')} 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-nebula-cyan/50 focus:ring-1 focus:ring-nebula-cyan/50 transition-all font-medium" 
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={!name.trim()}
                    className={`w-full relative group overflow-hidden rounded-full p-[1px] ${!name.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-nebula-cyan to-nebula-purple opacity-70 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <div className="relative px-6 py-4 bg-[#030108] rounded-full flex items-center justify-center gap-2 group-hover:bg-transparent transition-colors duration-500">
                        <span className="font-bold tracking-wide text-white text-lg">{t('invite.joinBtn')}</span>
                        <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    <span>{t('invite.e2eEncrypted')}</span>
                </div>
                <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                <div className="flex items-center gap-3 text-gray-500">
                    <Video className="w-4 h-4" />
                    <Mic className="w-4 h-4" />
                </div>
            </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
            <div className="w-6 h-6 rounded-md border border-white/10 bg-white/5 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <span className="font-display font-bold tracking-widest text-white text-sm">NEBULA</span>
        </div>
    </div>

    

        </div>
    );
}
