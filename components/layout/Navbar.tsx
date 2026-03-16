'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

export default function Navbar() {
  const { t } = useLanguage();
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Banner (exactly matches manus.im meta-announcement) */}
      <div className="w-full bg-[#f8f8f6]/90 backdrop-blur-sm py-1.5 px-4 text-center border-b border-[#e8e8e8]">
        <Link href="#" className="text-[12.5px] font-medium text-[#111] hover:opacity-75 transition-opacity flex flex-wrap items-center justify-center gap-1">
          {t('KenesHub теперь доступен во всех регионах Казахстана — прозрачное урегулирование для всех')}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </div>

      {/* Main Bar */}
      <nav className="w-full bg-white/70 backdrop-blur-md px-6 md:px-12 py-3.5 flex items-center justify-between border-b border-zinc-100/50">
        <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between relative">
          
            <div />

          {/* Centered Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <nav className="flex items-center gap-10">
              {['Экосистема', 'Услуги', 'О платформе'].map((item) => (
                <Link 
                  key={item} 
                  href="#" 
                  className="text-[14px] font-bold text-[#666] hover:text-black transition-colors uppercase tracking-[0.15em] border-b-2 border-transparent hover:border-black/5 pb-1"
                >
                  {t(item)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Auth Actions */}
          <div className="flex items-center gap-2.5 z-10">
            <Link 
              href="/auth/login" 
              className="bg-black text-white px-[14px] py-[6px] rounded-[7px] text-[13.5px] font-semibold hover:opacity-85 transition-opacity"
            >
              {t('Войти')}
            </Link>
            <Link 
              href="/auth/register" 
              className="bg-white text-black border border-[#e2e2e2] px-[14px] py-[6px] rounded-[7px] text-[13.5px] font-semibold hover:bg-[#f9f9f9] transition-all"
            >
              {t('Регистрация')}
            </Link>
          </div>

        </div>
      </nav>
    </div>
  );
}
