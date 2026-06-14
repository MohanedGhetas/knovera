import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  Building2,
  Users,
  BookOpen,
  BarChart3,
  Shield,
  CheckCircle2,
  Phone,
  Mail,
  ArrowLeft,
  Globe,
  Award,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

const institutionFeatures = [
  {
    icon: Users,
    title: 'وصول غير محدود للطلاب',
    description: 'منح صلاحيات الوصول لجميع طلاب مؤسستك دون قيود عددية',
  },
  {
    icon: BookOpen,
    title: 'مكتبة رقمية متكاملة',
    description: 'وصول لأكثر من 12,000 منشور أكاديمي عربي في مختلف التخصصات',
  },
  {
    icon: BarChart3,
    title: 'تحليلات COUNTER موثوقة',
    description: 'تقارير استخدام متوافقة مع المعايير الدولية للتقارير المؤسسية',
  },
  {
    icon: Shield,
    title: 'أمان وخصوصية مضمونة',
    description: 'حماية بيانات المستخدمين وفق أعلى معايير الأمان السيبراني',
  },
  {
    icon: Globe,
    title: 'تكامل LTI 1.3',
    description: 'ربط مباشر مع Moodle، Blackboard، Canvas وغيرها',
  },
  {
    icon: Clock,
    title: 'دعم فني على مدار الساعة',
    description: 'فريق دعم متخصص لضمان تجربة استخدام سلسة',
  },
];

const pricingPlans = [
  {
    name: 'الناشئون',
    students: 'حتى 500 طالب',
    price: '199',
    features: [
      'وصول كامل للمكتبة الرقمية',
      'تقارير استخدام أساسية',
      'دعم عبر البريد الإلكتروني',
      'تكامل LTI أساسي',
    ],
    popular: false,
  },
  {
    name: 'المؤسسي',
    students: '500 - 5,000 طالب',
    price: '599',
    features: [
      'كل مميزات الناشئين',
      'تحليلات COUNTER متقدمة',
      'دعم هاتفي أولوية',
      'تكامل كامل مع LMS',
      'قوائم قراءة مخصصة',
      'PWA للوصول بدون اتصال',
    ],
    popular: true,
  },
  {
    name: 'المؤسسي Plus',
    students: 'أكثر من 5,000 طالب',
    price: '1999',
    features: [
      'كل مميزات المؤسسي',
      'مدير حساب مخصص',
      'دعم مخصص على مدار الساعة',
      'نشر محتوى خاص بالمؤسسة',
      'واجهة برمجة تطبيقات (API)',
      'تدريب افتراضي للمستخدمين',
    ],
    popular: false,
  },
];

const trustedInstitutions = [
  { name: 'جامعة البحرين', country: 'البحرين' },
  { name: 'جامعة الكويت', country: 'الكويت' },
  { name: 'جامعة قطر', country: 'قطر' },
  { name: 'جامعة الإمارات', country: 'الإمارات' },
  { name: 'جامعة الملك سعود', country: 'السعودية' },
  { name: 'جامعة السلطان قابوس', country: 'عمان' },
  { name: 'الجامعة الأمريكية بالقاهرة', country: 'مصر' },
  { name: 'جامعة محمد الخامس', country: 'المغرب' },
];

export default function InstitutionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 hero-pattern opacity-20" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block bg-accent/20 text-accent text-xs font-bold px-4 py-1.5 rounded-full border border-accent/30 mb-6">
                حلول مؤسسية متكاملة
              </span>
              <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-6">
                عزز تجربة التعلم في{' '}
                <span className="text-accent">مؤسستك</span>
              </h1>
              <p className="text-white/80 text-lg lg:text-xl leading-relaxed mb-8">
                منصة كنوفيرا تتيح للجامعات والمؤسسات التعليمية الوصول إلى مكتبة رقمية
                ضخمة من المنشورات الأكاديمية العربية مع أدوات متقدمة لإدارة المحتوى
                ومتابعة استخدام الطلاب.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
                >
                  استعرض الخطط
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all border border-white/20"
                >
                  <Phone className="w-5 h-5" />
                  <span>تواصل معنا</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" className="w-full">
              <path
                d="M0 120L60 105C120 90 240 60 360 45C480 30 600 50 720 55C840 60 960 50 1080 60C1200 70 1320 90 1380 100L1440 110V120H0Z"
                fill="#FAFAFA"
              />
            </svg>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-bgAlabaster">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4">
                لماذا تختار كنوفيرا؟
              </h2>
              <p className="text-textMuted max-w-2xl mx-auto">
                نقدم حزمة متكاملة من الخدمات المصممة خصيصاً لتلبية احتياجات المؤسسات
                الأكاديمية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {institutionFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-slate-200 shadow-elegant hover-lift animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-accent/10 text-accent p-4 rounded-xl w-fit mb-6">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-textMuted text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted Institutions */}
        <section className="py-16 bg-bgCream">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-accent" />
                <span className="text-textMuted text-sm uppercase tracking-wider font-semibold">
                  موثوق من قبل
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                أكثر من 850 مؤسسة تعليمية
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trustedInstitutions.map((inst, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center hover:shadow-elegant transition-shadow"
                >
                  <Building2 className="w-8 h-8 text-accent mx-auto mb-2" />
                  <h3 className="font-bold text-sm text-primary">{inst.name}</h3>
                  <p className="text-xs text-textMuted">{inst.country}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 bg-bgAlabaster">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4">
                خطط تناسب جميع المؤسسات
              </h2>
              <p className="text-textMuted max-w-2xl mx-auto">
                اختر الخطة المناسبة لحجم مؤسستك واحتياجاتكم
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl border-2 overflow-hidden ${
                    plan.popular
                      ? 'border-accent shadow-elegant-lg'
                      : 'border-slate-200 shadow-elegant'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-accent text-primary text-xs font-bold py-2 text-center">
                      الأكثر طلباً
                    </div>
                  )}

                  <div className={`p-6 ${plan.popular ? 'pt-10' : ''}`}>
                    <h3 className="font-black text-xl text-primary mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-textMuted mb-4">{plan.students}</p>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-black text-primary">{plan.price}</span>
                      <span className="text-sm text-textMuted">د.ك / شهرياً</span>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                          <span className="text-sm text-textPrimary">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="#contact"
                      className={`block w-full py-3 rounded-xl font-bold text-center transition-all ${
                        plan.popular
                          ? 'bg-accent text-primary hover:bg-accent/90'
                          : 'bg-primary text-white hover:bg-primary/90'
                      }`}
                    >
                      ابدأ الآن
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 hero-pattern opacity-20" />
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-black mb-6">
                  جاهز للبدء؟
                </h2>
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  تواصل معنا الآن للحصول على عرض تقديمي مخصص وتجربة مجانية لمدة
                  30 يوماً.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/20 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60">اتصل بنا</p>
                      <p className="font-bold" dir="ltr">+973 17 437 666</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/20 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60">راسلنا</p>
                      <p className="font-bold">institutions@knovera.edu.bh</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="الاسم الأول"
                      className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-accent outline-none"
                    />
                    <input
                      type="text"
                      placeholder="الاسم الأخير"
                      className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-accent outline-none"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني المؤسسي"
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-accent outline-none"
                  />
                  <input
                    type="text"
                    placeholder="اسم المؤسسة"
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-accent outline-none"
                  />
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:border-accent outline-none cursor-pointer">
                    <option value="" className="text-primary">عدد الطلاب</option>
                    <option value="small" className="text-primary">حتى 500 طالب</option>
                    <option value="medium" className="text-primary">500 - 5,000 طالب</option>
                    <option value="large" className="text-primary">أكثر من 5,000 طالب</option>
                  </select>
                  <textarea
                    placeholder="أخبرنا المزيد عن احتياجاتكم..."
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-accent outline-none resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-accent text-primary py-3 rounded-xl font-bold hover:bg-accent/90 transition-colors"
                  >
                    أرسل الطلب
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
