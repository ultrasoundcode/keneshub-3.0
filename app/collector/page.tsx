'use client';

import { motion } from 'framer-motion';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { 
  Briefcase, 
  Search, 
  FileText, 
  ArrowRight,
  ChevronRight,
  TrendingDown,
  Users
} from 'lucide-react';

const cases = [
  { id: 1, borrower: 'Тимур Ибраев', amount: '₸1,500,000', days: '120+', risk: 'High' },
  { id: 2, borrower: 'Елена Пак', amount: '₸850,000', days: '60+', risk: 'Medium' },
  { id: 3, borrower: 'Арман Кусаинов', amount: '₸12,400,000', days: '150+', risk: 'Critical' },
];

export default function CollectorPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-12 py-12">
          
          <header className="mb-20">
             <div className="flex items-center gap-4 mb-2">
                <Briefcase size={20} className="text-zinc-400" />
                <span className="text-[12px] font-bold uppercase tracking-widest text-[#999]">Collector Portal</span>
             </div>
             <h1 className="font-serif text-[48px] text-black">Portfolio Recovery</h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
             {[
               { label: 'Active Collection', value: '₸24.1M', sub: '94 Cases' },
               { label: 'Settlement Rate', value: '38%', sub: '+2.4% this month' },
               { label: 'Avg Recovery', value: '45d', sub: 'Resolution time' },
             ].map((stat, i) => (
                <div key={i} className="border-l border-zinc-100 pl-8 py-2">
                   <p className="text-[13px] font-bold text-zinc-400 uppercase tracking-wider mb-2">{stat.label}</p>
                   <p className="text-[32px] font-bold text-black tracking-tight">{stat.value}</p>
                   <p className="text-[12px] text-zinc-400 mt-1">{stat.sub}</p>
                </div>
             ))}
          </div>

          <section>
             <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-100">
                <h2 className="text-[14px] font-bold text-black uppercase tracking-widest">Priority Registry</h2>
                <div className="relative">
                   <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                   <input placeholder="Filter case..." className="pl-9 pr-4 py-1.5 border-b border-zinc-200 outline-none focus:border-black text-sm transition-all bg-transparent" />
                </div>
             </div>

             <div className="space-y-4">
                {cases.map((c, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="group flex items-center justify-between p-6 rounded-2xl border border-transparent hover:border-zinc-100 hover:bg-[#fafafa] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center font-serif text-[18px] font-bold text-black">
                          {c.borrower[0]}
                       </div>
                       <div>
                          <h3 className="font-serif text-[22px] text-black italic leading-none mb-1">{c.borrower}</h3>
                          <div className="flex items-center gap-3">
                             <span className="text-[13px] text-zinc-400">Overdue: <span className="text-black font-semibold">{c.days} days</span></span>
                             <div className="w-1 h-1 rounded-full bg-zinc-300" />
                             <span className="text-[13px] text-zinc-400">Risk: <span className="uppercase font-bold text-red-500">{c.risk}</span></span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-12">
                       <div className="text-right">
                          <p className="text-[18px] font-bold text-black">{c.amount}</p>
                          <p className="text-[12px] text-zinc-400 uppercase font-bold tracking-tight">Current Bal.</p>
                       </div>
                       <ChevronRight className="text-zinc-200 group-hover:text-black transition-colors" />
                    </div>
                  </motion.div>
                ))}
             </div>
          </section>

          <div className="mt-32 text-center text-zinc-300">
             <h2 className="font-serif italic text-[24px]">Integrity in recovery.</h2>
          </div>

        </div>
      </main>
    </div>
  );
}
