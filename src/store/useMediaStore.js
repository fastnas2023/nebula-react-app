import { create } from 'zustand';

const useMediaStore = create((set) => ({
    displayName: 'Sarah Jenkins',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100',
    email: 'sarah.jenkins@nebula.io',
    selectedVideoId: '',
    selectedAudioId: '',
    isVideoMuted: false,
    isAudioMuted: false,
    
    setDisplayName: (name) => set({ displayName: name }),
    setAvatarUrl: (url) => set({ avatarUrl: url }),
    setEmail: (email) => set({ email: email }),
    setDevices: (videoId, audioId) => set({ selectedVideoId: videoId, selectedAudioId: audioId }),
    setMuteStates: (videoMuted, audioMuted) => set({ isVideoMuted: videoMuted, isAudioMuted: audioMuted }),
    
    // Actions for the Meeting room to toggle states
    toggleVideo: () => set((state) => ({ isVideoMuted: !state.isVideoMuted })),
    toggleAudio: () => set((state) => ({ isAudioMuted: !state.isAudioMuted }))
}));

export default useMediaStore;