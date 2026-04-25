import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mic, Video, Image, ChevronDown, ArrowRight, ArrowLeft, Settings2, MicOff, VideoOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NebulaLogo from '../components/NebulaLogo';
import useMediaStore from '../store/useMediaStore';

export default function Setup() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const setDisplayNameStore = useMediaStore(state => state.setDisplayName);
    const setDevices = useMediaStore(state => state.setDevices);
    const setMuteStates = useMediaStore(state => state.setMuteStates);
    const initialDisplayName = useMediaStore(state => state.displayName);

    const [displayName, setDisplayName] = useState(initialDisplayName);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);

    // WebRTC Real Device States
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [videoDevices, setVideoDevices] = useState([]);
    const [audioDevices, setAudioDevices] = useState([]);
    const [selectedVideoId, setSelectedVideoId] = useState('');
    const [selectedAudioId, setSelectedAudioId] = useState('');
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);

    // Initialize Media Devices
    useEffect(() => {
        let activeStream = null;

        const initMedia = async () => {
            try {
                // Request initial permission to trigger browser prompt and unhide device labels
                activeStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setHasPermission(true);
                
                if (videoRef.current) {
                    videoRef.current.srcObject = activeStream;
                }
                setStream(activeStream);

                // Enumerate real devices after permission is granted
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoInputs = devices.filter(d => d.kind === 'videoinput');
                const audioInputs = devices.filter(d => d.kind === 'audioinput');

                setVideoDevices(videoInputs);
                setAudioDevices(audioInputs);

                if (videoInputs.length > 0) setSelectedVideoId(videoInputs[0].deviceId);
                if (audioInputs.length > 0) setSelectedAudioId(audioInputs[0].deviceId);
                
            } catch (err) {
                console.error("Failed to get local stream", err);
                setHasPermission(false);
            }
        };

        initMedia();

        return () => {
            if (activeStream) {
                activeStream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Change specific device streams when selection changes
    useEffect(() => {
        if (!selectedVideoId && !selectedAudioId) return;
        if (!hasPermission) return;

        const switchDevice = async () => {
            try {
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
                
                const constraints = {
                    video: selectedVideoId ? { deviceId: { exact: selectedVideoId } } : true,
                    audio: selectedAudioId ? { deviceId: { exact: selectedAudioId } } : true
                };
                
                const newStream = await navigator.mediaDevices.getUserMedia(constraints);
                
                // Maintain mute states during switch
                newStream.getVideoTracks().forEach(t => t.enabled = !isVideoMuted);
                newStream.getAudioTracks().forEach(t => t.enabled = !isAudioMuted);

                setStream(newStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = newStream;
                }
            } catch (err) {
                console.error("Failed to switch device", err);
            }
        };

        // We only switch if devices are already enumerated (skip initial mount to avoid double prompt)
        if (videoDevices.length > 0) {
            switchDevice();
        }
    }, [selectedVideoId, selectedAudioId]);

    const toggleVideo = async () => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            
            if (videoTrack && videoTrack.readyState === 'live') {
                // Currently ON -> Turn OFF
                videoTrack.stop(); // Stop hardware immediately
                setIsVideoMuted(true);
            } else {
                // Currently OFF -> Turn ON
                try {
                    const constraints = { video: selectedVideoId ? { deviceId: { exact: selectedVideoId } } : true, audio: false };
                    const newStream = await navigator.mediaDevices.getUserMedia(constraints);
                    const newVideoTrack = newStream.getVideoTracks()[0];
                    
                    // Remove old dead track and add new live one
                    if (videoTrack) stream.removeTrack(videoTrack);
                    stream.addTrack(newVideoTrack);
                    
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                    setIsVideoMuted(false);
                } catch (err) {
                    console.error("Failed to turn camera back on", err);
                }
            }
        }
    };

    const toggleAudio = async () => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            
            if (audioTrack && audioTrack.readyState === 'live') {
                // Currently ON -> Turn OFF
                audioTrack.stop(); // Stop hardware immediately
                setIsAudioMuted(true);
            } else {
                // Currently OFF -> Turn ON
                try {
                    const constraints = { video: false, audio: selectedAudioId ? { deviceId: { exact: selectedAudioId } } : true };
                    const newStream = await navigator.mediaDevices.getUserMedia(constraints);
                    const newAudioTrack = newStream.getAudioTracks()[0];
                    
                    // Remove old dead track and add new live one
                    if (audioTrack) stream.removeTrack(audioTrack);
                    stream.addTrack(newAudioTrack);
                    
                    setIsAudioMuted(false);
                } catch (err) {
                    console.error("Failed to turn microphone back on", err);
                }
            }
        }
    };

    const handleJoin = (e) => {
        e.preventDefault();
        if (displayName.trim()) {
            // Save settings to global store
            setDisplayNameStore(displayName.trim());
            setDevices(selectedVideoId, selectedAudioId);
            setMuteStates(isVideoMuted, isAudioMuted);

            // Simulate waiting room
            setIsWaiting(true);
            setTimeout(() => {
                // Stop tracks before navigating away to release the camera light
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
                navigate('/meeting');
            }, 3000);
        }
    };

    return (
        <div className="min-h-[100dvh] w-full font-sans antialiased flex items-center justify-center relative">
            
    <div className="bg-mesh fixed"></div>
    <div className="bg-noise fixed"></div>

    <Link to="/home" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors z-20 group font-mono text-sm">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {t('setup.backToHome')}
    </Link>

    <div className="relative z-10 w-full max-w-5xl p-6 lg:p-12">
        {isWaiting ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in">
                <div className="w-24 h-24 relative mb-8">
                    <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-nebula-cyan border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-nebula-cyan/20 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-nebula-cyan animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.6)]"></div>
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-display font-bold text-white mb-3">{t('setup.waitingRoom')}</h2>
                <p className="text-white/50 text-center max-w-md">Design System Sync (NBL-8X92-K)</p>
            </div>
        ) : (
            <>
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-8">
                        <NebulaLogo className="scale-150 origin-center" showText={false} />
                    </div>
                    <h1 className="font-display font-bold text-4xl text-white mb-2">{t('setup.title')}</h1>
                    <p className="text-white/50">{t('setup.room')}: <span className="text-white font-bold tracking-wide">Design System Sync (NBL-8X92-K)</span></p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-stretch">
                    
                    {/*  Video Preview Side  */}
                    <div className="w-full md:w-3/5">
                        <div className="video-preview aspect-video w-full bg-[#030108] rounded-3xl relative group h-full min-h-[300px] overflow-hidden shadow-2xl border border-white/5 flex items-center justify-center">
                            
                            {/* Local WebRTC Media Stream Preview */}
                            <video 
                                ref={videoRef}
                                autoPlay 
                                playsInline 
                                muted // Always mute local preview to prevent echo
                                className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoMuted ? 'opacity-0' : 'opacity-100'} scale-x-[-1]`} // Mirror effect for selfie cam
                            />

                            {/* Placeholder when video is off */}
                            {isVideoMuted && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0514]">
                                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-4">
                                        <span className="text-3xl font-display font-bold text-white/50">{displayName ? displayName.charAt(0).toUpperCase() : '?'}</span>
                                    </div>
                                    <span className="text-white/50 font-medium text-sm">{t('setup.cameraOff', 'Camera is off')}</span>
                                </div>
                            )}
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

                            {/*  Audio Visualizer Overlay & Network Status  */}

                            {/*  Quick Toggles inside video  */}
                            <div className="absolute bottom-6 right-6 flex gap-3">
                                <button 
                                    type="button"
                                    onClick={toggleAudio}
                                    className={`w-12 h-12 rounded-xl backdrop-blur-md border flex items-center justify-center transition-all hover:scale-110 active:scale-95 group ${isAudioMuted ? 'bg-red-500/20 border-red-500/30 text-red-500' : 'bg-black/50 hover:bg-white/10 border-white/10 text-emerald-400'}`}
                                >
                                    {isAudioMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                                </button>
                                <button 
                                    type="button"
                                    onClick={toggleVideo}
                                    className={`w-12 h-12 rounded-xl backdrop-blur-md border flex items-center justify-center transition-all hover:scale-110 active:scale-95 group ${isVideoMuted ? 'bg-red-500/20 border-red-500/30 text-red-500' : 'bg-black/50 hover:bg-white/10 border-white/10 text-emerald-400'}`}
                                >
                                    {isVideoMuted ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                                </button>
                                <div className="relative tooltip">
                                    <button className="w-12 h-12 rounded-xl bg-black/50 hover:bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 group">
                                        <Image className="w-5 h-5 text-nebula-cyan" />
                                    </button>
                                    <div className="tooltip-text absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                                        {t('setup.virtualBackground')}
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Settings Side  */}
                    <div className="w-full md:w-2/5 glass-panel rounded-3xl p-8 flex flex-col justify-center border border-white/10 relative z-10">
                        <form className="space-y-6" onSubmit={handleJoin}>
                            <div>
                                <label className="block text-sm font-bold text-white/70 mb-2">{t('setup.displayName')}</label>
                                <input 
                                    type="text" 
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-nebula-cyan/50 focus:ring-1 focus:ring-nebula-cyan/50 transition-all font-bold text-lg"  
                                />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">{t('setup.camera')}</label>
                                    <div className="relative">
                                        <select 
                                            value={selectedVideoId}
                                            onChange={(e) => setSelectedVideoId(e.target.value)}
                                            className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-white/20 truncate pr-10"
                                        >
                                            {videoDevices.length > 0 ? (
                                                videoDevices.map(device => (
                                                    <option key={device.deviceId} value={device.deviceId} className="bg-black text-white">
                                                        {device.label || `${t('setup.devices.cameraBuiltIn')} (${device.deviceId.substring(0, 5)}...)`}
                                                    </option>
                                                ))
                                            ) : (
                                                <option className="bg-black text-white">{t('setup.devices.cameraBuiltIn')}</option>
                                            )}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">{t('setup.microphone')}</label>
                                    <div className="relative">
                                        <select 
                                            value={selectedAudioId}
                                            onChange={(e) => setSelectedAudioId(e.target.value)}
                                            className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-medium focus:outline-none focus:border-white/20 truncate pr-10"
                                        >
                                            {audioDevices.length > 0 ? (
                                                audioDevices.map(device => (
                                                    <option key={device.deviceId} value={device.deviceId} className="bg-black text-white">
                                                        {device.label || `${t('setup.devices.micMacBook')} (${device.deviceId.substring(0, 5)}...)`}
                                                    </option>
                                                ))
                                            ) : (
                                                <option className="bg-black text-white">{t('setup.devices.micMacBook')}</option>
                                            )}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                                    </div>
                                </div>
                                
                                <div>
                                    <button 
                                        type="button"
                                        onClick={() => setShowAdvanced(!showAdvanced)}
                                        className="flex items-center gap-2 text-xs font-bold text-white/50 hover:text-white transition-colors py-2 uppercase tracking-wider w-full text-left"
                                    >
                                        <Settings2 className="w-3.5 h-3.5" />
                                        {t('setup.advancedSettings')}
                                        <ChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
                                    </button>
                                    
                                    {showAdvanced && (
                                        <div className="mt-3 space-y-3 p-4 bg-white/5 rounded-xl border border-white/10 animate-fade-in">
                                            <label className="flex items-center justify-between cursor-pointer group">
                                                <span className="text-sm text-white/70 group-hover:text-white transition-colors">{t('setup.features.hdVideo')}</span>
                                                <div className="w-8 h-4 bg-nebula-cyan/20 rounded-full relative">
                                                    <div className="absolute right-0 top-0 w-4 h-4 bg-nebula-cyan rounded-full shadow-[0_0_10px_rgba(0,240,255,0.5)]"></div>
                                                </div>
                                            </label>
                                            <label className="flex items-center justify-between cursor-pointer group">
                                                <span className="text-sm text-white/70 group-hover:text-white transition-colors">{t('setup.features.aiNoiseCancellation')}</span>
                                                <div className="w-8 h-4 bg-nebula-cyan/20 rounded-full relative">
                                                    <div className="absolute right-0 top-0 w-4 h-4 bg-nebula-cyan rounded-full shadow-[0_0_10px_rgba(0,240,255,0.5)]"></div>
                                                </div>
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-white/10">
                                <button 
                                    type="submit"
                                    disabled={!displayName.trim()}
                                    className="gradient-btn w-full py-4 rounded-full font-display font-bold text-lg text-white shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {t('setup.joinBtn')} <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </>
        )}
    </div>

    

        </div>
    );
}
