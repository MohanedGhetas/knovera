'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BookOpen, Bell, ChevronDown, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'الرئيسية' },
  { href: '/marketplace', label: 'المكتبة الرقمية' },
  { href: '/institutions', label: 'للمؤسسات' },
  { href: '/about', label: 'عن المنصة' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary/95 backdrop-blur-md text-white sticky top-0 z-50 border-b-4 border-accent shadow-elegant transition-all duration-300">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Branding */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="bg-accent text-primary p-2.5 rounded-lg shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide">
                كنوفيرا <span className="text-accent font-light mx-1">|</span>{' '}
                <span className="font-light tracking-widest text-lg">KNOVERA</span>
              </h1>
              <p className="text-[11px] text-accent/80 font-semibold uppercase tracking-wider">
                جامعة البحرين - النشر الأكاديمي
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-white font-semibold text-sm transition-colors relative after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="text-white/80 hover:text-white font-semibold text-sm transition-colors"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/register"
                className="bg-accent hover:bg-accent/90 text-primary px-5 py-2 rounded-md font-bold text-sm transition-all hover:scale-[1.02]"
              >
                انضم الآن
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            mobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          <nav className="flex flex-col gap-2 pt-4 border-t border-white/10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-white font-semibold text-sm transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
              <Link
                href="/login"
                className="text-white/80 hover:text-white font-semibold text-sm transition-colors py-2"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/register"
                className="bg-accent hover:bg-accent/90 text-primary px-5 py-2 rounded-md font-bold text-sm transition-all text-center"
              >
                انضم الآن
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
