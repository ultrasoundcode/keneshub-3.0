'use client';

import { useState, useRef, useEffect } from 'react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { 
  Plus, 
  ArrowUp, 
  Settings, 
  Download, 
  HelpCircle,
  Sparkles,
  Search,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialMessages = [
  { role: 'assistant', content: 'Здравствуйте! Я ваш AI-ассистент KenesHub. Я изучил ваше дело с Kaspi Bank.' },
  { role: 'assistant', content: 'Основываясь на сумме долга в **₸2,450,000** и ваших документах о доходах, я рекомендую инициировать запрос на **реструктуризацию** согласно 34 статье Закона о банках.' },
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Я анализирую ваш запрос. Для подачи заявления на реструктуризацию вам потребуется справка о доходах и сопроводительное письмо с объяснением вашей ситуации. Хотите, чтобы я подготовил их для вас прямо сейчас?',
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <DashboardSidebar />
      <main className="flex-1 flex flex-col bg-white">
        
        {/* Header - Very Minimal */}
        <header className="px-12 py-8 border-b border-zinc-100 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white">
                 <Bot size={22} strokeWidth={1.5} />
              </div>
              <div>
                 <h1 className="font-serif text-[32px] text-black">AI Поддержка</h1>
                 <p className="text-[13px] font-medium text-zinc-400">Юридический интеллект в реальном времени · Ориентирован на результат</p>
              </div>
           </div>
           <div className="flex gap-4">
              <button className="btn-keneshub btn-white p-2.5">
                 <Download size={18} className="text-zinc-400" />
              </button>
              <button className="btn-keneshub btn-white p-2.5">
                 <Settings size={18} className="text-zinc-400" />
              </button>
           </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-12 py-12 space-y-12">
           <AnimatePresence>
              {messages.map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[600px] ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                     {m.role === 'assistant' && (
                        <div className="flex items-center gap-2 mb-3">
                           <span className="text-[12px] font-bold uppercase tracking-widest text-[#999]">KenesHub AI</span>
                           <div className="w-1 h-1 rounded-full bg-zinc-300" />
                           <Sparkles size={12} className="text-black" />
                        </div>
                     )}
                     <div 
                        className={`text-[17px] leading-relaxed ${m.role === 'user' ? 'text-zinc-600 font-medium' : 'text-black font-serif italic'}`}
                        style={{ whiteSpace: 'pre-wrap' }}
                     >
                        {m.content}
                     </div>
                  </div>
                </motion.div>
              ))}
           </AnimatePresence>
           {loading && (
             <div className="flex justify-start">
               <div className="flex gap-1.5 py-4">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-200 animate-bounce" style={{ animationDelay: `${i*150}ms` }} />
                  ))}
               </div>
             </div>
           )}
           <div ref={bottomRef} />
        </div>

        {/* Action Prompt - Central KenesHub Style */}
        <div className="px-12 pb-12 pt-6">
           <div className="max-w-[800px] mx-auto">
              <div className="keneshub-pill p-[18px] flex items-center gap-4 group">
                <button className="w-10 h-10 flex items-center justify-center text-[#999] hover:text-[#555] transition-colors">
                  <Plus size={24} strokeWidth={1} />
                </button>
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Расскажите подробнее о вашей ситуации..."
                  className="flex-1 bg-transparent border-none outline-none text-[17px] text-black placeholder:text-[#ccc] py-1.5"
                />
                <button 
                  onClick={sendMessage}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${input.trim() ? 'bg-black text-white' : 'bg-[#f4f4f4] text-[#ccc]'}`}
                >
                  <ArrowUp size={20} strokeWidth={2.5} />
                </button>
              </div>
              <div className="flex justify-center gap-6 mt-6">
                 {['Законы о реструктуризации', 'Помощь с документами', 'Советы переговорщика'].map(t => (
                   <button key={t} className="text-[12px] font-bold text-zinc-400 hover:text-black uppercase tracking-widest transition-colors flex items-center gap-1.5">
                      <HelpCircle size={14} className="opacity-0 group-hover:opacity-100" /> {t}
                   </button>
                 ))}
              </div>
           </div>
        </div>

      </main>
    </div>
  );
}
