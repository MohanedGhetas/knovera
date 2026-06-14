import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  Search,
  University,
  Users,
  Shield,
  Sparkles,
  ArrowLeft,
  Building2,
  GraduationCap,
  PenTool,
  BarChart3,
  Check,
  Star,
  BookOpen,
  Globe,
} from 'lucide-react';
import Link from 'next/link';

const featuredPublications = [
  {
    id: '1',
    title: 'تاريخ البحرين الحديث والمعاصر',
    author: 'قسم التاريخ - جامعة البحرين',
    category: 'تاريخ',
    image: 'https://images.pexels.com/photos/590009/pexels-photo-590009.jpeg?auto=compress&cs=tinysrgb&w=400',
    access: 'open',
  },
  {
    id: '2',
    title: 'مناهج البحث في العلوم الإنسانية',
    author: 'د. أحمد المناعي',
    category: 'منهجية',
    image: 'https://images.pexels.com/photos/5053760/pexels-photo-5053760.jpeg?auto=compress&cs=tinysrgb&w=400',
    access: 'licensed',
  },
  {
    id: '3',
    title: 'اللغة العربية وعلومها',
    author: 'د. فاطمة الجشي',
    category: 'لغويات',
    image: 'https://images.pexels.com/photos/7683866/pexels-photo-7683866.jpeg?auto=compress&cs=tinysrgb&w=400',
    access: 'open',
  },
  {
    id: '4',
    title: 'التحولات الاقتصادية في الخليج',
    author: 'د. عبدالله خالد',
    category: 'اقتصاد',
    image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400',
    access: 'open',
  },
];

const features = [
  {
    icon: Search,
    title: 'البحث الدلالي الذكي',
    description: 'ابحث في أعماق المحتوى الأكاديمي باستخدام محرك فهم معاصر يعيد النتائج حسب السياق والمعنى.',
  },
  {
    icon: Shield,
    title: 'تراخيص المشاع الإبداعي',
    description: 'دعم كامل لتراخيص CC وتسهيل إجراءات النشر الحر مع حماية حقوق المؤلفين.',
  },
  {
    icon: GraduationCap,
    title: 'تكامل أنظمة التعلم',
    description: 'ربط مباشر مع Blackboard وMoodle عبر معيار LTI 1.3 للوصول السلس.',
  },
  {
    icon: Globe,
    title: 'وصول متعدد الأجهزة',
    description: 'تطبيق ويب تقدمي (PWA) يتيح القراءة دون اتصال ومزامنة تلقائية.',
  },
  {
    icon: BarChart3,
    title: 'تحليلات COUNTER',
    description: 'تقارير استخدام موثوقة متوافقة مع معايير COUNTER للتقارير المؤسسية.',
  },
  {
    icon: PenTool,
    title: 'أدوات التأليف الذكي',
    description: 'محرك AI مساعد للتدقيق اللغوي والتحويل بين الصيغ وتوليد النسخ.',
  },
];

const stats = [
  { value: '12,500+', label: 'منشور أكاديمي' },
  { value: '850', label: 'مؤسسة تعليمية' },
  { value: '2.3M', label: 'مستخدم نشط' },
  { value: '95%', label: 'نسبة رضا المستخدمين' },
];

const institutions = [
  'جامعة البحرين',
  'جامعة الكويت',
  'جامعة قطر',
  'جامعة الإمارات',
  'جامعة الملك سعود',
  'جامعة السلطان قابوس',
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-bl from-primary via-primary to-primary/95 text-white overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 hero-pattern opacity-30" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2" />

          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up">
                <span className="inline-block bg-accent/20 text-accent text-xs font-bold px-4 py-1.5 rounded-full mb-6 border border-accent/30">
                  منصة الوصول الحر الأكاديمية
                </span>
                <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-6">
                  عالم المعرفة{' '}
                  <span className="text-accent">بين يديك</span>
                </h1>
                <p className="text-white/80 text-lg lg:text-xl leading-relaxed mb-8 max-w-xl">
                  كنوفيرا هي المنصة الرقمية المتكاملة التي تتيح للباحثين والأكاديميين
                  الوصول إلى آلاف المنشورات العلمية، وإدارة المحتوى الأكاديمي بفعالية.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/marketplace"
                    className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                  >
                    استكشف المكتبة
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/institutions"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all border border-white/20"
                  >
                    للمؤسسات التعليمية
                  </Link>
                </div>
              </div>

              <div className="hidden lg:block animate-scale-in">
                <div className="relative">
                  {/* Decorative Book Stack */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-accent/20 rounded-xl p-4 border border-accent/30">
                        <BookOpen className="w-8 h-8 text-accent mb-2" />
                        <h3 className="font-bold text-sm">منشورات مفتوحة</h3>
                        <p className="text-white/60 text-xs mt-1">8,200+ كتاب</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                        <University className="w-8 h-8 text-accent mb-2" />
                        <h3 className="font-bold text-sm">جامعات شريكة</h3>
                        <p className="text-white/60 text-xs mt-1">850 مؤسسة</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                        <Users className="w-8 h-8 text-accent mb-2" />
                        <h3 className="font-bold text-sm">باحثون نشطون</h3>
                        <p className="text-white/60 text-xs mt-1">2.3 مليون</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                        <Sparkles className="w-8 h-8 text-accent mb-2" />
                        <h3 className="font-bold text-sm">ذكاء اصطناعي</h3>
                        <p className="text-white/60 text-xs mt-1">بحث دلالي</p>
                      </div>
                    </div>
                  </div>
                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-success text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-float">
                    Open Access Ready
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" className="w-full">
              <path
                d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="#FAFAFA"
              />
            </svg>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-bgAlabaster">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <p className="text-3xl lg:text-5xl font-black text-primary">
                    {stat.value}
                  </p>
                  <p className="text-textMuted text-sm mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Publications */}
        <section className="py-20 bg-bgCream">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
              <div className="animate-slide-up">
                <h2 className="text-3xl font-black text-primary mb-2">
                  منشورات مميزة
                </h2>
                <p className="text-textMuted">
                  اكتشف أحدث الإصدارات الأكاديمية من أفضل الجامعات العربية
                </p>
              </div>
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 text-primary hover:text-accent font-semibold transition-colors animate-slide-up"
                style={{ animationDelay: '0.1s' }}
              >
                عرض الكل
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPublications.map((pub, index) => (
                <Link
                  key={pub.id}
                  href={`/books/${pub.id}`}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-elegant overflow-hidden hover-lift animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-48 relative overflow-hidden bg-slate-100">
                    <img
                      src={pub.image}
                      alt={pub.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                          pub.access === 'open'
                            ? 'bg-success text-white'
                            : 'bg-accent text-primary'
                        }`}
                      >
                        {pub.access === 'open' ? 'وصول حر' : 'مرخص'}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                      {pub.category}
                    </span>
                    <h3 className="font-bold text-primary mt-1 mb-2 line-clamp-2">
                      {pub.title}
                    </h3>
                    <p className="text-xs text-textMuted">{pub.author}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-bgAlabaster">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-3xl lg:text-4xl font-black text-primary mb-4">
                مميزات المنصة
              </h2>
              <p className="text-textMuted max-w-2xl mx-auto">
                تقنيات حديثة تُمكّن الباحثين والمؤسسات من إنتاج ونشر المعرفة بكفاءة
                عالية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-slate-200 shadow-elegant hover-lift animate-slide-up group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-accent/10 text-accent p-4 rounded-xl w-fit mb-6 group-hover:bg-accent group-hover:text-primary transition-colors">
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

        {/* Role-Based Access */}
        <section className="py-20 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 hero-pattern opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />

          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-3xl lg:text-4xl font-black mb-4">
                واجهات مخصصة لكل دور
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                تجربة مستخدم مصممة بعناية لتناسب احتياجات كل فئة من مستخدمي المنصة
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  icon: Shield,
                  title: 'مدير المنصة',
                  desc: 'إدارة شاملة للنظام والمستخدمين',
                },
                {
                  icon: Building2,
                  title: 'مدير المؤسسة',
                  desc: 'تقارير وإحصائيات مؤسسية',
                },
                {
                  icon: GraduationCap,
                  title: 'الأستاذ الأكاديمي',
                  desc: 'إدارة قوائم القراءة والفصول',
                },
                {
                  icon: Users,
                  title: 'الطالب',
                  desc: 'قراءة ذكية مع أدوات مساعدة',
                },
                {
                  icon: PenTool,
                  title: 'المحرر',
                  desc: 'استوديو رقمنة وتحرير متقدم',
                },
              ].map((role, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all animate-slide-up group hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-accent/20 text-accent p-4 rounded-xl w-fit mx-auto mb-4 group-hover:bg-accent group-hover:text-primary transition-colors">
                    <role.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold mb-2">{role.title}</h3>
                  <p className="text-white/60 text-xs">{role.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted Institutions */}
        <section className="py-16 bg-bgCream">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-slide-up">
              <p className="text-textMuted text-sm uppercase tracking-wider font-semibold mb-4">
                موثوق من قبل
              </p>
              <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                أعرق الجامعات العربية
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-8 lg:gap-12 animate-slide-up">
              {institutions.map((inst, index) => (
                <div
                  key={index}
                  className="bg-white px-8 py-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-elegant transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <University className="w-6 h-6 text-accent" />
                    <span className="font-semibold text-primary text-sm">
                      {inst}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-bgAlabaster">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-3xl overflow-hidden shadow-elegant-lg relative animate-scale-in">
              <div className="absolute inset-0 hero-pattern opacity-20" />
              <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl" />

              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-16">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">
                    انضم إلى مجتمع الباحثين
                  </h2>
                  <p className="text-white/70 text-lg leading-relaxed mb-8">
                    سجل الآن واحصل على وصول فوري لآلاف المنشورات الأكاديمية، وأدوات
                    القراءة الذكية، وإمكانية حفظ المحتوى للقراءة دون اتصال.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'وصول فوري للمحتوى المفتوح',
                      'تطبيق ويب تقدمي (PWA)',
                      'بحث دلالي ذكي',
                      'مزامنة عبر جميع الأجهزة',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/80">
                        <Check className="w-5 h-5 text-accent flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/register"
                      className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
                    >
                      سجل مجاناً
                      <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all border border-white/20"
                    >
                      تسجيل الدخول
                    </Link>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex -space-x-2 space-x-reverse">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-10 h-10 rounded-full bg-accent/30 border-2 border-primary flex items-center justify-center text-xs font-bold"
                          >
                            {['أ', 'د', 'م', 'ف'][i - 1]}
                          </div>
                        ))}
                      </div>
                      <span className="text-white/60 text-sm">
                        +2.3M مستخدم نشط
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-accent" />
                          <span className="text-xs font-bold text-white/80">
                            تقييم المستخدمين
                          </span>
                        </div>
                        <p className="text-2xl font-black text-white">4.9/5</p>
                        <p className="text-xs text-white/60">من 12,450 تقييم</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <p className="text-accent text-2xl font-black">850+</p>
                          <p className="text-xs text-white/60">جامعة شريكة</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <p className="text-accent text-2xl font-black">12K+</p>
                          <p className="text-xs text-white/60">منشور أكاديمي</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
