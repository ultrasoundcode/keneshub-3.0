'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  ArrowUpRight,
  Clock,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

interface Stats {
  summary: {
    totalUsers: number;
    totalDebts: number;
    totalAmount: number;
    resolvedAmount: number;
    resolvedCount: number;
    totalNegotiations: number;
  };
  usersByRole: { role: string; count: number }[];
  debtsByStatus: { status: string; count: number; total: number }[];
  recentDebts: {
    id: string;
    amount: number;
    status: string;
    description: string;
    currency: string;
    createdAt: string;
  }[];
  recentUsers: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  }[];
}

const ROLE_LABELS: Record<string, string> = {
  borrower: 'Заёмщик',
  creditor: 'Кредитор',
  collector: 'Коллектор',
  lawyer: 'Юрист',
  ombudsman: 'Омбудсмен',
};

const STATUS_COLORS: Record<string, string> = {
  active: '#10b981',
  negotiation: '#f59e0b',
  resolved: '#8b5cf6',
  defaulted: '#ef4444',
};

const STATUS_LABELS: Record<string, string> = {
  active: 'Активен',
  negotiation: 'Переговоры',
  resolved: 'Урегулирован',
  defaulted: 'Просрочен',
};

function formatAmount(amount: number) {
  if (!amount) return '₸0';
  if (amount >= 1_000_000) return `₸${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `₸${(amount / 1_000).toFixed(0)}K`;
  return `₸${amount.toLocaleString()}`;
}

function KpiCard({
  label,
  value,
  icon: Icon,
  color,
  sub,
  delay,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  sub?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 hover:bg-white/[0.05] transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        >
          <Icon size={18} style={{ color }} strokeWidth={1.8} />
        </div>
        <ArrowUpRight size={14} className="text-white/20 mt-1" />
      </div>
      <p className="text-[28px] font-bold text-white leading-none mb-1">{value}</p>
      <p className="text-[12px] font-semibold text-white/40 uppercase tracking-[0.1em]">{label}</p>
      {sub && <p className="text-[11px] text-white/25 mt-1">{sub}</p>}
    </motion.div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = async () => {
    try {
      setRefreshing(true);
      const res = await fetch('/api/admin/stats');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setStats(data);
    } catch {
      setError('Не удалось загрузить статистику');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const resolutionRate = stats
    ? stats.summary.totalDebts > 0
      ? Math.round((stats.summary.resolvedCount / stats.summary.totalDebts) * 100)
      : 0
    : 0;

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400 mb-2"
          >
            CEO Dashboard
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-[28px] md:text-[36px] font-bold text-white leading-tight"
          >
            Ежедневная сводка
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[14px] text-white/30 mt-1"
          >
            {new Date().toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </motion.p>
        </div>
        <button
          onClick={loadStats}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white/50 hover:text-white/80 hover:bg-white/[0.08] text-[13px] font-medium transition-all disabled:opacity-40"
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          Обновить
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 animate-pulse h-[120px]" />
          ))}
        </div>
      ) : error ? (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl p-5 mb-8">
          <AlertTriangle size={18} className="text-red-400" />
          <p className="text-[14px] text-red-400 font-medium">{error}</p>
        </div>
      ) : stats ? (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <KpiCard
              label="Пользователей"
              value={stats.summary.totalUsers}
              icon={Users}
              color="#8b5cf6"
              sub="Зарегистрировано"
              delay={0.1}
            />
            <KpiCard
              label="Всего дел"
              value={stats.summary.totalDebts}
              icon={Briefcase}
              color="#3b82f6"
              sub={`${stats.summary.totalNegotiations} переговоров`}
              delay={0.15}
            />
            <KpiCard
              label="Сумма долгов"
              value={formatAmount(Number(stats.summary.totalAmount))}
              icon={TrendingUp}
              color="#f59e0b"
              sub="Общий объём"
              delay={0.2}
            />
            <KpiCard
              label="Урегулировано"
              value={`${resolutionRate}%`}
              icon={CheckCircle2}
              color="#10b981"
              sub={`${stats.summary.resolvedCount} дел закрыто`}
              delay={0.25}
            />
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

            {/* Users by Role */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6"
            >
              <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-white/40 mb-5">
                Пользователи по ролям
              </h2>
              <div className="space-y-3">
                {stats.usersByRole.length === 0 ? (
                  <p className="text-[13px] text-white/20">Нет данных</p>
                ) : (
                  stats.usersByRole.map((item) => {
                    const maxCount = Math.max(...stats.usersByRole.map((r) => Number(r.count)));
                    const pct = maxCount > 0 ? (Number(item.count) / maxCount) * 100 : 0;
                    return (
                      <div key={item.role} className="flex items-center gap-3">
                        <span className="text-[12px] font-medium text-white/50 w-[90px] flex-shrink-0">
                          {ROLE_LABELS[item.role] ?? item.role}
                        </span>
                        <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                            className="h-full bg-violet-500 rounded-full"
                          />
                        </div>
                        <span className="text-[13px] font-bold text-white/70 w-6 text-right">
                          {item.count}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>

            {/* Debts by Status */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6"
            >
              <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-white/40 mb-5">
                Дела по статусам
              </h2>
              <div className="space-y-3">
                {stats.debtsByStatus.length === 0 ? (
                  <p className="text-[13px] text-white/20">Нет данных</p>
                ) : (
                  stats.debtsByStatus.map((item) => (
                    <div key={item.status} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: STATUS_COLORS[item.status ?? ''] ?? '#888' }}
                        />
                        <span className="text-[13px] font-medium text-white/60">
                          {STATUS_LABELS[item.status ?? ''] ?? item.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[12px] text-white/30">{formatAmount(Number(item.total))}</span>
                        <span className="text-[13px] font-bold text-white/70">{item.count} дел</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Recent Debts */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6"
            >
              <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-white/40 mb-5">
                Последние дела
              </h2>
              <div className="space-y-3">
                {stats.recentDebts.length === 0 ? (
                  <p className="text-[13px] text-white/20">Нет дел</p>
                ) : (
                  stats.recentDebts.slice(0, 6).map((debt) => (
                    <div key={debt.id} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                      <div>
                        <p className="text-[13px] font-medium text-white/70 truncate max-w-[160px]">
                          {debt.description || 'Без описания'}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: STATUS_COLORS[debt.status ?? ''] ?? '#888' }}
                          />
                          <span className="text-[11px] text-white/30">
                            {STATUS_LABELS[debt.status ?? ''] ?? debt.status}
                          </span>
                        </div>
                      </div>
                      <span className="text-[13px] font-bold text-white/60">
                        {formatAmount(debt.amount)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Recent Users */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6"
            >
              <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-white/40 mb-5">
                Новые пользователи
              </h2>
              <div className="space-y-3">
                {stats.recentUsers.length === 0 ? (
                  <p className="text-[13px] text-white/20">Нет пользователей</p>
                ) : (
                  stats.recentUsers.slice(0, 6).map((user) => (
                    <div key={user.id} className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-0">
                      <div className="w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[11px] font-bold text-violet-400">
                          {user.name?.charAt(0)?.toUpperCase() ?? '?'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-white/70 truncate">{user.name}</p>
                        <p className="text-[11px] text-white/30 truncate">{user.email}</p>
                      </div>
                      <span className="text-[11px] font-medium text-white/30 flex-shrink-0">
                        {ROLE_LABELS[user.role] ?? user.role}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

          </div>
        </>
      ) : null}
    </div>
  );
}
