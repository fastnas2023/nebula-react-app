import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, Users, Settings, ChevronUp, User, CreditCard, LogOut, Search, Bell, Video, PlusSquare, CalendarPlus, Link as LinkIcon, Plus, FolderOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';
import Background from '../components/Background';

export default function Home() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="h-[100dvh] w-full font-sans antialiased flex relative">
            <Background />
            <Sidebar />

            {/*  Main Content  */}
            <main className="flex-1 h-full overflow-y-auto relative z-10 p-6 lg:p-12 scroll-smooth">
        <div className="flex justify-between items-center mb-12">
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

        <header className="mb-10">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-3 tracking-tight">{t('dashboard.greeting')}, <span className="gradient-text">Sarah</span></h1>
            <p className="text-white/60 text-lg font-medium">{t('dashboard.meetingSummary', { count: 3 })}</p>
        </header>

        {/*  Quick Actions  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Link to="/setup" className="glass-panel p-6 rounded-3xl flex flex-col items-start gap-4 hover-sweep group hover:-translate-y-1 transition-all duration-300 border border-white/5 hover:border-nebula-purple/50">
                <div className="w-14 h-14 bg-nebula-purple/20 rounded-2xl flex items-center justify-center text-nebula-purple group-hover:scale-110 transition-transform">
                    <Video className="w-6 h-6" />
                </div>
                <div className="text-left">
                    <h3 className="font-display font-bold text-2xl text-white mb-1">{t('dashboard.newMeeting')}</h3>
                    <p className="text-white/50 text-sm font-medium">{t('dashboard.startInstant')}</p>
                </div>
            </Link>

            <Link to="/setup" className="glass-panel p-6 rounded-3xl flex flex-col items-start gap-4 hover-sweep group hover:-translate-y-1 transition-all duration-300 border border-white/5 hover:border-nebula-cyan/50">
                <div className="w-14 h-14 bg-nebula-cyan/20 rounded-2xl flex items-center justify-center text-nebula-cyan group-hover:scale-110 transition-transform">
                    <PlusSquare className="w-6 h-6" />
                </div>
                <div className="text-left">
                    <h3 className="font-display font-bold text-2xl text-white mb-1">{t('dashboard.joinMeeting')}</h3>
                    <p className="text-white/50 text-sm font-medium">{t('dashboard.enterId')}</p>
                </div>
            </Link>

            <Link to="/schedule" className="glass-panel p-6 rounded-3xl flex flex-col items-start gap-4 hover-sweep group hover:-translate-y-1 transition-all duration-300 border border-white/5 hover:border-nebula-accent/50">
                <div className="w-14 h-14 bg-nebula-accent/20 rounded-2xl flex items-center justify-center text-nebula-accent group-hover:scale-110 transition-transform">
                    <CalendarPlus className="w-6 h-6" />
                </div>
                <div className="text-left">
                    <h3 className="font-display font-bold text-2xl text-white mb-1">{t('dashboard.schedule')}</h3>
                    <p className="text-white/50 text-sm font-medium">{t('dashboard.planAhead')}</p>
                </div>
            </Link>
        </div>

        {/*  Upcoming Meetings  */}
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-2xl text-white">{t('dashboard.upcoming')}</h2>
                <Link to="/schedule" className="text-white/50 hover:text-white transition-colors">{t('dashboard.viewAll')}</Link>
            </div>

            <div className="space-y-4">
                {/*  LIVE Meeting Item  */}
                <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-nebula-purple/50 bg-gradient-to-r from-nebula-purple/10 to-transparent relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-nebula-purple to-nebula-cyan w-full shadow-[0_0_10px_#8A2BE2] animate-progress"></div>
                    
                    <div className="flex items-center gap-6 z-10 flex-1 min-w-0">
                        <div className="text-center min-w-[80px]">
                            <div className="text-sm text-nebula-purple font-bold flex items-center justify-center gap-1.5 mb-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-nebula-purple animate-pulse"></span> {t('dashboard.live')}
                            </div>
                            <div className="text-xs text-white/40">{t('dashboard.ends')} 11:45 AM</div>
                        </div>
                        <div className="w-px h-10 bg-white/10 hidden md:block"></div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white text-lg mb-1 truncate" title="Design System Sync">Design System Sync</h4>
                            <div className="flex items-center gap-2 text-sm text-white/50 font-medium truncate">
                                <Users className="w-4 h-4 flex-shrink-0" /> <span className="truncate">Product Team</span> <span className="mx-1 flex-shrink-0">•</span> <span className="flex-shrink-0">ID: NBL-8X92-K</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 md:mt-0 justify-between md:justify-end z-10">
                        <div className="flex -space-x-2 mr-2">
                            <img src="https://i.pravatar.cc/100?img=1" className="w-8 h-8 rounded-full border-2 border-nebula-800" />
                            <img src="https://i.pravatar.cc/100?img=2" className="w-8 h-8 rounded-full border-2 border-nebula-800" />
                            <img src="https://i.pravatar.cc/100?img=3" className="w-8 h-8 rounded-full border-2 border-nebula-800" />
                        </div>
                        <Link to="/setup" className="bg-nebula-purple hover:bg-purple-500 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(138,43,226,0.5)] hover:shadow-[0_0_30px_rgba(138,43,226,0.8)] hover:-translate-y-1 flex items-center justify-center">
                            {t('dashboard.joinNow')}
                        </Link>
                    </div>
                </div>

                {/*  Normal Meeting Item  */}
                <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5 hover:border-white/20">
                    <div className="flex items-center gap-6 flex-1 min-w-0">
                        <div className="text-center min-w-[80px] opacity-70">
                            <div className="text-sm font-bold text-white mb-1">02:30 PM</div>
                            <div className="text-xs text-white/40">1 Hour</div>
                        </div>
                        <div className="w-px h-10 bg-white/10 hidden md:block"></div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white text-lg mb-1 truncate" title="Weekly Engineering All-Hands">Weekly Engineering All-Hands</h4>
                            <div className="flex items-center gap-2 text-sm text-white/50 font-medium truncate">
                                <Users className="w-4 h-4 flex-shrink-0" /> <span className="truncate">Engineering</span> <span className="mx-1 flex-shrink-0">•</span> <span className="flex-shrink-0">ID: ENG-4421-M</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 md:mt-0 justify-between md:justify-end flex-shrink-0">
                        <div className="flex -space-x-2 mr-2">
                            <div className="w-8 h-8 rounded-full border-2 border-nebula-800 bg-white/10 flex items-center justify-center text-[10px] font-bold">+12</div>
                        </div>
                        <Link to="/schedule" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-2.5 rounded-full font-bold transition-colors flex items-center justify-center">
                            {t('dashboard.details')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </main>

        </div>
    );
}
