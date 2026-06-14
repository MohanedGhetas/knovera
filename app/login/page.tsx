'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  GraduationCap,
  PenTool,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Home,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ==========================================================================
   DATA: Role Configuration for User Selection
   ========================================================================== */
const roles = [
  {
    id: 'student',
    title: 'طالب / قارئ',
    titleEn: 'Student / Reader',
    description: 'الوصول إلى المكتبة الرقمية وأدوات القراءة الذكية',
    icon: GraduationCap,
    color: 'from-emerald-500 to-teal-600',
    features: ['المكتبة الرقمية', 'القراءة الذكية', 'الإشارات المرجعية'],
  },
  {
    id: 'instructor',
    title: 'أستاذ / معلم',
    titleEn: 'Instructor / Teacher',
    description: 'إدارة قوائم القراءة ومتابعة تقدم الطلاب',
    icon: BookOpen,
    color: 'from-blue-500 to-indigo-600',
    features: ['قوائم القراءة', 'متابعة التقدم', 'روابط LTI'],
  },
  {
    id: 'editor',
    title: 'محرر / ناشر',
    titleEn: 'Content Editor / Publisher',
    description: 'استوديو الرقمنة والتحرير مع أدوات الذكاء الاصطناعي',
    icon: PenTool,
    color: 'from-amber-500 to-orange-600',
    features: ['معالجة OCR', 'تدقيق AI', 'الفهرسة'],
  },
];

/* ==========================================================================
   COMPONENT: RoleSelectorCard - Isolated role selection card component
   ========================================================================== */
function RoleSelectorCard({
  role,
  isSelected,
  onSelect,
}: {
  role: typeof roles[0];
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full p-4 rounded-xl border-2 transition-all duration-300 text-right',
        'group relative overflow-hidden',
        isSelected
          ? 'border-accent bg-accent/20 shadow-lg shadow-accent/20 scale-[1.02]'
          : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
      )}
    >
      {/* Selection Indicator */}
      <div
        className={cn(
          'absolute top-3 left-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
          isSelected ? 'border-accent bg-accent' : 'border-white/30'
        )}
      >
        {isSelected && <Check className="w-4 h-4 text-primary" />}
      </div>

      {/* Role Content */}
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center transition-all flex-shrink-0',
            isSelected
              ? 'bg-accent text-primary'
              : 'bg-white/10 text-white/70 group-hover:bg-white/20'
          )}
        >
          <role.icon className="w-6 h-6" />
        </div>

        {/* Text */}
        <div className="flex-grow">
          <h3 className="font-bold text-white text-right">{role.title}</h3>
          <p className="text-[10px] text-white/50 mt-0.5">{role.titleEn}</p>
          <p className="text-xs text-white/70 mt-1">{role.description}</p>
        </div>
      </div>

      {/* Feature Tags (shown when selected) */}
      {isSelected && (
        <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2">
          {role.features.map((feature) => (
            <span
              key={feature}
              className="text-[10px] bg-white/10 px-2 py-1 rounded text-white/80"
            >
              {feature}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}

/* ==========================================================================
   COMPONENT: ReturnToPortalButton - Navigation back to main portal
   ========================================================================== */
function ReturnToPortalButton() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group text-xs"
    >
      <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
      <span>العودة إلى البوابة الرئيسية</span>
      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}

/* ==========================================================================
   MAIN COMPONENT: Login Page
   ========================================================================== */
export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /* -----------------------------------------------------------------------
     HANDLERS: Navigation and authentication
     ----------------------------------------------------------------------- */
  const handleLogin = () => {
    if (!selectedRole) return;
    setIsLoading(true);

    // Simulate login and redirect to dashboard
    setTimeout(() => {
      router.push(`/dashboard/${selectedRole}`);
    }, 500);
  };

  /* =========================================================================
     RENDER: Login Page UI
     ========================================================================= */
  return (
    <div className="min-h-screen bg-gradient-to-bl from-primary via-primary/95 to-primary/90 flex items-center justify-center p-4 relative overflow-hidden">
      {/* =====================================================================
          BACKGROUND: Decorative Elements
          ===================================================================== */}
      <div className="absolute inset-0 hero-pattern opacity-20" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />

      {/* Floating Icons */}
      <div className="absolute top-20 right-20 animate-float opacity-20">
        <BookOpen className="w-16 h-16 text-accent" />
      </div>
      <div className="absolute bottom-32 left-24 animate-float opacity-20" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-12 h-12 text-accent" />
      </div>

      {/* =====================================================================
          LOGIN CARD: Main authentication interface
          ===================================================================== */}
      <div className="relative z-10 w-full max-w-lg animate-scale-in">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">

          {/* -----------------------------------------------------------------
              HEADER: Login title and branding
              ----------------------------------------------------------------- */}
          <div className="bg-gradient-to-l from-accent/20 to-accent/10 p-8 text-center border-b border-white/10">
            {/* Return to Portal */}
            <div className="mb-6">
              <ReturnToPortalButton />
            </div>

            {/* Logo */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-2xl mb-4 animate-float">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-black text-white mb-2">بوابة الدخول</h1>
            <p className="text-white/70 text-sm">اختر دورك للوصول إلى لوحة التحكم المناسبة</p>
          </div>

          {/* -----------------------------------------------------------------
              FORM: Role selection and login button
              ----------------------------------------------------------------- */}
          <div className="p-8 space-y-6">

            {/* =============================================================
                ROLE SELECTOR: Isolated block with clear separation
                ============================================================= */}
            <div className="space-y-4">
              {/* Label */}
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-white/80">
                  اختر نوع الحساب
                </label>
                <span className="text-[10px] text-white/40">* مطلوب</span>
              </div>

              {/* Role Cards Grid */}
              <div className="grid gap-3">
                {roles.map((role) => (
                  <RoleSelectorCard
                    key={role.id}
                    role={role}
                    isSelected={selectedRole === role.id}
                    onSelect={() => setSelectedRole(role.id)}
                  />
                ))}
              </div>

              {/* Helper Text */}
              <p className="text-[10px] text-white/40 text-center">
                يمكنك تغيير دورك لاحقاً من إعدادات الحساب
              </p>
            </div>

            {/* =============================================================
                LOGIN BUTTON: Primary action
                ============================================================= */}
            <button
              onClick={handleLogin}
              disabled={!selectedRole || isLoading}
              className={cn(
                'w-full py-4 rounded-xl font-bold text-lg transition-all duration-300',
                'flex items-center justify-center gap-3',
                selectedRole
                  ? 'bg-accent text-primary hover:bg-accent/90 hover:shadow-xl hover:scale-[1.02]'
                  : 'bg-white/10 text-white/50 cursor-not-allowed'
              )}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <span>جاري تسجيل الدخول...</span>
                </>
              ) : (
                <>
                  <span>تسجيل الدخول</span>
                  <ArrowLeft className="w-5 h-5" />
                </>
              )}
            </button>

            {/* =============================================================
                FOOTER: Help link
                ============================================================= */}
            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-sm text-white/50">
                تواجه مشكلة في الدخول؟{' '}
                <a href="#" className="text-accent hover:underline font-semibold">
                  تواصل مع الدعم
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-white/30 text-xs mt-6">
          كنوفيرا © 2024 - جامعة البحرين | جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  );
}
