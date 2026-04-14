'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Search, Filter, TrendingUp } from 'lucide-react';

interface Debt {
  id: string;
  amount: number;
  status: string;
  description: string;
  currency: string;
  createdAt: string;
}

interface DebtsByStatus {
  status: string;
  count: number;
  total: number;
}

const STATUS_LABELS: Record<string, string> = {
  active: 'Активен',
  negotiation: 'Переговоры',
  resolved: 'Урегулирован',
  defaulted: 'Просрочен',
};

const STATUS_COLORS: Record<string, string> = {
  active: '#10b981',
  negotiation: '#f59e0b',
  resolved: '#8b5cf6',
  defaulted: '#ef4444',
};

function formatAmount(amount: number, currency = 'KZT') {
  if (!amount) return currency === 'KZT' ? '₸0' : `$0`;
  const prefix = currency === 'KZT' ? '₸' : '$';
  if (amount >= 1_000_000) return `${prefix}${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `${prefix}${(amount / 1_000).toFixed(0)}K`;
  return `${prefix}${amount.toLocaleString()}`;
}

export default function AdminCasesPage() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [debtsByStatus, setDebtsByStatus] = useState<DebtsByStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((data) => {
        setDebts(data.recentDebts ?? []);
        setDebtsByStatus(data.debtsByStatus ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = debts.filter((d) => {
    const matchSearch = d.description?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalAmount = debts.reduce((s, d) => s + (d.amount ?? 0), 0);

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400 mb-2">Управление</p>
        <h1 className="text-[28px] md:text-[32px] font-bold text-white">Все дела</h1>
        <p className="text-[14px] text-white/30 mt-1">Долги и переговоры на платформе</p>
      </div>

      {/* Summary mini-cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {debtsByStatus.map((s, i) => (
          <motion.div
            key={s.status}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: STATUS_COLORS[s.status ?? ''] ?? '#888' }}
              />
              <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.1em]">
                {STATUS_LABELS[s.status ?? ''] ?? s.status}
              </span>
            </div>
            <p className="text-[22px] font-bold text-white">{s.count}</p>
            <p className="text-[12px] text-white/30">{formatAmount(Number(s.total))}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 flex-1">
          <Search size={14} className="text-white/30" />
          <input
            type="text"
            placeholder="Поиск по описанию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[13px] text-white placeholder:text-white/25"
          />
        </div>
        <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5">
          <Filter size={14} className="text-white/30" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent outline-none text-[13px] text-white/60"
          >
            <option value="all" style={{ background: '#1a1a1a' }}>Все статусы</option>
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key} style={{ background: '#1a1a1a' }}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden mb-4"
      >
        <div className="grid grid-cols-[1fr_auto_120px] md:grid-cols-[1fr_120px_120px_100px] gap-4 px-6 py-3 border-b border-white/[0.06]">
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/30">Описание</span>
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/30 hidden md:block">Сумма</span>
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/30">Статус</span>
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/30 hidden md:block">Дата</span>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-white/[0.04] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3">
            <Briefcase size={32} className="text-white/10" />
            <p className="text-[14px] text-white/20">Дела не найдены</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filtered.map((debt, i) => (
              <motion.div
                key={debt.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="grid grid-cols-[1fr_auto_120px] md:grid-cols-[1fr_120px_120px_100px] gap-4 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors"
              >
                <p className="text-[13px] font-medium text-white/70 truncate">
                  {debt.description || 'Без описания'}
                </p>
                <span className="text-[13px] font-bold text-white/60 hidden md:block">
                  {formatAmount(debt.amount, debt.currency ?? 'KZT')}
                </span>
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold w-fit"
                  style={{
                    background: `${STATUS_COLORS[debt.status ?? ''] ?? '#888'}15`,
                    color: STATUS_COLORS[debt.status ?? ''] ?? '#888',
                    border: `1px solid ${STATUS_COLORS[debt.status ?? ''] ?? '#888'}25`,
                  }}
                >
                  {STATUS_LABELS[debt.status ?? ''] ?? debt.status}
                </span>
                <span className="text-[11px] text-white/25 hidden md:block">
                  {debt.createdAt
                    ? new Date(Number(debt.createdAt) * 1000).toLocaleDateString('ru-RU')
                    : '—'}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Total */}
      <div className="flex items-center justify-end gap-3 px-2">
        <TrendingUp size={14} className="text-white/20" />
        <span className="text-[13px] text-white/30">
          Общая сумма: <span className="font-bold text-white/60">{formatAmount(totalAmount)}</span>
        </span>
      </div>
    </div>
  );
}
