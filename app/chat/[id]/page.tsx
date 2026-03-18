'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  ArrowUp, 
  Phone, 
  Video, 
  MoreHorizontal, 
  CheckCheck,
  FileText,
  PenTool
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: 'Здравствуйте! Я получил ваше заявление о реструктуризации долга. Давайте обсудим условия.', time: '10:15' },
    { id: 2, role: 'user', text: 'Добрый день. Я бы хотел снизить процентную ставку до 14%, на текущий момент у меня 21%.', time: '10:18' },
    { id: 3, role: 'assistant', text: '14% — это достаточно резкое снижение. Банк готов рассмотреть 17% при условии пролонгации договора на 12 месяцев. Вас это устроит?', time: '10:20' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { 
      id: Date.now(), 
      role: 'user', 
      text: input, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      
      {/* Chat Header */}
      <header className="px-6 md:px-10 py-6 border-b border-zinc-100 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center font-serif font-bold text-black border-dashed flex-shrink-0">
            K
          </div>
          <div className="min-w-0">
            <h1 className="text-[15px] md:text-[17px] font-bold text-black truncate">Поддержка Kaspi Bank</h1>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] md:text-[12px] text-zinc-400 font-medium truncate">Представитель в сети</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
           {[Phone, Video, MoreHorizontal].map((Icon, i) => (
              <button key={i} className="p-2 hover:bg-zinc-50 rounded-full text-zinc-400 hover:text-black transition-all">
                <Icon size={18} strokeWidth={1.8} />
              </button>
           ))}
        </div>
      </header>

      {/* Messaging Area */}
      <div className="flex-1 overflow-y-auto px-6 md:px-10 py-12 space-y-10">
        {messages.map((message) => (
          <motion.div 
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`max-w-[100%] md:max-w-[520px] ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
               <div className={`text-[15px] md:text-[16px] leading-relaxed mb-1 ${message.role === 'user' ? 'text-zinc-600 font-medium' : 'text-black font-serif italic italic'}`}>
                  {message.text}
               </div>
               <div className="flex items-center gap-2 justify-end opacity-40">
                  <span className="text-[10px] font-bold uppercase tracking-widest">{message.time}</span>
                  {message.role === 'user' && <CheckCheck size={12} />}
               </div>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Central KenesHub Style */}
      <div className="px-6 md:px-10 pb-10 pt-4 flex-shrink-0 bg-white">
         <div className="max-w-[800px] mx-auto relative">
            <div className="keneshub-pill p-[12px] md:p-[16px] flex items-center gap-3 md:gap-4 group border border-zinc-100">
               <button className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-zinc-300 hover:text-black transition-colors flex-shrink-0">
                  <Plus size={22} strokeWidth={1.5} />
               </button>
               <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Написать сообщение..."
                  className="flex-1 bg-transparent border-none outline-none text-[15px] md:text-[16px] text-black placeholder:text-[#ccc] py-1"
               />
               <button 
                 onClick={handleSend}
                 className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full transition-all flex-shrink-0 ${input.trim() ? 'bg-black text-white' : 'bg-zinc-50 text-zinc-300'}`}
               >
                  <ArrowUp size={20} strokeWidth={2.5} />
               </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6">
               <button className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black flex items-center gap-2">
                  <FileText size={14} /> Подписать
               </button>
               <button className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black flex items-center gap-2">
                  <PenTool size={14} /> Приложить
               </button>
            </div>
         </div>
      </div>

    </div>
  );
}
