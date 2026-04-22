import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Video, User, ChevronDown, Mic } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';
import Background from '../components/Background';

export default function Settings() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="h-[100dvh] w-full font-sans antialiased flex relative">
            <Background />
            <Sidebar />
            <main className="flex-1 h-full overflow-y-auto relative z-10 p-6 lg:p-12 scroll-smooth">
        <div className="max-w-3xl mx-auto">
            <header className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="font-display font-bold text-3xl text-white mb-2">{t('settings.title')}</h1>
                    <p className="text-white/50">{t('settings.subtitle')}</p>
                </div>
            </header>

            <div className="space-y-8">
                {/*  Video Settings  */}
                <section className="settings-card group/card hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-shadow">
                    <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-nebula-cyan/20 flex items-center justify-center group-hover/card:scale-110 transition-transform">
                                <Video className="w-5 h-5 text-nebula-cyan" />
                            </div>
                            <h2 className="font-display font-bold text-xl text-white">{t('settings.camera')}</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="group/input">
                                <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">{t('settings.device')}</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold focus:outline-none focus:border-nebula-cyan/50 focus:ring-1 focus:ring-nebula-cyan/50 hover:bg-white/5 transition-colors cursor-pointer">
                                        <option>{t('setup.devices.cameraBuiltIn')}</option>
                                        <option>Logitech Brio 4K</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-2 rounded-lg hover-guide transition-all">
                                <div>
                                    <div className="text-white font-bold text-sm">{t('settings.mirrorVideo')}</div>
                                    <div className="text-white/40 text-xs mt-0.5">{t('settings.mirrorVideoDesc')}</div>
                                </div>
                                <div className="relative inline-block w-12 h-6 align-middle select-none">
                                    <input type="checkbox" name="toggle" id="mirror-toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer opacity-0 z-10" defaultChecked/>
                                    <label htmlFor="mirror-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-white/10 cursor-pointer border border-white/20 transition-colors"></label>
                                </div>
                            </div>
                        </div>

                        {/*  Video Preview with Blur Overlay  */}
                        <div className="aspect-video bg-black rounded-xl border border-white/10 overflow-hidden relative group/preview cursor-pointer shadow-lg">
                            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-80 group-hover/preview:scale-105 transition-transform duration-700" />
                            
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover/preview:opacity-100 transition-all duration-300 flex items-center justify-center">
                                <button className="px-6 py-2.5 bg-white/10 hover:bg-white text-white hover:text-black rounded-full text-sm font-bold transition-colors shadow-xl">
                                    {t('settings.changeBackground')}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/*  Audio Settings  */}
                <section className="settings-card group/card">
                    <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                        <div className="w-10 h-10 rounded-xl bg-nebula-purple/20 flex items-center justify-center group-hover/card:scale-110 transition-transform">
                            <Mic className="w-5 h-5 text-nebula-purple" />
                        </div>
                        <h2 className="font-display font-bold text-xl text-white">{t('settings.audio')}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">{t('settings.microphone')}</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold focus:outline-none focus:border-nebula-purple/50">
                                        <option>{t('setup.devices.micMacBook')}</option>
                                        <option>External Mic (Shure SM7B)</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-2 rounded-lg hover-guide transition-all">
                                <div>
                                    <div className="text-white font-bold text-sm">{t('settings.noiseCancellation')}</div>
                                    <div className="text-white/40 text-xs mt-0.5">{t('settings.noiseCancellationDesc')}</div>
                                </div>
                                <div className="relative inline-block w-12 h-6 align-middle select-none">
                                    <input type="checkbox" name="toggle" id="noise-toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer opacity-0 z-10" defaultChecked/>
                                    <label htmlFor="noise-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-white/10 cursor-pointer border border-white/20 transition-colors"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <div className="flex justify-end gap-4 mt-8">
                    <button className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold transition-colors border border-white/10">{t('settings.discardChanges')}</button>
                    <button className="px-6 py-3 rounded-full bg-nebula-purple hover:bg-purple-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(138,43,226,0.4)] hover:shadow-[0_0_30px_rgba(138,43,226,0.7)] hover:-translate-y-1">{t('settings.saveSettings')}</button>
                </div>
            </div>
        </div>
    </main>

    

        </div>
    );
}
