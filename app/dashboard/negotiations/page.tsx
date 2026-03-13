'use client';

import { motion } from 'framer-motion';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { 
  MessageSquare, 
  ChevronRight, 
  Building2, 
  Scale, 
  Users,
  Search,
  Filter,
  Plus
} from 'lucide-react';
import Link from 'next/link';

const negotiations = [
  { id: 1, partner: 'Kaspi Bank', subject: 'Реструктуризация №442', lastMsg: 'Банк одобрил ставку 17%', time: '10:20', type: 'Bank', unread: true },
  { id: 2, partner: 'Марат Оспанов', subject: 'Юридическая консультация', lastMsg: 'Я подготовил проект заявления...', time: 'Вчера', type: 'Lawyer', unread: false },
  { id: 3, partner: 'Омбудсмен РК', subject: 'Медиация по задолженности', lastMsg: 'Запрос на медиацию принят в работу', time: '9 мар', type: 'Mediation', unread: false },
];

export default function NegotiationsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1000px] mx-auto px-12 py-12">
          
          <header className="mb-20 flex items-end justify-between">
             <div>
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare size={18} className="text-zinc-400" />
                  <span className="text-[12px] font-bold uppercase tracking-widest text-[#999]">Система диалогов</span>
                </div>
                <h1 className="font-serif text-[60px] text-black leading-none tracking-tighter">Коммуникации</h1>
             </div>
             <button className="btn-keneshub btn-black rounded-full px-8">
                <Plus size={16} /> Новый диалог
             </button>
          </header>

          <section>
             <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-100">
                <div className="flex gap-8">
                   {['Все', 'Банки', 'Юристы'].map(f => (
                     <button key={f} className={`text-[13px] font-bold uppercase tracking-widest ${f === 'Все' ? 'text-black border-b border-black' : 'text-zinc-400 hover:text-black hover:bg-zinc-50 px-2'}`}>
                        {f}
                     </button>
                   ))}
                </div>
                <div className="relative">
                   <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                   <input placeholder="Найти партнера..." className="pl-9 pr-4 py-1.5 border-b border-zinc-100 outline-none focus:border-black text-sm transition-all bg-transparent" />
                </div>
             </div>

             <div className="space-y-4">
                {negotiations.map((n, i) => (
                  <Link key={n.id} href={`/chat/${n.id}`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group flex items-center justify-between p-8 rounded-[28px] border border-zinc-100 hover:border-black hover:bg-[#fafafa]/50 transition-all cursor-pointer bg-white"
                    >
                      <div className="flex items-center gap-8">
                         <div className="w-14 h-14 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center font-serif text-[20px] font-bold text-black italic">
                            {n.partner[0]}
                         </div>
                         <div>
                            <div className="flex items-center gap-3 mb-1">
                               <h3 className="font-serif text-[24px] text-black leading-none">{n.partner}</h3>
                               {n.unread && <div className="w-2 h-2 rounded-full bg-black animate-pulse" />}
                            </div>
                            <p className="text-[13px] font-bold text-zinc-400 uppercase tracking-widest mb-2">{n.subject}</p>
                            <p className="text-[15px] text-zinc-500 italic font-serif">"{n.lastMsg}"</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-10">
                         <div className="text-right">
                            <p className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{n.time}</p>
                            <span className="text-[11px] font-bold text-black border border-black rounded-full px-2 py-0.5">{n.type}</span>
                         </div>
                         <ChevronRight className="text-zinc-200 group-hover:text-black transition-colors" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
             </div>
          </section>

          <footer className="mt-40 pt-20 border-t border-zinc-100 text-center">
             <h2 className="font-serif italic text-[28px] text-zinc-200">Чёткая коммуникация, быстрое решение.</h2>
          </footer>

        </div>
      </main>
    </div>
  );
}
