'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Briefcase, Scale, Users, MessageSquare, FileText, PenTool, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ecosystem = [
  {
    id: 'creditor',
    icon: Building2,
    role: 'Кредитор',
    subtitle: 'Банки / МФО',
    description: 'Управляйте просроченными активами через структурированный диалог. Предлагайте планы реструктуризации и подписывайте соглашения с ЭЦП.',
    features: ['Запрос на КП', 'Защищённый чат', 'Подписание ЭЦП'],
    accent: '#6366f1',
    glow: 'rgba(99,102,241,0.15)',
    href: '/auth/register?role=creditor',
  },
  {
    id: 'collector',
    icon: Briefcase,
    role: 'Коллектор',
    subtitle: 'Коллекторское агентство',
    description: 'Принимайте реестры передачи и ведите переговоры в соответствии с правовыми нормами РК. Полная история коммуникаций.',
    features: ['Отклик на КП', 'Реестр передачи', 'Подписание ЭЦП'],
    accent: '#8b5cf6',
    glow: 'rgba(139,92,246,0.15)',
    href: '/auth/register?role=collector',
  },
  {
    id: 'lawyer',
    icon: Scale,
    role: 'Юрист',
    subtitle: 'Правовая поддержка',
    description: 'Консультируйте заёмщиков, анализируйте ситуацию с помощью AI и готовьте юридические заявления автоматически.',
    features: ['Консультации', 'AI-генерация документов', 'Онлайн-встречи'],
    accent: '#06b6d4',
    glow: 'rgba(6,182,212,0.15)',
    href: '/auth/register?role=lawyer',
  },
  {
    id: 'ombudsman',
    icon: Users,
    role: 'Омбудсмен',
    subtitle: 'Банковский медиатор',
    description: 'Инициируйте и проводите медиацию между заёмщиком и кредитором. Фиксируйте соглашения в системе.',
    features: ['Запрос на медиацию', 'Соглашение о медиации', 'Нейтральная платформа'],
    accent: '#10b981',
    glow: 'rgba(16,185,129,0.15)',
    href: '/auth/register?role=ombudsman',
  },
];

const infrastructure = [
  { icon: MessageSquare, title: 'Защищённый чат', desc: 'Шифрованные переговоры между всеми участниками в реальном времени' },
  { icon: FileText, title: 'Документооборот', desc: 'Централизованное хранилище всех договоров, заявлений и соглашений' },
  { icon: PenTool, title: 'ЭЦП', desc: 'Юридически значимая электронная подпись для всех участников процесса' },
];

export default function FeaturesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ecosystem" className="py-24 px-6 relative overflow-hidden" ref={ref}>
      {/* Section header */}
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
              Экосистема участников
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            <span className="gradient-text">Все роли.</span>{' '}
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>Одна платформа.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
            KenесHub объединяет всех участников процесса урегулирования задолженностей
            в единой нейтральной среде с полным аудит-треком.
          </p>
        </motion.div>

        {/* Role cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {ecosystem.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card glass-card-hover gradient-border p-6 group relative overflow-hidden"
              >
                {/* Card glow */}
                <div
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse, ${item.glow} 0%, transparent 70%)` }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${item.accent}20`, border: `1px solid ${item.accent}30` }}
                      >
                        <Icon size={18} style={{ color: item.accent }} />
                      </div>
                      <div>
                        <div className="font-bold text-white text-base">{item.role}</div>
                        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.subtitle}</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {item.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {item.features.map((f) => (
                      <span
                        key={f}
                        className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{
                          background: `${item.accent}15`,
                          border: `1px solid ${item.accent}25`,
                          color: item.accent,
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-sm font-medium transition-all duration-200 group-hover:gap-2"
                    style={{ color: item.accent }}
                  >
                    Зарегистрироваться как {item.role}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Infrastructure section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-card p-8 gradient-border"
        >
          <div className="text-center mb-6">
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Общая инфраструктура
            </p>
            <h3 className="text-xl font-bold text-white">Чат · Документооборот · ЭЦП</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infrastructure.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center p-4">
                  <div
                    className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
                  >
                    <Icon size={20} style={{ color: '#6366f1' }} />
                  </div>
                  <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.desc}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
