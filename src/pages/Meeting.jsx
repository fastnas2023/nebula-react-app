import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, LayoutGrid, MicOff, Mic, Video, MonitorUp, PhoneOff, Info, Send, Sparkles, Bot, ListTodo, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NebulaLogo from '../components/NebulaLogo';

export default function Meeting() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "David Chen",
            time: "10:42 AM",
            text: "The new glassmorphism effect looks absolutely incredible! ✨",
            avatar: "https://i.pravatar.cc/100?img=2"
        }
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [isAiThinking, setIsAiThinking] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isAiThinking]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        
        const msg = {
            id: Date.now(),
            sender: t('meeting.you'),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: newMessage,
            avatar: "https://i.pravatar.cc/100?img=1" // Assuming user is img=1
        };
        
        setMessages([...messages, msg]);
        setNewMessage("");
    };

    const handleAiAction = (action) => {
        const userPrompt = {
            id: Date.now(),
            sender: t('meeting.you'),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: action.label,
            avatar: "https://i.pravatar.cc/100?img=1"
        };
        setMessages(prev => [...prev, userPrompt]);
        setIsAiThinking(true);

        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                sender: "Nebula AI",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                text: action.response,
                isAi: true
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsAiThinking(false);
        }, 1500);
    };

    const aiActions = [
        { id: 'summary', icon: <FileText className="w-3 h-3" />, label: "Summarize", response: "Here is a quick summary: David presented the new glassmorphism UI. Elena agreed it looks great. Next step: Finalize the color palette." },
        { id: 'action', icon: <ListTodo className="w-3 h-3" />, label: "Action Items", response: "1. David: Share the Figma link.\n2. You: Update the CSS variables.\n3. Elena: Review the mobile layout." },
    ];

    return (
        <div className="h-[100dvh] w-full font-sans antialiased flex flex-col relative overflow-hidden selection:bg-nebula-accent selection:text-white">
            
    <div className="bg-mesh"></div>
    <div className="bg-noise"></div>

    <div className="fixed top-24 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        <div className="glass-panel rounded-xl p-3 flex items-center gap-3 w-72 animate-slide-in shadow-xl shadow-black/50 pointer-events-auto cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                <UserPlus className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white truncate">Elena Rodriguez</div>
                <div className="text-xs text-white/50 truncate">Joined the meeting</div>
            </div>
        </div>
    </div>

    <div className="relative z-10 flex flex-col h-full w-full p-4 lg:p-6 gap-6">
        
        {/*  Header  */}
        <header className="flex justify-between items-center w-full glass-panel rounded-2xl px-5 py-2.5 animate-float" style={{"animationDuration":"8s"}}>
            <div className="flex items-center gap-4">
                <NebulaLogo showText={false} className="scale-90 origin-left" />
                <div className="-ml-2">
                    <h1 className="font-display font-bold text-lg tracking-wide text-white flex items-center gap-2">
                        Nebula <span className="text-white/40 font-light">|</span> <span className="gradient-text">Design Sync</span>
                    </h1>
                    <div className="flex items-center gap-2 text-[11px] text-white/50 font-bold tracking-wider uppercase mt-0.5">
                        <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div> 01:24:39</span>
                        <span>•</span>
                        <span>Room ID: NBL-8X92-K</span>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <div className="flex -space-x-2 mr-4">
                    <img src="https://i.pravatar.cc/100?img=1" className="w-7 h-7 rounded-full border-2 border-nebula-800 object-cover" />
                    <img src="https://i.pravatar.cc/100?img=2" className="w-7 h-7 rounded-full border-2 border-nebula-800 object-cover" />
                    <img src="https://i.pravatar.cc/100?img=3" className="w-7 h-7 rounded-full border-2 border-nebula-800 object-cover" />
                    <div className="w-7 h-7 rounded-full border-2 border-nebula-800 bg-white/10 flex items-center justify-center text-[10px] font-bold">+4</div>
                </div>
                <button className="glass-button w-9 h-9 rounded-xl flex items-center justify-center text-white/70">
                    <LayoutGrid className="w-4 h-4" />
                </button>
            </div>
        </header>

        {/*  Main Content Area  */}
        <main className="flex-1 flex gap-6 min-h-0 relative">
            
            {/*  Video Grid (Dynamic Flex/Grid based on content)  */}
            <div className="flex-1 flex flex-col lg:flex-row gap-4 h-full relative z-10">
                
                {/*  Active Speaker / Main Video (Takes up majority of space)  */}
                <div className="flex-[3] relative min-h-0">
                    <div className="voice-reactive-border"></div>
                    <div className="video-tile speaking relative group h-full w-full bg-black rounded-3xl overflow-hidden shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover object-top opacity-80" alt="Main speaker" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                        
                        <div className="absolute bottom-6 left-6 flex items-center gap-3 z-10">
                            <div className="w-12 h-12 rounded-full glass-panel p-1 relative">
                                <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-50"></div>
                                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" className="w-full h-full rounded-full object-cover relative z-10" />
                            </div>
                            <div>
                                <div className="font-display font-bold text-lg text-white drop-shadow-md">Sarah Jenkins</div>
                                <div className="text-sm text-emerald-300 font-bold drop-shadow flex items-center gap-1.5">
                                    <div className="flex items-end gap-0.5 h-2">
                                        <div className="w-0.5 bg-emerald-400 h-1 rounded-full animate-bounce"></div>
                                        <div className="w-0.5 bg-emerald-400 h-2 rounded-full animate-bounce" style={{"animationDelay":"0.1s"}}></div>
                                        <div className="w-0.5 bg-emerald-400 h-1.5 rounded-full animate-bounce" style={{"animationDelay":"0.2s"}}></div>
                                    </div>
                                    {t('meeting.speaking')}
                                </div>
                            </div>
                        </div>
                        
                        <div className="absolute top-6 left-6 flex gap-2 z-10">
                            <div className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-white/90 border-red-500/30 bg-red-500/10">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div> {t('meeting.recording')}
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Thumbnail Strip (Stack vertically on desktop, horizontally on mobile)  */}
                <div className="flex-1 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto min-h-0 snap-x lg:snap-y snap-mandatory pb-2 lg:pb-0 lg:pr-2 hide-scrollbar">
                    
                    {/* Thumbnail 1 */}
                    <div className="video-tile relative group bg-black flex-shrink-0 w-[240px] lg:w-full aspect-video lg:aspect-[4/3] snap-center rounded-2xl overflow-hidden shadow-lg border border-white/5">
                        <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover object-top opacity-70" alt="Participant 1" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-3 left-3">
                            <div className="font-display font-bold text-white text-sm">David Chen</div>
                        </div>
                        <div className="absolute top-3 right-3 flex gap-2">
                            <div className="glass-panel w-7 h-7 rounded-full flex items-center justify-center text-red-400 bg-red-500/10 border-red-500/20 backdrop-blur-md">
                                <MicOff className="w-3.5 h-3.5" />
                            </div>
                        </div>
                    </div>

                    {/* Thumbnail 2 */}
                    <div className="video-tile relative group bg-black flex-shrink-0 w-[240px] lg:w-full aspect-video lg:aspect-[4/3] snap-center rounded-2xl overflow-hidden shadow-lg border border-white/5">
                        <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover object-top opacity-70" alt="Participant 2" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-3 left-3">
                            <div className="font-display font-bold text-white text-sm">Elena Rodriguez</div>
                        </div>
                        <div className="absolute top-3 right-3 glass-panel w-7 h-7 rounded-full flex items-center justify-center text-white/70">
                            <Mic className="w-3.5 h-3.5" />
                        </div>
                    </div>

                    {/* Thumbnail 3 (Self) */}
                    <div className="video-tile relative group bg-black flex-shrink-0 w-[240px] lg:w-full aspect-video lg:aspect-[4/3] snap-center rounded-2xl overflow-hidden shadow-lg border border-emerald-500/30">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover object-top opacity-70" alt="You" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-3 left-3">
                            <div className="font-display font-bold text-white text-sm">{t('meeting.you')}</div>
                        </div>
                        <div className="absolute top-3 right-3 glass-panel w-7 h-7 rounded-full flex items-center justify-center text-emerald-400 bg-emerald-500/10 border-emerald-500/20 backdrop-blur-md">
                            <Mic className="w-3.5 h-3.5" />
                        </div>
                    </div>

                </div>
            </div>

            {/*  Chat Sidebar  */}
            <div className="flex flex-col gap-4 h-full relative z-10 hidden md:flex w-80 lg:w-96">
                <div className="glass-panel rounded-3xl p-4 border-white/5 flex-shrink-0">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-sm font-bold text-white">{t('meeting.summary')}</h3>
                            <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div> {t('meeting.aiNotes')}
                            </div>
                        </div>
                    </div>
                    <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                        <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
                            <span className="text-nebula-cyan font-bold">Sarah:</span> "So the consensus is we'll move forward with the Nebula aesthetic..."
                        </p>
                    </div>
                </div>

                <aside className="flex-1 glass-panel rounded-3xl flex flex-col overflow-hidden min-h-0">
                    <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <h2 className="font-display font-bold text-lg text-white">{t('meeting.messages')}</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-5 space-y-6 flex flex-col relative hide-scrollbar">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-3 ${msg.isAi ? 'bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]' : ''}`}>
                                {msg.isAi ? (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-nebula-cyan flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-emerald-500/20">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                ) : (
                                    <img src={msg.avatar} className="w-8 h-8 rounded-full mt-1 opacity-80 flex-shrink-0 object-cover" />
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className={`font-bold text-sm ${msg.isAi ? 'text-emerald-400 font-display' : 'text-white/90'}`}>{msg.sender}</span>
                                        <span className="text-[10px] text-white/40 font-bold">{msg.time}</span>
                                    </div>
                                    <div className={`text-sm leading-relaxed p-3 rounded-2xl rounded-tl-sm inline-block font-medium break-words w-full ${msg.isAi ? 'text-white/90 bg-transparent p-0 whitespace-pre-line' : 'text-white/70 bg-white/5 border border-white/5 max-w-[240px]'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isAiThinking && (
                            <div className="flex gap-3 bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-nebula-cyan flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
                                    <Sparkles className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '3s' }} />
                                </div>
                                <div>
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="font-bold text-sm text-emerald-400 font-display">Nebula AI</span>
                                    </div>
                                    <div className="flex gap-1.5 items-center h-5">
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    <div className="p-4 border-t border-white/5 bg-black/20 flex flex-col gap-3">
                        {/* AI Quick Actions */}
                        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                            <div className="flex items-center justify-center bg-white/5 rounded-full px-2 text-white/40">
                                <Bot className="w-3.5 h-3.5" />
                            </div>
                            {aiActions.map(action => (
                                <button 
                                    key={action.id}
                                    onClick={() => handleAiAction(action)}
                                    disabled={isAiThinking}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-bold whitespace-nowrap transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {action.icon} {action.label}
                                </button>
                            ))}
                        </div>

                        {/* Input Box */}
                        <div className="relative flex items-center">
                            <input 
                                type="text" 
                                placeholder={t('meeting.sendPlaceholder')} 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                disabled={isAiThinking}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-4 pr-14 text-sm text-white placeholder-white/30 focus:outline-none focus:border-nebula-purple/50 transition-all disabled:opacity-50" 
                            />
                            <button 
                                onClick={handleSendMessage}
                                disabled={isAiThinking || !newMessage.trim()}
                                className="absolute right-2 w-10 h-10 rounded-lg bg-nebula-cyan/20 hover:bg-nebula-cyan/40 text-nebula-cyan flex items-center justify-center transition-colors disabled:opacity-50 disabled:hover:bg-nebula-cyan/20"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </main>

        {/*  Control Bar  */}
        <footer className="glass-panel rounded-2xl px-6 py-4 flex justify-between items-center relative z-20">
            <div className="flex items-center gap-4">
                <button className="glass-button px-3 py-1.5 rounded-xl flex items-center gap-2 group relative">
                    <div className="flex items-end gap-0.5 h-3">
                        <div className="w-0.5 bg-emerald-400 h-1.5 rounded-full"></div>
                        <div className="w-0.5 bg-emerald-400 h-2.5 rounded-full"></div>
                        <div className="w-0.5 bg-emerald-400 h-3 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 tracking-wide">32ms</span>
                </button>
            </div>

            <div className="flex items-center gap-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <button className="glass-button w-12 h-12 rounded-xl flex items-center justify-center text-white group relative">
                    <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#030108]"></span>
                    </span>
                </button>
                <button className="glass-button w-12 h-12 rounded-xl flex items-center justify-center text-white group">
                    <Video className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
                <div className="w-px h-8 bg-white/10 mx-2 hidden sm:block"></div>
                <button className="glass-button active w-12 h-12 rounded-xl flex items-center justify-center text-white group hidden sm:flex" onClick={() => navigate('/screenshare')}>
                    <MonitorUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </button>
                <button className="glass-button danger px-6 h-12 rounded-xl flex items-center justify-center gap-2 font-bold tracking-wide shadow-lg shadow-red-900/20 ml-2" onClick={() => navigate('/home')}>
                    <PhoneOff className="w-4 h-4" /> {t('meeting.leave')}
                </button>
            </div>

            <div className="flex items-center gap-3">
                <button className="glass-button w-10 h-10 rounded-xl flex items-center justify-center text-white/70">
                    <Info className="w-4 h-4" />
                </button>
            </div>
        </footer>
    </div>

    

        </div>
    );
}
