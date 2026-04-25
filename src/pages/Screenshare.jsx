import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MonitorUp, LayoutList, Eye, MousePointer2, Maximize, Minimize, Expand, Shrink, MicOff, Mic, Video, PhoneOff, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ResizableSplitPane from '../components/ResizableSplitPane';
import FloatingPresenterBar from '../components/FloatingPresenterBar';
import AnnotationCanvas from '../components/AnnotationCanvas';
import NebulaLogo from '../components/NebulaLogo';

export default function Screenshare() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const screenshareRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isTheaterMode, setIsTheaterMode] = useState(false);
    const [isPresenter, setIsPresenter] = useState(true); // Toggle to simulate presenter/viewer
    const [isAnnotating, setIsAnnotating] = useState(false);
    const [infiniteMirrorWarning, setInfiniteMirrorWarning] = useState(true);
    const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
    const [clearCanvasTrigger, setClearCanvasTrigger] = useState(0);
    
    // Dynamic Mock Data States
    const [meetingSeconds, setMeetingSeconds] = useState(5079); // 01:24:39

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement) {
            if (screenshareRef.current?.requestFullscreen) {
                await screenshareRef.current.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            }
        }
    };

    // Dynamic Mock Data Generators
    useEffect(() => {
        // 1. Meeting Timer
        const timeInterval = setInterval(() => {
            setMeetingSeconds(s => s + 1);
        }, 1000);

        return () => {
            clearInterval(timeInterval);
        };
    }, []);

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

    <div className={`relative z-10 flex flex-col h-full w-full ${isTheaterMode || isFullscreen ? 'p-0' : 'p-4 lg:p-6'} gap-4 lg:gap-6 transition-all duration-300`}>
        
        {/*  Header  */}
        {!isTheaterMode && !isFullscreen && (
            <header className={`flex justify-between items-center w-full glass-panel rounded-2xl px-6 py-4 flex-shrink-0 transition-all duration-500 ${isPresenter && infiniteMirrorWarning ? 'opacity-20 pointer-events-none' : ''}`}>
                <div className="flex items-center gap-4">
                    <NebulaLogo showText={false} className="scale-90 origin-left" />
                    <div className="-ml-2">
                        <h1 className="font-display font-bold text-xl text-white">Design Sync</h1>
                        <div className="flex items-center gap-2 text-xs text-white/50 uppercase font-bold">
                            <span className="text-emerald-400">●</span> {formatTime(meetingSeconds)}
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    {/*  Role Toggle Mock Button  */}
                <button 
                    onClick={() => {
                        const nextIsPresenter = !isPresenter;
                        setIsPresenter(nextIsPresenter);
                        if (!nextIsPresenter) {
                            setIsAnnotating(false); // Stop annotating when switching to participant
                        }
                    }} 
                    className="glass-button px-4 h-10 rounded-xl flex items-center justify-center text-xs font-bold mr-4 text-nebula-cyan border-nebula-cyan/30"
                >
                    {isPresenter ? t('screenshare.viewAsParticipant') : t('screenshare.viewAsPresenter')}
                </button>
                    
                    <button className="glass-button active w-10 h-10 rounded-xl flex items-center justify-center text-white">
                        <MonitorUp className="w-5 h-5" />
                    </button>
                    <button className="glass-button w-10 h-10 rounded-xl flex items-center justify-center text-white/70">
                        <LayoutList className="w-5 h-5" />
                    </button>
                </div>
            </header>
        )}

        {/*  Main Content  */}
        <main className={`flex-1 flex gap-4 lg:gap-6 min-h-0 relative ${isPresenter && infiniteMirrorWarning ? 'opacity-20 pointer-events-none blur-sm transition-all duration-500' : ''}`}>
            
            <ResizableSplitPane 
                defaultLeftWidth={isTheaterMode || isFullscreen ? 100 : 75}
                minLeftWidth={50}
                maxLeftWidth={isTheaterMode || isFullscreen ? 100 : 85}
                leftContent={
                    /*  Shared Screen Area (Priority space)  */
                    <div 
                        ref={screenshareRef} 
                        onDoubleClick={toggleFullscreen}
                        className={`w-full h-full screenshare-container relative flex items-center justify-center group/screen bg-black overflow-hidden shadow-2xl transition-all duration-300 ${isFullscreen ? 'rounded-none border-none' : 'rounded-3xl cursor-pointer'} ${isPresenter ? 'border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : ''}`}
                        title={!isFullscreen ? t('screenshare.doubleClickToFullscreen') : t('screenshare.doubleClickToExit')}
                    >
                        {/* Presenter Green Border Indicator */}
                        {isPresenter && (
                            <div className="absolute inset-0 border-[4px] border-emerald-500 z-50 pointer-events-none rounded-3xl opacity-80 animate-pulse-slow"></div>
                        )}
                        
                        {!isPresenter && (
                            <div className="screenshare-label shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                                <Eye className="w-4 h-4" /> {t('screenshare.viewing', { name: 'David' })}
                            </div>
                        )}
                        
                        {/*  Floating Screen Controls (Show on hover)  */}
                        <div className="absolute top-4 right-4 glass-panel px-3 py-2 rounded-xl flex items-center gap-2 opacity-0 -translate-y-2 group-hover/screen:translate-y-0 group-hover/screen:opacity-100 transition-all duration-300 z-[60] pointer-events-none group-hover/screen:pointer-events-auto border-white/10 shadow-xl">
                            {!isPresenter && (
                                <>
                                    <button className="text-sm font-bold text-white/80 hover:text-nebula-cyan hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2" title={t('screenshare.requestControl')}>
                                        <MousePointer2 className="w-4 h-4" /> {t('screenshare.requestControl')}
                                    </button>
                                    <div className="w-px h-6 bg-white/20 mx-1"></div>
                                </>
                            )}
                            
                            <button 
                                onClick={(e) => { e.stopPropagation(); setIsTheaterMode(!isTheaterMode); }}
                                className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors group/btn relative" 
                                title={isTheaterMode ? t('screenshare.exitTheaterMode') : t('screenshare.theaterMode')}
                            >
                                {isTheaterMode ? <Shrink className="w-4 h-4 group-hover/btn:scale-90 transition-transform" /> : <Expand className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />}
                            </button>

                            <div className="w-px h-6 bg-white/20 mx-1"></div>

                            <button 
                                onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                                className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors group/btn relative" 
                                title={isFullscreen ? t('screenshare.exitOsFullscreen') : t('screenshare.osFullscreen')}
                            >
                                {isFullscreen ? <Minimize className="w-4 h-4 group-hover/btn:scale-90 transition-transform" /> : <Maximize className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />}
                            </button>
                        </div>
                        
                        {/* CRITICAL: object-contain ensures shared content is NEVER cropped */}
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-contain relative z-10" alt={t('screenshare.sharedScreenAlt')} />
                        
                        {/* Mock Cursor from Presenter */}
                        {!isPresenter && (
                            <div className="absolute top-1/3 left-1/3 pointer-events-none z-20">
                                <MousePointer2 className="w-6 h-6 text-nebula-cyan drop-shadow-md" />
                                <div className="bg-nebula-cyan text-[#030108] text-[10px] px-2 py-0.5 rounded-full mt-1 ml-4 shadow-lg font-bold inline-block">David</div>
                            </div>
                        )}
                        
                        {/* Annotation Layer */}
                        {isAnnotating && <AnnotationCanvas clearTrigger={clearCanvasTrigger} onClose={isPresenter ? null : () => setIsAnnotating(false)} />}
                    </div>
                }
                rightContent={
                    /*  Side Videos (Thumbnail Strip)  */
                    <aside className="w-full h-full flex flex-col gap-4 overflow-y-auto pb-2 lg:pb-0 snap-y snap-mandatory hide-scrollbar">
                        
                        {/*  Presenter (Speaking)  */}
                        <div className="video-tile speaking relative group bg-black flex-shrink-0 w-full aspect-video snap-center rounded-2xl overflow-hidden shadow-lg border border-white/5">
                            <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover object-top opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                            <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                <div className="font-display font-bold text-white text-sm">David Chen</div>
                                <div className="bg-emerald-500/20 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 border border-emerald-500/30">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div> {t('screenshare.speaking')}
                                </div>
                            </div>
                        </div>

                        {/*  Participant  */}
                        <div className="video-tile relative group bg-black flex-shrink-0 w-full aspect-video snap-center rounded-2xl overflow-hidden shadow-lg border border-white/5">
                            <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover object-top opacity-70" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                            <div className="absolute bottom-3 left-3">
                                <div className="font-display font-bold text-white text-sm">Elena Rodriguez</div>
                            </div>
                            <div className="absolute top-3 right-3 glass-panel w-7 h-7 rounded-full flex items-center justify-center text-red-400 bg-red-500/10 border-red-500/20 backdrop-blur-md">
                                <MicOff className="w-3.5 h-3.5" />
                            </div>
                        </div>

                        {/*  Self  */}
                        <div className="video-tile relative group bg-black flex-shrink-0 w-full aspect-video snap-center rounded-2xl overflow-hidden shadow-lg border border-emerald-500/30">
                            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover object-top opacity-70" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                            <div className="absolute bottom-3 left-3">
                                <div className="font-display font-bold text-white text-sm">{t('meeting.you')}</div>
                            </div>
                            <div className="absolute top-3 right-3 glass-panel w-7 h-7 rounded-full flex items-center justify-center text-emerald-400 bg-emerald-500/10 border-emerald-500/20 backdrop-blur-md">
                                <Mic className="w-3.5 h-3.5" />
                            </div>
                        </div>

                    </aside>
                }
            />
        </main>

        {/*  Minimal Control Bar  */}
        {!isTheaterMode && !isFullscreen && (
            <footer className={`glass-panel rounded-2xl px-6 py-4 flex justify-center items-center relative z-20 flex-shrink-0 transition-all duration-500 ${isPresenter && infiniteMirrorWarning ? 'opacity-20 pointer-events-none blur-sm' : ''}`}>
                <div className="flex items-center gap-3">
                    <button className="glass-button w-12 h-12 rounded-xl flex items-center justify-center text-white">
                        <Mic className="w-5 h-5 text-emerald-400" />
                    </button>
                    <button className="glass-button w-12 h-12 rounded-xl flex items-center justify-center text-white">
                        <Video className="w-5 h-5" />
                    </button>
                    <div className="w-px h-8 bg-white/10 mx-2"></div>
                    <button 
                        className="glass-button danger px-6 h-12 rounded-xl flex items-center gap-2 font-bold transition-all hover:scale-105" 
                        onClick={() => setShowLeaveConfirm(true)}
                    >
                        <PhoneOff className="w-4 h-4" /> {t('meeting.leave')}
                    </button>
                </div>
            </footer>
        )}

        {/* Presenter Floating Bar */}
        {isPresenter && (
            <FloatingPresenterBar 
                onStopShare={() => setIsPresenter(false)} 
                isAnnotating={isAnnotating}
                onToggleAnnotate={() => setIsAnnotating(!isAnnotating)}
                onClearAnnotation={() => setClearCanvasTrigger(prev => prev + 1)}
            />
        )}

        {/* Infinite Mirror Warning Mock */}
        {isPresenter && infiniteMirrorWarning && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto">
                <div className="bg-[#0a0514] border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)] rounded-3xl p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
                        <MonitorUp className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">{t('screenshare.infiniteMirrorDetected')}</h2>
                    <p className="text-white/70 mb-8 leading-relaxed">{t('screenshare.infiniteMirrorWarning')}</p>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setInfiniteMirrorWarning(false)}
                            className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-colors"
                        >
                            {t('screenshare.ignore')}
                        </button>
                        <button 
                            onClick={() => {
                                setInfiniteMirrorWarning(false);
                                setIsPresenter(false);
                            }}
                            className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-colors shadow-lg shadow-red-500/20"
                        >
                            {t('screenshare.stopSharing')}
                        </button>
                    </div>
                </div>
            </div>
        )}

    </div>

    {showLeaveConfirm && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-nebula-900 border border-white/10 p-6 rounded-3xl shadow-2xl max-w-sm w-full mx-4 animate-scale-in">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                        <h3 className="text-xl font-display font-bold text-white">{t('screenshare.leaveMeetingTitle')}</h3>
                        <p className="text-sm text-white/60 mt-1">{t('screenshare.leaveMeetingConfirm')}</p>
                    </div>
                </div>
                <div className="flex gap-3 mt-6">
                    <button 
                        onClick={() => setShowLeaveConfirm(false)}
                        className="flex-1 py-3 rounded-xl font-bold text-sm text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                        {t('screenshare.cancel')}
                    </button>
                    <button 
                        onClick={() => navigate('/home')}
                        className="flex-1 py-3 rounded-xl font-bold text-sm text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                    >
                        {t('screenshare.yesLeave')}
                    </button>
                </div>
            </div>
        </div>
    )}

        </div>
    );
}
