import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, Download, X, MousePointer2, Hand, PenTool, Eraser, StickyNote, Edit2, Copy, Trash2, Mic, Video, MicOff, VideoOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useMediaStore from '../store/useMediaStore';

export default function Whiteboard() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    // Global Media States
    const displayName = useMediaStore(state => state.displayName);
    const selectedVideoId = useMediaStore(state => state.selectedVideoId);
    const selectedAudioId = useMediaStore(state => state.selectedAudioId);
    const isMuted = useMediaStore(state => state.isAudioMuted);
    const isVideoOff = useMediaStore(state => state.isVideoMuted);
    const toggleAudio = useMediaStore(state => state.toggleAudio);
    const toggleVideo = useMediaStore(state => state.toggleVideo);
    
    // Local Media Stream
    const localVideoRef = useRef(null);
    const [localStream, setLocalStream] = useState(null);

    // Dynamic Mock Data States
    const [meetingSeconds, setMeetingSeconds] = useState(5079); // 01:24:39

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setMeetingSeconds(s => s + 1);
        }, 1000);

        return () => {
            clearInterval(timeInterval);
        };
    }, []);

    // Request WebRTC Media Stream
    useEffect(() => {
        let activeStream = null;

        const getMedia = async () => {
            try {
                const constraints = {
                    video: isVideoOff ? false : (selectedVideoId ? { deviceId: { exact: selectedVideoId } } : true),
                    audio: isMuted ? false : (selectedAudioId ? { deviceId: { exact: selectedAudioId } } : true)
                };
                
                // Only request hardware if at least one is needed
                if (constraints.video || constraints.audio) {
                    activeStream = await navigator.mediaDevices.getUserMedia(constraints);
                } else {
                    // Create an empty MediaStream if both are off initially, so we have a container to add tracks to later
                    activeStream = new MediaStream();
                }

                setLocalStream(activeStream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = activeStream;
                }
            } catch (err) {
                console.error("Failed to get local stream in whiteboard", err);
            }
        };

        getMedia();

        return () => {
            if (activeStream) {
                activeStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [selectedVideoId, selectedAudioId]); // ONLY run on mount or device ID change

    // Dynamically handle video toggle (hardware camera light)
    useEffect(() => {
        if (!localStream) return;

        const manageVideoTrack = async () => {
            const videoTrack = localStream.getVideoTracks()[0];

            if (isVideoOff) {
                if (videoTrack && videoTrack.readyState === 'live') {
                    videoTrack.stop(); // Stop hardware immediately
                    localStream.removeTrack(videoTrack);
                }
            } else {
                if (!videoTrack || videoTrack.readyState === 'ended') {
                    try {
                        const constraints = { video: selectedVideoId ? { deviceId: { exact: selectedVideoId } } : true, audio: false };
                        const newStream = await navigator.mediaDevices.getUserMedia(constraints);
                        const newVideoTrack = newStream.getVideoTracks()[0];
                        
                        localStream.addTrack(newVideoTrack);
                        if (localVideoRef.current) {
                            localVideoRef.current.srcObject = localStream; // Force video element to pick up new track
                        }
                    } catch (err) {
                        console.error("Failed to turn camera back on in whiteboard", err);
                    }
                }
            }
        };

        manageVideoTrack();
    }, [isVideoOff, localStream, selectedVideoId]);

    // Dynamically handle audio toggle (hardware mic indicator)
    useEffect(() => {
        if (!localStream) return;

        const manageAudioTrack = async () => {
            const audioTrack = localStream.getAudioTracks()[0];

            if (isMuted) {
                if (audioTrack && audioTrack.readyState === 'live') {
                    audioTrack.stop(); // Stop hardware immediately
                    localStream.removeTrack(audioTrack);
                }
            } else {
                if (!audioTrack || audioTrack.readyState === 'ended') {
                    try {
                        const constraints = { video: false, audio: selectedAudioId ? { deviceId: { exact: selectedAudioId } } : true };
                        const newStream = await navigator.mediaDevices.getUserMedia(constraints);
                        const newAudioTrack = newStream.getAudioTracks()[0];
                        
                        localStream.addTrack(newAudioTrack);
                    } catch (err) {
                        console.error("Failed to turn microphone back on in whiteboard", err);
                    }
                }
            }
        };

        manageAudioTrack();
    }, [isMuted, localStream, selectedAudioId]);

    const [showElements, setShowElements] = useState(true);

    const formatTime = (totalSeconds) => {
        const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

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
                    <h1 className="font-display font-bold text-xl text-white">{t('whiteboard.mockTitle')}</h1>
                    <div className="flex items-center gap-2 text-xs text-white/50 uppercase font-bold">
                        <span className="text-emerald-400">●</span> {formatTime(meetingSeconds)}
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white/70">
                    <Users className="w-3.5 h-3.5 text-nebula-purple" /> {t('whiteboard.collaborating', { count: 4 })}
                </div>
                <button className="glass-button w-10 h-10 rounded-xl flex items-center justify-center text-white/70">
                    <Download className="w-5 h-5" />
                </button>
                <button onClick={() => navigate('/meeting')} className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 px-4 h-10 rounded-xl flex items-center gap-2 font-bold transition-colors text-sm">
                    <X className="w-4 h-4" /> {t('whiteboard.closeBoard')}
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
                <button 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                    title={t('annotation.clearCanvas') || "Clear Canvas"}
                    onClick={() => setShowElements(false)}
                >
                    <Trash2 className="w-5 h-5" />
                </button>
                <div className="w-8 h-px bg-white/10 my-1"></div>
                <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors">
                    <StickyNote className="w-5 h-5" />
                </button>
            </aside>

            {/*  Canvas Area  */}
            <div className="flex-1 whiteboard-canvas relative cursor-crosshair">
                
                {showElements && (
                    <React.Fragment>
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
                    <div className="text-xs font-bold text-yellow-800 uppercase mb-2">{t('whiteboard.mockNote1Topic')}</div>
                    <p className="font-handwriting text-2xl leading-relaxed text-black">{t('whiteboard.mockNote1Desc')}</p>
                </div>

                {/*  Sticky Note 2  */}
                <div className="sticky-note group/note cursor-grab active:cursor-grabbing" style={{"top":"120px","left":"650px","background":"linear-gradient(135deg, rgba(255, 138, 203, 0.95) 0%, rgba(255, 46, 147, 0.9) 100%)","borderLeftColor":"#9D174D","color":"white","transform":"rotate(3deg)"}}>
                    <div className="absolute -top-12 left-0 right-0 glass-panel bg-black/80 text-white rounded-lg p-2 flex items-center justify-around opacity-0 group-hover/note:opacity-100 transition-opacity pointer-events-none group-hover/note:pointer-events-auto shadow-xl border border-white/20">
                        <button className="hover:text-nebula-cyan transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button className="hover:text-white transition-colors"><Copy className="w-4 h-4" /></button>
                        <div className="w-px h-4 bg-white/20"></div>
                        <button className="hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="text-xs font-bold text-pink-200 uppercase mb-2">{t('whiteboard.mockNote2Topic')}</div>
                    <p className="font-handwriting text-2xl leading-relaxed">{t('whiteboard.mockNote2Desc')}</p>
                </div>

                {/*  Cursor Indicator  */}
                <div className="absolute top-[320px] left-[700px] pointer-events-none flex flex-col items-center z-10">
                    <MousePointer2 className="w-6 h-6 text-nebula-cyan drop-shadow-md -ml-2 -mt-1" />
                    <div className="bg-nebula-cyan text-black text-[10px] px-2 py-0.5 rounded-full mt-1 shadow-lg shadow-nebula-cyan/50 whitespace-nowrap font-bold">{t('whiteboard.mockCursorLabel')}</div>
                </div>
                </React.Fragment>
                )}

                {/*  Floating Videos  */}
                <div className="absolute right-6 top-6 flex flex-col gap-3 z-30">
                    <div className="floating-video speaking group">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur px-1.5 py-0.5 rounded text-[9px] text-white font-bold flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div> Sarah
                        </div>
                    </div>
                    <div className="floating-video group relative">
                        <video 
                            ref={localVideoRef}
                            autoPlay 
                            playsInline 
                            muted // Always mute local playback to prevent echo
                            className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoOff ? 'opacity-0' : 'opacity-100'} scale-x-[-1] bg-[#030108]`} 
                        />
                        
                        {isVideoOff && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0514]">
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                    <span className="text-xs font-display font-bold text-white/50">{displayName ? displayName.charAt(0).toUpperCase() : '?'}</span>
                                </div>
                            </div>
                        )}
                        <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur px-1.5 py-0.5 rounded text-[9px] text-white/80 font-bold">{t('meeting.you')}</div>
                    </div>
                </div>
                
                {/*  Minimap  */}
                <div className="absolute bottom-6 right-6 w-48 aspect-video glass-panel rounded-xl overflow-hidden border border-white/20 p-2 cursor-pointer hover:border-nebula-cyan/50 transition-colors shadow-2xl z-20 group">
                    <div className="w-full h-full bg-white/5 rounded relative border border-white/5 group-hover:bg-white/10 transition-colors">
                        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-nebula-cyan bg-nebula-cyan/10 rounded-sm"></div>
                        <div className="absolute top-[30%] left-[30%] w-4 h-4 bg-yellow-400 rotate-2 shadow-sm"></div>
                        <div className="absolute top-[40%] left-[50%] w-4 h-4 bg-pink-400 -rotate-3 shadow-sm"></div>
                    </div>
                    <div className="absolute bottom-3 right-3 text-[10px] text-white/80 font-bold">{t('whiteboard.minimap')}</div>
                </div>
                
            </div>
        </main>

        <footer className="glass-panel rounded-2xl px-6 py-3 flex justify-center items-center relative z-20 flex-shrink-0">
            <div className="flex items-center gap-3">
                <button 
                    onClick={toggleAudio}
                    className={`glass-button w-10 h-10 rounded-xl flex items-center justify-center group relative transition-colors ${isMuted ? 'bg-red-500/20 text-red-500 border-red-500/30' : 'text-white hover:bg-white/10'}`}
                    title={isMuted ? "Unmute" : "Mute"}
                >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button 
                    onClick={toggleVideo}
                    className={`glass-button w-10 h-10 rounded-xl flex items-center justify-center group transition-colors ${isVideoOff ? 'bg-red-500/20 text-red-500 border-red-500/30' : 'text-white hover:bg-white/10'}`}
                    title={isVideoOff ? "Start Video" : "Stop Video"}
                >
                    {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                </button>
            </div>
        </footer>

    </div>

    

        </div>
    );
}
