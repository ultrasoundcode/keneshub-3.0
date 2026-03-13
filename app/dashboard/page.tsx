'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { 
  ArrowUp, 
  Plus, 
  MessageSquare, 
  FileText, 
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  Search
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [data, setData] = useState<{ user: any, debts: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/debts')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'negotiation': return '#f59e0b';
      case 'resolved': return '#10b981';
      case 'defaulted': return '#ef4444';
      default: return '#10b981';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'negotiation': return 'В процессе переговоров';
      case 'resolved': return 'Урегулировано';
      case 'defaulted': return 'Просрочено';
      default: return 'Активен';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto pt-12">
        <div className="max-w-[1000px] mx-auto px-12 py-12">
          
          {/* Hero Greeting (Manus Style) */}
          <section className="mb-20 text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-[48px] md:text-[56px] text-black leading-tight mb-4 tracking-tighter"
            >
              Чем я могу помочь вам сегодня{data?.user?.name ? `, ${data.user.name.split(' ')[0]}` : ''}?
            </motion.h1>
            <p className="text-[16px] text-zinc-400 font-medium">
              У вас <span className="text-black font-bold">{data?.debts?.length || 0} активных дела</span>, требующих внимания.
            </p>
          </section>

          {/* Central AI-First Search / Action Pill */}
          <section className="mb-24">
            <div className="max-w-[800px] mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
             <div className="keneshub-pill p-[18px] flex items-center gap-4 group">
               <div className="w-12 h-12 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-black transition-colors">
                 <Search size={24} strokeWidth={1} />
               </div>
               <input 
                 type="text" 
                 placeholder="Опишите вашу ситуацию с задолженностью..."
                 className="flex-1 bg-transparent border-none outline-none text-[20px] text-black placeholder:text-[#ccc] py-2"
               />
               <button className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-black/10">
                 <Plus size={28} />
               </button>
             </div>
            </div>
          </section>

          {/* Two-Column Minimal Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            
            {/* Left: Active Cases / Negotiations */}
            <div>
              <div className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-4">
                <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-zinc-400">Активные дела</h2>
                <Link href="/dashboard/negotiations" className="text-[13px] font-bold text-black border-b border-black pb-0.5">Все</Link>
              </div>
              <div className="space-y-10">
                {loading ? (
                  <div className="text-zinc-300 animate-pulse">Загрузка данных...</div>
                ) : data?.debts?.length ? (
                  data.debts.map((debt, i) => (
                    <motion.div 
                      key={debt.id} 
                      initial={{ opacity: 0, x: -10 }} 
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                         <h3 className="font-serif italic text-[22px] text-black">{debt.description || 'Без названия'}</h3>
                         <span className="text-[15px] font-bold text-black">₸{debt.amount?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 rounded-full" style={{ background: getStatusColor(debt.status) }} />
                         <span className="text-[13px] font-medium text-zinc-400">{getStatusLabel(debt.status)}</span>
                         <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"><ArrowRight size={14} /></span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-zinc-400 text-[14px]">Активных дел не найдено.</div>
                )}
              </div>
            </div>

            {/* Right: Recent Documents / Updates */}
            <div>
              <div className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-4">
                <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-zinc-400">Документы</h2>
                <Link href="/dashboard/documents" className="text-[13px] font-bold text-black border-b border-black pb-0.5">Все</Link>
              </div>
              <div className="space-y-8">
                {[
                  { name: 'Заявление о реструктуризации.pdf', date: 'Сегодня, 14:20', icon: FileText },
                  { name: 'Уведомление от банка.pdf', date: 'Вчера, 09:15', icon: FileText },
                  { name: 'Проект КП (Draft v2).pdf', date: '9 мар 2026', icon: Sparkles },
                ].map((doc, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center flex-shrink-0">
                      <doc.icon size={18} className="text-zinc-600" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-black leading-tight border-b border-transparent hover:border-black transition-all inline-block cursor-pointer">
                        {doc.name}
                      </p>
                      <p className="text-[12px] text-zinc-400 mt-1">{doc.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Signature Phrase at bottom */}
          <div className="mt-48 pt-24 border-t border-zinc-100 text-center">
            <h2 className="font-serif italic text-[32px] md:text-[40px] text-zinc-200 tracking-tight">
               Сосредоточьтесь на решениях, а не на бюрократии.
            </h2>
          </div>

        </div>
      </main>
    </div>
  );
}
