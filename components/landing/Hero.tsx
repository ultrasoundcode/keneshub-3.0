'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Scale } from 'lucide-react';

const floatingStats = [
  { value: '98%', label: 'Успешных урегулирований' },
  { value: '2.3к+', label: 'Пользователей' },
  { value: '15', label: 'Банков-партнёров' },
  { value: '₸12B+', label: 'Долгов урегулировано' },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 grid-bg"
      id="hero"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(ellipse, rgba(6,182,212,0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.3)',
          }}
        >
          <Sparkles size={13} style={{ color: '#6366f1' }} />
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#6366f1' }}>
            AI-платформа для урегулирования долгов
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6"
          style={{ letterSpacing: '-0.03em' }}
        >
          <span className="gradient-text">Путь к договорённости</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            начинается здесь
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          Нейтральная цифровая платформа для заёмщиков, кредиторов, юристов и медиаторов.
          Урегулируйте задолженности цивилизованно — без суда, без давления.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link
            href="/auth/register"
            className="btn-primary group"
            style={{ padding: '14px 28px', fontSize: '15px', minWidth: '200px' }}
          >
            Начать урегулирование
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#ecosystem"
            className="btn-secondary"
            style={{ padding: '14px 28px', fontSize: '15px', minWidth: '180px' }}
          >
            Узнать больше
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {floatingStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="glass-card p-4 text-center"
            >
              <div className="text-3xl font-black gradient-text-accent mb-1">{stat.value}</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12"
        >
          {[
            { icon: Shield, text: 'Без хранения портфелей' },
            { icon: Scale, text: 'Без участия в расчётах' },
            { icon: Sparkles, text: 'Технический оператор' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
              <Icon size={14} />
              <span className="text-xs font-medium tracking-wide uppercase">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
