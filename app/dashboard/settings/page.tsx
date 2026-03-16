'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { User, Bell, Shield, Globe, Save, Check, ChevronRight, Settings as SettingsIcon } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const tabs = [
  { id: 'profile', label: 'Профиль', icon: User },
  { id: 'notifications', label: 'Уведомления', icon: Bell },
  { id: 'security', label: 'Безопасность', icon: Shield },
];

export default function SettingsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [form, setForm] = useState({
    name: 'Алибек Нурланов',
    email: 'alibek@example.kz',
    about: 'Ориентирован на урегулирование задолженности и восстановление финансового здоровья.'
  });

  useEffect(() => {
    setMounted(true);
    setForm(prev => ({
      ...prev,
      name: localStorage.getItem('userName') || 'Алибек Нурланов',
      email: localStorage.getItem('userEmail') || 'alibek@example.kz'
    }));
  }, []);

  const handleSave = () => {
    localStorage.setItem('userName', form.name);
    localStorage.setItem('userEmail', form.email);
    // Tell the custom logic event to trigger if needed, or just let it be. 
    // Usually localStorage listeners are needed for cross-tab, but a reload works for same tab.
    window.dispatchEvent(new Event('storage'));
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[800px] mx-auto px-12 py-12">
          
          <header className="mb-16">
             <div className="flex items-center gap-3 mb-4">
                <SettingsIcon className="w-5 h-5 text-zinc-400" />
                <span className="text-[12px] font-bold uppercase tracking-widest text-zinc-400">{t('Персональная система')}</span>
             </div>
             <h1 className="font-serif text-[56px] text-black tracking-tight leading-none">{t('Настройки')}</h1>
          </header>

          <div className="flex gap-12 border-b border-zinc-100 mb-16">
             {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-2 text-[14px] font-bold uppercase tracking-[0.15em] transition-all relative ${
                    activeTab === tab.id ? 'text-black' : 'text-zinc-400 hover:text-black'
                  }`}
                >
                  {t(tab.label)}
                  {activeTab === tab.id && (
                    <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                  )}
                </button>
             ))}
          </div>

          <section className="space-y-16">
             {activeTab === 'profile' && (
                 <div className="space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                         <label className="text-[12px] font-bold uppercase tracking-widest text-zinc-400">{t('ФИО')}</label>
                         <input type="text" value={mounted ? form.name : ''} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full bg-transparent border-b border-zinc-200 py-3 outline-none focus:border-black transition-all text-[16px] font-medium" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[12px] font-bold uppercase tracking-widest text-zinc-400">{t('Электронная почта')}</label>
                         <input type="email" value={mounted ? form.email : ''} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full bg-transparent border-b border-zinc-200 py-3 outline-none focus:border-black transition-all text-[16px] font-medium" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[12px] font-bold uppercase tracking-widest text-zinc-400">{t('О себе')}</label>
                      <textarea className="w-full bg-transparent border-b border-zinc-200 py-3 outline-none focus:border-black transition-all text-[16px] font-medium min-h-[100px] resize-none" value={mounted ? form.about : ''} onChange={(e) => setForm({...form, about: e.target.value})} />
                   </div>
                </div>
             )}

             {activeTab === 'notifications' && (
                <div className="space-y-8">
                   {[
                     { label: 'Оповещения безопасности', desc: 'Критические изменения в безопасности вашей учетной записи.' },
                     { label: 'Обновления переговоров', desc: 'Оповещения в реальном времени при ответе кредитора.' },
                     { label: 'AI Аналитика', desc: 'Еженедельный отчет по вашей ситуации с долгами.' },
                   ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between group">
                         <div>
                            <p className="text-[15px] font-bold text-black group-hover:italic transition-all">
                               {t(item.label)}
                            </p>
                            <p className="text-[13px] text-zinc-400 mt-1">{t(item.desc)}</p>
                         </div>
                         <div className="w-10 h-6 bg-zinc-100 rounded-full p-1 cursor-pointer transition-colors hover:bg-zinc-200 relative">
                            <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                         </div>
                      </div>
                   ))}
                </div>
             )}

             <div className="pt-12 flex items-center justify-between border-t border-zinc-100">
                <button onClick={handleSave} className="btn-keneshub btn-black px-12 py-3.5 rounded-xl uppercase tracking-[0.2em] flex items-center gap-3">
                   {saved ? <Check size={16} /> : <Save size={16} />}
                   {saved ? t('Сохранено') : t('Сохранить изменения')}
                </button>
                <p className="text-[13px] text-zinc-400 font-medium italic">{t('Синхронизация: 2 минуты назад')}</p>
             </div>
          </section>

          <div className="mt-40 text-center opacity-20">
             <h2 className="font-serif italic text-[24px] text-black">{t('Точность — это залог спокойствия.')}</h2>
          </div>

        </div>
      </main>
    </div>
  );
}

function Settings(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  )
}
