import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, Phone, Video, Mail, MoreVertical } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';
import Background from '../components/Background';

export default function Contacts() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    const contacts = [
        { name: "Alex Chen", role: "Engineering Lead", status: "online", img: "https://i.pravatar.cc/150?img=11" },
        { name: "Maria Garcia", role: "Product Manager", status: "busy", img: "https://i.pravatar.cc/150?img=5" },
        { name: "David Kim", role: "UI/UX Designer", status: "offline", img: "https://i.pravatar.cc/150?img=15" },
        { name: "Sarah Jenkins", role: "Frontend Dev", status: "online", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" },
        { name: "James Wilson", role: "Backend Dev", status: "online", img: "https://i.pravatar.cc/150?img=8" }
    ];

    return (
        <div className="h-[100dvh] w-full font-sans antialiased flex relative">
            <Background />
            <Sidebar />
            <main className="flex-1 h-full overflow-y-auto relative z-10 p-6 lg:p-12 scroll-smooth">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h1 className="font-display text-4xl font-bold mb-2">{t('contacts.title')}</h1>
                            <p className="text-gray-400 font-mono text-sm">{t('contacts.subtitle')}</p>
                        </div>
                        <button className="btn-cyber px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(138,43,226,0.4)]">
                            <UserPlus className="w-5 h-5" /> {t('contacts.addConnection')}
                        </button>
                    </div>

                    {/* Search and Filter */}
                    <div className="glass-panel p-4 rounded-2xl mb-8 flex items-center gap-4">
                        <Search className="w-5 h-5 text-white/50" />
                        <input type="text" placeholder={t('contacts.searchPlaceholder')} className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder-white/30" />
                    </div>

                    {/* Contacts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {contacts.map((contact, i) => (
                            <div key={i} className="glass-panel p-6 rounded-3xl hover:-translate-y-1 transition-transform duration-300 border border-white/5 hover:border-nebula-cyan/30 group">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="relative">
                                        <img src={contact.img} className="w-16 h-16 rounded-full object-cover border border-white/10" />
                                        <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#09090b] ${
                                            contact.status === 'online' ? 'bg-green-500' : contact.status === 'busy' ? 'bg-red-500' : 'bg-gray-500'
                                        }`}></div>
                                    </div>
                                    <button className="text-white/40 hover:text-white transition-colors">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                                
                                <h3 className="font-bold text-lg text-white mb-1 group-hover:text-nebula-cyan transition-colors">{contact.name}</h3>
                                <p className="text-sm text-white/50 mb-6 font-mono">{contact.role}</p>

                                <div className="flex items-center gap-3">
                                    <button className="flex-1 bg-white/5 hover:bg-nebula-cyan/20 border border-white/10 hover:border-nebula-cyan/50 text-white py-2 rounded-xl flex items-center justify-center transition-colors group/btn">
                                        <Video className="w-4 h-4 group-hover/btn:text-nebula-cyan" />
                                    </button>
                                    <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2 rounded-xl flex items-center justify-center transition-colors">
                                        <Phone className="w-4 h-4 text-white/70" />
                                    </button>
                                    <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2 rounded-xl flex items-center justify-center transition-colors">
                                        <Mail className="w-4 h-4 text-white/70" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
