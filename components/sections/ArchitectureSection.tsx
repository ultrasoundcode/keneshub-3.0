'use client';

import { motion } from 'framer-motion';
import { User, Building2, Briefcase, Scale, Users, FileCheck, MessageSquare, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const actors = [
  { id: 'creditor', name: 'Кредитор', desc: 'Банк / МФО', icon: Building2, side: 'left', items: ['Запрос на КП', 'Чат', 'ЭЦП'] },
  { id: 'collector', name: 'Коллектор', desc: 'Агентство', icon: Briefcase, side: 'right', items: ['Отклик КП', 'Чат', 'ЭЦП'] },
  { id: 'lawyer', name: 'Юрист', desc: 'Защита', icon: Scale, side: 'left-bottom', items: ['Консультации'] },
  { id: 'ombudsman', name: 'Омбудсмен', desc: 'Медиатор', icon: Users, side: 'right-bottom', items: ['Медиация', 'Соглашение'] },
];

export default function ArchitectureSection() {
  const { t } = useLanguage();
  return (
    <section className="py-20 md:py-40 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        <header className="text-center mb-16 md:mb-32">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
             <ShieldCheck size={18} className="text-zinc-400" />
             <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-zinc-400">{t('Архитектура системы')}</span>
          </div>
          <h2 className="font-serif text-[32px] md:text-[56px] text-black leading-tight md:leading-none tracking-tight">
            {t('Экосистема урегулирования')}
          </h2>
          <p className="text-[14px] md:text-[16px] text-zinc-400 mt-4 md:mt-6 max-w-[600px] mx-auto font-medium px-4">
            {t('Прозрачное взаимодействие между всеми участниками процесса реструктуризации долга в Казахстане.')}
          </p>
        </header>

        <div className="relative min-h-[500px] md:min-h-[700px] flex flex-col items-center justify-center">
          {/* Central Hub: Borrower */}
          <div className="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-30 mb-12 md:mb-0">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="w-36 h-36 md:w-48 md:h-48 rounded-full border-2 border-black bg-white flex flex-col items-center justify-center text-center p-4 md:p-6 shadow-2xl shadow-zinc-100"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-2 md:mb-3">
                 <User size={20} className="md:size-[24px] text-black" />
              </div>
              <h3 className="font-serif text-[18px] md:text-[22px] font-bold text-black leading-tight italic">{t('Заёмщик')}</h3>
              <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-1">{t('Центральный узел')}</p>
            </motion.div>
            
            {/* Pulsing Aura */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-full border border-black/5 -m-4 md:-m-6"
            />
          </div>

          {/* Connection Lines - Hidden on Mobile */}
          <div className="hidden md:absolute md:inset-0 pointer-events-none opacity-10">
             <svg className="w-full h-full" viewBox="0 0 1000 700">
                <path d="M250,200 L500,350" stroke="black" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M750,200 L500,350" stroke="black" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M250,500 L500,350" stroke="black" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M750,500 L500,350" stroke="black" strokeWidth="1" strokeDasharray="4 4" />
             </svg>
          </div>

          {/* Actor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-80 md:gap-y-60 relative z-20 w-full md:w-auto">
             {actors.map((actor, i) => (
                <motion.div
                  key={actor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`keneshub-pill p-6 md:p-10 w-full md:max-w-[280px] bg-white group hover:border-black transition-all ${
                    actor.side === 'right' || actor.side === 'right-bottom' ? 'md:ml-auto' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-black transition-colors">
                      <actor.icon size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-[15px] md:text-[17px] font-bold text-black tracking-tight leading-none mb-1">{t(actor.name)}</h4>
                      <p className="text-[10px] md:text-[12px] text-zinc-400 font-medium uppercase tracking-widest leading-none">{t(actor.desc)}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:space-y-3 pt-4 md:pt-6 border-t border-zinc-50">
                     {actor.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 md:gap-3 text-[12px] md:text-[13px] font-medium text-zinc-500">
                           <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-zinc-200" />
                           {t(item)}
                        </div>
                     ))}
                  </div>
                </motion.div>
             ))}
          </div>
        </div>

        {/* Bottom Capabilities Bar */}
        <div className="mt-20 md:mt-40 border-t border-zinc-100 pt-12 md:pt-20">
           <div className="flex flex-wrap justify-center gap-8 md:gap-32 px-4">
              {[
                { icon: MessageSquare, text: 'Чат в реальном времени' },
                { icon: FileCheck, text: 'Цифровой DMS' },
                { icon: ShieldCheck, text: 'Проверка ЭЦП' }
              ].map((cap, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4 group">
                   <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-300 group-hover:text-black group-hover:border-black transition-all">
                      <cap.icon size={18} strokeWidth={1.5} />
                   </div>
                   <span className="text-[11px] md:text-[13px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-zinc-400 group-hover:text-black transition-colors">
                      {t(cap.text)}
                   </span>
                </div>
              ))}
           </div>
           
           <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div>
                 <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-300 mb-2">{t('Децентрализация')}</p>
                 <p className="text-[14px] text-zinc-500 font-serif italic">{t('Без хранения портфелей')}</p>
              </div>
              <div>
                 <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-300 mb-2">{t('Нейтральность')}</p>
                 <p className="text-[14px] text-zinc-500 font-serif italic">{t('Без участия в расчётах')}</p>
              </div>
              <div>
                 <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-300 mb-2">{t('Авторитет сервиса')}</p>
                 <p className="text-[14px] text-zinc-500 font-serif italic">{t('Технический оператор')}</p>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
