'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, ArrowRight, User, Building2, Scale, MessageSquare } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Зарегистрируйтесь',
    desc: 'Выберите свою роль: Заёмщик, Кредитор, Коллектор, Юрист или Омбудсмен.',
    icon: User,
    accent: '#6366f1',
  },
  {
    step: '02',
    title: 'Добавьте долг',
    desc: 'Заёмщик указывает данные о задолженности. AI автоматически анализирует ситуацию.',
    icon: Brain,
    accent: '#8b5cf6',
  },
  {
    step: '03',
    title: 'Начните диалог',
    desc: 'Инициируйте обращение к Кредитору, Юристу или Медиатору в один клик.',
    icon: MessageSquare,
    accent: '#06b6d4',
  },
  {
    step: '04',
    title: 'Подпишите соглашение',
    desc: 'Договоритесь об условиях и подпишите итоговое соглашение через ЭЦП.',
    icon: Scale,
    accent: '#10b981',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Как это работает
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-black mb-4 tracking-tight gradient-text"
            style={{ letterSpacing: '-0.02em' }}
          >
            Четыре шага к урегулированию
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                <div className="glass-card p-6 h-full relative overflow-hidden">
                  <div
                    className="absolute top-0 right-0 text-7xl font-black leading-none pointer-events-none select-none"
                    style={{
                      color: 'rgba(255,255,255,0.02)',
                      right: '-10px',
                      top: '-10px',
                    }}
                  >
                    {s.step}
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}30` }}
                  >
                    <Icon size={18} style={{ color: s.accent }} />
                  </div>
                  <div className="text-xs font-bold mb-2" style={{ color: s.accent }}>
                    Шаг {s.step}
                  </div>
                  <div className="font-bold text-white mb-2">{s.title}</div>
                  <div className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {s.desc}
                  </div>
                </div>

                {/* Arrow connector */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:flex absolute top-1/2 -right-3 z-10 items-center justify-center w-6 h-6 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <ArrowRight size={10} style={{ color: 'rgba(255,255,255,0.3)' }} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
