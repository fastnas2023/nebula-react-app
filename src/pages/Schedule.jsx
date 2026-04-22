import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, X, Shield, Settings2, Link as LinkIcon, Calendar, Clock, Globe, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';

export default function Schedule() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    // Toggle States
    const [waitingRoom, setWaitingRoom] = useState(true);
    const [requirePasscode, setRequirePasscode] = useState(false);
    const [hostVideo, setHostVideo] = useState(true);
    const [autoRecord, setAutoRecord] = useState(false);

    return (
        <div className="flex h-[100dvh] bg-[#030108] text-white font-sans overflow-hidden">
            <Sidebar />

            <main className="flex-1 overflow-y-auto relative">
                {/* Subtle Tech Background */}
                <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-8 py-12">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400 mb-4">
                                <Calendar className="w-3 h-3" />
                                <span>{t('schedule.title').toUpperCase()}</span>
                            </div>
                            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">{t('schedule.title')}</h1>
                        </div>
                        <Link to="/home" className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium text-sm flex items-center gap-2 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {t('schedule.cancel')}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Form */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-8">
                                
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">{t('schedule.topic')}</label>
                                    <input 
                                        type="text" 
                                        placeholder={t('schedule.topicPlaceholder')}
                                        defaultValue="Q3 Product Roadmap Review" 
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-nebula-cyan/50 focus:ring-1 focus:ring-nebula-cyan/50 transition-all font-medium"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">{t('schedule.date')}</label>
                                        <div className="relative group">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-nebula-cyan transition-colors pointer-events-none" />
                                            <input 
                                                type="date" 
                                                defaultValue="2026-10-15" 
                                                className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-nebula-cyan/50 focus:ring-1 focus:ring-nebula-cyan/50 transition-all font-mono text-sm [color-scheme:dark]"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">{t('schedule.time')}</label>
                                        <div className="flex items-center gap-3">
                                            <div className="relative group flex-1">
                                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-nebula-cyan transition-colors pointer-events-none" />
                                                <input 
                                                    type="time" 
                                                    defaultValue="14:00" 
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-white focus:outline-none focus:border-nebula-cyan/50 focus:ring-1 focus:ring-nebula-cyan/50 transition-all font-mono text-sm [color-scheme:dark]"
                                                />
                                            </div>
                                            <span className="text-gray-600 font-mono text-sm">-</span>
                                            <div className="relative group flex-1">
                                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-nebula-purple transition-colors pointer-events-none" />
                                                <input 
                                                    type="time" 
                                                    defaultValue="15:00" 
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-white focus:outline-none focus:border-nebula-purple/50 focus:ring-1 focus:ring-nebula-purple/50 transition-all font-mono text-sm [color-scheme:dark]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">{t('schedule.timezone')}</label>
                                    <div className="relative group">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-nebula-cyan transition-colors pointer-events-none" />
                                        <select className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-nebula-cyan/50 focus:ring-1 focus:ring-nebula-cyan/50 transition-all appearance-none cursor-pointer">
                                            <option value="pst">{t('schedule.timezoneOptions.pst')}</option>
                                            <option value="est">{t('schedule.timezoneOptions.est')}</option>
                                            <option value="utc">{t('schedule.timezoneOptions.utc')}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">{t('schedule.inviteesLabel')}</label>
                                    <div className="relative group">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-nebula-cyan transition-colors pointer-events-none" />
                                        <input 
                                            type="text" 
                                            placeholder={t('schedule.inviteesPlaceholder')} 
                                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-nebula-cyan/50 focus:ring-1 focus:ring-nebula-cyan/50 transition-all"
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-4 pl-1">
                                        <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm flex items-center gap-2 group cursor-pointer hover:border-white/20 transition-colors">
                                            sarah@nebula.io <X className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
                                        </div>
                                        <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm flex items-center gap-2 group cursor-pointer hover:border-white/20 transition-colors">
                                            david@nebula.io <X className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Settings Sidebar */}
                        <div className="space-y-6">
                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-6">
                                <h3 className="font-display text-lg font-bold flex items-center gap-2 border-b border-white/5 pb-4">
                                    <Shield className="w-5 h-5 text-nebula-cyan" /> {t('schedule.security')}
                                </h3>
                                
                                <div className="flex items-center justify-between group cursor-pointer" onClick={() => setWaitingRoom(!waitingRoom)}>
                                    <div>
                                        <p className="text-sm font-medium text-white group-hover:text-nebula-cyan transition-colors select-none">{t('schedule.waitingRoom')}</p>
                                        <p className="text-xs text-gray-500 mt-0.5 select-none">{t('schedule.admitGuestsManually')}</p>
                                    </div>
                                    <button className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors relative ${waitingRoom ? 'bg-nebula-cyan/20 border border-nebula-cyan/50' : 'bg-black/50 border border-white/10'}`}>
                                        <div className={`w-4 h-4 rounded-full transition-transform ${waitingRoom ? 'bg-nebula-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)] translate-x-5' : 'bg-gray-500 translate-x-0'}`}></div>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between group cursor-pointer" onClick={() => setRequirePasscode(!requirePasscode)}>
                                    <div>
                                        <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors select-none">{t('schedule.requirePassword')}</p>
                                        <p className="text-xs text-gray-500 mt-0.5 select-none">{t('schedule.pinRequired')}</p>
                                    </div>
                                    <button className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors relative ${requirePasscode ? 'bg-nebula-cyan/20 border border-nebula-cyan/50' : 'bg-black/50 border border-white/10'}`}>
                                        <div className={`w-4 h-4 rounded-full transition-transform ${requirePasscode ? 'bg-nebula-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)] translate-x-5' : 'bg-gray-500 translate-x-0'}`}></div>
                                    </button>
                                </div>

                                <h3 className="font-display text-lg font-bold flex items-center gap-2 border-b border-white/5 pb-4 pt-4">
                                    <Settings2 className="w-5 h-5 text-nebula-purple" /> {t('schedule.advancedTitle')}
                                </h3>

                                <div className="flex items-center justify-between group cursor-pointer" onClick={() => setHostVideo(!hostVideo)}>
                                    <div>
                                        <p className="text-sm font-medium text-white group-hover:text-nebula-purple transition-colors select-none">{t('schedule.hostVideoOn')}</p>
                                        <p className="text-xs text-gray-500 mt-0.5 select-none">{t('schedule.hostVideoDesc')}</p>
                                    </div>
                                    <button className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors relative ${hostVideo ? 'bg-nebula-purple/20 border border-nebula-purple/50' : 'bg-black/50 border border-white/10'}`}>
                                        <div className={`w-4 h-4 rounded-full transition-transform ${hostVideo ? 'bg-nebula-purple shadow-[0_0_10px_rgba(138,43,226,0.5)] translate-x-5' : 'bg-gray-500 translate-x-0'}`}></div>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between group cursor-pointer" onClick={() => setAutoRecord(!autoRecord)}>
                                    <div>
                                        <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors select-none">{t('schedule.autoRecord')}</p>
                                        <p className="text-xs text-gray-500 mt-0.5 select-none">{t('schedule.autoRecordDesc')}</p>
                                    </div>
                                    <button className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors relative ${autoRecord ? 'bg-nebula-purple/20 border border-nebula-purple/50' : 'bg-black/50 border border-white/10'}`}>
                                        <div className={`w-4 h-4 rounded-full transition-transform ${autoRecord ? 'bg-nebula-purple shadow-[0_0_10px_rgba(138,43,226,0.5)] translate-x-5' : 'bg-gray-500 translate-x-0'}`}></div>
                                    </button>
                                </div>
                            </div>

                            <Link 
                                to="/invite" 
                                className="w-full relative group overflow-hidden rounded-full p-[1px] mt-4 block"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-nebula-cyan to-nebula-purple opacity-70 group-hover:opacity-100 transition-opacity duration-500"></span>
                                <div className="relative px-6 py-4 bg-[#030108] rounded-full flex items-center justify-center gap-2 group-hover:bg-transparent transition-colors duration-500">
                                    <span className="font-bold tracking-wide text-white">{t('schedule.generateLink')}</span>
                                    <LinkIcon className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
