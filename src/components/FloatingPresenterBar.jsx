import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, Pen, Pause, Play, Square } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FloatingPresenterBar({ onStopShare, onToggleAnnotate, isAnnotating }) {
  const { t } = useTranslation();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="fixed top-6 left-0 right-0 flex justify-center z-[100] pointer-events-none">
      <motion.div
        drag
        dragMomentum={false}
        className="pointer-events-auto flex items-center p-2 rounded-2xl bg-[#0a0514]/80 backdrop-blur-xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-1 px-2">
          {/* Mute Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-xl flex items-center justify-center transition-all ${
              isMuted ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          {/* Video Button */}
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-3 rounded-xl flex items-center justify-center transition-all ${
              isVideoOff ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
          </button>
          
          <div className="w-px h-6 bg-white/20 mx-2"></div>

          {/* Annotate */}
          <button
            onClick={onToggleAnnotate}
            className={`p-3 rounded-xl flex items-center justify-center transition-all ${
              isAnnotating ? 'bg-nebula-cyan/20 text-nebula-cyan hover:bg-nebula-cyan/30' : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Pen size={20} />
          </button>

          {/* Pause Share */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`p-3 rounded-xl flex items-center justify-center transition-all ${
              isPaused ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </button>

          <div className="w-px h-6 bg-white/20 mx-2"></div>

          {/* Stop Share */}
          <button
            onClick={onStopShare}
            className="px-4 py-2.5 rounded-xl flex items-center justify-center bg-red-500 hover:bg-red-600 transition-all text-white gap-2 ml-1 font-bold shadow-lg shadow-red-500/20"
          >
            <Square size={16} className="fill-current" />
            <span className="text-sm">{t('features.showcase2.stopBtn')}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
