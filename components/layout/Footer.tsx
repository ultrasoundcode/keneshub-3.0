'use client';

import Link from 'next/link';
import { Linkedin, Twitter, Youtube, Instagram, Music2, Globe, ChevronDown } from 'lucide-react';

export default function Footer() {
  const sections = [
    {
      title: 'Продукт',
      links: ['Тарифы', 'Веб-приложение', 'AI Дизайн', 'AI Документы', 'Оператор браузера', 'Исследования', 'Почта KenesHub', 'Интеграция Slack']
    },
    {
      title: 'Ресурсы',
      links: ['Блог', 'Документация', 'Обновления', 'Центр помощи', 'Центр доверия', 'API', 'Командный план', 'Стартапам', 'Руководство', 'Бренд-активы']
    },
    {
      title: 'Сообщество',
      links: ['События', 'Партнеры']
    },
    {
      title: 'Сравнение',
      links: ['VS ChatGPT', 'VS Lovable']
    },
    {
      title: 'Скачать',
      links: ['Мобильное приложение', 'Windows приложение', 'Браузер']
    },
    {
      title: 'Бизнес',
      links: ['Командный план', 'SSO', 'API']
    },
    {
      title: 'Компания',
      links: ['О нас', 'Вакансии', 'Для бизнеса', 'Для СМИ', 'Условия использования', 'Политика конфиденциальности', 'Куки']
    },
  ];

  return (
    <footer className="bg-[#111] text-white pt-24 pb-12 px-12 md:px-24">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-12 gap-x-8 mb-32">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[14.5px] font-bold text-white mb-6 tracking-tight">{section.title}</h3>
              <ul className="space-y-3.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-[13.5px] text-[#777] hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Bar */}
        <div className="pt-10 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[#777] hover:text-white transition-colors"><Linkedin size={20} /></Link>
            <Link href="#" className="text-[#777] hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </Link>
            <Link href="#" className="text-[#777] hover:text-white transition-colors"><Youtube size={20} /></Link>
            <Link href="#" className="text-[#777] hover:text-white transition-colors"><Instagram size={20} /></Link>
            <Link href="#" className="text-[#777] hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-1.13-.32-2.43-.2-3.41.49-.6.41-1.01 1.07-1.11 1.8-.07.65.06 1.32.35 1.9.33.71.98 1.25 1.71 1.51.72.26 1.5.21 2.23-.06.77-.28 1.41-.88 1.73-1.62.27-.57.35-1.2.35-1.84.05-4.4.01-8.81.02-13.22z"/></svg>
            </Link>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 transition-all cursor-pointer">
            <Globe size={15} className="text-[#777]" />
            <span className="text-[13px] font-medium text-[#ccc]">Русский</span>
            <ChevronDown size={15} className="text-[#777]" />
          </div>
        </div>

        {/* Brand Bottom */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-500 text-[15px]">
            <span>от</span>
            <span className="font-serif italic text-[20px] text-white tracking-tight flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M12 2L2 7L12 12L22 7L12 2Z"/><path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                KenesHub
            </span>
          </div>
          <div className="text-[#444] text-[13px]">
            © 2026 KenesHub
          </div>
        </div>

      </div>
    </footer>
  );
}
