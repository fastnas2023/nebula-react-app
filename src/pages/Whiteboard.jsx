import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, Download, X, MousePointer2, Hand, PenTool, Eraser, StickyNote, Edit2, Copy, Trash2, Mic, Video } from 'lucide-react';

export default function Whiteboard() {
    const navigate = useNavigate();

    return (
        <div className="h-[100dvh] w-full font-sans antialiased flex flex-col relative">
            
    <div className="bg-mesh"></div>
    <div className="bg-noise"></div>

    <div className="relative z-10 flex flex-col h-full w-full p-4 lg:p-6 gap-4 lg:gap-6">
        
        {/*  Header  */}
        <header className="flex justify-between items-center w-full glass-panel rounded-2xl px-6 py-4 flex-shrink-0">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-nebula-cyan to-nebula-purple flex items-center justify-center shadow-lg shadow-nebula-purple/20">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div>
                    <h1 className="font-display font-bold text-xl text-white">Product Architecture Sync</h1>
                    <div className="flex items-center gap-2 text-xs text-white/50 uppercase font-bold">
                        <span className="text-emerald-400">●</span> 01:24:39
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white/70">
                    <Users className="w-3.5 h-3.5 text-nebula-purple" /> 4 Collaborating
                </div>
                <button className="glass-button w-10 h-10 rounded-xl flex items-center justify-center text-white/70">
                    <Download className="w-5 h-5" />
                </button>
                <button onClick={() => navigate('/meeting')} className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-4 h-10 rounded-xl flex items-center gap-2 font-bold transition-colors text-sm">
                    <X className="w-4 h-4" /> Close Board
                </button>
            </div>
        </header>

        {/*  Main Content  */}
        <main className="flex-1 relative min-h-0 flex gap-4">
            
            {/*  Toolbar  */}
            <aside className="glass-panel rounded-2xl w-14 flex flex-col items-center py-4 gap-2 z-20 h-max self-center border-white/10 shadow-2xl shadow-black/50">
                <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors">
                    <MousePointer2 className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors">
                    <Hand className="w-5 h-5" />
                </button>
                <div className="w-8 h-px bg-white/10 my-1"></div>
                <button className="w-10 h-10 rounded-xl bg-nebula-purple shadow-lg shadow-nebula-purple/50 flex items-center justify-center text-white transition-colors border border-nebula-purple/50 relative hover:scale-105">
                    <PenTool className="w-5 h-5" />
                    <div className="absolute -right-1 -bottom-1 w-3 h-3 rounded-full bg-nebula-cyan border-2 border-[#0A041A]"></div>
                </button>
                <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors">
                    <Eraser className="w-5 h-5" />
                </button>
                <div className="w-8 h-px bg-white/10 my-1"></div>
                <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors">
                    <StickyNote className="w-5 h-5" />
                </button>
            </aside>

            {/*  Canvas Area  */}
            <div className="flex-1 whiteboard-canvas relative cursor-crosshair">
                
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <path d="M 300 150 Q 400 50 500 200 T 700 250" className="mock-path" />
                </svg>

                {/*  Sticky Note 1  */}
                <div className="sticky-note group/note cursor-grab active:cursor-grabbing" style={{"top":"250px","left":"350px"}}>
                    {/*  Context Menu Toolbar (Hover to reveal)  */}
                    <div className="absolute -top-12 left-0 right-0 glass-panel bg-black/80 text-white rounded-lg p-2 flex items-center justify-around opacity-0 group-hover/note:opacity-100 transition-opacity pointer-events-none group-hover/note:pointer-events-auto shadow-xl border border-white/20">
                        <button className="hover:text-nebula-cyan transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button className="hover:text-white transition-colors"><Copy className="w-4 h-4" /></button>
                        <div className="w-px h-4 bg-white/20"></div>
                        <button className="hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="text-xs font-bold text-yellow-800 uppercase mb-2">Architecture</div>
                    <p className="font-handwriting text-2xl leading-relaxed text-black">Redesign the checkout flow for mobile app.</p>
                </div>

                {/*  Sticky Note 2  */}
                <div className="sticky-note group/note cursor-grab active:cursor-grabbing" style={{"top":"150px","left":"650px","background":"linear-gradient(135deg, rgba(255, 138, 203, 0.95) 0%, rgba(255, 46, 147, 0.9) 100%)","borderLeftColor":"#9D174D","color":"white","transform":"rotate(3deg)"}}>
                    <div className="absolute -top-12 left-0 right-0 glass-panel bg-black/80 text-white rounded-lg p-2 flex items-center justify-around opacity-0 group-hover/note:opacity-100 transition-opacity pointer-events-none group-hover/note:pointer-events-auto shadow-xl border border-white/20">
                        <button className="hover:text-nebula-cyan transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button className="hover:text-white transition-colors"><Copy className="w-4 h-4" /></button>
                        <div className="w-px h-4 bg-white/20"></div>
                        <button className="hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="text-xs font-bold text-pink-200 uppercase mb-2">Performance</div>
                    <p className="font-handwriting text-2xl leading-relaxed">Check API latency issues on US-East region.</p>
                </div>

                {/*  Cursor Indicator  */}
                <div className="absolute top-[280px] left-[650px] pointer-events-none flex flex-col items-center">
                    <MousePointer2 className="w-6 h-6 text-nebula-cyan drop-shadow-md -ml-2 -mt-1" />
                    <div className="bg-nebula-cyan text-black text-[10px] px-2 py-0.5 rounded-full mt-1 shadow-lg shadow-nebula-cyan/50 whitespace-nowrap font-bold">David (Drawing)</div>
                </div>

                {/*  Floating Videos  */}
                <div className="absolute right-6 top-6 flex flex-col gap-3 z-30">
                    <div className="floating-video speaking group">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur px-1.5 py-0.5 rounded text-[9px] text-white font-bold flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div> Sarah
                        </div>
                    </div>
                    <div className="floating-video group">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-70" />
                        <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur px-1.5 py-0.5 rounded text-[9px] text-white/80 font-bold">David</div>
                    </div>
                </div>
                
                {/*  Minimap  */}
                <div className="absolute bottom-6 right-6 w-48 aspect-video glass-panel rounded-xl overflow-hidden border border-white/20 p-2 cursor-pointer hover:border-nebula-cyan/50 transition-colors shadow-2xl z-20 group">
                    <div className="w-full h-full bg-white/5 rounded relative border border-white/5 group-hover:bg-white/10 transition-colors">
                        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-nebula-cyan bg-nebula-cyan/10 rounded-sm"></div>
                        <div className="absolute top-[30%] left-[30%] w-4 h-4 bg-yellow-400 rotate-2 shadow-sm"></div>
                        <div className="absolute top-[40%] left-[50%] w-4 h-4 bg-pink-400 -rotate-3 shadow-sm"></div>
                    </div>
                    <div className="absolute bottom-3 right-3 text-[10px] text-white/80 font-bold">Minimap</div>
                </div>
                
            </div>
        </main>

        <footer className="glass-panel rounded-2xl px-6 py-3 flex justify-center items-center relative z-20 flex-shrink-0">
            <div className="flex items-center gap-3">
                <button className="glass-button active w-10 h-10 rounded-xl flex items-center justify-center text-white">
                    <Mic className="w-4 h-4 text-emerald-400" />
                </button>
                <button className="glass-button w-10 h-10 rounded-xl flex items-center justify-center text-white">
                    <Video className="w-4 h-4" />
                </button>
            </div>
        </footer>

    </div>

    

        </div>
    );
}
