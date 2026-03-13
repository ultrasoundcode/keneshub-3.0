'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { 
  Scale, 
  User, 
  MessageSquare, 
  Star, 
  ChevronRight, 
  ShieldCheck,
  Search,
  Users
} from 'lucide-react';
import Link from 'next/link';

const lawyers = [
  { name: 'Марат Оспанов', specialty: 'Банковские споры', exp: '12 лет', rating: 4.9, price: '₸15,000/час' },
  { name: 'Алия Каримова', specialty: 'Реструктуризация МФО', exp: '8 лет', rating: 4.8, price: '₸12,000/час' },
  { name: 'Ербол Тлеуов', specialty: 'Защита прав заёмщиков', exp: '15 лет', rating: 5.0, price: '₸20,000/час' },
];

export default function LegalPage() {
  const [tab, setTab] = useState<'lawyers' | 'ombudsman'>('lawyers');

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1000px] mx-auto px-12 py-12">
          
          <header className="mb-16">
             <div className="flex items-center gap-3 mb-6">
                {['lawyers', 'ombudsman'].map((t) => (
                   <button 
                     key={t}
                     onClick={() => setTab(t as any)}
                     className={`px-6 py-2 rounded-full text-[13px] font-bold uppercase tracking-widest transition-all ${
                       tab === t ? 'bg-black text-white' : 'text-zinc-400 hover:text-black hover:bg-zinc-50'
                     }`}
                   >
                     {t === 'lawyers' ? 'Юристы' : 'Медиация / Омбудсмен'}
                   </button>
                ))}
             </div>
              <h1 className="font-serif text-[52px] text-black tracking-tight leading-none">
                {tab === 'lawyers' ? 'Экспертная помощь' : 'Медиация и урегулирование'}
              </h1>
          </header>

          {tab === 'lawyers' ? (
            <section className="space-y-12">
               <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <p className="text-[14px] text-zinc-400 font-medium">Проверенные специалисты в области финансового права Казахстана.</p>
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input placeholder="Поиск специализации..." className="pl-9 pr-4 py-1 border-b border-zinc-200 outline-none focus:border-black text-[14px] transition-all bg-transparent" />
                  </div>
               </div>

               <div className="space-y-4">
                  {lawyers.map((l, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="group p-8 rounded-[24px] border border-zinc-100 hover:border-black hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-all flex items-center justify-between cursor-pointer"
                    >
                       <div className="flex items-center gap-8">
                          <div className="w-16 h-16 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center font-serif text-[24px] font-bold text-black border-dashed">
                             {l.name[0]}
                          </div>
                          <div>
                             <h3 className="font-serif text-[26px] text-black italic mb-1">{l.name}</h3>
                             <div className="flex items-center gap-4 text-zinc-400 text-[14px]">
                                 <span className="font-bold text-black">{l.specialty}</span>
                                 <div className="w-1 h-1 rounded-full bg-zinc-200" />
                                 <span>Опыт: {l.exp}</span>
                             </div>
                          </div>
                       </div>
                       <div className="flex items-center gap-12">
                          <div className="text-right">
                             <div className="flex items-center justify-end gap-1 mb-1">
                                <Star size={14} fill="currentColor" className="text-black" />
                                <span className="text-[14px] font-bold text-black">{l.rating}</span>
                             </div>
                             <p className="text-[13px] font-medium text-zinc-400 uppercase tracking-tighter">{l.price}</p>
                          </div>
                          <button className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-black hover:text-white transition-all transform group-hover:scale-105">
                             <ChevronRight size={20} />
                          </button>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </section>
          ) : (
            <section className="max-w-[600px]">
               <div className="space-y-12">
                  <div className="space-y-4">
                     <h3 className="font-serif text-[28px] text-black">Запрос на медиацию</h3>
                     <p className="text-[16px] text-zinc-500 leading-relaxed italic border-l-2 border-zinc-100 pl-6">
                        Омбудсмен выступает нейтральной третьей стороной между вами и финансовыми организациями. Подайте заявку на рассмотрение вашего спора.
                     </p>
                  </div>

                  <div className="space-y-8">
                     <div className="space-y-3">
                         <label className="text-[12px] font-bold uppercase tracking-widest text-[#999]">Выберите кредитора</label>
                        <select className="w-full bg-transparent border-b border-zinc-200 py-3 outline-none focus:border-black transition-all text-[16px]">
                           <option>Kaspi Bank</option>
                           <option>Halyk Bank</option>
                           <option>Home Credit</option>
                        </select>
                     </div>
                     <div className="space-y-3">
                         <label className="text-[12px] font-bold uppercase tracking-widest text-[#999]">Детальная жалоба</label>
                         <textarea 
                            className="w-full bg-transparent border-b border-zinc-200 py-3 outline-none focus:border-black transition-all text-[16px] min-h-[120px] resize-none"
                            placeholder="Опишите спор в деталях..."
                         />
                     </div>
                      <button className="btn-keneshub btn-black w-full py-4 rounded-xl text-[14px] uppercase tracking-[0.2em] font-bold">
                         Инициировать медиацию
                      </button>
                  </div>
               </div>
            </section>
          )}

        </div>
      </main>
    </div>
  );
}
