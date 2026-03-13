'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUp, Plus, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[400px]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Link href="/" className="flex items-center gap-2 group text-center mx-auto">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="black"/>
                <path d="M2 17L12 22L22 17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[19px] font-bold tracking-tight text-black transition-opacity group-hover:opacity-70">
              Kenes<span className="font-medium opacity-50 italic">Hub</span>
            </span>
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="font-serif text-[32px] md:text-[40px] text-black leading-tight tracking-tight">
            С возвращением
          </h1>
          <p className="text-[14px] text-zinc-400 font-medium mt-2">
            Введите свои данные для доступа к платформе
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-[12px] font-bold uppercase tracking-widest text-zinc-400 ml-1">
              Электронная почта
            </label>
            <div className="keneshub-input-pill p-[14px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-transparent border-none outline-none text-[15px] text-black placeholder:text-zinc-300 px-2"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[12px] font-bold uppercase tracking-widest text-zinc-400">
                Пароль
              </label>
              <Link href="#" className="text-[11px] font-bold text-zinc-300 hover:text-black transition-colors uppercase tracking-widest">
                Забыли?
              </Link>
            </div>
            <div className="keneshub-input-pill p-[14px] flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="flex-1 bg-transparent border-none outline-none text-[15px] text-black placeholder:text-zinc-300 px-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-300 hover:text-black transition-colors px-2"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-keneshub btn-black w-full py-4 rounded-xl text-[14px] uppercase tracking-[0.2em] font-bold justify-center"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                Вход...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Войти <ArrowUp className="rotate-90" size={16} />
              </span>
            )}
          </button>
        </form>

        <p className="text-center text-[13px] mt-10 text-zinc-400 font-medium">
          Нет аккаунта?{' '}
          <Link href="/auth/register" className="text-black font-bold border-b border-black pb-0.5">
            Создать
          </Link>
        </p>

        <div className="mt-20 pt-10 border-t border-zinc-100 text-center">
          <Link href="/" className="text-[11px] font-bold text-zinc-300 hover:text-black uppercase tracking-[0.2em] transition-colors">
            ← Вернуться на главную
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
