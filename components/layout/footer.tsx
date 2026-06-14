import Link from 'next/link';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  platform: [
    { href: '/marketplace', label: 'المكتبة الرقمية' },
    { href: '/institutions', label: 'للمؤسسات' },
    { href: '/publishers', label: 'للناشرين' },
    { href: '/authors', label: 'للمؤلفين' },
  ],
  resources: [
    { href: '/about', label: 'عن المنصة' },
    { href: '/docs', label: 'الدليل التعليمي' },
    { href: '/api', label: 'واجهة برمجة التطبيقات' },
    { href: '/faq', label: 'الأسئلة الشائعة' },
  ],
  legal: [
    { href: '/terms', label: 'شروط الاستخدام' },
    { href: '/privacy', label: 'سياسة الخصوصية' },
    { href: '/licenses', label: 'تراخيص المشاع الإبداعي' },
    { href: '/accessibility', label: 'إمكانية الوصول' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-accent text-primary p-2 rounded-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">كنوفيرا</h2>
                <p className="text-xs text-accent/80 font-semibold uppercase tracking-wider">
                  Knovera Platform
                </p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md">
              منصة أكاديمية رقمية متكاملة تتيح للجامعات والمؤسسات التعليمية نشر المحتوى
              الأكاديمي وإتاحة الوصول الحر للباحثين والطلاب في جميع أنحاء العالم العربي.
            </p>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent" />
                <span>جامعة البحرين - مملكة البحرين</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <span>support@knovera.edu.bh</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <span dir="ltr">+973 17 437 666</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-bold text-accent mb-4 text-sm">المنصة</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-bold text-accent mb-4 text-sm">الموارد</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-accent mb-4 text-sm">القانونية</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-xs">
              © {new Date().getFullYear()} كنوفيرا - جامعة البحرين. جميع الحقوق
              محفوظة.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/50">مدعوم بواسطة</span>
              <span className="text-accent text-xs font-semibold">
                Open Access Initiative
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
