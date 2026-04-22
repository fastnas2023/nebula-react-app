import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mic, Video, Image, ChevronDown, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NebulaLogo from '../components/NebulaLogo';

export default function Setup() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="min-h-[100dvh] w-full font-sans antialiased flex items-center justify-center relative">
            
    <div className="bg-mesh fixed"></div>
    <div className="bg-noise fixed"></div>

    <div className="relative z-10 w-full max-w-5xl p-6 lg:p-12">
        <div className="text-center mb-10">
            <div className="flex justify-center mb-8">
                <NebulaLogo className="scale-150 origin-center" showText={false} />
            </div>
            <h1 className="font-display font-bold text-4xl text-white mb-2">{t('setup.title')}</h1>
            <p className="text-white/50">{t('setup.room')}: <span className="text-white font-bold tracking-wide">Design System Sync (NBL-8X92-K)</span></p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-stretch">
            
            {/*  Video Preview Side  */}
            <div className="w-full md:w-3/5">
                <div className="video-preview aspect-video w-full bg-black relative group h-full min-h-[300px]">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover opacity-80" />
                    
                    {/*  Audio Visualizer Overlay & Network Status  */}
                    <div className="absolute bottom-6 left-6 flex items-center gap-4">
                        <div className="glass-panel px-4 py-2 rounded-xl flex items-end gap-1.5 h-10 w-24 justify-center">
                            <div className="audio-bar animate h-full"></div>
                            <div className="audio-bar animate h-full"></div>
                            <div className="audio-bar animate h-full"></div>
                            <div className="audio-bar animate h-full"></div>
                            <div className="audio-bar animate h-full"></div>
                        </div>
                        <div className="glass-panel px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div> 32ms
                        </div>
                    </div>

                    {/*  Quick Toggles inside video  */}
                    <div className="absolute bottom-6 right-6 flex gap-3">
                        <button className="w-12 h-12 rounded-xl bg-black/50 hover:bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 group">
                            <Mic className="w-5 h-5 text-emerald-400" />
                        </button>
                        <button className="w-12 h-12 rounded-xl bg-black/50 hover:bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 group">
                            <Video className="w-5 h-5 text-emerald-400" />
                        </button>
                        <div className="relative tooltip">
                            <button className="w-12 h-12 rounded-xl bg-black/50 hover:bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 group">
                                <Image className="w-5 h-5 text-nebula-cyan" />
                            </button>
                            <div className="tooltip-text absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                                Virtual Background
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Settings Side  */}
            <div className="w-full md:w-2/5 glass-panel rounded-3xl p-8 flex flex-col justify-center border border-white/10">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-white/70 mb-2">{t('setup.displayName')}</label>
                        <input type="text" defaultValue="Sarah Jenkins" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-nebula-cyan/50 focus:ring-1 focus:ring-nebula-cyan/50 transition-all font-bold text-lg"  />
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">{t('setup.camera')}</label>
                            <div className="relative">
                                <select className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-white/20">
                                    <option>FaceTime HD Camera (Built-in)</option>
                                    <option>Logitech Brio</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">{t('setup.microphone')}</label>
                            <div className="relative">
                                <select className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-white/20">
                                    <option>MacBook Pro Microphone</option>
                                    <option>Shure SM7B</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/10">
                        <Link to="/meeting" className="gradient-btn w-full py-4 rounded-full font-display font-bold text-lg text-white shadow-lg flex items-center justify-center gap-2">
                            {t('setup.joinBtn')} <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    </div>

    

        </div>
    );
}
