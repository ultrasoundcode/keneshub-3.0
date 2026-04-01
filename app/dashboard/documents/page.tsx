'use client';

import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Search, 
  Plus, 
  Eye, 
  PenTool, 
  MoreHorizontal
} from 'lucide-react';

const documents: any[] = [];

export default function DocumentsPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
      
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
         <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center">
                <FileText size={16} className="text-black" />
              </div>
              <span className="text-[12px] font-bold uppercase tracking-widest text-zinc-400">Хранилище</span>
            </div>
            <h1 className="font-serif text-[48px] md:text-[64px] text-black leading-none tracking-tighter">Документы</h1>
         </div>
         <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input placeholder="Поиск файлов..." className="pl-9 pr-4 py-2 bg-[#fafafa] border border-zinc-100 rounded-full text-[13px] outline-none focus:border-black transition-all w-[240px]" />
            </div>
            <button className="btn-keneshub btn-black rounded-full px-6 py-3 w-full md:w-auto text-[14px]">
               <Plus size={16} /> Загрузить
            </button>
         </div>
      </header>

      <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
         <table className="minimal-table min-w-[600px] md:min-w-full">
           <thead>
              <tr>
                 <th className="w-2/5">Название</th>
                 <th>Тип</th>
                 <th>Изменен</th>
                 <th>Статус</th>
                 <th className="text-right">Действия</th>
              </tr>
           </thead>
           <tbody>
              {documents.length > 0 ? (
                documents.map((doc, i) => (
                  <motion.tr 
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="hover:bg-[#fafafa]/80 group transition-colors"
                  >
                     <td>
                        <div className="flex items-center gap-4">
                           <FileText size={18} className="text-zinc-400 group-hover:text-black transition-colors" />
                           <span className="font-bold text-black border-b border-transparent group-hover:border-black transition-all cursor-pointer truncate max-w-[150px] md:max-w-none">
                             {doc.name}
                           </span>
                        </div>
                     </td>
                     <td className="text-zinc-400 font-medium text-[13px] uppercase tracking-wider">{doc.type}</td>
                     <td className="text-zinc-500 text-[14px]">{doc.date}</td>
                     <td>
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full" style={{ background: doc.accent }} />
                           <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: doc.accent }}>{doc.status}</span>
                        </div>
                     </td>
                     <td className="text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-zinc-100"><Eye size={16} /></button>
                           <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-zinc-100"><Download size={16} /></button>
                           <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-zinc-100"><MoreHorizontal size={16} /></button>
                        </div>
                     </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <FileText size={32} className="mx-auto text-zinc-300 mb-4" />
                    <p className="text-[15px] font-medium text-zinc-500">У вас пока нет сохраненных документов.</p>
                    <p className="text-[13px] text-zinc-400 mt-2">При загрузке или генерации файлов они отобразятся здесь.</p>
                  </td>
                </tr>
              )}
           </tbody>
         </table>
      </div>

      <div className="mt-24 md:mt-32 p-8 md:p-12 rounded-[24px] md:rounded-[32px] border border-dashed border-zinc-200 bg-[#fafafa] text-center">
         <PenTool size={32} className="mx-auto text-zinc-300 mb-6" />
         <h3 className="font-serif italic text-[24px] md:text-[28px] text-black mb-2">Нужен юридический документ?</h3>
         <p className="text-zinc-500 mb-8 max-w-[400px] mx-auto text-[14px] md:text-[15px]">Наш ИИ может создать заявление на реструктуризацию за считанные секунды.</p>
         <button className="btn-keneshub btn-black uppercase tracking-[0.2em] px-10 py-4 w-full md:w-auto rounded-xl">ИИ Генератор</button>
      </div>

    </div>
  );
}
