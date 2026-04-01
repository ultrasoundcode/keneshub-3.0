'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Plus, 
  ArrowUp, 
  Settings, 
  Download, 
  HelpCircle,
  Sparkles,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useLanguage } from '@/lib/i18n';
import { Suspense } from 'react';

const initialMessages = [
  { role: 'assistant', content: 'Здравствуйте! Я ваш AI-ассистент KenesHub. Опишите вашу ситуацию, и я постараюсь помочь.' }
];

function AIAssistantChat() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInitialPrompt = useCallback(async (promptText: string) => {
    const userMsg = { role: 'user', content: promptText };
    const newMessages = [userMsg]; // Do not include the default welcome if the user came with a specific prompt
    
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, language }),
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Извините, произошла ошибка при соединении с AI. Пожалуйста, попробуйте еще раз.' 
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const prompt = searchParams.get('prompt');
    if (prompt && !initialized.current) {
      initialized.current = true;
      handleInitialPrompt(prompt);
      router.replace('/dashboard/ai');
    }
  }, [searchParams, router, handleInitialPrompt]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, language }),
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Извините, произошла ошибка при соединении с AI. Пожалуйста, попробуйте еще раз.' 
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      
      {/* Header - Very Minimal */}
      <header className="px-6 md:px-12 py-8 border-b border-zinc-100 flex items-center justify-between flex-shrink-0">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white flex-shrink-0">
               <Bot size={22} strokeWidth={1.5} />
            </div>
            <div className="min-w-0">
               <h1 className="font-serif text-[24px] md:text-[32px] text-black truncate">AI Поддержка</h1>
               <p className="text-[12px] md:text-[13px] font-medium text-zinc-400 truncate">Юридический интеллект в реальном времени</p>
            </div>
         </div>
         <div className="flex gap-2 md:gap-4 flex-shrink-0">
            <button className="btn-keneshub btn-white p-2 md:p-2.5">
               <Download size={18} className="text-zinc-400" />
            </button>
            <button className="btn-keneshub btn-white p-2 md:p-2.5">
               <Settings size={18} className="text-zinc-400" />
            </button>
         </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 md:px-12 py-12 space-y-12">
         <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[100%] md:max-w-[600px] ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                   {m.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-3">
                         <span className="text-[12px] font-bold uppercase tracking-widest text-[#999]">KenesHub AI</span>
                         <div className="w-1 h-1 rounded-full bg-zinc-300" />
                         <Sparkles size={12} className="text-black" />
                      </div>
                   )}
                   <div 
                      className={`text-[16px] md:text-[17px] leading-relaxed ${m.role === 'user' ? 'text-zinc-600 font-medium' : 'text-black font-serif italic'}`}
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
      <div className="px-6 md:px-12 pb-12 pt-6 flex-shrink-0">
         <div className="max-w-[800px] mx-auto">
            <div className="keneshub-pill p-[12px] md:p-[18px] flex items-center gap-3 md:gap-4 group border border-zinc-100">
              <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-[#999] hover:text-[#555] transition-colors flex-shrink-0">
                <Plus size={22} strokeWidth={1} />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder="Расскажите подробнее..."
                className="flex-1 bg-transparent border-none outline-none text-[15px] md:text-[17px] text-black placeholder:text-[#ccc] py-1.5"
              />
              <button 
                onClick={sendMessage}
                className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${input.trim() ? 'bg-black text-white' : 'bg-[#f4f4f4] text-[#ccc]'}`}
              >
                <ArrowUp size={20} strokeWidth={2.5} />
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-6">
               {['Законы', 'Документы', 'Советы'].map(t => (
                 <button key={t} className="text-[10px] md:text-[12px] font-bold text-zinc-400 hover:text-black uppercase tracking-widest transition-colors flex items-center gap-1.5">
                    {t}
                 </button>
               ))}
            </div>
         </div>
      </div>

    </div>
  );
}

export default function AIAssistantPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-zinc-400">Инициализация ИИ...</div>}>
      <AIAssistantChat />
    </Suspense>
  );
}
