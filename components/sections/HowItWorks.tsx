'use client';

import { motion } from 'framer-motion';
import { MessageSquareText, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: MessageSquareText,
      title: 'Опишите ситуацию',
      desc: 'Эту информацию увидит только система для первичного анализа.',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Sparkles,
      title: 'Получите AI-анализ',
      desc: 'На основе вашей истории ИИ подберет лучший путь: медиация, реструктуризация или помощь юриста.',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: CheckCircle2,
      title: 'Решите проблему',
      desc: 'Общайтесь с кредиторами и подписывайте соглашения ЭЦП прямо на платформе.',
      color: 'bg-emerald-50 text-emerald-600'
    }
  ];

  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-[1200px] mx-auto px-6">
        <header className="text-center mb-20">
          <h2 className="font-serif text-[40px] md:text-[56px] text-black tracking-tight mb-4">
            {t('Как это работает')}
          </h2>
          <p className="text-zinc-400 text-[16px] font-medium uppercase tracking-[0.2em]">
            {t('Простой путь к финансовой свободе')}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className={`w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-110 duration-500`}>
                <step.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-[20px] font-bold text-black mb-4 tracking-tight">
                {t(step.title)}
              </h3>
              <p className="text-[15px] text-zinc-500 leading-relaxed max-w-[280px] mx-auto">
                {t(step.desc)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
