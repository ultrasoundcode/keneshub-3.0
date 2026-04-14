'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const ROLE_LABELS: Record<string, string> = {
  borrower: 'Заёмщик',
  creditor: 'Кредитор',
  collector: 'Коллектор',
  lawyer: 'Юрист',
  ombudsman: 'Омбудсмен',
};

const ROLE_COLORS: Record<string, string> = {
  borrower: '#3b82f6',
  creditor: '#f59e0b',
  collector: '#ef4444',
  lawyer: '#8b5cf6',
  ombudsman: '#10b981',
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((data) => {
        setUsers(data.recentUsers ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="p-6 md:p-10 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400 mb-2">Управление</p>
        <h1 className="text-[28px] md:text-[32px] font-bold text-white">Пользователи</h1>
        <p className="text-[14px] text-white/30 mt-1">Все зарегистрированные участники платформы</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 flex-1">
          <Search size={14} className="text-white/30" />
          <input
            type="text"
            placeholder="Поиск по имени или email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[13px] text-white placeholder:text-white/25"
          />
        </div>
        <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5">
          <Filter size={14} className="text-white/30" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-transparent outline-none text-[13px] text-white/60"
          >
            <option value="all" style={{ background: '#1a1a1a' }}>Все роли</option>
            {Object.entries(ROLE_LABELS).map(([key, label]) => (
              <option key={key} value={key} style={{ background: '#1a1a1a' }}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden"
      >
        {/* Table head */}
        <div className="grid grid-cols-[1fr_1fr_auto] md:grid-cols-[1fr_1fr_120px_100px] gap-4 px-6 py-3 border-b border-white/[0.06]">
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/30">Имя</span>
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/30 hidden md:block">Email</span>
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/30">Роль</span>
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/30 hidden md:block">Дата</span>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-white/[0.04] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3">
            <Users size={32} className="text-white/10" />
            <p className="text-[14px] text-white/20">Пользователи не найдены</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filtered.map((user, i) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="grid grid-cols-[1fr_1fr_auto] md:grid-cols-[1fr_1fr_120px_100px] gap-4 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold"
                    style={{
                      background: `${ROLE_COLORS[user.role] ?? '#888'}18`,
                      border: `1px solid ${ROLE_COLORS[user.role] ?? '#888'}30`,
                      color: ROLE_COLORS[user.role] ?? '#888',
                    }}
                  >
                    {user.name?.charAt(0)?.toUpperCase() ?? '?'}
                  </div>
                  <span className="text-[13px] font-medium text-white/70">{user.name}</span>
                </div>
                <span className="text-[13px] text-white/40 truncate hidden md:block">{user.email}</span>
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold w-fit"
                  style={{
                    background: `${ROLE_COLORS[user.role] ?? '#888'}15`,
                    color: ROLE_COLORS[user.role] ?? '#888',
                    border: `1px solid ${ROLE_COLORS[user.role] ?? '#888'}25`,
                  }}
                >
                  {ROLE_LABELS[user.role] ?? user.role}
                </span>
                <span className="text-[11px] text-white/25 hidden md:block">
                  {user.createdAt
                    ? new Date(Number(user.createdAt) * 1000).toLocaleDateString('ru-RU')
                    : '—'}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
