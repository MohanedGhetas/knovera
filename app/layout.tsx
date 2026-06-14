import './globals.css';
import type { Metadata } from 'next';
import { Cairo, Amiri } from 'next/font/google';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
});

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'كنوفيرا | Knovera - المنصة الأكاديمية الرقمية للنشر والوصول الحر',
  description: 'منصة أكاديمية رقمية متكاملة للنشر والوصول الحر - جامعة البحرين',
  openGraph: {
    title: 'كنوفيرا | Knovera',
    description: 'المنصة الأكاديمية الرقمية للنشر والوصول الحر',
    type: 'website',
    locale: 'ar_BH',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${amiri.variable}`}>
      <body className="font-cairo antialiased min-h-screen bg-bgAlabaster text-textPrimary">
        {children}
      </body>
    </html>
  );
}
