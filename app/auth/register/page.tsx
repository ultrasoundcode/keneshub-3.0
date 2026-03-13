'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { User, Building2, Briefcase, Scale, Users, Check, ArrowUp } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const roles = [
  {
    id: 'borrower',
    label: 'Заёмщик',
    desc: 'У меня есть просроченный долг',
    icon: User,
    href: '/dashboard',
  },
  {
    id: 'creditor',
    label: 'Кредитор',
    desc: 'Банк или МФО',
    icon: Building2,
    href: '/creditor',
  },
  {
    id: 'collector',
    label: 'Коллектор',
    desc: 'Коллекторское агентство',
    icon: Briefcase,
    href: '/collector',
  },
  {
    id: 'lawyer',
    label: 'Юрист',
    desc: 'Правовая поддержка',
    icon: Scale,
    href: '/legal',
  },
  {
    id: 'ombudsman',
    label: 'Омбудсмен',
    desc: 'Банковский медиатор',
    icon: Users,
    href: '/ombudsman',
  },
];

function RegisterForm() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') || '';
  const [selectedRole, setSelectedRole] = useState(defaultRole);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const selected = roles.find((r) => r.id === selectedRole);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(selected?.href || '/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[500px]"
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

        <div className="text-center mb-12">
          <h1 className="font-serif text-[40px] text-black leading-tight tracking-tight">
            Создать аккаунт
          </h1>
          <p className="text-[14px] text-zinc-400 font-medium mt-2">
            Выберите вашу роль в экосистеме
          </p>
        </div>

        {/* Role selection - Minimalist List */}
        <div className="grid grid-cols-1 gap-3 mb-12">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                  isSelected 
                    ? 'border-black bg-zinc-50' 
                    : 'border-zinc-100 hover:border-zinc-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSelected ? 'bg-black text-white' : 'bg-zinc-50 text-zinc-400'}`}>
                    <Icon size={18} strokeWidth={isSelected ? 2 : 1.5} />
                  </div>
                  <div className="text-left">
                    <p className={`text-[15px] font-bold ${isSelected ? 'text-black' : 'text-zinc-500'}`}>{role.label}</p>
                    <p className="text-[12px] text-zinc-400">{role.desc}</p>
                  </div>
                </div>
                {isSelected && <Check size={18} className="text-black" />}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[12px] font-bold uppercase tracking-widest text-zinc-400 ml-1">
                ФИО
              </label>
              <div className="keneshub-input-pill p-[14px]">
                <input
                  type="text"
                  placeholder="Иван Иванов"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-transparent border-none outline-none text-[15px] text-black placeholder:text-zinc-300 px-2"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-bold uppercase tracking-widest text-zinc-400 ml-1">
                Email
              </label>
              <div className="keneshub-input-pill p-[14px]">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-none outline-none text-[15px] text-black placeholder:text-zinc-300 px-2"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold uppercase tracking-widest text-zinc-400 ml-1">
              Пароль
            </label>
            <div className="keneshub-input-pill p-[14px]">
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={8}
                className="w-full bg-transparent border-none outline-none text-[15px] text-black placeholder:text-zinc-300 px-2"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !selectedRole}
            className={`btn-keneshub btn-black w-full py-4 rounded-xl text-[14px] uppercase tracking-[0.2em] font-bold justify-center ${!selectedRole ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                Создание...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Инициализировать аккаунт <ArrowUp className="rotate-90" size={16} />
              </span>
            )}
          </button>
        </form>

        <p className="text-center text-[13px] mt-10 text-zinc-400 font-medium">
          Уже есть аккаунт?{' '}
          <Link href="/auth/login" className="text-black font-bold border-b border-black pb-0.5">
            Войти
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

export default function RegisterPage() {
  return (
    <Suspense fallback={
       <div className="min-h-screen flex items-center justify-center bg-white">
         <div className="animate-pulse text-zinc-300 font-serif italic text-2xl">Загрузка...</div>
       </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
