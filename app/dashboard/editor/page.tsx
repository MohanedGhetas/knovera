'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Wand2,
  Tags,
  CheckCircle2,
  Clock,
  LogOut,
  PenTool,
  FileStack,
  GitBranch,
  Shield,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  History,
  Save,
  X,
  Flag,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ==========================================================================
   DATA: Pipeline Stages for Kanban Board
   ========================================================================== */
const pipelineStages = [
  { id: 'intake', name: 'الاستلام', count: 12, color: 'bg-slate-400' },
  { id: 'ocr', name: 'التدقيق & AI', count: 8, color: 'bg-accent', active: true },
  { id: 'metadata', name: 'الفهرسة', count: 5, color: 'bg-primary' },
  { id: 'approval', name: 'الاعتماد', count: 3, color: 'bg-warning' },
  { id: 'published', name: 'منشور', count: 45, color: 'bg-success' },
];

/* ==========================================================================
   DATA: OCR Queue Documents
   ========================================================================== */
const ocrQueue = [
  {
    id: '1',
    title: 'مخطوطات التاريخ الإسلامي',
    status: 'ocr_processing',
    confidence: 78,
    pages: 245,
    errors: 12,
    warnings: 34,
  },
  {
    id: '2',
    title: 'الشعر العربي المعاصر',
    status: 'review_needed',
    confidence: 65,
    pages: 180,
    errors: 28,
    warnings: 56,
  },
  {
    id: '3',
    title: 'القانون الدولي الإنساني',
    status: 'approved',
    confidence: 94,
    pages: 320,
    errors: 2,
    warnings: 8,
  },
];

/* ==========================================================================
   DATA: Version History for Lineage Tracking
   ========================================================================== */
const versionHistory = [
  {
    id: 'v3.2',
    name: 'مصادقة الناشر',
    status: 'current',
    date: 'اليوم 14:30',
    changes: 'اعتماد النسخة النهائية للنشر',
    author: 'م. سارة الخالد',
  },
  {
    id: 'v3.1',
    name: 'مراجعة المحرر',
    status: 'approved',
    date: 'أمس 10:15',
    changes: 'تصحيح توثيق الهوامش والإحالات',
    author: 'م. أحمد الفهد',
  },
  {
    id: 'v3.0',
    name: 'تصفية AI',
    status: 'approved',
    date: 'قبل 3 أيام',
    changes: 'إكمال معالجة OCR التلقائية',
    author: 'نظام AI',
  },
  {
    id: 'v2.5',
    name: 'تدقيق أولي',
    status: 'archived',
    date: 'قبل 5 أيام',
    changes: 'مراجعة الصفحات 1-100',
    author: 'م. سارة الخالد',
  },
  {
    id: 'v2.0',
    name: 'معالجة مسبقة',
    status: 'archived',
    date: 'قبل أسبوع',
    changes: 'تحسين جودة الصور وتقويم الزوايا',
    author: 'نظام AI',
  },
  {
    id: 'v1.0',
    name: 'الرفع الأولي',
    status: 'archived',
    date: 'قبل 10 أيام',
    changes: 'رفع الملفات الممسوحة ضوئياً',
    author: 'د. محمد العتيبي',
  },
];

/* ==========================================================================
   DATA: Quality Assurance Checklist Items
   ========================================================================== */
const qualityChecklist = [
  { id: 'rtl', label: 'مطابقة اتجاه RTL للصفحات', category: 'بنية', checked: true, priority: 'normal' },
  { id: 'fonts', label: 'سلامة الخطوط الأكاديمية (Amiri)', category: 'بنية', checked: true, priority: 'normal' },
  { id: 'footnotes', label: 'استخراج وتدقيق الهوامش السفلية', category: 'محتوى', checked: false, priority: 'high' },
  { id: 'alt', label: 'دقة تحويل الصور إلى نصوص بديلة (Alt)', category: 'إمكانية الوصول', checked: false, priority: 'critical' },
  { id: 'toc', label: 'فحص جدول المحتويات والفهرس', category: 'بنية', checked: true, priority: 'normal' },
  { id: 'refs', label: 'التحقق من صياغة المراجع والاقباسات', category: 'محتوى', checked: false, priority: 'high' },
  { id: 'meta', label: 'اكتمال البيانات الوصفية DC/MARC', category: 'فهرسة', checked: true, priority: 'normal' },
  { id: 'license', label: 'تعيين ترخيص المشاع الإبداعي', category: 'قانوني', checked: false, priority: 'critical' },
];

/* ==========================================================================
   DATA: Creative Commons License Options
   ========================================================================== */
const ccLicenses = [
  { id: 'CC-BY', name: 'نسب المصنف (BY 4.0)', short: 'BY' },
  { id: 'CC-BY-NC', name: 'نسب المصنف - غير تجاري (BY-NC 4.0)', short: 'BY-NC', default: true },
  { id: 'CC-BY-ND', name: 'نسب المصنف - بلا اشتقاق (BY-ND 4.0)', short: 'BY-ND' },
  { id: 'CC-BY-SA', name: 'نسب المصنف - نفس الإذن (BY-SA 4.0)', short: 'BY-SA' },
];

/* ==========================================================================
   COMPONENT: StatCard - Displays statistics in the header
   ========================================================================== */
function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string | number; color: string }) {
  return (
    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg">
      <Icon className={cn('w-4 h-4', color)} />
      <span className="text-xs text-white/70">{label}:</span>
      <span className="text-xs font-bold text-white">{value}</span>
    </div>
  );
}

/* ==========================================================================
   COMPONENT: VersionNode - Single node in version history tree
   ========================================================================== */
function VersionNode({ version, isLast }: { version: typeof versionHistory[0]; isLast: boolean }) {
  const statusColors = {
    current: 'bg-accent border-accent',
    approved: 'bg-success border-success',
    archived: 'bg-slate-300 border-slate-300',
  };

  return (
    <div className="relative pr-6 pb-4">
      {/* Connection Line */}
      {!isLast && <div className="absolute right-[11px] top-4 bottom-0 w-0.5 bg-slate-200" />}

      {/* Status Dot */}
      <div
        className={cn(
          'absolute right-0 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center',
          statusColors[version.status as keyof typeof statusColors]
        )}
      >
        {version.status === 'current' && <Flag className="w-3 h-3 text-primary" />}
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg p-3 border border-slate-200 hover:border-accent/50 transition-colors">
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-xs font-bold text-accent">{version.id}</span>
          <span
            className={cn(
              'text-[10px] font-bold px-2 py-0.5 rounded-full',
              version.status === 'current'
                ? 'bg-accent text-primary'
                : version.status === 'approved'
                  ? 'bg-success/10 text-success'
                  : 'bg-slate-100 text-slate-500'
            )}
          >
            {version.status === 'current' ? 'الحالي' : version.status === 'approved' ? 'معتمد' : 'أرشيف'}
          </span>
        </div>
        <h4 className="font-bold text-sm text-primary mb-1">{version.name}</h4>
        <p className="text-[10px] text-textMuted mb-2">{version.changes}</p>
        <div className="flex items-center justify-between text-[9px] text-slate-400">
          <span>{version.author}</span>
          <span>{version.date}</span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   COMPONENT: ChecklistItem - Single QA checklist item
   ========================================================================== */
function ChecklistItem({
  item,
  onToggle,
}: {
  item: typeof qualityChecklist[0];
  onToggle: (id: string) => void;
}) {
  const priorityStyles = {
    critical: 'bg-danger/10 border-danger/30',
    high: 'bg-warning/10 border-warning/30',
    normal: 'bg-white border-slate-200',
  };

  return (
    <label
      className={cn(
        'flex items-start gap-3 cursor-pointer p-3 rounded-lg border transition-all hover:shadow-sm',
        item.checked ? 'bg-success/5 border-success/30' : priorityStyles[item.priority as keyof typeof priorityStyles]
      )}
    >
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onToggle(item.id)}
        className="w-4 h-4 mt-0.5 accent-success rounded"
      />
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={cn(
              'text-xs font-medium',
              item.checked ? 'text-success line-through' : 'text-textPrimary'
            )}
          >
            {item.label}
          </span>
          {item.priority === 'critical' && !item.checked && (
            <span className="text-[9px] font-bold bg-danger text-white px-1.5 py-0.5 rounded">حرج</span>
          )}
        </div>
        <span className="text-[10px] text-textMuted">{item.category}</span>
      </div>
      {item.checked && <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />}
    </label>
  );
}

/* ==========================================================================
   COMPONENT: PipelineStage - Single stage in Kanban pipeline
   ========================================================================== */
function PipelineStage({
  stage,
  isActive,
  onClick,
}: {
  stage: typeof pipelineStages[0];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-2 w-28 cursor-pointer z-10 transition-all',
        isActive ? 'scale-110' : 'opacity-70 hover:opacity-100'
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-lg transition-all',
          isActive
            ? 'bg-accent text-primary ring-4 ring-accent/30'
            : 'bg-slate-100 text-slate-600',
          stage.id === 'published' && 'bg-success text-white'
        )}
      >
        {isActive ? <Wand2 className="w-5 h-5 animate-pulse" /> : stage.count}
      </div>
      <span
        className={cn(
          'text-[11px] font-bold text-center',
          isActive ? 'text-primary' : 'text-slate-500'
        )}
      >
        {stage.name}
      </span>
      {isActive && <span className="text-[9px] text-accent font-bold">نشط حالياً</span>}
    </div>
  );
}

/* ==========================================================================
   MAIN COMPONENT: Editor Dashboard
   ========================================================================== */
export default function EditorDashboard() {
  const router = useRouter();
  const [selectedDocument, setSelectedDocument] = useState(ocrQueue[0]);
  const [activeStage, setActiveStage] = useState('ocr');
  const [selectedCC, setSelectedCC] = useState('CC-BY-NC');
  const [checklist, setChecklist] = useState(qualityChecklist);
  const [showVersionModal, setShowVersionModal] = useState(false);

  /* -----------------------------------------------------------------------
     HANDLERS
     ----------------------------------------------------------------------- */
  const handleLogout = () => {
    router.push('/login');
  };

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const completedChecks = checklist.filter((item) => item.checked).length;
  const totalChecks = checklist.length;
  const criticalItems = checklist.filter((item) => item.priority === 'critical' && !item.checked);

  /* ==========================================================================
     RENDER
     ========================================================================== */
  return (
    <div className="min-h-screen bg-bgAlabaster">
      {/* =====================================================================
          HEADER: Editor Dashboard Header with Stats
          ===================================================================== */}
      <header className="bg-primary/95 backdrop-blur-md text-white sticky top-0 z-50 border-b-4 border-accent shadow-elegant">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Branding */}
            <Link href="/" className="flex items-center gap-4 group">
              <div className="bg-accent text-primary p-2.5 rounded-lg shadow-lg group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-wide">كنوفيرا</h1>
                <p className="text-[10px] text-accent/80 uppercase tracking-wider">
                  استوديو الناشر
                </p>
              </div>
            </Link>

            {/* Stats Row */}
            <div className="hidden md:flex items-center gap-3">
              <StatCard icon={FileStack} label="قيد المعالجة" value={8} color="text-accent" />
              <StatCard icon={CheckCircle2} label="مكتمل اليوم" value={12} color="text-success" />
              <StatCard icon={Clock} label="متوسط الثقة" value="87%" color="text-white" />
            </div>

            {/* User & Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-accent/20 text-accent px-4 py-2 rounded-lg border border-accent/30">
                <PenTool className="w-5 h-5 ml-2" />
                <span className="font-bold text-sm">م. سارة الخالد</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>خروج</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* =================================================================
            PAGE TITLE & BREADCRUMB
            ================================================================= */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center gap-2 text-xs text-textMuted mb-2">
            <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <ArrowLeft className="w-3 h-3" />
            <span className="text-primary font-semibold">استوديو الرقمنة</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-l from-primary to-primary/70">
            استوديو الرقمنة والنشر
          </h2>
          <p className="text-sm text-textMuted mt-1">
            إدارة خطوط الإنتاج، تدقيق النصوص عبر الذكاء الاصطناعي، وتعيين تراخيص المشاع الإبداعي
          </p>
        </div>

        {/* =================================================================
            KANBAN PIPELINE: Production Stages
            ================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-elegant p-6 mb-8 animate-slide-up overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-primary">خط إنتاج المحتوى</h3>
            <span className="text-xs text-textMuted">اضغط على المرحلة للانتقال إليها</span>
          </div>

          <div className="flex items-center justify-between min-w-[700px] relative">
            {/* Connector Line */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-100 -translate-y-1/2" />

            {pipelineStages.map((stage) => (
              <PipelineStage
                key={stage.id}
                stage={stage}
                isActive={activeStage === stage.id}
                onClick={() => setActiveStage(stage.id)}
              />
            ))}
          </div>
        </div>

        {/* =================================================================
            MAIN WORKSPACE: 3 Column Layout
            ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* -----------------------------------------------------------------
              LEFT SIDEBAR: QA Checklist & Version History
              ----------------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-6">

            {/* QA CHECKLIST PANEL */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-elegant overflow-hidden animate-slide-up">
              {/* Checklist Header */}
              <div className="bg-gradient-to-l from-primary to-primary/90 px-5 py-4 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <h4 className="font-bold">بوابة ضمان الجودة</h4>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {completedChecks}/{totalChecks}
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-500"
                    style={{ width: `${(completedChecks / totalChecks) * 100}%` }}
                  />
                </div>
                {criticalItems.length > 0 && (
                  <div className="flex items-center gap-2 mt-3 text-danger text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{criticalItems.length} عناصر حرجة تنتظر المعالجة</span>
                  </div>
                )}
              </div>

              {/* Checklist Items */}
              <div className="p-4 space-y-2">
                {checklist.map((item) => (
                  <ChecklistItem key={item.id} item={item} onToggle={toggleCheck} />
                ))}
              </div>

              {/* Checklist Footer */}
              <div className="px-4 pb-4">
                <button className="w-full text-xs font-bold text-primary bg-accent/10 hover:bg-accent/20 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  حفظ حالة التدقيق
                </button>
              </div>
            </div>

            {/* VERSION HISTORY / LINEAGE TRACKING */}
            <div className="bg-bgCream rounded-xl border border-slate-200 shadow-elegant overflow-hidden animate-slide-up">
              {/* Version Header */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-accent" />
                  <h4 className="font-bold text-primary text-sm">شجرة الإصدارات</h4>
                </div>
                <button
                  onClick={() => setShowVersionModal(true)}
                  className="text-[10px] font-bold text-accent hover:text-primary transition-colors"
                >
                  عرض الكل
                </button>
              </div>

              {/* Version Tree (Showing first 4) */}
              <div className="p-4">
                {versionHistory.slice(0, 4).map((version, index) => (
                  <div key={version.id} className={cn('relative pr-4 pb-3', index === 3 && 'pb-0')}>
                    {/* Connection Line */}
                    {index < 3 && (
                      <div className="absolute right-[7px] top-4 bottom-0 w-0.5 bg-slate-200" />
                    )}

                    {/* Version Dot */}
                    <div
                      className={cn(
                        'absolute right-0 top-1 w-4 h-4 rounded-full border-2 border-bgCream',
                        version.status === 'current' ? 'bg-accent' : 'bg-slate-300'
                      )}
                    />

                    <h5
                      className={cn(
                        'font-bold text-sm mb-0.5',
                        version.status === 'current' ? 'text-primary' : 'text-textMuted'
                      )}
                    >
                      {version.id} {version.name}
                    </h5>
                    <p className="text-[10px] text-textMuted">{version.changes}</p>
                    <span className="text-[9px] text-slate-400">{version.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              CENTER & RIGHT: Main Workspace
              ----------------------------------------------------------------- */}
          <div className="lg:col-span-9 space-y-6">

            {/* SPLIT-PANE OCR & EDITOR */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-elegant overflow-hidden animate-slide-up">
              {/* Studio Header */}
              <div className="bg-primary px-5 py-4 flex justify-between items-center text-white">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <FileStack className="w-5 h-5 text-accent" />
                  استوديو المعالجة
                </h3>
                <div className="flex gap-2">
                  <button className="text-[10px] font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors border border-white/20 flex items-center gap-1">
                    <Wand2 className="w-3 h-3" />
                    توليد نسخة مبسطة (AI)
                  </button>
                  <button className="text-[10px] font-bold bg-accent text-primary hover:bg-accent/90 px-3 py-1.5 rounded transition-colors flex items-center gap-1">
                    <Save className="w-3 h-3" />
                    حفظ التغييرات
                  </button>
                </div>
              </div>

              {/* Split View */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                {/* OCR View - Left */}
                <div className="p-5 bg-slate-50 relative min-h-[300px]">
                  <span className="absolute top-3 left-3 text-[9px] font-bold text-slate-400 bg-white px-2 py-1 rounded shadow-sm">
                    صورة المصدر الممسوحة
                  </span>
                  <div className="bg-white border border-slate-200 w-full h-full p-6 mt-4 font-amiri text-lg text-justify text-slate-400 relative shadow-sm min-h-[200px]">
                    <div className="relative inline">
                      محركات
                      <div className="absolute -inset-1 border-2 border-danger bg-danger/10 rounded cursor-pointer hover:border-success hover:bg-success/20 transition-colors" />
                    </div>
                    {' '}لغوية متطورة تستطيع التمييز بين المعاني{' '}
                    <div className="relative inline">
                      المتباينة
                      <div className="absolute -inset-1 border-2 border-warning bg-warning/10 rounded cursor-pointer hover:border-success hover:bg-success/20 transition-colors" />
                    </div>
                    {' '}في السياق العربي المعقد.
                  </div>
                </div>

                {/* Editor View - Right */}
                <div className="p-5 bg-white flex flex-col">
                  <span className="text-[9px] font-bold text-primary mb-2 block uppercase">
                    محرر النصوص الذكي
                  </span>
                  <div
                    className="flex-grow border border-slate-200 rounded p-4 font-amiri text-lg leading-loose text-textPrimary outline-none focus-within:ring-2 focus-within:ring-accent/50 min-h-[200px]"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    إن التحليل الدقيق للنصوص يتطلب{' '}
                    <del className="bg-red-100 text-red-800 px-1 rounded">محراكات</del>{' '}
                    <ins className="bg-green-100 text-green-800 px-1 rounded">محركات</ins>{' '}
                    لغوية متطورة تستطيع التمييز بين المعاني{' '}
                    <del className="bg-red-100 text-red-800 px-1 rounded">المتباينة</del>{' '}
                    <ins className="bg-green-100 text-green-800 px-1 rounded">المتعددة</ins>{' '}
                    في السياق العربي المعقد.
                  </div>
                  <div className="mt-3 flex justify-between items-center bg-blue-50 text-blue-800 p-2 rounded text-[10px] border border-blue-100">
                    <span>
                      <Wand2 className="w-3 h-3 inline ml-1" />
                      اكتشاف AI: خطأ إملائي + استبدال مرادف
                    </span>
                    <div className="flex gap-1">
                      <button className="bg-white border border-blue-200 px-2 py-0.5 rounded hover:bg-blue-100 font-bold">
                        قبول
                      </button>
                      <button className="bg-white border border-red-200 text-red-600 px-2 py-0.5 rounded hover:bg-red-50">
                        رفض
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* OCR QUEUE */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-elegant overflow-hidden animate-slide-up">
              <div className="p-5 border-b border-slate-100 bg-bgCream flex justify-between items-center">
                <h3 className="font-bold text-primary flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  قائمة انتظار OCR
                </h3>
                <span className="text-xs text-textMuted">{ocrQueue.length} مستندات</span>
              </div>

              <div className="divide-y divide-slate-100">
                {ocrQueue.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocument(doc)}
                    className={cn(
                      'w-full p-4 flex items-center justify-between text-right hover:bg-slate-50 transition-colors',
                      selectedDocument.id === doc.id && 'bg-accent/5 border-r-4 border-accent'
                    )}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-primary">{doc.title}</h4>
                      <p className="text-[10px] text-textMuted mt-0.5">
                        {doc.pages} صفحة • ثقة: {doc.confidence}%
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {doc.errors > 0 && (
                        <span className="text-[10px] text-danger bg-danger/10 px-2 py-1 rounded font-bold">
                          {doc.errors} أخطاء
                        </span>
                      )}
                      {doc.warnings > 0 && (
                        <span className="text-[10px] text-warning bg-warning/10 px-2 py-1 rounded font-bold">
                          {doc.warnings} تحذيرات
                        </span>
                      )}
                      <span
                        className={cn(
                          'text-[10px] font-bold px-3 py-1 rounded-full',
                          doc.status === 'approved'
                            ? 'bg-success text-white'
                            : doc.status === 'review_needed'
                              ? 'bg-warning text-white'
                              : 'bg-accent/20 text-primary'
                        )}
                      >
                        {doc.status === 'approved'
                          ? 'معتمد'
                          : doc.status === 'review_needed'
                            ? 'يحتاج مراجعة'
                            : 'قيد المعالجة'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* METADATA & LICENSING */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-elegant p-6 animate-slide-up">
              <div className="border-b border-slate-100 pb-3 mb-5 flex items-center justify-between">
                <h3 className="font-bold text-primary flex items-center gap-2">
                  <Tags className="w-5 h-5 text-accent" />
                  الفهرسة والتراخيص
                </h3>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded font-mono">
                  Dublin Core / MARC21
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Metadata Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-textMuted mb-1">
                      DC.Title (عربي / إنجليزي)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value="أصول البحث اللغوي"
                        className="w-1/2 bg-bgAlabaster border border-slate-200 rounded p-2 text-sm focus:border-primary"
                      />
                      <input
                        type="text"
                        value="Principles of Linguistic Research"
                        dir="ltr"
                        className="w-1/2 bg-bgAlabaster border border-slate-200 rounded p-2 text-sm text-left focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-textMuted mb-1">
                      DC.Creator / المؤلف
                    </label>
                    <input
                      type="text"
                      value="د. محمد السعيد - كلية الآداب"
                      className="w-full bg-bgAlabaster border border-slate-200 rounded p-2 text-sm focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-textMuted mb-1">
                      LCC Subject / التصنيف
                    </label>
                    <select className="w-full bg-bgAlabaster border border-slate-200 rounded p-2 text-sm focus:border-primary cursor-pointer">
                      <option>PJ - اللغات الشرقية وآدابها</option>
                      <option>QA - الرياضيات</option>
                      <option>HB - الاقتصاد</option>
                    </select>
                  </div>
                </div>

                {/* Creative Commons */}
                <div className="border-t md:border-t-0 md:border-r border-slate-100 pt-4 md:pt-0 md:pr-6 space-y-4">
                  <div>
                    <label className="block font-bold text-sm text-primary mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-accent" />
                      ترخيص المشاع الإبداعي
                    </label>
                    <select
                      value={selectedCC}
                      onChange={(e) => setSelectedCC(e.target.value)}
                      className="w-full bg-white border-2 border-accent/50 rounded-lg p-2.5 text-xs font-bold text-primary focus:border-accent cursor-pointer shadow-sm"
                    >
                      {ccLicenses.map((license) => (
                        <option key={license.id} value={license.id}>
                          {license.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-primary rounded-lg p-4 text-white shadow-inner">
                    <span className="text-[9px] text-accent uppercase tracking-widest mb-1 block">
                      معاينة الإسناد
                    </span>
                    <p className="text-[11px] leading-relaxed font-mono">
                      &quot;أصول البحث اللغوي&quot; بواسطة د. محمد السعيد. مرخص بموجب رخصة
                      المشاع الإبداعي {ccLicenses.find((l) => l.id === selectedCC)?.short} 4.0 دولي.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-accent text-lg">
                      <span className="font-bold">CC</span>
                      <span>BY</span>
                      {selectedCC.includes('NC') && <span>NC</span>}
                      {selectedCC.includes('ND') && <span>ND</span>}
                      {selectedCC.includes('SA') && <span>SA</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* =====================================================================
          MODAL: Full Version History
          ===================================================================== */}
      {showVersionModal && (
        <div className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="bg-primary px-6 py-5 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <GitBranch className="w-6 h-6 text-accent" />
                <div>
                  <h3 className="font-bold text-lg">سجل الإصدارات الكامل</h3>
                  <p className="text-[11px] text-white/70">تاريخ النسخ والتحديثات</p>
                </div>
              </div>
              <button
                onClick={() => setShowVersionModal(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - Version Timeline */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {versionHistory.map((version, index) => (
                <VersionNode
                  key={version.id}
                  version={version}
                  isLast={index === versionHistory.length - 1}
                />
              ))}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
              <span className="text-xs text-textMuted">
                {versionHistory.length} إصدارات مسجلة
              </span>
              <button
                onClick={() => setShowVersionModal(false)}
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
