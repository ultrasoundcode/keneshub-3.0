'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              <Shield size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold">
              Kenes<span style={{ color: '#6366f1' }}>Hub</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            {['Документация', 'Условия', 'Конфиденциальность', 'Контакты'].map((l) => (
              <Link
                key={l}
                href="#"
                className="text-sm transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {l}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[Twitter, Linkedin, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2026 KenesHub. Все права защищены.
          </p>
          <div className="flex items-center gap-6 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            <span>• Без хранения портфелей</span>
            <span>• Без участия в расчётах</span>
            <span>• Технический оператор</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
