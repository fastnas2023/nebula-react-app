import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import { 
  Globe, Menu, ArrowRight, Github, MicOff, Layers, 
  Network, EyeOff, Video, Activity, LayoutGrid, Sparkles, 
  MonitorUp, FileCode, Server, Terminal, ShieldHalf, Command
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import NebulaLogo from './components/NebulaLogo';
import Background from './components/Background';
import './globals.css';

// Component mapping (simplified wrapper for MagneticButton)
const MagneticLink = ({ to, className, children }) => (
  <Link to={to} className={className}>
    {children}
  </Link>
);

// Reusable Scroll Reveal Component
const RevealOnScroll = ({ children, delay = 0, yOffset = 40, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered Text Component for Hero
const StaggeredText = ({ text, className, delay = 0, isZh = false }) => {
  const words = isZh ? Array.from(text) : text.split(" ");
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
        hidden: {}
      }}
      className={className}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          className={`inline-block ${isZh ? '' : 'mr-[0.25em]'}`}
          variants={{
            hidden: { opacity: 0, y: 40, rotateX: -90 },
            visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", damping: 15, stiffness: 100 } }
          }}
          style={{ transformOrigin: "bottom" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Magnetic Button Component
const MagneticButton = ({ children, className, href }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;
  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

// 3D Tilt Card Component for Bento Grid
const TiltCard = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    
    ref.current.style.setProperty('--mouse-x', `${mouseX}px`);
    ref.current.style.setProperty('--mouse-y', `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <RevealOnScroll delay={delay} className={className}>
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ zIndex: 10, scale: 1.02 }}
        className="h-full bento-card group will-change-transform"
      >
        {/* HUD Corner Decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 group-hover:border-nebula-cyan/50 transition-colors m-4"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 group-hover:border-nebula-cyan/50 transition-colors m-4"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 group-hover:border-nebula-cyan/50 transition-colors m-4"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 group-hover:border-nebula-cyan/50 transition-colors m-4"></div>
        
        <div style={{ transform: "translateZ(30px)" }} className="h-full p-10 flex flex-col justify-between relative z-10">
          {children}
        </div>
      </motion.div>
    </RevealOnScroll>
  );
};

const NebulaLanding = () => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language.startsWith('zh');
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(isZh ? 'en' : 'zh');
  };
  
  // Custom Cursor state
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Parallax effects for Hero Background Orbs
  const yOrb1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], [0, 300]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="selection:bg-nebula-cyan selection:text-black relative min-h-[100dvh] bg-nebula-base text-white overflow-x-hidden font-sans cursor-none">
      
      {/* Noise Overlay */}
      <div className="bg-noise"></div>

      {/* Custom Cursor Elements */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/40 pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{ 
          x: useSpring(useTransform(cursorX, x => x + 16), springConfig), 
          y: useSpring(useTransform(cursorY, y => y + 16), springConfig) 
        }}
      />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-nebula-cyan via-nebula-purple to-nebula-magenta origin-left z-[100] shadow-[0_0_10px_rgba(6,182,212,0.5)]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Backgrounds */}
      <div className="fixed inset-0 z-0 bg-[#030108]"></div>
      <div className="bg-grid absolute inset-0 z-0 pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-nebula-purple/15 via-nebula-cyan/5 to-transparent pointer-events-none z-0"></div>
      
      {/* 灵动特效：跟随滚动的赛博发光球 */}
      <motion.div style={{ y: yOrb1 }} className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-nebula-cyan/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none z-0"></motion.div>
      <motion.div style={{ y: yOrb2 }} className="absolute bottom-[20%] right-[5%] w-[800px] h-[800px] bg-nebula-purple/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none z-0"></motion.div>

      {/* 1. Navbar */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'glass-panel border-white/10 py-4' 
            : 'border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <NebulaLogo />

          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors tracking-wide">{t('nav.features')}</a>
            <a href="#architecture" className="text-sm font-medium text-gray-400 hover:text-white transition-colors tracking-wide">{t('nav.architecture')}</a>
            <a href="#deployment" className="text-sm font-medium text-gray-400 hover:text-white transition-colors tracking-wide">{t('nav.deployment')}</a>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleLanguage} className="text-gray-400 hover:text-white transition-colors hidden md:flex items-center gap-1.5 text-sm font-medium">
              <Globe className="w-4 h-4" />
              {isZh ? 'EN' : '中'}
            </button>
            <MagneticLink 
              to="/home" 
              className="hidden md:flex relative group overflow-hidden rounded-full p-[1px]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-nebula-cyan to-nebula-purple opacity-70 group-hover:opacity-100 transition-opacity duration-500"></span>
              <div className="relative px-6 py-2.5 bg-[#030108] rounded-full flex items-center justify-center group-hover:bg-transparent transition-colors duration-500">
                <span className="relative z-10 text-sm font-bold tracking-wide text-white">{t('nav.startMeeting')}</span>
              </div>
            </MagneticLink>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white hover:text-nebula-cyan transition-colors p-2 -mr-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass-panel border-b border-white/10 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              <div className="flex flex-col gap-4 border-b border-white/10 pb-6">
                <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-300 hover:text-white transition-colors">{t('nav.features')}</a>
                <a href="#architecture" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-300 hover:text-white transition-colors">{t('nav.architecture')}</a>
                <a href="#deployment" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-300 hover:text-white transition-colors">{t('nav.deployment')}</a>
              </div>
              <div className="flex items-center justify-between">
                <button onClick={toggleLanguage} className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 text-base font-medium">
                  <Globe className="w-5 h-5" />
                  {isZh ? 'English' : '中文'}
                </button>
                <Link 
                  to="/home" 
                  className="px-6 py-2.5 bg-gradient-to-r from-nebula-cyan to-nebula-purple rounded-full text-sm font-bold tracking-wide text-white shadow-lg shadow-nebula-cyan/20"
                >
                  {t('nav.startMeeting')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* 2. Hero Section (Holographic Space) */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden z-10">
        {/* Parallax Background Orbs */}
        
        

        {/* Floating UI Elements (Background) */}
        <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1000px' }}>
          <motion.div 
            animate={{ y: [-20, 20, -20], rotate: [-5, -7, -5] }}
            transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
            className="absolute rounded-2xl overflow-hidden w-56 aspect-video top-[15%] left-[5%] opacity-60 scale-90 border border-nebula-cyan/30 shadow-[0_0_30px_rgba(0,240,255,0.15)]"
          >
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" alt="Video feed" className="w-full h-full object-cover mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-nebula-base/80 to-transparent"></div>
          </motion.div>

          <motion.div 
            animate={{ y: [20, -20, 20], rotate: [12, 14, 12] }}
            transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
            className="absolute rounded-2xl overflow-hidden w-64 aspect-video top-[25%] right-[2%] opacity-50 blur-[1px] scale-75 border border-nebula-purple/30 shadow-[0_0_30px_rgba(138,43,226,0.15)]"
          >
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" alt="Video feed" className="w-full h-full object-cover mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-nebula-base/80 to-transparent"></div>
          </motion.div>

          <motion.div 
            animate={{ y: [-15, 15, -15], rotate: [-3, -1, -3] }}
            transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, delay: 1 }}
            className="absolute rounded-2xl overflow-hidden w-72 aspect-[4/3] bottom-[10%] left-[8%] opacity-80 scale-100 border border-nebula-cyan/50 shadow-[0_0_40px_rgba(0,240,255,0.2)]"
          >
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" alt="Video feed" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono border border-white/10 flex items-center gap-2 text-white">
              <div className="w-2 h-2 bg-nebula-emerald rounded-full animate-pulse"></div> {t('hero.p2pBadge')}
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [15, -15, 15], rotate: [6, 8, 6] }}
            transition={{ duration: 9, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
            className="absolute rounded-2xl overflow-hidden w-80 aspect-video bottom-[15%] right-[5%] opacity-90 scale-110 border border-nebula-purple/50 shadow-[0_0_40px_rgba(138,43,226,0.2)]"
          >
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600" alt="Video feed" className="w-full h-full object-cover" />
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-red-500/30 text-white">
              <MicOff className="w-4 h-4 text-red-400" />
            </div>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center relative z-20">
          <RevealOnScroll delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400 mb-8">
              <Command className="w-3 h-3" />
              <span>{t('hero.engineBadge')}</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="font-display text-6xl md:text-8xl lg:text-[110px] font-bold leading-[1.1] tracking-normal mb-6 flex flex-col items-center">
              <StaggeredText text={t('hero.title1')} delay={0.2} isZh={isZh} className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-normal text-white" />
              <StaggeredText text={t('hero.title2')} delay={0.8} isZh={isZh} className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-normal bg-clip-text text-transparent bg-gradient-to-r from-nebula-cyan via-nebula-purple to-nebula-magenta animate-[aurora_10s_linear_infinite] pb-2 mt-2" />
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.3}>
            <p className="text-lg md:text-xl text-gray-400 font-normal max-w-2xl mb-12 leading-relaxed">
              {t('hero.desc')}
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center gap-5 mt-2">
              <MagneticButton href="#" className="w-full sm:w-auto relative group overflow-hidden rounded-full p-[1px]">
                <span className="absolute inset-0 bg-gradient-to-r from-nebula-cyan to-nebula-purple opacity-70 group-hover:opacity-100 transition-opacity duration-500"></span>
                <div className="relative px-8 py-4 bg-[#030108] rounded-full flex items-center justify-center gap-2 group-hover:bg-transparent transition-colors duration-500">
                  <span className="font-bold tracking-wide text-white">{t('hero.deployBtn')}</span>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </MagneticButton>
              <MagneticButton href="#" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 font-mono text-sm font-bold flex items-center justify-center gap-2 group">
                <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="tracking-wide">{t('hero.sourceBtn')}</span>
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-nebula-base to-transparent pointer-events-none z-20"></div>
      </section>

      {/* 3. Metrics / Trust Banner */}
      <div className="border-y border-white/5 py-14 bg-black/40 backdrop-blur-md relative z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
            {[
              { value: "0ms", label: t('metrics.latency'), color: "group-hover:text-nebula-cyan" },
              { value: "100%", label: t('metrics.encryption'), color: "group-hover:text-nebula-purple" },
              { value: "$0", label: t('metrics.costs'), color: "group-hover:text-nebula-magenta" },
              { value: "∞", label: t('metrics.scalability'), color: "group-hover:text-nebula-emerald" }
            ].map((metric, i) => (
              <RevealOnScroll key={i} delay={i * 0.1} yOffset={20}>
                <motion.div 
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center justify-center text-center px-4 group cursor-default relative"
                >
                  <div className={`font-mono text-4xl md:text-5xl font-bold text-white mb-2 transition-colors duration-300 ${metric.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
                    {metric.value}
                  </div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-gray-300 transition-colors">{metric.label}</div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* 4. The Holographic Bento Grid (Architecture) */}
      <section id="architecture" className="py-32 px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll className="mb-20 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-mono font-bold uppercase tracking-widest mb-6">
              <Layers className="w-3 h-3" /> {t('architecture.badge')}
            </div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-normal mb-6">
                {t('architecture.title1')} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-nebula-cyan to-nebula-purple">{t('architecture.title2')}</span>
              </h2>
            </motion.div>
            <p className="text-gray-300/90 text-lg">{t('architecture.desc')}</p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[340px]">
            
            {/* Card 1: P2P Mesh (Large) */}
            <TiltCard delay={0.1} className="col-span-1 md:col-span-2 h-full">
              <div className="bento-content flex-1 flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-auto group-hover:bg-nebula-cyan/10 group-hover:border-nebula-cyan/30 transition-all duration-300">
                  <Network className="w-6 h-6 text-white group-hover:text-nebula-cyan transition-colors" />
                </div>
                <div className="mt-8 relative z-10">
                  <h3 className="font-display text-3xl font-bold text-white mb-3">{t('architecture.card1.title')}</h3>
                  <p className="text-gray-400 text-base leading-relaxed max-w-md">{t('architecture.card1.desc')}</p>
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 100 L100 40 L160 100 L100 160 Z" fill="none" stroke="#06b6d4" strokeWidth="1" className="path-draw"/>
                  <path d="M100 40 L100 160 M40 100 L160 100" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4"/>
                  <circle cx="100" cy="40" r="4" fill="#fff" />
                  <circle cx="160" cy="100" r="4" fill="#fff" />
                  <circle cx="100" cy="160" r="4" fill="#fff" />
                  <circle cx="40" cy="100" r="4" fill="#fff" />
                  <circle cx="100" cy="100" r="6" fill="#06b6d4" className="animate-pulse" />
                </svg>
              </div>
            </TiltCard>

            {/* Card 2: Privacy (Small) */}
            <TiltCard delay={0.2} className="col-span-1 h-full">
              <div className="bento-content">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-nebula-purple/10 group-hover:border-nebula-purple/30 transition-all duration-300">
                  <EyeOff className="w-6 h-6 text-white group-hover:text-nebula-purple transition-colors" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">{t('architecture.card2.title')}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t('architecture.card2.desc')}</p>
              </div>
            </TiltCard>

            {/* Card 3: Canvas Recording (Small) */}
            <TiltCard delay={0.3} className="col-span-1 h-full">
              <div className="bento-content">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-nebula-magenta/10 group-hover:border-nebula-magenta/30 transition-all duration-300">
                  <Video className="w-6 h-6 text-white group-hover:text-nebula-magenta transition-colors" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">{t('architecture.card3.title')}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t('architecture.card3.desc')}</p>
              </div>
            </TiltCard>

            {/* Card 4: Watchdog (Large) */}
            <TiltCard delay={0.4} className="col-span-1 md:col-span-2 h-full">
              <div className="flex flex-col md:flex-row items-center gap-10 w-full h-full">
                <div className="bento-content flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-nebula-emerald/10 group-hover:border-nebula-emerald/30 transition-all duration-300">
                    <Activity className="w-6 h-6 text-white group-hover:text-nebula-emerald transition-colors" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-3">{t('architecture.card4.title')}</h3>
                  <p className="text-gray-400 text-base leading-relaxed max-w-sm">{t('architecture.card4.desc')}</p>
                </div>
                
                <div className="w-full md:w-1/2 h-40 relative bento-content flex items-center justify-center glass-panel rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
                  <svg viewBox="0 0 200 50" className="w-full h-full opacity-80">
                    <path d="M 0 25 L 40 25 L 50 10 L 60 40 L 70 25 L 200 25" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    <path d="M 0 25 L 40 25 L 50 10 L 60 40 L 70 25 L 200 25" fill="none" stroke="#10b981" strokeWidth="2" className="path-draw" />
                  </svg>
                  <div className="absolute top-2 right-3 flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-nebula-emerald animate-pulse"></div>
                    <span className="text-[10px] font-mono text-nebula-emerald font-bold">{t('architecture.card4.status')}</span>
                  </div>
                </div>
              </div>
            </TiltCard>

          </div>
        </div>
      </section>

      {/* 5. Feature Showcase (UI & Focus Mode) */}
      <section id="features" className="py-32 px-6 overflow-hidden relative z-20 border-t border-white/5 bg-nebula-base">
        <div className="max-w-7xl mx-auto flex flex-col gap-40">
          
          {/* Showcase 1: Glassmorphism UI */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <RevealOnScroll className="flex-1 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-normal mb-6">
                  {t('features.showcase1.title1')} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-nebula-cyan to-nebula-purple">{t('features.showcase1.title2')}</span>
                </h2>
              </motion.div>
              <p className="text-lg text-gray-400 leading-relaxed font-medium max-w-lg">{t('features.showcase1.desc')}</p>
              
              <ul className="space-y-6 pt-4">
                <li className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0"><LayoutGrid className="w-3 h-3 text-white" /></div>
                  <div>
                    <h4 className="text-white font-bold font-display text-lg mb-1">{t('features.showcase1.point1Title')}</h4>
                    <p className="text-sm text-gray-500 font-medium">{t('features.showcase1.point1Desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Sparkles className="w-3 h-3 text-white" /></div>
                  <div>
                    <h4 className="text-white font-bold font-display text-lg mb-1">{t('features.showcase1.point2Title')}</h4>
                    <p className="text-sm text-gray-500 font-medium">{t('features.showcase1.point2Desc')}</p>
                  </div>
                </li>
              </ul>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2} className="flex-1 w-full relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-nebula-cyan/20 blur-[100px] rounded-full pointer-events-none"></div>
              
              <motion.div 
                whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02 }}
                style={{ rotateY: -10, rotateX: 5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="glass-panel p-3 rounded-[32px] relative z-10 transform-gpu"
              >
                <div className="aspect-video rounded-2xl overflow-hidden relative border border-white/10 glass-panel">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-70 mix-blend-luminosity" alt="Meeting UI" />
                  
                  <div className="absolute bottom-5 left-5 bg-black/80 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
                    <div className="flex items-end gap-0.5 h-3">
                      <div className="w-0.5 bg-nebula-cyan h-1.5 rounded-full"></div>
                      <div className="w-0.5 bg-nebula-cyan h-3 rounded-full animate-pulse"></div>
                      <div className="w-0.5 bg-nebula-cyan h-2 rounded-full"></div>
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide">{t('features.showcase1.name1')}</span>
                  </div>

                  <div className="absolute top-5 right-5 w-32 aspect-video rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" alt="PiP" />
                    <div className="absolute bottom-1.5 left-1.5 bg-black/60 px-1.5 py-0.5 rounded text-[8px] font-bold text-white">{t('features.showcase1.name2')}</div>
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>
          </div>

          {/* Showcase 2: Focus Mode */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            <RevealOnScroll delay={0.2} className="flex-1 w-full relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-nebula-magenta/15 blur-[100px] rounded-full pointer-events-none"></div>
              
              <motion.div 
                whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02 }}
                style={{ rotateY: 10, rotateX: 5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="glass-panel p-3 rounded-[32px] relative z-10 transform-gpu"
              >
                <div className="aspect-video rounded-2xl overflow-hidden relative border border-white/10 glass-panel flex flex-col items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.1),transparent_60%)]"></div>
                  
                  <div className="w-16 h-16 rounded-full border border-nebula-magenta/30 bg-nebula-magenta/10 flex items-center justify-center mb-6 relative">
                    <div className="absolute inset-0 rounded-full border border-nebula-magenta/50 animate-ping opacity-50"></div>
                    <MonitorUp className="w-6 h-6 text-nebula-magenta" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">{t('features.showcase2.activeTitle')}</h3>
                  <p className="text-sm text-gray-500 font-mono mb-6">{t('features.showcase2.activeDesc')}</p>
                  <button className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-colors">{t('features.showcase2.stopBtn')}</button>
                </div>
              </motion.div>
            </RevealOnScroll>

            <RevealOnScroll className="flex-1 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-normal mb-6">
                  {t('features.showcase2.title1')} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-nebula-magenta to-nebula-purple">{t('features.showcase2.title2')}</span>
                </h2>
              </motion.div>
              <p className="text-lg text-gray-400 leading-relaxed font-medium max-w-lg">{t('features.showcase2.desc')}</p>
              
              <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors mt-2 text-sm">
                <FileCode className="w-4 h-4" /> {t('features.showcase2.readBlog')}
              </a>
            </RevealOnScroll>
          </div>

        </div>
      </section>

      {/* 6. Bottom CTA */}
      <section id="deployment" className="py-40 relative overflow-hidden bg-nebula-base border-t border-white/5">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-nebula-cyan/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <RevealOnScroll>
            <motion.div 
              whileHover={{ rotate: 0, scale: 1.1 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/20 flex items-center justify-center shadow-2xl mb-8 transform -rotate-6 mx-auto"
            >
              <Server className="w-8 h-8 text-white" />
            </motion.div>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.1}>
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
              {t('deployment.title1')}<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">{t('deployment.title2')}</span>
            </h2>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.2}>
            <p className="text-xl text-gray-400 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
              {t('deployment.desc')}
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.3}>
            <div className="flex flex-col items-center justify-center gap-6 w-full sm:w-auto">
              <MagneticButton 
                href="#" 
                className="w-full sm:w-auto relative group overflow-hidden rounded-full p-[1px]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-nebula-cyan to-nebula-purple opacity-70 group-hover:opacity-100 transition-opacity duration-500"></span>
                <div className="relative px-12 py-5 bg-[#030108] rounded-full flex items-center justify-center gap-3 group-hover:bg-transparent transition-colors duration-500">
                  <span className="font-bold tracking-wide text-lg text-white">{t('deployment.deployBtn')}</span>
                  <Terminal className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                </div>
              </MagneticButton>
              <div className="flex items-center gap-2 text-sm font-mono text-gray-500">
                <Github className="w-4 h-4" /> {t('deployment.openSource')}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 7. Minimalist Footer */}
      <footer className="bg-nebula-base py-12 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="font-display font-bold tracking-widest text-white text-lg">NEBULA</span>
            </div>
            <p className="text-gray-600 text-sm font-medium">{t('footer.copyright')}</p>
          </div>

          <div className="flex items-center gap-8 text-sm font-mono font-bold text-gray-500">
            <a href="#" className="hover:text-white transition-colors">{t('footer.github')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.docs')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
          </div>

          <div>
            <Link to="/login" className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all font-mono text-xs font-bold text-gray-600 hover:text-white">
              <ShieldHalf className="w-3.5 h-3.5" /> {t('footer.admin')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NebulaLanding;