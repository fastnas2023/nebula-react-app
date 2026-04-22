import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Mail, Command, Play, User, Bell, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';

export default function DesignSystem() {
  const [activeTab, setActiveTab] = useState('buttons');
  const { t } = useTranslation();
  const [titleLine1, titleLine2] = t('designSystem.title').split('\n');

  return (
    <div className="flex h-[100dvh] bg-[#030108] text-white font-sans overflow-hidden">
      {/* Sidebar for Navigation within the app */}
      <Sidebar />

      <main className="flex-1 overflow-y-auto relative">
        {/* Subtle Tech Background */}
        <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-8 py-20">
          
          <header className="mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400 mb-6">
                <Command className="w-3 h-3" />
                <span>{t('designSystem.badge')}</span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
                {titleLine1} <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-nebula-cyan via-nebula-purple to-nebula-magenta">{titleLine2 || ''}</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                {t('designSystem.subtitle')}
              </p>
            </motion.div>
          </header>

          <div className="space-y-32">
            
            {/* 1. Foundations: Colors & Typography */}
            <section>
              <h2 className="font-display text-2xl font-bold border-b border-white/10 pb-4 mb-8">1. {t('designSystem.foundations')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Typography */}
                <div className="space-y-6">
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Typography Scale</h3>
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-4 border-b border-white/5 pb-4">
                      <span className="font-display text-4xl font-bold w-48">Display</span>
                      <span className="text-gray-500 text-sm">Space Grotesk, Bold, Tracking Normal</span>
                    </div>
                    <div className="flex items-baseline gap-4 border-b border-white/5 pb-4">
                      <span className="font-sans text-2xl font-semibold w-48">Heading</span>
                      <span className="text-gray-500 text-sm">Inter, Semibold, Leading Snug</span>
                    </div>
                    <div className="flex items-baseline gap-4 border-b border-white/5 pb-4">
                      <span className="font-sans text-base text-gray-300 w-48">Body Regular</span>
                      <span className="text-gray-500 text-sm">Inter, Regular, Leading Relaxed</span>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-sm text-nebula-cyan w-48">0123456789</span>
                      <span className="text-gray-500 text-sm">JetBrains Mono, Tracking Wide</span>
                    </div>
                  </div>
                </div>

                {/* Colors */}
                <div className="space-y-6">
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Color Palette</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { name: 'Space', hex: '#030108', class: 'bg-[#030108] border border-white/10' },
                      { name: 'Surface', hex: 'rgba(255,255,255,0.03)', class: 'bg-white/5 border border-white/10' },
                      { name: 'Cyan', hex: '#00F0FF', class: 'bg-nebula-cyan' },
                      { name: 'Purple', hex: '#8A2BE2', class: 'bg-nebula-purple' }
                    ].map(color => (
                      <div key={color.name} className="space-y-2">
                        <div className={`h-24 rounded-xl ${color.class}`}></div>
                        <div className="text-sm font-medium">{color.name}</div>
                        <div className="text-xs font-mono text-gray-500">{color.hex}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Core Components */}
            <section>
              <h2 className="font-display text-2xl font-bold border-b border-white/10 pb-4 mb-8">2. {t('designSystem.coreComponents')}</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Buttons */}
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-8">
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Buttons</h3>
                  
                  <div className="space-y-6">
                    {/* Primary Cyber Button */}
                    <button className="w-full relative group overflow-hidden rounded-full p-[1px]">
                      <span className="absolute inset-0 bg-gradient-to-r from-nebula-cyan to-nebula-purple opacity-70 group-hover:opacity-100 transition-opacity duration-500"></span>
                      <div className="relative px-6 py-3 bg-[#030108] rounded-full flex items-center justify-center gap-2 group-hover:bg-transparent transition-colors duration-500">
                        <span className="font-semibold tracking-wide text-white">Primary Action</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>

                    {/* Secondary Ghost Button */}
                    <button className="w-full px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium">
                      Secondary Ghost
                    </button>

                    {/* Danger / Action */}
                    <button className="w-full px-6 py-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all duration-300 font-medium">
                      Destructive Action
                    </button>
                  </div>
                </div>

                {/* Inputs */}
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-8">
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Form Controls</h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-400 ml-1">Email Address</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-nebula-cyan transition-colors" />
                        <input 
                          type="email" 
                          placeholder="name@company.com" 
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-nebula-cyan/50 focus:ring-1 focus:ring-nebula-cyan/50 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-400 ml-1">Search Database (Focus State)</label>
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-nebula-cyan" />
                        <input 
                          type="text" 
                          defaultValue="Nebula Engine" 
                          className="w-full bg-black/60 border border-nebula-cyan/50 ring-1 ring-nebula-cyan/30 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <kbd className="px-2 py-1 bg-white/10 rounded text-[10px] font-mono">⌘</kbd>
                          <kbd className="px-2 py-1 bg-white/10 rounded text-[10px] font-mono">K</kbd>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cards */}
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-8">
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Cards & Surfaces</h3>
                  
                  {/* Stat Card */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-xl hover:border-white/10 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-8 h-8 rounded-full bg-nebula-cyan/10 flex items-center justify-center text-nebula-cyan">
                        <Play className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono text-green-400 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div> Live
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-400">Global Latency</div>
                      <div className="font-mono text-2xl text-white group-hover:text-nebula-cyan transition-colors">12.4ms</div>
                    </div>
                  </div>

                  {/* List Item Card */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Alex Chen</div>
                        <div className="text-xs text-gray-500">Engineering</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Page Layouts (Miniatures) */}
            <section>
              <h2 className="font-display text-2xl font-bold border-b border-white/10 pb-4 mb-8">3. Page Archetypes</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Hero Layout Mockup */}
                <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#030108] aspect-[4/3] flex flex-col relative group">
                  <div className="absolute inset-0 bg-gradient-to-b from-nebula-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="h-8 border-b border-white/10 flex items-center px-4 gap-4">
                    <div className="w-16 h-2 bg-white/20 rounded"></div>
                    <div className="ml-auto flex gap-2">
                      <div className="w-8 h-2 bg-white/10 rounded"></div>
                      <div className="w-8 h-2 bg-white/10 rounded"></div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10">
                    <div className="w-3/4 h-6 bg-white/90 rounded mb-3"></div>
                    <div className="w-1/2 h-6 bg-white/90 rounded mb-6"></div>
                    <div className="w-2/3 h-2 bg-gray-500/50 rounded mb-2"></div>
                    <div className="w-1/2 h-2 bg-gray-500/50 rounded mb-8"></div>
                    <div className="w-24 h-8 bg-nebula-cyan/80 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-xs font-mono text-gray-600">Hero + CTA</div>
                </div>

                {/* List Layout Mockup */}
                <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#030108] aspect-[4/3] flex flex-col">
                  <div className="h-12 border-b border-white/10 flex items-center justify-between px-4">
                    <div className="w-24 h-4 bg-white/80 rounded"></div>
                    <div className="w-16 h-6 bg-white/10 rounded-md"></div>
                  </div>
                  <div className="p-4 space-y-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-10 bg-white/5 border border-white/5 rounded-lg flex items-center px-3">
                        <div className="w-6 h-6 rounded-full bg-white/10 mr-3"></div>
                        <div className="w-20 h-2 bg-white/40 rounded"></div>
                        <div className="ml-auto w-12 h-2 bg-white/20 rounded"></div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-4 left-4 text-xs font-mono text-gray-600">Data List / Dashboard</div>
                </div>

                {/* Detail Layout Mockup */}
                <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#030108] aspect-[4/3] flex">
                  <div className="w-1/3 border-r border-white/10 p-4 space-y-3">
                    <div className="w-full h-24 bg-white/5 rounded-xl mb-4"></div>
                    <div className="w-3/4 h-2 bg-white/40 rounded"></div>
                    <div className="w-1/2 h-2 bg-white/20 rounded"></div>
                  </div>
                  <div className="flex-1 p-6 space-y-4">
                    <div className="w-1/3 h-4 bg-white/80 rounded mb-6"></div>
                    <div className="space-y-2">
                      <div className="w-full h-2 bg-white/20 rounded"></div>
                      <div className="w-full h-2 bg-white/20 rounded"></div>
                      <div className="w-4/5 h-2 bg-white/20 rounded"></div>
                    </div>
                    <div className="w-full h-20 bg-nebula-purple/10 border border-nebula-purple/20 rounded-xl mt-4"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-xs font-mono text-gray-600">Split Detail View</div>
                </div>

              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
