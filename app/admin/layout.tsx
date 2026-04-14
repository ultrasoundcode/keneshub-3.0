'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  LogOut,
  Shield,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Обзор', icon: LayoutDashboard, exact: true },
  { href: '/admin/users', label: 'Пользователи', icon: Users },
  { href: '/admin/cases', label: 'Все дела', icon: Briefcase },
];

function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="w-[240px] h-full bg-[#0d0d0d] border-r border-white/[0.06] flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <Shield className="w-4 h-4 text-violet-400" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[13px] font-bold text-white leading-none">KenesHub</p>
              <p className="text-[10px] text-white/30 font-medium mt-0.5">Admin Panel</p>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-white/30 hover:text-white md:hidden">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all group relative ${
                isActive
                  ? 'bg-violet-600/15 text-violet-300 border border-violet-500/20'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'
              }`}
            >
              <item.icon size={16} strokeWidth={1.8} />
              {item.label}
              {isActive && <ChevronRight size={12} className="ml-auto text-violet-400/60" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-6 border-t border-white/[0.06] pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={16} strokeWidth={1.8} />
          Выйти
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Desktop */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-30">
        <AdminSidebar />
      </div>

      {/* Sidebar Mobile */}
      <motion.div
        className="fixed inset-y-0 left-0 z-50 md:hidden"
        initial={{ x: -240 }}
        animate={{ x: sidebarOpen ? 0 : -240 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </motion.div>

      {/* Main content */}
      <div className="flex-1 md:ml-[240px] flex flex-col min-h-screen">
        {/* Mobile header */}
        <div className="md:hidden flex items-center gap-3 px-4 py-4 border-b border-white/[0.06] bg-[#0d0d0d]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white/40 hover:text-white transition-colors"
          >
            <Menu size={20} />
          </button>
          <p className="text-[14px] font-bold text-white">KenesHub Admin</p>
        </div>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
