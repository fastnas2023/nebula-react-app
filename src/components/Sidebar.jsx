import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Calendar, Clock, Users, Settings, ChevronUp, User, CreditCard, LogOut, FolderOpen, Video as VideoIcon, Globe, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NebulaLogo from './NebulaLogo';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const isZh = i18n.language === 'zh';
    
    // Auto-collapse on small screens, but allow manual toggle
    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isActive = (path) => location.pathname === path;

    const toggleLanguage = () => {
        i18n.changeLanguage(isZh ? 'en' : 'zh');
    };

    const navLinkClass = (path) => isActive(path) 
        ? `flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} w-full py-2.5 bg-gradient-to-r from-nebula-cyan/10 to-transparent border-l-2 border-nebula-cyan text-white ${isCollapsed ? '' : 'rounded-r-xl'} transition-colors group`
        : `flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} w-full py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors group`;

    const iconClass = (path) => isActive(path)
        ? "w-[18px] h-[18px] text-nebula-cyan flex-shrink-0"
        : "w-[18px] h-[18px] group-hover:text-nebula-cyan transition-colors flex-shrink-0";

    const textClass = (path) => isActive(path)
        ? `font-bold text-sm text-nebula-cyan whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 w-auto block'}`
        : `font-medium text-sm whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 w-auto block'}`;

    return (
        <aside className={`${isCollapsed ? 'w-16' : 'w-56'} h-[100dvh] glass-panel flex flex-col relative z-50 border-r border-white/5 transition-all duration-300 flex-shrink-0`}>
            
            {/* Collapse Toggle Button */}
            <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-8 w-6 h-6 bg-[#0a0514] border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors z-50 shadow-lg"
                title={isCollapsed ? t('sidebar.expandSidebar') : t('sidebar.collapseSidebar')}
            >
                {isCollapsed ? <PanelLeftOpen className="w-3.5 h-3.5" /> : <PanelLeftClose className="w-3.5 h-3.5" />}
            </button>

            <div className={`h-20 flex items-center justify-center ${isCollapsed ? 'px-0' : 'px-4'} border-b border-white/5 overflow-hidden`}>
                <div className={`w-full flex ${isCollapsed ? 'justify-center' : 'pl-2'}`}>
                    <NebulaLogo showText={!isCollapsed} className={isCollapsed ? 'justify-center' : ''} text="Nebula" />
                </div>
            </div>
            
            <nav className={`flex-1 py-8 ${isCollapsed ? 'px-2' : 'px-4'} flex flex-col gap-2 relative z-0 overflow-x-hidden overflow-y-auto hide-scrollbar`}>
                <Link to="/home" className={`${navLinkClass('/home')} relative group/tooltip`}>
                    <HomeIcon className={iconClass('/home')} />
                    <span className={textClass('/home')}>{t('sidebar.dashboard')}</span>
                    {isCollapsed && (
                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-black/90 border border-white/10 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl">
                            {t('sidebar.dashboard')}
                        </div>
                    )}
                </Link>
                <Link to="/schedule" className={`${navLinkClass('/schedule')} relative group/tooltip`}>
                    <VideoIcon className={iconClass('/schedule')} />
                    <span className={textClass('/schedule')}>{t('sidebar.meetings')}</span>
                    {isCollapsed && (
                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-black/90 border border-white/10 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl">
                            {t('sidebar.meetings')}
                        </div>
                    )}
                </Link>
                <Link to="/recording" className={`${navLinkClass('/recording')} relative group/tooltip`}>
                    <FolderOpen className={iconClass('/recording')} />
                    <span className={textClass('/recording')}>{t('sidebar.recordings')}</span>
                    {isCollapsed && (
                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-black/90 border border-white/10 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl">
                            {t('sidebar.recordings')}
                        </div>
                    )}
                </Link>
                <Link to="/profile" className={`${navLinkClass('/profile')} relative group/tooltip`}>
                    <User className={iconClass('/profile')} />
                    <span className={textClass('/profile')}>{t('sidebar.profile')}</span>
                    {isCollapsed && (
                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-black/90 border border-white/10 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl">
                            {t('sidebar.profile')}
                        </div>
                    )}
                </Link>
                <Link to="/contacts" className={`${navLinkClass('/contacts')} relative group/tooltip`}>
                    <Users className={iconClass('/contacts')} />
                    <span className={textClass('/contacts')}>{t('sidebar.contacts')}</span>
                    {isCollapsed && (
                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-black/90 border border-white/10 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl">
                            {t('sidebar.contacts')}
                        </div>
                    )}
                </Link>
                
                <div className="h-px bg-white/5 my-2 mx-4"></div>
            </nav>

            <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-t border-white/5 relative z-50`}>
                <Link to="/settings" className={`${navLinkClass('/settings')} relative z-0 group/tooltip`}>
                    <Settings className={iconClass('/settings')} />
                    <span className={textClass('/settings')}>{t('sidebar.settings')}</span>
                    {isCollapsed && (
                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-black/90 border border-white/10 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl">
                            {t('sidebar.settings')}
                        </div>
                    )}
                </Link>
                
                {/*  Profile Dropdown  */}
                <div className={`relative group cursor-pointer glass-panel ${isCollapsed ? 'p-1.5 justify-center' : 'p-3'} rounded-2xl flex items-center gap-3 hover:bg-white/5 transition-colors mt-2 z-[60]`}>
                    <div className={`relative flex-shrink-0 ${isCollapsed ? 'w-8 h-8' : 'w-10 h-10'}`}>
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" className="w-full h-full rounded-full border border-nebula-800 object-cover" />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-nebula-900"></div>
                    </div>
                    {!isCollapsed && (
                        <>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">Sarah Jenkins</p>
                                <p className="text-xs text-white/50 truncate">{t('sidebar.proPlan')}</p>
                            </div>
                            <ChevronUp className="w-4 h-4 text-white/50 group-hover:text-white transition-colors flex-shrink-0" />
                        </>
                    )}
                    
                    {/*  Dropdown Menu  */}
                    <div className={`absolute ${isCollapsed ? 'left-full bottom-0 pl-3' : 'bottom-full left-0 pb-3'} w-48 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto z-[100] transition-all duration-200`}>
                        <div className="bg-[#0a0514] border border-white/10 rounded-xl py-2 shadow-[0_0_30px_rgba(0,0,0,1)]">
                            <button onClick={() => navigate('/profile')} className="w-full px-4 py-2 text-left text-sm text-white/90 hover:bg-white/10 flex items-center gap-3 transition-colors">
                                <User className="w-4 h-4 text-white/50" /> {t('sidebar.myProfile')}
                            </button>
                            <button onClick={() => navigate('/profile')} className="w-full px-4 py-2 text-left text-sm text-white/90 hover:bg-white/10 flex items-center gap-3 transition-colors">
                                <CreditCard className="w-4 h-4 text-white/50" /> {t('sidebar.billingAndPlan')}
                            </button>
                            <button onClick={toggleLanguage} className="w-full px-4 py-2 text-left text-sm text-white/90 hover:bg-white/10 flex items-center justify-between transition-colors">
                                <span className="flex items-center gap-3">
                                    <Globe className="w-4 h-4 text-white/50" /> {isZh ? t('sidebar.switchToEnglish') : t('sidebar.switchToChinese')}
                                </span>
                                <span className="text-xs font-mono text-white/40">{isZh ? 'EN' : '中'}</span>
                            </button>
                            <div className="w-full h-px bg-white/10 my-1"></div>
                            <button onClick={() => navigate('/login')} className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition-colors">
                                <LogOut className="w-4 h-4" /> {t('sidebar.signOut')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
