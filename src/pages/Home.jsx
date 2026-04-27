import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, Users, Settings, ChevronUp, User, CreditCard, LogOut, Search, Bell, Video, PlusSquare, CalendarPlus, Link as LinkIcon, Plus, FolderOpen, Copy, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';
import Background from '../components/Background';

export default function Home() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [showCopiedToast, setShowCopiedToast] = React.useState(false);

    const copyLink = (link) => {
        navigator.clipboard.writeText(link);
        setShowCopiedToast(true);
        setTimeout(() => setShowCopiedToast(false), 3000);
    };

    return (
        <div className="h-[100dvh] w-full font-sans antialiased flex relative">
            <Background />
            <Sidebar />

            {/*  Main Content  */}
            <main className="flex-1 h-full overflow-y-auto relative z-10 p-6 lg:p-12 scroll-smooth">
        <div className="flex justify-between items-center mb-8">
            <div className="relative w-full max-w-md hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input type="text" placeholder={t('dashboard.searchPlaceholder')} 
                    className="w-full search-bar rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-nebula-purple/50 focus:ring-1 focus:ring-nebula-purple/50" />
            </div>
            <div className="flex items-center gap-4 ml-auto">
                <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/70 hover:text-white relative">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-nebula-accent rounded-full border-2 border-[#030108]"></span>
                </button>
                <div className="w-px h-6 bg-white/10 hidden md:block"></div>
                <div className="text-right hidden md:block tabular-nums">
                    <div className="font-display font-bold text-xl text-white tracking-wide">10:42 AM</div>
                    <div className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mt-0.5">October 24, 2026</div>
                </div>
            </div>
        </div>

        <header className="mb-8">
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-2 tracking-tight">{t('dashboard.greeting')}, <span className="gradient-text">Sarah</span></h1>
            <p className="text-white/60 text-base font-medium">{t('dashboard.meetingSummary', { count: 3 })}</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Left Column: Lists (Takes 75% width on large screens) */}
            <div className="xl:col-span-8 2xl:col-span-9 space-y-8">
                {/*  Upcoming Meetings  */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-display font-bold text-xl text-white">{t('dashboard.upcoming')}</h2>
                        <Link to="/recordings" className="text-sm text-white/50 hover:text-white transition-colors">{t('dashboard.viewAll')}</Link>
                    </div>

                    <div className="space-y-3">
                        {/*  LIVE Meeting Item  */}
                        <div className="glass-card rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-nebula-purple/50 bg-gradient-to-r from-nebula-purple/10 to-transparent relative overflow-hidden group">
                            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-nebula-purple to-nebula-cyan w-full shadow-[0_0_10px_#8A2BE2] animate-progress"></div>
                            
                            <div className="flex items-center gap-4 z-10 flex-1 min-w-0">
                                <div className="text-center min-w-[70px]">
                                    <div className="text-[11px] text-nebula-purple font-bold flex items-center justify-center gap-1.5 mb-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-nebula-purple animate-pulse"></span> {t('dashboard.live')}
                                    </div>
                                    <div className="text-[10px] text-white/40">{t('dashboard.ends')} 11:45 AM</div>
                                </div>
                                <div className="w-px h-8 bg-white/10 hidden md:block"></div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-white text-base mb-0.5 truncate group-hover:text-nebula-purple transition-colors" title="Design System Sync">Design System Sync</h4>
                                    <div className="flex items-center gap-2 text-xs text-white/50 font-medium truncate">
                                        <Users className="w-3.5 h-3.5 flex-shrink-0" /> <span className="truncate">Product Team</span> <span className="mx-1 flex-shrink-0">•</span> <span className="flex-shrink-0">ID: NBL-8X92-K</span>
                                        <button 
                                            onClick={() => copyLink('https://nebula.meeting/room/NBL-8X92-K')}
                                            className="ml-2 text-white/40 hover:text-white transition-colors"
                                            title="Copy Invite Link"
                                        >
                                            <Copy className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mt-2 md:mt-0 justify-between md:justify-end z-10">
                                <div className="flex -space-x-2 mr-2">
                                    <img src="https://i.pravatar.cc/100?img=1" className="w-7 h-7 rounded-full border-2 border-nebula-800" />
                                    <img src="https://i.pravatar.cc/100?img=2" className="w-7 h-7 rounded-full border-2 border-nebula-800" />
                                    <img src="https://i.pravatar.cc/100?img=3" className="w-7 h-7 rounded-full border-2 border-nebula-800" />
                                </div>
                                <Link to="/setup" className="bg-nebula-purple hover:bg-purple-500 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(138,43,226,0.5)] hover:shadow-[0_0_30px_rgba(138,43,226,0.8)] hover:-translate-y-0.5 flex items-center justify-center">
                                    {t('dashboard.joinNow')}
                                </Link>
                            </div>
                        </div>

                        {/*  Normal Meeting Item  */}
                        <div className="glass-card rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5 hover:border-white/20 transition-all group">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className="text-center min-w-[70px] opacity-70">
                                    <div className="text-[11px] font-bold text-white mb-1">02:30 PM</div>
                                    <div className="text-[10px] text-white/40">1 Hour</div>
                                </div>
                                <div className="w-px h-8 bg-white/10 hidden md:block"></div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-white text-base mb-0.5 truncate group-hover:text-nebula-cyan transition-colors" title="Weekly Engineering All-Hands">Weekly Engineering All-Hands</h4>
                                    <div className="flex items-center gap-2 text-xs text-white/50 font-medium truncate">
                                        <Users className="w-3.5 h-3.5 flex-shrink-0" /> <span className="truncate">Engineering</span> <span className="mx-1 flex-shrink-0">•</span> <span className="flex-shrink-0">ID: ENG-4421-M</span>
                                        <button 
                                            onClick={() => copyLink('https://nebula.meeting/room/ENG-4421-M')}
                                            className="ml-2 text-white/40 hover:text-white transition-colors"
                                            title="Copy Invite Link"
                                        >
                                            <Copy className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mt-2 md:mt-0 justify-between md:justify-end flex-shrink-0">
                                <div className="flex -space-x-2 mr-2">
                                    <div className="w-7 h-7 rounded-full border-2 border-nebula-800 bg-white/10 flex items-center justify-center text-[9px] font-bold">+12</div>
                                </div>
                                <Link to="/schedule" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors flex items-center justify-center">
                                    {t('dashboard.details')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Recordings & History  */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-display font-bold text-xl text-white">{t('dashboard.history')}</h2>
                    </div>
                    <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <th className="px-6 py-3 text-[11px] font-bold text-white/50 uppercase tracking-wider">Meeting Name</th>
                                        <th className="px-6 py-3 text-[11px] font-bold text-white/50 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-[11px] font-bold text-white/50 uppercase tracking-wider">{t('dashboard.duration')}</th>
                                        <th className="px-6 py-3 text-[11px] font-bold text-white/50 uppercase tracking-wider">{t('dashboard.participants')}</th>
                                        <th className="px-6 py-3 text-[11px] font-bold text-white/50 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <tr className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => navigate('/recording')}>
                                        <td className="px-6 py-3">
                                            <div className="font-bold text-white text-sm">Q3 Roadmap Planning</div>
                                            <div className="text-[11px] text-white/40 mt-0.5">ID: Q3R-9921-X</div>
                                        </td>
                                        <td className="px-6 py-3 text-xs text-white/70">Oct 23, 2026</td>
                                        <td className="px-6 py-3 text-xs text-white/70">45 mins</td>
                                        <td className="px-6 py-3 text-xs text-white/70">12</td>
                                        <td className="px-6 py-3 text-right">
                                            <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-bold text-xs transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                                                <Play className="w-3.5 h-3.5" /> {t('dashboard.play')}
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => navigate('/recording')}>
                                        <td className="px-6 py-3">
                                            <div className="font-bold text-white text-sm">Design Sync</div>
                                            <div className="text-[11px] text-white/40 mt-0.5">ID: DGN-1102-Y</div>
                                        </td>
                                        <td className="px-6 py-3 text-xs text-white/70">Oct 21, 2026</td>
                                        <td className="px-6 py-3 text-xs text-white/70">1 hr 15 mins</td>
                                        <td className="px-6 py-3 text-xs text-white/70">4</td>
                                        <td className="px-6 py-3 text-right">
                                            <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-bold text-xs transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                                                <Play className="w-3.5 h-3.5" /> {t('dashboard.play')}
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Command Center & Stats (Takes 25% width on large screens) */}
            <div className="xl:col-span-4 2xl:col-span-3 space-y-6">
                {/* Quick Actions Widget */}
                <div className="glass-panel p-5 rounded-3xl border border-white/5 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nebula-cyan via-nebula-purple to-nebula-accent opacity-70"></div>
                    <h3 className="font-display font-bold text-base text-white mb-4 uppercase tracking-widest opacity-80">Quick Actions</h3>
                    <div className="space-y-3">
                        <Link to="/setup" className="w-full group flex items-center gap-4 p-3 rounded-2xl bg-nebula-purple/20 border border-nebula-purple/30 hover:bg-nebula-purple/30 transition-all shadow-[0_0_15px_rgba(138,43,226,0.1)]">
                            <div className="w-12 h-12 rounded-xl bg-nebula-purple text-white flex items-center justify-center shadow-[0_0_15px_rgba(138,43,226,0.5)] group-hover:scale-105 transition-transform flex-shrink-0">
                                <Video className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-white text-sm truncate">{t('dashboard.newMeeting')}</div>
                                <div className="text-[11px] text-white/50 truncate mt-0.5">{t('dashboard.startInstant')}</div>
                            </div>
                        </Link>
                        
                        <Link to="/setup" className="w-full group flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-white/10 text-nebula-cyan flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                                <PlusSquare className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-white text-sm truncate">{t('dashboard.joinMeeting')}</div>
                                <div className="text-[11px] text-white/50 truncate mt-0.5">{t('dashboard.enterId')}</div>
                            </div>
                        </Link>

                        <Link to="/schedule" className="w-full group flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                            <div className="w-12 h-12 rounded-xl bg-white/10 text-nebula-accent flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                                <CalendarPlus className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-white text-sm truncate">{t('dashboard.schedule')}</div>
                                <div className="text-[11px] text-white/50 truncate mt-0.5">{t('dashboard.planAhead')}</div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* System Status / Network Widget */}
                <div className="glass-panel p-5 rounded-3xl border border-white/5">
                    <h3 className="font-display font-bold text-sm text-white mb-4 uppercase tracking-widest opacity-80 flex items-center justify-between">
                        System Status
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-[10px] text-emerald-400 font-mono">ALL SYSTEMS NOMINAL</span>
                        </div>
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-white/50">US-East (Virginia)</span>
                                <span className="text-emerald-400 font-mono">12ms</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-400 w-[95%]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-white/50">EU-Central (Frankfurt)</span>
                                <span className="text-nebula-cyan font-mono">45ms</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-nebula-cyan w-[80%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </main>

    {showCopiedToast && (
        <div className="fixed bottom-8 right-8 z-[70] animate-slide-in pointer-events-auto">
            <div className="glass-panel rounded-full py-3 px-6 flex items-center gap-3 border-emerald-500/30 bg-emerald-500/10 shadow-xl shadow-emerald-500/20">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                </div>
                <span className="text-sm font-bold text-white/90">Link copied to clipboard!</span>
            </div>
        </div>
    )}

        </div>
    );
}
