import { create } from 'zustand';

const useMediaStore = create((set) => ({
    displayName: 'Sarah Jenkins',
    selectedVideoId: '',
    selectedAudioId: '',
    isVideoMuted: false,
    isAudioMuted: false,
    
    setDisplayName: (name) => set({ displayName: name }),
    setDevices: (videoId, audioId) => set({ selectedVideoId: videoId, selectedAudioId: audioId }),
    setMuteStates: (videoMuted, audioMuted) => set({ isVideoMuted: videoMuted, isAudioMuted: audioMuted }),
    
    // Actions for the Meeting room to toggle states
    toggleVideo: () => set((state) => ({ isVideoMuted: !state.isVideoMuted })),
    toggleAudio: () => set((state) => ({ isAudioMuted: !state.isAudioMuted }))
}));

export default useMediaStore;