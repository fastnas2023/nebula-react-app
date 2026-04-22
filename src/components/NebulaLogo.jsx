import React from 'react';
import { Orbit } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NebulaLogo({ showText = true, className = "", text = "NEBULA MEETING" }) {
  return (
    <Link to="/" className={`flex items-center gap-3 cursor-pointer group ${className} whitespace-nowrap`}>
      {/* 镂空发光呼吸灯 Logo 图形 */}
      <div className="relative w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        {/* 底层呼吸光晕 */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-nebula-cyan/40 to-nebula-purple/40 blur-md animate-pulse"></div>
        
        {/* 玻璃态镂空主框 (透明背景 + 渐变边框) */}
        <div className="absolute inset-0 rounded-xl bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center overflow-hidden">
          {/* 内部极光扫光特效 */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
        </div>

        {/* 核心图形 (Orbit) */}
        <Orbit className="relative z-10 text-nebula-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] w-[22px] h-[22px]" strokeWidth={2} />
      </div>

      {/* 不换行渐变文字 */}
      {showText && (
        <span className="font-display font-bold text-lg tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-nebula-cyan to-nebula-purple whitespace-nowrap mt-1">
          {text}
        </span>
      )}
    </Link>
  );
}
