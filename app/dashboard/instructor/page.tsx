'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Users,
  BarChart3,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Link2,
  Copy,
  CheckCircle2,
  Search,
  Plus,
  X,
  LogOut,
  Calendar,
  BookMarked,
  Home,
  Settings,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Eye,
  UserCheck,
  UserX,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ==========================================================================
   INSTRUCTOR DASHBOARD - DATA CONSTANTS
   ========================================================================== */

const courseSections = [
  { id: '1', code: 'HIST120', name: 'تاريخ الخليج الحديث', section: '01', students: 45 },
  { id: '2', code: 'HIST120', name: 'تاريخ الخليج الحديث', section: '02', students: 42 },
  { id: '3', code: 'HUM310', name: 'المنهجية البحثية', section: '01', students: 28 },
  { id: '4', code: 'HIST210', name: 'الحضارة الإسلامية', section: '01', students: 55 },
];

const readingLists = [
  { id: '1', name: 'قائمة التاريخ - الفصل الأول', course: 'HIST120', items: 5, assigned: ['1', '2'] },
  { id: '2', name: 'قائمة المنهجية البحثية', course: 'HUM310', items: 3, assigned: ['3'] },
  { id: '3', name: 'قراءات إثرائية - حضارة إسلامية', course: 'HIST210', items: 8, assigned: [] },
];

const analyticsData = {
  totalMinutes: 12450,
  avgCoverage: 68,
  peakHours: ['8:00 م', '11:00 م'],
  weeklyTrend: [
    { day: 'السبت', value: 85 },
    { day: 'الأحد', value: 92 },
    { day: 'الاثنين', value: 78 },
    { day: 'الثلاثاء', value: 110 },
    { day: 'الأربعاء', value: 95 },
    { day: 'الخميس', value: 65 },
    { day: 'الجمعة', value: 45 },
  ],
  topBooks: [
    { title: 'تاريخ البحرين الحديث', reads: 156, avgTime: '45 دقيقة' },
    { title: 'مناهج البحث', reads: 98, avgTime: '38 دقيقة' },
    { title: 'اللغة العربية وعلومها', reads: 67, avgTime: '52 دقيقة' },
  ],
};

const entitlementAlerts = [
  { id: '1', type: 'warning', message: 'يتبقى 15 مقعداً فقط لترخيص كتاب "جغرافية الخليج"', action: 'تواصل مع المكتبة' },
  { id: '2', type: 'danger', message: 'ينتهي ترخيص "التحليل الإحصائي المتقدم" خلال 3 أيام', action: 'تجديد الترخيص' },
];

/* --- COHORT PROGRESS TRACKING DATA --- */
const cohortProgressData = [
  {
    sectionId: '1',
    code: 'HIST120-S01',
    totalStudents: 45,
    activeStudents: 38,
    avgCompletion: 72,
    streakDays: 5,
    lastActivity: 'منذ ساعتين',
    topPerformers: ['أحمد محمد', 'فاطمة علي', 'خالد حسن'],
    struggling: 4,
  },
  {
    sectionId: '2',
    code: 'HIST120-S02',
    totalStudents: 42,
    activeStudents: 29,
    avgCompletion: 54,
    streakDays: 2,
    lastActivity: 'منذ 5 ساعات',
    topPerformers: ['مريم خالد', 'عبدالله سعيد'],
    struggling: 8,
  },
  {
    sectionId: '3',
    code: 'HUM310-S01',
    totalStudents: 28,
    activeStudents: 26,
    avgCompletion: 89,
    streakDays: 12,
    lastActivity: 'منذ 30 دقيقة',
    topPerformers: ['سارة أحمد', 'محمد جاسم', 'نورة خالد'],
    struggling: 1,
  },
];

/* ==========================================================================
   INSTRUCTOR DASHBOARD - MAIN COMPONENT
   ========================================================================== */

export default function InstructorDashboard() {
  const router = useRouter();
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const [copiedLti, setCopiedLti] = useState(false);
  const [showLtiModal, setShowLtiModal] = useState(false);
  const [ltiConfig, setLtiConfig] = useState({ course: '', section: '', list: '' });
  const [expandedCohort, setExpandedCohort] = useState<string | null>(null);

  const handleLogout = () => {
    router.push('/login');
  };

  const copyLtiLink = () => {
    setCopiedLti(true);
    setTimeout(() => setCopiedLti(false), 2000);
  };

  const generateLtiLink = () => {
    // Simulate LTI link generation
    setShowLtiModal(true);
  };

  const toggleCohort = (sectionId: string) => {
    setExpandedCohort(prev => prev === sectionId ? null : sectionId);
  };

  const maxWeekly = Math.max(...analyticsData.weeklyTrend.map(d => d.value));

  return (
    <div className="min-h-screen bg-bgAlabaster">
      {/* ==========================================================================
          HEADER COMPONENT
          ========================================================================== */}
      <header className="bg-primary/95 backdrop-blur-md text-white sticky top-0 z-50 border-b-4 border-accent shadow-elegant">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Link href="/" className="bg-accent text-primary p-2.5 rounded-lg shadow-lg hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-xl font-bold tracking-wide">كنوفيرا</h1>
                <p className="text-[10px] text-accent/80 uppercase tracking-wider">
                  لوحة الأستاذ الأكاديمي
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-accent/20 text-accent px-4 py-2 rounded-lg border border-accent/30">
                <BookMarked className="w-5 h-5 ml-2" />
                <span className="font-bold text-sm">أ.د. عبدالله المناعي</span>
              </div>

              <Link
                href="/"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">البوابة</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-rose-500/80 hover:bg-rose-500 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">خروج</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8 animate-slide-up">
          <h2 className="text-2xl lg:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-l from-primary to-primary/70">
            لوحة قيادة الهيئة الأكاديمية
          </h2>
          <p className="text-sm text-textMuted mt-1">
            متابعة تفاعل الطلبة، إدارة قوائم القراءة، وتفعيل روابط التعلم المدمج (LTI)
          </p>
        </div>

        {/* ==========================================================================
            ANALYTICS CARDS SECTION
            ========================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Clock}
            label="إجمالي ساعات القراءة"
            value={`${analyticsData.totalMinutes.toLocaleString()}`}
            unit="دقيقة"
            trend="+14% نمو"
            trendType="success"
            delay={0}
          />
          <StatCard
            icon={BarChart3}
            label="متوسط تغطية الصفحات"
            value={`${analyticsData.avgCoverage}`}
            unit="%"
            badge="معيار COUNTER"
            delay={1}
          />
          <StatCard
            icon={Users}
            label="الطلاب النشطون"
            value="170"
            unit="طالب"
            delay={2}
          />
          <StatCard
            icon={TrendingUp}
            label="أوقات الذروة"
            value={analyticsData.peakHours.join(' - ')}
            isText
            delay={3}
          />
        </div>

        {/* ==========================================================================
            COHORT PROGRESS TRACKING SECTION
            ========================================================================== */}
        <section className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-primary border-r-4 border-accent pr-3 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-accent" />
              تتبع تقدم مجموعات الطلاب
            </h3>
            <button className="text-xs text-primary hover:text-accent font-semibold transition-colors">
              تحديث البيانات
              <RefreshCw className="w-3 h-3 mr-1 inline" />
            </button>
          </div>

          <div className="space-y-4">
            {cohortProgressData.map((cohort, index) => (
              <div
                key={cohort.sectionId}
                className="bg-white rounded-xl border border-slate-200 shadow-elegant overflow-hidden animate-slide-up hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Cohort Header */}
                <button
                  onClick={() => toggleCohort(cohort.sectionId)}
                  className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      cohort.avgCompletion >= 70 ? 'bg-success/10 text-success' :
                      cohort.avgCompletion >= 50 ? 'bg-warning/10 text-warning' :
                      'bg-danger/10 text-danger'
                    )}>
                      <span className="text-lg font-black">{cohort.avgCompletion}%</span>
                    </div>
                    <div className="text-right">
                      <h4 className="font-bold text-primary">{cohort.code}</h4>
                      <p className="text-xs text-textMuted">
                        {cohort.activeStudents}/{cohort.totalStudents} طالب نشط • آخر نشاط: {cohort.lastActivity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Streak Badge */}
                    {cohort.streakDays >= 5 && (
                      <div className="hidden sm:flex items-center gap-2 bg-accent/10 px-3 py-1.5 rounded-full">
                        <TrendingUp className="w-4 h-4 text-accent" />
                        <span className="text-xs font-bold text-accent">{cohort.streakDays} أيام متتالية</span>
                      </div>
                    )}

                    {/* Struggling Indicator */}
                    {cohort.struggling > 0 && (
                      <div className="flex items-center gap-2 bg-danger/10 px-3 py-1.5 rounded-full">
                        <UserX className="w-4 h-4 text-danger" />
                        <span className="text-xs font-bold text-danger">{cohort.struggling} يحتاجون انتباه</span>
                      </div>
                    )}

                    {expandedCohort === cohort.sectionId ? (
                      <ChevronUp className="w-5 h-5 text-textMuted" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-textMuted" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {expandedCohort === cohort.sectionId && (
                  <div className="p-4 bg-bgCream border-t border-slate-200 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Completion Progress */}
                      <div>
                        <h5 className="text-xs font-bold text-textMuted mb-3">نسبة إكمال القوائم القرائية</h5>
                        <div className="bg-white p-4 rounded-lg border border-slate-200">
                          <div className="flex justify-between text-xs mb-2">
                            <span>التقدم الكلي</span>
                            <span className={cn(
                              'font-bold',
                              cohort.avgCompletion >= 70 ? 'text-success' :
                              cohort.avgCompletion >= 50 ? 'text-warning' : 'text-danger'
                            )}>
                              {cohort.avgCompletion}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                            <div
                              className={cn(
                                'h-3 rounded-full transition-all duration-1000',
                                cohort.avgCompletion >= 70 ? 'bg-success' :
                                cohort.avgCompletion >= 50 ? 'bg-warning' : 'bg-danger'
                              )}
                              style={{ width: `${cohort.avgCompletion}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Top Performers */}
                      <div>
                        <h5 className="text-xs font-bold text-textMuted mb-3">الطلاب المتميزون</h5>
                        <div className="space-y-2">
                          {cohort.topPerformers.map((name, i) => (
                            <div key={i} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200">
                              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                                {i + 1}
                              </div>
                              <span className="text-xs font-semibold text-primary">{name}</span>
                              <CheckCircle2 className="w-4 h-4 text-success mr-auto" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div>
                        <h5 className="text-xs font-bold text-textMuted mb-3">إجراءات سريعة</h5>
                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              setLtiConfig({ course: cohort.code.split('-')[0], section: cohort.sectionId, list: '' });
                              generateLtiLink();
                            }}
                            className="w-full flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors"
                          >
                            <Link2 className="w-4 h-4" />
                            توليد رابط LTI
                          </button>
                          <button className="w-full flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold text-primary hover:border-accent transition-colors">
                            <Eye className="w-4 h-4" />
                            عرض التفاصيل الكاملة
                          </button>
                          <button className="w-full flex items-center gap-2 bg-danger/10 border border-danger/20 px-4 py-2 rounded-lg text-xs font-bold text-danger hover:bg-danger/20 transition-colors">
                            <UserX className="w-4 h-4" />
                            متابعة الطلاب المتعثرين ({cohort.struggling})
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* ==========================================================================
                READING LIST BUILDER
                ========================================================================== */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-elegant overflow-hidden animate-slide-up">
              <div className="p-5 border-b border-slate-100 bg-bgCream flex justify-between items-center">
                <h3 className="font-bold text-primary flex items-center gap-2">
                  <BookMarked className="w-5 h-5 text-accent" />
                  بناء قوائم القراءة
                </h3>
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors flex items-center gap-2 hover:scale-105">
                  <Plus className="w-4 h-4" />
                  <span>قائمة جديدة</span>
                </button>
              </div>

              <div className="p-5">
                <div className="relative mb-4">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="ابحث في مستودع الجامعة لإضافة كتاب..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 pr-10 text-sm focus:border-accent transition-colors"
                  />
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 bg-bgAlabaster min-h-[200px] space-y-2">
                  {readingLists.map((list) => (
                    <div
                      key={list.id}
                      className="bg-white border border-slate-200 p-3 rounded-lg flex items-center justify-between shadow-sm hover:border-accent transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 bg-primary rounded flex items-center justify-center text-white text-xs">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-primary">{list.name}</h5>
                          <p className="text-[10px] text-textMuted">
                            {list.items} عناصر • {list.assigned.length > 0 ? 'مُعينة' : 'غير مُعينة'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedList(list.id);
                            setShowAssignModal(true);
                          }}
                          className={cn(
                            'px-3 py-1.5 rounded text-xs font-bold transition-all hover:scale-105',
                            list.assigned.length > 0
                              ? 'bg-success/10 text-success hover:bg-success/20'
                              : 'bg-primary text-white hover:bg-primary/90'
                          )}
                        >
                          {list.assigned.length > 0 ? 'تعديل' : 'تعيين'}
                        </button>
                        <button className="text-textMuted hover:text-danger p-1.5 rounded transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ==========================================================================
                USAGE ANALYTICS DASHBOARD
                ========================================================================== */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-elegant overflow-hidden animate-slide-up">
              <div className="p-5 border-b border-slate-100 bg-bgCream flex justify-between items-center">
                <h3 className="font-bold text-primary flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  تحليلات الاستخدام هذا الأسبوع
                </h3>
                <select className="bg-white border border-slate-200 rounded-lg text-xs font-semibold text-primary px-3 py-1.5 focus:border-accent cursor-pointer">
                  <option>هذا الأسبوع</option>
                  <option>الشهر الماضي</option>
                  <option>الفصل الدراسي</option>
                </select>
              </div>

              <div className="p-5">
                {/* Bar Chart */}
                <div className="flex items-end justify-between h-40 gap-2 mb-4">
                  {analyticsData.weeklyTrend.map((day, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-accent/20 rounded-t-lg relative group transition-all hover:bg-accent/30"
                        style={{ height: `${(day.value / maxWeekly) * 100}%` }}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-accent rounded-t-lg transition-all"
                          style={{ height: '100%' }}
                        />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {day.value} دقيقة
                        </div>
                      </div>
                      <span className="text-[10px] text-textMuted font-medium">{day.day}</span>
                    </div>
                  ))}
                </div>

                {/* Top Books */}
                <div className="border-t border-slate-100 pt-4">
                  <h4 className="text-xs font-bold text-textMuted mb-3">أكثر الكتب قراءة</h4>
                  <div className="space-y-3">
                    {analyticsData.topBooks.map((book, index) => (
                      <div key={index} className="flex items-center justify-between bg-bgCream rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-sm font-semibold text-primary">{book.title}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-textMuted">
                            <span className="font-bold text-accent">{book.reads}</span> قراءة
                          </span>
                          <span className="text-textMuted">متوسط: {book.avgTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ==========================================================================
                LTI INTEGRATION HUB
                ========================================================================== */}
            <div className="bg-primary text-white rounded-xl shadow-elegant overflow-hidden relative animate-slide-up">
              <div className="absolute top-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
              <div className="p-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="md:w-1/2 space-y-2">
                  <span className="bg-accent text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    تكامل LTI 1.3
                  </span>
                  <h3 className="text-lg font-bold">ربط مباشر مع Blackboard و Moodle</h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    قم بتوليد روابط ذكية للمقررات لإدراجها في أنظمة إدارة التعلم
                  </p>
                </div>
                <div className="md:w-1/2 w-full">
                  <button
                    onClick={generateLtiLink}
                    className="w-full bg-accent text-primary py-3 rounded-xl font-bold text-sm hover:bg-accent/90 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <Link2 className="w-4 h-4" />
                    توليد رابط LTI جديد
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================================================
              SIDEBAR
              ========================================================================== */}
          <div className="lg:col-span-1 space-y-6">

            {/* Cohort Assignment Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-elegant overflow-hidden animate-slide-up">
              <div className="bg-primary p-4 text-white">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  تعيين المجموعات
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                  <thead className="bg-slate-50 text-textMuted text-xs uppercase">
                    <tr>
                      <th className="py-3 px-4 font-bold">المقرر</th>
                      <th className="py-3 px-4 font-bold">الحالة</th>
                      <th className="py-3 px-4 font-bold text-center">إجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {courseSections.map((section) => (
                      <tr key={section.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-bold text-primary">{section.code}</span>
                          <span className="text-textMuted"> - Sec {section.section}</span>
                          <span className="block text-[10px] text-textMuted mt-0.5">
                            {section.students} طالب
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {section.id === '2' || section.id === '4' ? (
                            <span className="text-warning font-semibold">غير مُعينة</span>
                          ) : (
                            <span className="text-success font-semibold">مُعينة</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button className="text-textMuted hover:text-primary transition-colors">
                            <BookMarked className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Entitlement Alerts */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-elegant overflow-hidden animate-slide-up">
              <div className="bg-primary p-4 text-white">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  تنبيهات التراخيص
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {entitlementAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      'p-3 rounded-l border-r-4',
                      alert.type === 'warning'
                        ? 'bg-warning/10 border-warning'
                        : 'bg-danger/10 border-danger'
                    )}
                  >
                    <p className="text-[11px] text-textPrimary leading-relaxed">
                      {alert.message}
                    </p>
                    <button
                      className={cn(
                        'mt-2 text-[10px] font-bold',
                        alert.type === 'warning' ? 'text-warning' : 'text-danger'
                      )}
                    >
                      {alert.action} ←
                    </button>
                  </div>
                ))}

                <div className="bg-success/5 border border-success/20 p-3 rounded flex items-center justify-between">
                  <span className="text-xs font-bold text-success">المصادر المفتوحة (OA)</span>
                  <span className="text-[10px] bg-success text-white px-2 py-0.5 rounded-full">
                    غير محدود
                  </span>
                </div>
              </div>
            </div>

            {/* Semester Selector */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-elegant p-5 animate-slide-up">
              <h4 className="font-bold text-sm text-primary mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                الفصل الدراسي
              </h4>
              <select className="w-full bg-bgCream border border-slate-200 rounded-lg p-3 text-sm font-bold text-primary focus:border-accent cursor-pointer">
                <option>خريف 2026</option>
                <option>ربيع 2026</option>
                <option>صيف 2025</option>
              </select>
            </div>
          </div>
        </div>
      </main>

      {/* ==========================================================================
          ASSIGNMENT MODAL
          ========================================================================== */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-scale-in">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-primary">تعيين القائمة للمجموعات</h3>
              <button
                onClick={() => setShowAssignModal(false)}
                className="p-1 hover:bg-slate-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-textMuted" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              {courseSections.map((section) => (
                <label
                  key={section.id}
                  className="flex items-center justify-between p-3 bg-bgCream rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div>
                    <span className="font-semibold text-sm text-primary">
                      {section.code} - Sec {section.section}
                    </span>
                    <span className="text-[10px] text-textMuted block">
                      {section.students} طالب
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-accent rounded"
                    defaultChecked={section.id !== '2' && section.id !== '4'}
                  />
                </label>
              ))}
            </div>
            <div className="p-5 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 py-3 border border-slate-200 rounded-lg font-semibold text-sm text-textMuted hover:bg-slate-50 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 py-3 bg-accent text-primary rounded-lg font-bold text-sm hover:bg-accent/90 transition-colors"
              >
                حفظ التعيين
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
          LTI LINK MODAL
          ========================================================================== */}
      {showLtiModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl animate-scale-in">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-primary rounded-t-2xl">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Link2 className="w-5 h-5 text-accent" />
                توليد رابط LTI للتكامل
              </h3>
              <button
                onClick={() => setShowLtiModal(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-textMuted mb-1">المقرر</label>
                <select className="w-full bg-bgCream border border-slate-200 rounded-lg p-2.5 text-sm font-bold text-primary focus:border-accent">
                  <option>HIST120 - تاريخ الخليج الحديث</option>
                  <option>HUM310 - المنهجية البحثية</option>
                  <option>HIST210 - الحضارة الإسلامية</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-textMuted mb-1">المجموعة</label>
                <select className="w-full bg-bgCream border border-slate-200 rounded-lg p-2.5 text-sm font-bold text-primary focus:border-accent">
                  <option>Section 01</option>
                  <option>Section 02</option>
                  <option>جميع المجموعات</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-textMuted mb-1">قائمة القراءة</label>
                <select className="w-full bg-bgCream border border-slate-200 rounded-lg p-2.5 text-sm font-bold text-primary focus:border-accent">
                  <option>قائمة التاريخ - الفصل الأول</option>
                  <option>قائمة المنهجية البحثية</option>
                </select>
              </div>

              <div className="bg-primary rounded-lg p-4">
                <label className="block text-[10px] text-accent font-bold mb-2">الرابط المولد</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value="https://knovera.uob.edu.bh/lti/launch?res=hist120_s01_list1"
                    className="flex-grow bg-black/30 border border-white/10 rounded p-2 text-xs text-accent font-mono"
                  />
                  <button
                    onClick={copyLtiLink}
                    className={cn(
                      'px-3 py-2 rounded text-xs font-bold transition-all flex items-center gap-1',
                      copiedLti
                        ? 'bg-success text-white'
                        : 'bg-accent text-primary hover:bg-accent/90'
                    )}
                  >
                    {copiedLti ? <><CheckCircle2 className="w-3 h-3" /> تم</> : <>نسخ <Copy className="w-3 h-3" /></>}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-800">
                <p><strong>تعليمات:</strong> انسخ هذا الرابط وأضفه في Blackboard أو Moodle كأداة LTI خارجية.</p>
              </div>
            </div>
            <div className="p-5 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => setShowLtiModal(false)}
                className="flex-1 py-3 border border-slate-200 rounded-lg font-semibold text-sm text-textMuted hover:bg-slate-50 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={() => setShowLtiModal(false)}
                className="flex-1 py-3 bg-accent text-primary rounded-lg font-bold text-sm hover:bg-accent/90 transition-colors"
              >
                تم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   SUB-COMPONENTS
   ========================================================================== */

function StatCard({ icon: Icon, label, value, unit, trend, trendType, badge, isText, delay }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  unit?: string;
  trend?: string;
  trendType?: 'success' | 'warning' | 'danger';
  badge?: string;
  isText?: boolean;
  delay: number;
}) {
  return (
    <div
      className="bg-white rounded-xl p-5 border border-slate-200 shadow-elegant hover-lift animate-slide-up"
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className={cn(
          'p-2.5 rounded-lg',
          trendType === 'success' ? 'bg-success/10 text-success' :
          trendType === 'warning' ? 'bg-warning/10 text-warning' :
          trendType === 'danger' ? 'bg-danger/10 text-danger' :
          'bg-accent/20 text-accent'
        )}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={cn(
            'text-[10px] font-bold px-2 py-1 rounded',
            trendType === 'success' ? 'bg-success/10 text-success' :
            trendType === 'warning' ? 'bg-warning/10 text-warning' :
            'bg-danger/10 text-danger'
          )}>
            {trend}
          </span>
        )}
        {badge && (
          <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded">
            {badge}
          </span>
        )}
      </div>
      <p className="text-xs text-textMuted font-bold">{label}</p>
      {isText ? (
        <h3 className="text-lg font-bold text-primary mt-1 flex items-center gap-2">{value}</h3>
      ) : (
        <h3 className="text-2xl font-black text-primary mt-1">
          {value}
          {unit && <span className="text-sm font-normal text-textMuted mr-1">{unit}</span>}
        </h3>
      )}
    </div>
  );
}
