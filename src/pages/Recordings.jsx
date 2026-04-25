import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Play, Calendar, Users, Clock, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';
import Background from '../components/Background';

export default function Recordings() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="h-[100dvh] w-full font-sans antialiased flex relative">
            <Background />
            <Sidebar />

            {/*  Main Content  */}
            <main className="flex-1 h-full overflow-y-auto relative z-10 p-6 lg:p-12 scroll-smooth">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="font-display font-bold text-4xl text-white tracking-tight">{t('sidebar.recordings')}</h1>
                    <div className="relative w-full max-w-sm hidden md:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input type="text" placeholder={t('dashboard.searchPlaceholder')} 
                            className="w-full search-bar rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-nebula-cyan/50 focus:ring-1 focus:ring-nebula-cyan/50" />
                    </div>
                </div>

                <div className="flex gap-4 mb-8">
                    <button className="glass-panel px-4 py-2 rounded-xl text-sm font-bold text-white border-nebula-cyan/30 bg-nebula-cyan/10">All Recordings</button>
                    <button className="glass-panel px-4 py-2 rounded-xl text-sm font-bold text-white/70 hover:text-white transition-colors">My Meetings</button>
                    <button className="glass-panel px-4 py-2 rounded-xl text-sm font-bold text-white/70 hover:text-white transition-colors">Shared with me</button>
                    <div className="ml-auto">
                        <button className="glass-panel px-4 py-2 rounded-xl text-sm font-bold text-white/70 hover:text-white transition-colors flex items-center gap-2">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                    </div>
                </div>

                <div className="glass-panel rounded-3xl overflow-hidden border border-white/5">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    <th className="px-6 py-5 text-xs font-bold text-white/50 uppercase tracking-wider">Meeting Name</th>
                                    <th className="px-6 py-5 text-xs font-bold text-white/50 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-5 text-xs font-bold text-white/50 uppercase tracking-wider">{t('dashboard.duration')}</th>
                                    <th className="px-6 py-5 text-xs font-bold text-white/50 uppercase tracking-wider">{t('dashboard.participants')}</th>
                                    <th className="px-6 py-5 text-xs font-bold text-white/50 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => navigate('/recording')}>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-nebula-cyan/20 text-nebula-cyan flex items-center justify-center flex-shrink-0">
                                                <Play className="w-4 h-4 ml-0.5" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-base">Design System Sync</div>
                                                <div className="text-xs text-white/40 mt-1">ID: DGN-1102-Y</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-sm text-white/70">
                                            <Calendar className="w-4 h-4 text-white/30" /> Oct 21, 2026
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-sm text-white/70">
                                            <Clock className="w-4 h-4 text-white/30" /> 1 hr 15 mins
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-sm text-white/70">
                                            <Users className="w-4 h-4 text-white/30" /> 4
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-bold text-sm transition-colors shadow-lg shadow-emerald-500/10">
                                            <Play className="w-4 h-4" /> {t('dashboard.play')}
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => navigate('/recording')}>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-nebula-purple/20 text-nebula-purple flex items-center justify-center flex-shrink-0">
                                                <Play className="w-4 h-4 ml-0.5" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-base">Q3 Roadmap Planning</div>
                                                <div className="text-xs text-white/40 mt-1">ID: Q3R-9921-X</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-sm text-white/70">
                                            <Calendar className="w-4 h-4 text-white/30" /> Oct 23, 2026
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-sm text-white/70">
                                            <Clock className="w-4 h-4 text-white/30" /> 45 mins
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-sm text-white/70">
                                            <Users className="w-4 h-4 text-white/30" /> 12
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-bold text-sm transition-colors shadow-lg shadow-emerald-500/10">
                                            <Play className="w-4 h-4" /> {t('dashboard.play')}
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => navigate('/recording')}>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-white/10 text-white/70 flex items-center justify-center flex-shrink-0">
                                                <Play className="w-4 h-4 ml-0.5" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-base">Engineering All-Hands</div>
                                                <div className="text-xs text-white/40 mt-1">ID: ENG-4421-M</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-sm text-white/70">
                                            <Calendar className="w-4 h-4 text-white/30" /> Oct 18, 2026
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-sm text-white/70">
                                            <Clock className="w-4 h-4 text-white/30" /> 58 mins
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-sm text-white/70">
                                            <Users className="w-4 h-4 text-white/30" /> 45
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-bold text-sm transition-colors shadow-lg shadow-emerald-500/10">
                                            <Play className="w-4 h-4" /> {t('dashboard.play')}
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
