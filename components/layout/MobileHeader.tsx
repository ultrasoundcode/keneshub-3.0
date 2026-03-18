'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface MobileHeaderProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileHeader({ isOpen, setIsOpen }: MobileHeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="md:hidden h-16 bg-white border-b border-[#e8e8e8] flex items-center justify-between px-6 sticky top-0 z-40">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-5 h-5 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="black"/>
            <path d="M2 17L12 22L22 17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-[17px] font-bold tracking-tight text-black">
          Kenes<span className="font-medium opacity-50 italic">Hub</span>
        </span>
      </Link>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 -mr-2 text-black hover:bg-zinc-100 rounded-lg transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
  );
}
