import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Download, Play, Volume2, Maximize, Sparkles, FileText, CheckSquare, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Recording() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="bg-nebula-base text-white antialiased h-[100dvh] overflow-hidden flex flex-col relative">
            
    <div className="bg-noise"></div>

    {/*  Header  */}
    <header className="h-20 border-b border-white/10 flex items-center justify-between px-6 z-20 glass-panel shrink-0">
        <div className="flex items-center gap-6">
            <Link to="/home" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Link>
            <div>
                <h1 className="font-display text-xl font-bold">{t('recording.mockTitle')}</h1>
                <p className="text-xs text-gray-500 font-mono mt-1">{t('recording.mockSubtitle')}</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-white/10">
                <Share2 className="w-4 h-4" /> {t('recording.share')}
            </button>
            <button className="px-4 py-2 bg-nebula-cyan text-black hover:bg-cyan-400 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Download className="w-4 h-4" /> {t('recording.downloadMp4')}
            </button>
        </div>
    </header>

    <div className="flex-1 flex overflow-hidden z-10 relative">
        {/*  Left: Video Player  */}
        <main className="flex-[2] h-full flex flex-col p-6 gap-6 relative">
            {/*  Background Glow  */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 aspect-square bg-nebula-cyan/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="flex-1 bg-black rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl flex flex-col">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1600" className="flex-1 object-cover opacity-80" alt="Video Playback" />
                
                <div className="absolute top-4 right-4 w-48 aspect-video rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="PiP" />
                </div>

                {/*  Custom Player Controls  */}
                <div className="h-20 bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 flex items-center gap-6 shrink-0 relative z-20">
                    <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                        <Play className="w-5 h-5 ml-1" />
                    </button>

                    <div className="text-xs font-mono text-gray-400 w-16 text-right">12:04</div>
                    
                    {/*  Progress Bar  */}
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full relative cursor-pointer group">
                        <div className="absolute inset-y-0 left-0 bg-nebula-cyan rounded-full w-1/3 shadow-[0_0_10px_rgba(0,240,255,0.5)]"></div>
                        <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        {/*  AI Markers  */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-[15%] w-1.5 h-1.5 bg-nebula-purple rounded-full"></div>
                        <div className="absolute top-1/2 -translate-y-1/2 left-[45%] w-1.5 h-1.5 bg-nebula-magenta rounded-full"></div>
                    </div>

                    <div className="text-xs font-mono text-gray-400 w-16">45:12</div>

                    <div className="flex items-center gap-3">
                        <button className="text-gray-400 hover:text-white transition-colors"><Volume2 className="w-5 h-5" /></button>
                        <button className="text-gray-400 hover:text-white transition-colors"><Maximize className="w-5 h-5" /></button>
                    </div>
                </div>
            </div>

            {/*  Presenters  */}
            <div className="h-24 shrink-0 flex items-center gap-4">
                <div className="flex -space-x-4">
                    <img src="https://i.pravatar.cc/100?img=1" className="w-12 h-12 rounded-full border-2 border-[#030108]" />
                    <img src="https://i.pravatar.cc/100?img=3" className="w-12 h-12 rounded-full border-2 border-[#030108]" />
                    <img src="https://i.pravatar.cc/100?img=5" className="w-12 h-12 rounded-full border-2 border-[#030108]" />
                </div>
                <div className="text-sm font-medium text-gray-400">{t('recording.participantsSummary', { names: 'Sarah, David, and Alex' })}</div>
            </div>
        </main>

        {/*  Right: AI Summary & Transcript  */}
        <aside className="w-[450px] h-full border-l border-white/10 glass-panel flex flex-col shrink-0">
            {/*  Tabs  */}
            <div className="flex border-b border-white/10 p-2 gap-2 shrink-0">
                <button className="flex-1 py-2 px-4 rounded-lg bg-white/10 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-nebula-cyan" /> {t('recording.aiSummary')}
                </button>
                <button className="flex-1 py-2 px-4 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white font-medium text-sm transition-colors">{t('recording.transcript')}</button>
            </div>

            <div className="flex-1 overflow-y-auto scroll-hidden p-6 space-y-8">
                {/*  Executive Summary  */}
                <div className="ai-border bg-white/5 p-5 rounded-3xl">
                    <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2"><FileText className="w-4 h-4 text-nebula-purple" /> {t('recording.executiveSummary')}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed font-medium">{t('recording.mockSummaryDesc')}</p>
                </div>

                {/*  Action Items  */}
                <div>
                    <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2"><CheckSquare className="w-4 h-4 text-nebula-emerald" /> {t('recording.actionItems')}</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                            <input type="checkbox" className="mt-1 w-4 h-4 rounded border-white/20 bg-black/50 text-nebula-emerald focus:ring-nebula-emerald cursor-pointer" />
                            <div className="flex-1">
                                <p className="text-sm text-white font-medium">{t('recording.mockAction1Title')}</p>
                                <p className="text-xs text-gray-500 mt-1 font-mono">{t('recording.mockAction1Desc')}</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                            <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 rounded border-white/20 bg-nebula-emerald text-black cursor-pointer" />
                            <div className="flex-1">
                                <p className="text-sm text-gray-400 font-medium line-through">{t('recording.mockAction2Title')}</p>
                                <p className="text-xs text-gray-500 mt-1 font-mono">{t('recording.mockAction2Desc')}</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/*  Key Moments  */}
                <div>
                    <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-nebula-magenta" /> {t('recording.keyMoments')}</h3>
                    <div className="space-y-4 border-l-2 border-white/10 ml-2 pl-4">
                        <div className="relative cursor-pointer group">
                            <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-nebula-cyan group-hover:scale-150 transition-transform"></div>
                            <div className="text-xs font-mono text-nebula-cyan font-bold mb-1">05:12</div>
                            <p className="text-sm text-gray-300 group-hover:text-white transition-colors font-medium">{t('recording.mockMoment1Title')}</p>
                        </div>
                        <div className="relative cursor-pointer group">
                            <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-nebula-purple group-hover:scale-150 transition-transform"></div>
                            <div className="text-xs font-mono text-nebula-purple font-bold mb-1">12:04</div>
                            <p className="text-sm text-gray-300 group-hover:text-white transition-colors font-medium">{t('recording.mockMoment2Title')}</p>
                        </div>
                        <div className="relative cursor-pointer group">
                            <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors"></div>
                            <div className="text-xs font-mono text-gray-500 mb-1">38:45</div>
                            <p className="text-sm text-gray-300 group-hover:text-white transition-colors font-medium">{t('recording.mockMoment3Title')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    </div>

    

        </div>
    );
}
