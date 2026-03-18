'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Scale, 
  Star, 
  ChevronRight, 
  Search,
  PenTool
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const lawyers = [
  { name: 'Марат Оспанов', specialty: 'Банковские споры', exp: '12 лет', rating: 4.9, price: '₸15,000/час' },
  { name: 'Алия Каримова', specialty: 'Реструктуризация МФО', exp: '8 лет', rating: 4.8, price: '₸12,000/час' },
  { name: 'Ербол Тлеуов', specialty: 'Защита прав заёмщиков', exp: '15 лет', rating: 5.0, price: '₸20,000/час' },
];

export default function LegalPage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<'lawyers' | 'ombudsman'>('lawyers');

  return (
    <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-12">
      
      <header className="mb-12 md:mb-16">
         <div className="flex flex-wrap items-center gap-3 mb-6">
            {['lawyers', 'ombudsman'].map((t_key) => (
               <button 
                 key={t_key}
                 onClick={() => setTab(t_key as any)}
                 className={`px-4 md:px-6 py-2 rounded-full text-[11px] md:text-[13px] font-bold uppercase tracking-widest transition-all ${
                   tab === t_key ? 'bg-black text-white' : 'text-zinc-400 hover:text-black hover:bg-zinc-50'
                 }`}
               >
                 {t_key === 'lawyers' ? t('Юристы') : t('Медиация / Омбудсмен')}
               </button>
            ))}
         </div>
          <h1 className="font-serif text-[36px] md:text-[52px] text-black tracking-tight leading-tight">
            {tab === 'lawyers' ? t('Экспертная помощь') : t('Медиация и урегулирование')}
          </h1>
      </header>

      {tab === 'lawyers' ? (
        <section className="space-y-12">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-zinc-100">
              <p className="text-[14px] text-zinc-400 font-medium max-w-[500px]">{t('Проверенные специалисты в области финансового права Казахстана.')}</p>
              <div className="relative w-full md:w-auto">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input placeholder={t('Поиск специализации...')} className="w-full md:w-[240px] pl-9 pr-4 py-1 border-b border-zinc-200 outline-none focus:border-black text-[14px] transition-all bg-transparent" />
              </div>
           </div>

           <div className="space-y-4">
              {lawyers.map((l, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="group p-6 md:p-8 rounded-[24px] border border-zinc-100 hover:border-black hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-all flex flex-col md:flex-row md:items-center justify-between cursor-pointer bg-white gap-6"
                >
                   <div className="flex items-center gap-4 md:gap-8">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center font-serif text-[20px] md:text-[24px] font-bold text-black border-dashed flex-shrink-0">
                         {l.name[0]}
                      </div>
                      <div className="min-w-0">
                         <h3 className="font-serif text-[22px] md:text-[26px] text-black italic mb-1 truncate">{l.name}</h3>
                         <div className="flex flex-wrap items-center gap-2 md:gap-4 text-zinc-400 text-[12px] md:text-[14px]">
                             <span className="font-bold text-black truncate">{t(l.specialty)}</span>
                             <div className="hidden md:block w-1 h-1 rounded-full bg-zinc-200" />
                             <span className="whitespace-nowrap">{t('Опыт')}: {l.exp}</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center justify-between md:justify-end gap-8 md:gap-12 border-t md:border-t-0 pt-4 md:pt-0">
                      <div className="text-left md:text-right">
                         <div className="flex items-center md:justify-end gap-1 mb-1">
                            <Star size={14} fill="currentColor" className="text-black" />
                            <span className="text-[14px] font-bold text-black">{l.rating}</span>
                         </div>
                         <p className="text-[13px] font-medium text-zinc-400 uppercase tracking-tighter">{l.price}</p>
                      </div>
                      <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-black hover:text-white transition-all transform group-hover:scale-105 flex-shrink-0">
                         <ChevronRight size={20} />
                      </button>
                   </div>
                </motion.div>
              ))}
           </div>
        </section>
      ) : (
        <section className="max-w-[600px]">
           <div className="space-y-10 md:space-y-12">
              <div className="space-y-4">
                 <h3 className="font-serif text-[24px] md:text-[28px] text-black">{t('Запрос на медиацию')}</h3>
                 <p className="text-[15px] md:text-[16px] text-zinc-500 leading-relaxed italic border-l-2 border-zinc-100 pl-4 md:pl-6">
                    {t('Омбудсмен выступает нейтральной третьей стороной между вами и финансовыми организациями. Подайте заявку на рассмотрение вашего спора.')}
                 </p>
              </div>

              <div className="space-y-8">
                 <div className="space-y-3">
                     <label className="text-[12px] font-bold uppercase tracking-widest text-[#999]">{t('Выберите кредитора')}</label>
                    <select className="w-full bg-transparent border-b border-zinc-200 py-3 outline-none focus:border-black transition-all text-[16px]">
                       <option>Kaspi Bank</option>
                       <option>Halyk Bank</option>
                       <option>Home Credit</option>
                    </select>
                 </div>
                 <div className="space-y-3">
                     <label className="text-[12px] font-bold uppercase tracking-widest text-[#999]">{t('Детальная жалоба')}</label>
                     <textarea 
                        className="w-full bg-transparent border-b border-zinc-200 py-3 outline-none focus:border-black transition-all text-[16px] min-h-[120px] resize-none"
                        placeholder={t('Опишите спор в деталях...')}
                     />
                 </div>
                  <button className="btn-keneshub btn-black w-full py-4 rounded-xl text-[14px] uppercase tracking-[0.2em] font-bold">
                     {t('Инициировать медиацию')}
                  </button>
              </div>
           </div>
        </section>
      )}

    </div>
  );
}
