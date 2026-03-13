'use client';

import { motion } from 'framer-motion';
import { Plus, ArrowUp, Layout, Globe, Code, PenTool, MoreHorizontal, Search } from 'lucide-react';
import Link from 'next/link';
import ArchitectureSection from './ArchitectureSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Content */}
      <section className="pt-[220px] pb-20 px-6">
        <div className="max-w-[1000px] mx-auto text-center">
          
          {/* Main Serif Heading (EB Garamond) */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-[56px] md:text-[72px] text-[#222] mb-12 tracking-tight leading-[1.05]"
          >
            Чем я могу помочь вам сегодня?
          </motion.h1>

          {/* Search Box / Input Container */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-[700px] mx-auto mb-10"
          >
            <div className="keneshub-pill p-2 pl-6 flex items-center gap-4">
                <Search size={22} className="text-zinc-300" />
                <input 
                  type="text" 
                  placeholder="Опишите вашу ситуацию с задолженностью..."
                  className="flex-1 bg-transparent border-none outline-none text-[18px] text-black placeholder:text-zinc-300 py-3"
                />
                <button className="btn-keneshub btn-black rounded-xl px-8 py-4">
                  Анализировать
                </button>
              </div>
          </motion.div>

          {/* Suggestion Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            {[
              { icon: Layout, label: 'Реструктуризация' },
              { icon: Globe, label: 'Консультация' },
              { icon: Code, label: 'Медиация' },
              { icon: PenTool, label: 'Жалоба' },
              { icon: MoreHorizontal, label: 'Ещё' }
            ].map((item) => (
              <button 
                key={item.label}
                className="flex items-center gap-2 px-5 py-[9px] rounded-full border border-[#ececec] bg-white hover:bg-[#fafafa] transition-all text-[14px] font-medium text-[#444]"
              >
                <item.icon size={16} className="text-[#999]" strokeWidth={1.5} />
                {item.label}
              </button>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Transitional Gap */}
      <div className="h-[200px] w-full" />

      {/* Architecture Visualization (New Section from Diagram) */}
      <ArchitectureSection />

      {/* Signature Black Section (Manus bottom branding) */}
      <section className="bg-[#111] py-[120px] px-12 md:px-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
          >
            <h2 className="font-serif italic text-[56px] md:text-[76px] text-zinc-100 leading-[0.95] tracking-tight mb-2">
              Меньше бюрократии,
            </h2>
            <h2 className="font-serif italic text-[56px] md:text-[76px] text-zinc-100 leading-[0.95] tracking-tight">
              больше решений.
            </h2>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
