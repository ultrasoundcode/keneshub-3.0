'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowUp, Layout, Globe, Code, PenTool, MoreHorizontal, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';
import ArchitectureSection from './ArchitectureSection';
import { useState } from 'react';

export default function LandingPage() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [isError, setIsError] = useState(false);

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setResponse('');
    setIsError(false);
    
    try {
      const res = await fetch('/api/analyze-situation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation: query }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setResponse(data.advice);
        setIsError(false);
      } else {
        setResponse('Произошла ошибка при анализе. Пожалуйста, попробуйте еще раз позже.');
        setIsError(true);
      }
    } catch (error) {
      setResponse('Не удалось подключиться к сервису анализа.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
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
            className="max-w-[700px] mx-auto mb-10 relative z-20"
          >
            <div className="keneshub-pill p-2 pl-6 flex items-center gap-4">
                <Search size={22} className="text-zinc-300 min-w-[22px]" />
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                  placeholder="Опишите вашу ситуацию с задолженностью..."
                  className="flex-1 bg-transparent border-none outline-none text-[18px] text-black placeholder:text-zinc-300 py-3"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleAnalyze}
                  disabled={isLoading || !query.trim()}
                  className="btn-keneshub btn-black rounded-xl px-8 py-4 disabled:opacity-50 whitespace-nowrap min-w-[170px]"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2 justify-center">
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3"/>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                      Анализ...
                    </span>
                  ) : 'Анализировать'}
                </button>
              </div>

              {/* AI Response Container */}
              <AnimatePresence>
                {response && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-full left-0 right-0 mt-4 p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-zinc-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] text-left z-10"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0">
                        <Sparkles size={18} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-2">Анализ KenesHub AI</h3>
                        <p className="text-[16px] leading-[1.6] text-zinc-800 whitespace-pre-wrap">{response}</p>
                      </div>
                    </div>
                    
                    {!isError && (
                      <div className="flex justify-end pt-4 border-t border-zinc-100/50">
                        <Link 
                          href="/auth/register"
                          className="btn-keneshub btn-black py-3 px-8 rounded-xl text-[13px] uppercase tracking-[0.2em] font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                        >
                          Регистрация <ArrowUp className="rotate-90" size={16} />
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
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
