import type { Metadata } from 'next';
import { LanguageProvider } from '@/lib/i18n';
import './globals.css';

export const metadata: Metadata = {
  title: 'KenesHub — Платформа урегулирования долгов',
  description: 'AI-powered платформа коммуникации и урегулирования задолженностей в Казахстане. Без хранения портфелей. Без участия в расчётах.',
  keywords: 'keneshub, долги, урегулирование, кредитор, коллектор, юрист, медиатор, казахстан',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
