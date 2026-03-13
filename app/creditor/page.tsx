'use client';

import { useState } from 'react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { 
  Plus, 
  Search, 
  ChevronRight, 
  ArrowUpRight,
  User,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

const requests = [
  { id: 1, borrower: 'Алибек Нурланов', debt: '₸2,450,000', type: 'Потребительский', status: 'НОВЫЙ', accent: '#ef4444' },
  { id: 2, borrower: 'Динара Сейткали', debt: '₸8,100,000', type: 'Автокредит', status: 'СРОЧНО', accent: '#ef4444' },
  { id: 3, borrower: 'Санжар Абенов', debt: '₸1,200,000', type: 'Микрозайм', status: 'В РАБОТЕ', accent: '#6366f1' },
  { id: 4, borrower: 'Алия Маратова', debt: '₸450,000', type: 'Кредитная карта', status: 'СОГЛАСОВАНО', accent: '#10b981' },
];

export default function CreditorPage() {
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const selectedCase = requests.find(r => r.id === selectedId);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <DashboardSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="px-12 py-8 border-b border-zinc-100 flex items-center justify-between bg-white/50 backdrop-blur-sm z-10">
          <div>
             <h1 className="font-serif text-[32px] text-black">Входящие портфели</h1>
             <p className="text-[13px] font-medium text-zinc-400 tracking-tight">Kaspi Bank · Региональный центр урегулирования</p>
          </div>
          <button className="btn-keneshub btn-black px-6">
             <Plus size={16} /> Новый портфель
          </button>
        </header>

        <div className="flex-1 flex overflow-hidden">
          
          {/* Requests List */}
          <div className="w-[400px] border-r border-zinc-100 overflow-y-auto bg-[#fafafa]">
             <div className="p-6 sticky top-0 bg-[#fafafa] border-b border-zinc-200/50 flex gap-3">
                <div className="flex-1 relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input 
                    placeholder="Поиск по имени..." 
                    className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-zinc-200 text-sm outline-none focus:border-black transition-all"
                  />
                </div>
             </div>
             
             <div className="divide-y divide-zinc-100">
                {requests.map((r) => (
                  <div 
                    key={r.id} 
                    onClick={() => setSelectedId(r.id)}
                    className={`p-6 cursor-pointer transition-all duration-200 hover:bg-white ${selectedId === r.id ? 'bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.05)]' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[11px] font-bold tracking-widest text-[#999]">{r.status}</span>
                       <span className="text-[14px] font-bold text-black">{r.debt}</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <p className={`font-serif text-[20px] ${selectedId === r.id ? 'text-black italic' : 'text-zinc-500'}`}>{r.borrower}</p>
                       {selectedId === r.id && <ChevronRight size={18} className="text-black" strokeWidth={1.5} />}
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Action Pane */}
          {selectedCase && (
            <div className="flex-1 overflow-y-auto p-12 bg-white">
               <div className="max-w-[800px] mx-auto">
                 <div className="flex items-start justify-between mb-12">
                   <div>
                     <span className="text-[13px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Детали дела</span>
                     <h2 className="font-serif text-[48px] text-black leading-tight">{selectedCase.borrower}</h2>
                     <p className="text-[16px] text-zinc-400 mt-2">{selectedCase.type} · Активный портфель</p>
                   </div>
                   <div className="flex gap-3">
                     <button className="btn-keneshub btn-white text-[13px] uppercase tracking-wider font-bold">Отклонить</button>
                     <button className="btn-keneshub btn-black text-[13px] uppercase tracking-wider font-bold">Одобрить КП</button>
                   </div>
                 </div>

                  <div className="grid grid-cols-2 gap-12 mb-16">
                    <div className="space-y-4">
                       <h3 className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-100 pb-2">Финансовый статус</h3>
                       <div className="space-y-4">
                          <div className="flex justify-between items-baseline">
                             <span className="text-[14px] text-zinc-400">Общий долг</span>
                             <span className="text-[18px] font-bold text-black">₸2,450,000</span>
                          </div>
                          <div className="flex justify-between items-baseline">
                             <span className="text-[14px] text-zinc-400">Основной долг</span>
                             <span className="text-[16px] font-semibold text-black">₸1,800,000</span>
                          </div>
                          <div className="flex justify-between items-baseline">
                             <span className="text-[14px] text-zinc-400">Вознаграждение / Пени</span>
                             <span className="text-[16px] font-semibold text-zinc-500">₸650,000</span>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h3 className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-100 pb-2">Следующие шаги</h3>
                       <div className="space-y-4">
                          <button className="w-full text-left p-4 rounded-xl border border-zinc-100 bg-[#fafafa] hover:bg-white hover:border-black transition-all group flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <FileText size={18} className="text-black" />
                                <span className="text-[14px] font-bold text-black">Сформировать предложение</span>
                             </div>
                             <ArrowUpRight size={16} />
                          </button>
                          <button className="w-full text-left p-4 rounded-xl border border-zinc-100 bg-[#fafafa] hover:bg-white hover:border-black transition-all group flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <MessageSquare size={18} className="text-black" />
                                <span className="text-[14px] font-bold text-black">Прямые переговоры</span>
                             </div>
                             <ArrowUpRight size={16} />
                          </button>
                       </div>
                    </div>
                 </div>

                  {/* Timeline */}
                 <div className="space-y-6">
                    <h3 className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest">Журнал активности</h3>
                    <div className="space-y-8">
                       {[
                         { date: 'Сегодня, 10:15', msg: 'Заёмщик запросил предложение о реструктуризации' },
                         { date: 'Вчера', msg: 'Дело помечено системой для срочного рассмотрения' },
                         { date: '9 мар, 11:20', msg: 'Проверка системы завершена - Финансовый статус подтвержден' },
                       ].map((log, i) => (
                         <div key={i} className="flex gap-6 relative">
                            {i !== 2 && <div className="absolute left-[3px] top-6 bottom-[-24px] w-[1px] bg-zinc-100" />}
                            <div className="w-2 h-2 rounded-full bg-black mt-1.5 flex-shrink-0" />
                            <div>
                               <p className="text-[14px] font-medium text-black">{log.msg}</p>
                               <p className="text-[12px] text-zinc-400 mt-1">{log.date}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
