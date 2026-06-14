import Link from 'next/link';
import { Home, Search, BookOpen, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bgAlabaster flex items-center justify-center p-4">
      <div className="text-center max-w-lg animate-scale-in">
        {/* Logo */}
        <div className="inline-flex items-center gap-3 mb-8">
          <div className="bg-primary p-3 rounded-xl">
            <BookOpen className="w-8 h-8 text-accent" />
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-primary">كنوفيرا</h1>
            <p className="text-xs text-textMuted">جامعة البحرين</p>
          </div>
        </div>

        {/* 404 Graphic */}
        <div className="relative mb-8">
          <div className="text-[150px] lg:text-[200px] font-black text-slate-100 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 shadow-elegant-lg border border-slate-200">
              <Search className="w-16 h-16 text-accent animate-float" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl lg:text-3xl font-black text-primary mb-4">
          الصفحة غير موجودة
        </h2>
        <p className="text-textMuted mb-8 leading-relaxed">
          عذراً، لم نتمكن من العثور على الصفحة المطلوبة. ربما تم نقلها أو حذفها أو أن
          الرابط غير صحيح.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
          >
            <Home className="w-5 h-5" />
            <span>الصفحة الرئيسية</span>
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all"
          >
            <span>تسجيل الدخول</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-textMuted mb-4">روابط مفيدة:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/marketplace" className="text-primary hover:text-accent transition-colors">
              المكتبة الرقمية
            </Link>
            <Link href="/institutions" className="text-primary hover:text-accent transition-colors">
              للمؤسسات
            </Link>
            <Link href="/about" className="text-primary hover:text-accent transition-colors">
              عن المنصة
            </Link>
            <Link href="/faq" className="text-primary hover:text-accent transition-colors">
              الأسئلة الشائعة
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
