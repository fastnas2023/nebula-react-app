import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, LayoutGrid, MicOff, Mic, Video, VideoOff, MonitorUp, PhoneOff, Info, Send, Sparkles, Bot, ListTodo, FileText, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NebulaLogo from '../components/NebulaLogo';
import useMediaStore from '../store/useMediaStore';
import useGalleryLayout from '../hooks/useGalleryLayout';

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
    const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
    const [showNotification, setShowNotification] = useState(true);
    
    // Global Media States
    const displayName = useMediaStore(state => state.displayName);
    const selectedVideoId = useMediaStore(state => state.selectedVideoId);
    const selectedAudioId = useMediaStore(state => state.selectedAudioId);
    const isMuted = useMediaStore(state => state.isAudioMuted);
    const isVideoOff = useMediaStore(state => state.isVideoMuted);
    const toggleAudio = useMediaStore(state => state.toggleAudio);
    const toggleVideo = useMediaStore(state => state.toggleVideo);
    
    // UI Interaction States
    const [isGalleryView, setIsGalleryView] = useState(false);
    
    // Dynamic Mock Data States
    const [meetingSeconds, setMeetingSeconds] = useState(5079); // 01:24:39
    const [latency, setLatency] = useState(32);
    const [audioLevels, setAudioLevels] = useState([30, 60, 40]);
    
    const messagesEndRef = useRef(null);
    const localVideoRef = useRef(null);
    const [localStream, setLocalStream] = useState(null);
    
    // Dynamic Layout Engine for Gallery View
    const { containerRef: galleryContainerRef, layout: galleryLayout } = useGalleryLayout(4, 16 / 9, 16);

    // Request WebRTC Media Stream
    useEffect(() => {
        let activeStream = null;

        const getMedia = async () => {
            try {
                const constraints = {
                    video: selectedVideoId ? { deviceId: { exact: selectedVideoId } } : true,
                    audio: selectedAudioId ? { deviceId: { exact: selectedAudioId } } : true
                };
                
                activeStream = await navigator.mediaDevices.getUserMedia(constraints);
                
                // Apply initial mute states
                activeStream.getVideoTracks().forEach(t => t.enabled = !isVideoOff);
                activeStream.getAudioTracks().forEach(t => t.enabled = !isMuted);

                setLocalStream(activeStream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = activeStream;
                }
            } catch (err) {
                console.error("Failed to get local stream in meeting", err);
            }
        };

        getMedia();

        return () => {
            if (activeStream) {
                activeStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [selectedVideoId, selectedAudioId]);

    // Apply Mute State Changes to actual stream
    useEffect(() => {
        if (localStream) {
            localStream.getVideoTracks().forEach(t => t.enabled = !isVideoOff);
            localStream.getAudioTracks().forEach(t => t.enabled = !isMuted);
        }
    }, [isVideoOff, isMuted, localStream]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isAiThinking]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    // Dynamic Mock Data Generators
    useEffect(() => {
        // 1. Meeting Timer
        const timeInterval = setInterval(() => {
            setMeetingSeconds(s => s + 1);
        }, 1000);
        
        // 2. Network Latency Jitter
        const latencyInterval = setInterval(() => {
            setLatency(prev => {
                const jitter = Math.floor(Math.random() * 9) - 4; // -4 to +4 ms
                let next = prev + jitter;
                return next < 12 ? 12 : (next > 80 ? 80 : next);
            });
        }, 2500);

        // 3. Audio Waveform Animation
        const audioInterval = setInterval(() => {
            setAudioLevels([
                Math.random() * 50 + 20,
                Math.random() * 80 + 20,
                Math.random() * 60 + 20
            ]);
        }, 150);

        return () => {
            clearInterval(timeInterval);
            clearInterval(latencyInterval);
            clearInterval(audioInterval);
        };
    }, []);

    const formatTime = (totalSeconds) => {
        const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

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
        { id: 'summary', icon: <FileText className="w-3 h-3" />, label: t('meeting.aiActionSummarize'), response: "Here is a quick summary: David presented the new glassmorphism UI. Elena agreed it looks great. Next step: Finalize the color palette." },
        { id: 'action', icon: <ListTodo className="w-3 h-3" />, label: t('meeting.aiActionItems'), response: "1. David: Share the Figma link.\n2. You: Update the CSS variables.\n3. Elena: Review the mobile layout." },
    ];

    return (
        <div className="h-[100dvh] w-full font-sans antialiased flex flex-col relative overflow-hidden selection:bg-nebula-accent selection:text-white">
            
    <div className="bg-mesh"></div>
    <div className="bg-noise"></div>

    {showNotification && (
        <div className="fixed top-24 right-6 z-50 flex flex-col gap-3 pointer-events-none">
            <div className="glass-panel rounded-xl p-3 flex items-center gap-3 w-72 animate-slide-in shadow-xl shadow-black/50 pointer-events-auto cursor-pointer group" onClick={() => setShowNotification(false)}>
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                    <UserPlus className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white truncate">Elena Rodriguez</div>
                    <div className="text-xs text-white/50 truncate">{t('meeting.joinedMeeting')}</div>
                </div>
            </div>
        </div>
    )}

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
                        <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div> {formatTime(meetingSeconds)}</span>
                        <span>•</span>
                        <span>{t('meeting.roomIdLabel', { id: 'NBL-8X92-K' })}</span>
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
                <button 
                    onClick={() => setIsGalleryView(!isGalleryView)}
                    className={`glass-button w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${isGalleryView ? 'bg-nebula-cyan/20 text-nebula-cyan border-nebula-cyan/30' : 'text-gray-300 hover:text-white'}`}
                    title={isGalleryView ? "Speaker View" : "Gallery View"}
                >
                    <LayoutGrid className="w-4 h-4" />
                </button>
            </div>
        </header>

        {/*  Main Content Area  */}
        <main className="flex-1 flex gap-6 min-h-0 relative">
            
            {/*  Video Grid (Dynamic Flex/Grid based on content)  */}
            <div 
                ref={galleryContainerRef}
                className={`flex-1 flex gap-4 h-full relative z-10 ${isGalleryView ? 'flex-wrap justify-center content-center overflow-y-auto hide-scrollbar' : 'flex-col lg:flex-row'}`}
            >
                
                {/*  Active Speaker / Main Video (Takes up majority of space)  */}
                <div 
                    className={`${isGalleryView ? 'flex-shrink-0' : 'flex-[3] min-h-0'} relative transition-all duration-500`}
                    style={isGalleryView && galleryLayout.width > 0 ? { width: `${galleryLayout.width}px`, height: `${galleryLayout.height}px` } : {}}
                >
                    <div className="voice-reactive-border"></div>
                    <div className="video-tile speaking relative group h-full w-full bg-[#030108] rounded-3xl overflow-hidden shadow-2xl border border-white/5 flex items-center justify-center">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-contain opacity-90" alt="Main speaker" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                        
                        <div className="absolute bottom-6 left-6 flex items-center gap-3 z-10">
                            <div className={`rounded-full glass-panel p-1 relative ${isGalleryView ? 'w-8 h-8' : 'w-12 h-12'}`}>
                                <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-50"></div>
                                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" className="w-full h-full rounded-full object-cover relative z-10" />
                            </div>
                            <div>
                                <div className={`font-display font-bold text-white drop-shadow-md ${isGalleryView ? 'text-sm' : 'text-lg'}`}>Sarah Jenkins</div>
                                <div className={`text-emerald-300 font-bold drop-shadow flex items-center gap-1.5 ${isGalleryView ? 'text-xs' : 'text-sm'}`}>
                                    <div className="flex items-end gap-[1px] h-2.5">
                                        <div className="w-[3px] bg-emerald-400 rounded-full transition-all duration-100" style={{ height: `${audioLevels[0]}%` }}></div>
                                        <div className="w-[3px] bg-emerald-400 rounded-full transition-all duration-100" style={{ height: `${audioLevels[1]}%` }}></div>
                                        <div className="w-[3px] bg-emerald-400 rounded-full transition-all duration-100" style={{ height: `${audioLevels[2]}%` }}></div>
                                    </div>
                                    {t('meeting.speaking')}
                                </div>
                            </div>
                        </div>
                        
                        <div className="absolute top-6 left-6 flex gap-2 z-10">
                            <div className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold text-white/90 border-red-500/30 bg-red-500/10">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div> {t('meeting.recording')}
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Thumbnail Strip (Stack vertically on desktop, horizontally on mobile)  */}
                <div className={`${isGalleryView ? 'contents' : 'flex-1 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto min-h-0 snap-x lg:snap-y snap-mandatory pb-2 lg:pb-0 lg:pr-2 hide-scrollbar'}`}>
                    
                    {/* Thumbnail 1 */}
                    <div 
                        className={`video-tile relative group bg-black flex-shrink-0 ${isGalleryView ? '' : 'w-[240px] lg:w-full aspect-video'} snap-center rounded-2xl overflow-hidden shadow-lg border border-white/5 transition-all duration-500`}
                        style={isGalleryView && galleryLayout.width > 0 ? { width: `${galleryLayout.width}px`, height: `${galleryLayout.height}px` } : {}}
                    >
                        <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-contain bg-[#030108] opacity-90" alt="Participant 1" />
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
                    <div 
                        className={`video-tile relative group bg-black flex-shrink-0 ${isGalleryView ? '' : 'w-[240px] lg:w-full aspect-video'} snap-center rounded-2xl overflow-hidden shadow-lg border border-white/5 transition-all duration-500`}
                        style={isGalleryView && galleryLayout.width > 0 ? { width: `${galleryLayout.width}px`, height: `${galleryLayout.height}px` } : {}}
                    >
                        <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-contain bg-[#030108] opacity-90" alt="Participant 2" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-3 left-3">
                            <div className="font-display font-bold text-white text-sm">Elena Rodriguez</div>
                        </div>
                        <div className="absolute top-3 right-3 glass-panel w-7 h-7 rounded-full flex items-center justify-center text-white/70">
                            <Mic className="w-3.5 h-3.5" />
                        </div>
                    </div>

                    {/* Thumbnail 3 (Self) */}
                    <div 
                        className={`video-tile relative group bg-black flex-shrink-0 ${isGalleryView ? '' : 'w-[240px] lg:w-full aspect-video'} snap-center rounded-2xl overflow-hidden shadow-lg ${isGalleryView ? 'border-white/5' : 'border-emerald-500/30'} transition-all duration-500 flex items-center justify-center`}
                        style={isGalleryView && galleryLayout.width > 0 ? { width: `${galleryLayout.width}px`, height: `${galleryLayout.height}px` } : {}}
                    >
                        
                        <video 
                            ref={localVideoRef}
                            autoPlay 
                            playsInline 
                            muted // Always mute local playback to prevent echo
                            className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoOff ? 'opacity-0' : 'opacity-100'} scale-x-[-1] bg-[#030108]`} 
                        />
                        
                        {isVideoOff && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0514]">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-2">
                                    <span className="text-lg font-display font-bold text-white/50">{displayName ? displayName.charAt(0).toUpperCase() : '?'}</span>
                                </div>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-3 left-3">
                            <div className="font-display font-bold text-white text-sm">{t('meeting.you')} ({displayName})</div>
                        </div>
                        <div className={`absolute top-3 right-3 glass-panel w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${isMuted ? 'text-red-400 bg-red-500/10 border-red-500/20' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'}`}>
                            {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
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
                    <div className="bg-black/50 rounded-xl p-3 border border-white/10">
                        <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
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
                                        <span className={`font-bold text-sm ${msg.isAi ? 'text-emerald-400 font-display' : 'text-white'}`}>{msg.sender}</span>
                                        <span className="text-[10px] text-gray-400 font-bold">{msg.time}</span>
                                    </div>
                                    <div className={`text-sm leading-relaxed p-3 rounded-2xl rounded-tl-sm inline-block font-medium break-words w-full ${msg.isAi ? 'text-white bg-transparent p-0 whitespace-pre-line' : 'text-gray-200 bg-white/10 border border-white/10 max-w-[240px]'}`}>
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
                            <div className="flex items-center justify-center bg-white/10 rounded-full px-2 text-gray-300">
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
                                className="w-full bg-white/10 border border-white/20 rounded-xl py-3.5 pl-4 pr-14 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-nebula-purple/50 transition-all disabled:opacity-50" 
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
                <button className="glass-button px-3 py-1.5 rounded-xl flex items-center gap-2 group relative" title="Network Latency">
                    <div className="flex items-end gap-0.5 h-3">
                        <div className="w-0.5 bg-emerald-400 h-1.5 rounded-full"></div>
                        <div className="w-0.5 bg-emerald-400 h-2.5 rounded-full"></div>
                        <div className="w-0.5 bg-emerald-400 h-3 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 tracking-wide transition-all duration-300">{latency}ms</span>
                </button>
            </div>

            <div className="flex items-center gap-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <button 
                    onClick={toggleAudio}
                    className={`glass-button w-12 h-12 rounded-xl flex items-center justify-center group relative transition-colors ${isMuted ? 'bg-red-500/20 text-red-500 border-red-500/30' : 'text-white hover:bg-white/10'}`}
                    title={isMuted ? "Unmute" : "Mute"}
                >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                    {!isMuted && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#030108]"></span>
                        </span>
                    )}
                </button>
                <button 
                    onClick={toggleVideo}
                    className={`glass-button w-12 h-12 rounded-xl flex items-center justify-center group transition-colors ${isVideoOff ? 'bg-red-500/20 text-red-500 border-red-500/30' : 'text-white hover:bg-white/10'}`}
                    title={isVideoOff ? "Start Video" : "Stop Video"}
                >
                    {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                </button>
                <div className="w-px h-8 bg-white/10 mx-2 hidden sm:block"></div>
                <button className="glass-button active w-12 h-12 rounded-xl flex items-center justify-center text-white group hidden sm:flex" onClick={() => navigate('/screenshare')}>
                    <MonitorUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </button>
                <button 
                    className="glass-button danger px-6 h-12 rounded-xl flex items-center justify-center gap-2 font-bold tracking-wide shadow-lg shadow-red-900/20 ml-2 transition-all hover:scale-105" 
                    onClick={() => setShowLeaveConfirm(true)}
                >
                    <PhoneOff className="w-4 h-4" /> {t('meeting.leave')}
                </button>
            </div>

            <div className="flex items-center gap-3">
                <button className="glass-button w-10 h-10 rounded-xl flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                    <Info className="w-4 h-4" />
                </button>
            </div>
        </footer>
    </div>

    {showLeaveConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-nebula-900 border border-white/10 p-6 rounded-3xl shadow-2xl max-w-sm w-full mx-4 animate-scale-in">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                        <h3 className="text-xl font-display font-bold text-white">{t('meeting.leaveMeetingTitle')}</h3>
                        <p className="text-sm text-white/60 mt-1">{t('meeting.leaveMeetingDesc')}</p>
                    </div>
                </div>
                <div className="flex gap-3 mt-6">
                    <button 
                        onClick={() => setShowLeaveConfirm(false)}
                        className="flex-1 py-3 rounded-xl font-bold text-sm text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                        {t('meeting.cancelBtn')}
                    </button>
                    <button 
                        onClick={() => navigate('/home')}
                        className="flex-1 py-3 rounded-xl font-bold text-sm text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                    >
                        {t('meeting.confirmLeaveBtn')}
                    </button>
                </div>
            </div>
        </div>
    )}

        </div>
    );
}
