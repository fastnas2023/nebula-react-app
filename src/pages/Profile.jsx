import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Camera, QrCode, Copy, Zap, Check, Fingerprint, ChevronDown, RefreshCw, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';
import Background from '../components/Background';
import useMediaStore from '../store/useMediaStore';

export default function Profile() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    const displayName = useMediaStore(state => state.displayName);
    const avatarUrl = useMediaStore(state => state.avatarUrl);
    const email = useMediaStore(state => state.email);
    
    // Split display name into first and last for the form
    const nameParts = displayName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    return (
        <div className="h-[100dvh] w-full font-sans antialiased flex relative">
            <Background />
            <Sidebar />
            <main className="flex-1 h-full overflow-y-auto relative z-10 p-6 lg:p-12 scroll-smooth scroll-hidden">
        <div className="max-w-4xl mx-auto px-8 py-12">
            
            <h1 className="font-display text-4xl font-bold mb-2">{t('profile.title')}</h1>
            <p className="text-gray-400 font-mono text-sm mb-12">{t('profile.subtitle')}</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/*  Left Column: Avatar & Quick Actions  */}
                <div className="space-y-6">
                    <div className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center">
                        
                        {/*  Interactive Avatar  */}
                        <div className="relative w-32 h-32 mb-6 avatar-container cursor-pointer group">
                            <div className="absolute inset-0 bg-nebula-cyan/20 rounded-full blur-xl group-hover:bg-nebula-cyan/40 transition-colors"></div>
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="User Avatar" className="w-32 h-32 rounded-full border-2 border-white/20 object-cover relative z-10" />
                            ) : (
                                <div className="w-32 h-32 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center text-white font-bold text-4xl relative z-10">
                                    {displayName.charAt(0)}
                                </div>
                            )}
                            
                            {/*  Hover Overlay  */}
                            <div className="absolute inset-0 z-20 rounded-full flex flex-col items-center justify-center avatar-upload-overlay border-2 border-nebula-cyan">
                                <Camera className="w-6 h-6 text-white mb-1" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">{t('profile.update')}</span>
                            </div>
                        </div>

                        <h2 className="font-display text-2xl font-bold text-white mb-1">{displayName}</h2>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nebula-emerald/10 border border-nebula-emerald/20 text-nebula-emerald text-xs font-mono font-bold mb-6">
                            <div className="w-1.5 h-1.5 bg-nebula-emerald rounded-full animate-pulse"></div> {t('profile.activeNode')}
                        </div>

                        <div className="w-full space-y-3">
                            <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                                <QrCode className="w-4 h-4 text-gray-400" /> {t('profile.myMeetingQr')}
                            </button>
                            <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                                <Copy className="w-4 h-4 text-gray-400" /> {t('profile.copyP2pLink')}
                            </button>
                        </div>
                    </div>

                    {/*  Subscription Tier  */}
                    <div className="glass-panel p-6 rounded-3xl border-t-2 border-nebula-purple">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg text-white flex items-center gap-2"><Zap className="w-4 h-4 text-nebula-purple" /> {t('profile.proPlan')}</h3>
                                <p className="text-xs text-gray-500 font-mono mt-1">{t('profile.billedAnnually')}</p>
                            </div>
                            <span className="text-2xl font-display font-bold text-nebula-purple">$12<span className="text-sm text-gray-500">/mo</span></span>
                        </div>
                        <div className="space-y-2 mb-6">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">4K Resolution</span>
                                <Check className="w-4 h-4 text-nebula-emerald" />
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">AI Transcripts</span>
                                <span className="text-white font-mono text-xs">Unlimited</span>
                            </div>
                        </div>
                        <button className="w-full py-2.5 bg-nebula-purple/10 hover:bg-nebula-purple/20 text-nebula-purple rounded-xl text-sm font-bold transition-colors border border-nebula-purple/30">
                            {t('profile.manageBilling')}
                        </button>
                    </div>
                </div>

                {/*  Right Column: Settings Form  */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-panel p-8 rounded-3xl">
                        <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                            <Fingerprint className="w-5 h-5 text-nebula-cyan" /> {t('profile.identity')}
                        </h3>
                        
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">{t('profile.firstName')}</label>
                                    <input type="text" defaultValue={firstName} className="w-full input-cyber rounded-xl px-4 py-3.5 text-sm focus:bg-black/50"  />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">{t('profile.lastName')}</label>
                                    <input type="text" defaultValue={lastName} className="w-full input-cyber rounded-xl px-4 py-3.5 text-sm focus:bg-black/50"  />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">{t('profile.operatorEmailReadOnly')}</label>
                                <input type="email" defaultValue={email} readOnly className="w-full bg-white/5 border border-white/5 text-gray-400 rounded-xl px-4 py-3.5 text-sm cursor-not-allowed"  />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">{t('profile.timezone')}</label>
                                <div className="relative">
                                    <select className="w-full input-cyber rounded-xl px-4 py-3.5 text-sm focus:bg-black/50 appearance-none bg-transparent">
                                        <option value="pst">Pacific Time (PT) - Current: 10:42 AM</option>
                                        <option value="est">Eastern Time (ET)</option>
                                        <option value="utc">Coordinated Universal Time (UTC)</option>
                                        <option value="cst">China Standard Time (CST)</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">{t('profile.personalMeetingId')}</label>
                                <div className="flex gap-2">
                                    <input type="text" defaultValue="NBL-8X92-K" readOnly className="flex-1 input-cyber rounded-xl px-4 py-3.5 text-sm font-mono text-nebula-cyan bg-nebula-cyan/5 border-nebula-cyan/20"  />
                                    <button type="button" className="px-4 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
                                        <RefreshCw className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                                <button type="button" className="px-6 py-3 bg-transparent text-gray-400 hover:text-white font-bold rounded-xl transition-colors">{t('profile.discard')}</button>
                                <button type="button" className="px-8 py-3 bg-nebula-cyan text-black hover:bg-cyan-400 font-bold rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transform hover:-translate-y-0.5">
                                    {t('profile.saveChanges')}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/*  Security Settings  */}
                    <div className="glass-panel p-8 rounded-3xl border border-red-500/20">
                        <h3 className="font-display text-xl font-bold mb-2 flex items-center gap-2 text-red-400">
                            <ShieldAlert className="w-5 h-5" /> {t('profile.dangerZone')}
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">{t('profile.dangerZoneDesc')}</p>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                <div>
                                    <h4 className="text-white font-bold text-sm">{t('profile.regenerateKeys')}</h4>
                                    <p className="text-xs text-gray-500 mt-1">{t('profile.invalidateLinks')}</p>
                                </div>
                                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-bold transition-colors border border-white/10">{t('profile.rotateKeys')}</button>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                <div>
                                    <h4 className="text-red-400 font-bold text-sm">{t('profile.deleteAccount')}</h4>
                                    <p className="text-xs text-gray-500 mt-1">{t('profile.deleteAccountDesc')}</p>
                                </div>
                                <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg text-sm font-bold transition-colors border border-red-500/30">{t('profile.delete')}</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>

    

        </div>
    );
}
