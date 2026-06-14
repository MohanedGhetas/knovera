'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Search,
  CloudDownload,
  Sparkles,
  Play,
  BookmarkPlus,
  Grid3X3,
  List,
  CheckCircle2,
  LogOut,
  GraduationCap,
  Clock,
  Bookmark,
  History,
  Wifi,
  WifiOff,
  RefreshCw,
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ==========================================================================
   STUDENT DASHBOARD - DATA CONSTANTS
   ========================================================================== */

const entitledBooks = [
  {
    id: '1',
    title: 'تاريخ البحرين الحديث والمعاصر',
    author: 'قسم التاريخ - جامعة البحرين',
    progress: 65,
    category: 'تاريخ',
    access: 'open',
    lastRead: 'منذ ساعتين',
  },
  {
    id: '2',
    title: 'مناهج البحث في العلوم الإنسانية',
    author: 'د. أحمد المناعي',
    progress: 42,
    category: 'منهجية',
    access: 'licensed',
    lastRead: 'منذ يوم',
  },
  {
    id: '3',
    title: 'اللغة العربية وعلومها',
    author: 'د. فاطمة الجشي',
    progress: 88,
    category: 'لغويات',
    access: 'open',
    lastRead: 'منذ 3 ساعات',
  },
  {
    id: '4',
    title: 'التحولات الاقتصادية في الخليج',
    author: 'د. عبدالله خالد',
    progress: 12,
    category: 'اقتصاد',
    access: 'licensed',
    lastRead: 'منذ أسبوع',
  },
  {
    id: '5',
    title: 'مقدمة في الفلسفة الإسلامية',
    author: 'د. محمود الراشد',
    progress: 100,
    category: 'فلسفة',
    access: 'open',
    lastRead: 'مكتمل',
  },
  {
    id: '6',
    title: 'علم الاجتماع المعاصر',
    author: 'د. نورة الحمد',
    progress: 55,
    category: 'اجتماع',
    access: 'open',
    lastRead: 'منذ 5 ساعات',
  },
];

const smartSuggestions = [
  {
    id: '1',
    title: 'مقال: التجارة الإقليمية في القرن العشرين',
    type: 'مقال',
    relevance: 94,
    reason: 'يتقاطع مع الفصل الثاني من كتاب التاريخ',
  },
  {
    id: '2',
    title: 'بحث: منهجية التحليل اللغوي',
    type: 'بحث',
    relevance: 87,
    reason: 'مصادر إضافية لمقرر اللغة العربية',
  },
  {
    id: '3',
    title: 'دراسة: الاقتصاد الخليجي المعاصر',
    type: 'دراسة',
    relevance: 82,
    reason: 'مرتبط بموضوع بحثك الأخير',
  },
];

const recentBookmarks = [
  {
    id: '1',
    title: 'الفصل الثاني: التحولات الاقتصادية',
    book: 'تاريخ البحرين الحديث',
    page: 45,
    timestamp: 'منذ ساعتين',
    highlight: 'وكانت من أبرز أسباب التطور الاقتصادي...',
  },
  {
    id: '2',
    title: 'منهجية البحث الكيفي',
    book: 'مناهج البحث',
    page: 112,
    timestamp: 'أمس',
    highlight: 'يتميز البحث الكيفي بالقدرة على استكشاف...',
  },
  {
    id: '3',
    title: 'مقدمة في علم الدلالة',
    book: 'اللغة العربية وعلومها',
    page: 8,
    timestamp: 'منذ 3 أيام',
    highlight: 'علم الدلالة يبحث في العلاقة بين اللفظ والمعنى...',
  },
];

const readingHistory = [
  {
    id: '1',
    title: 'تاريخ البحرين الحديث',
    date: 'اليوم',
    duration: '45 دقيقة',
    pagesRead: 23,
  },
  {
    id: '2',
    title: 'اللغة العربية وعلومها',
    date: 'أمس',
    duration: '32 دقيقة',
    pagesRead: 15,
  },
  {
    id: '3',
    title: 'مناهج البحث',
    date: 'قبل يومين',
    duration: '28 دقيقة',
    pagesRead: 12,
  },
];

/* ==========================================================================
   STUDENT DASHBOARD - MAIN COMPONENT
   ========================================================================== */

export default function StudentDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [downloadedBooks, setDownloadedBooks] = useState<string[]>(['1', '3', '5']);
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history'>('bookmarks');
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleLogout = () => {
    router.push('/login');
  };

  const toggleDownload = (bookId: string) => {
    setDownloadedBooks((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const filteredBooks =
    selectedCategory === 'all'
      ? entitledBooks
      : entitledBooks.filter((book) => book.category === selectedCategory);

  return (
    <div className="min-h-screen bg-bgAlabaster">
      {/* ==========================================================================
          HEADER COMPONENT
          ========================================================================== */}
      <header className="bg-primary/95 backdrop-blur-md text-white sticky top-0 z-50 border-b-4 border-accent shadow-elegant transition-all duration-300">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Link href="/" className="bg-accent text-primary p-2.5 rounded-lg shadow-lg hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-xl font-bold tracking-wide">كنوفيرا</h1>
                <p className="text-[10px] text-accent/80 uppercase tracking-wider">
                  لوحة الطالب
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Connection Status Indicator */}
              <div className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold',
                isOnline ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
              )}>
                {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                <span>{isOnline ? 'متصل' : 'غير متصل'}</span>
              </div>

              <div className="hidden md:flex items-center bg-accent/20 text-accent px-4 py-2 rounded-lg border border-accent/30">
                <GraduationCap className="w-5 h-5 ml-2" />
                <span className="font-bold text-sm">أحمد محمد</span>
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

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* ==========================================================================
            SEMANTIC SEARCH HERO SECTION
            ========================================================================== */}
        <section className="bg-primary rounded-2xl shadow-elegant relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 hero-pattern opacity-30" />
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />

          <div className="relative z-10 p-8 lg:p-12">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent text-xs font-bold px-4 py-1.5 rounded-full border border-accent/30 animate-slide-up">
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>محرك البحث الدلالي الذكي</span>
              </div>

              <h2 className="text-2xl lg:text-3xl font-black text-white animate-slide-up stagger-1">
                ابحث في أعماق المراجع الأكاديمية
              </h2>
              <p className="text-white/70 text-sm lg:text-base animate-slide-up stagger-2">
                اكتب مصطلحاً أو سؤالاً وسيتم تحويلك مباشرة للفقرة المعنية
              </p>

              <div className="bg-white p-2 rounded-xl flex items-center gap-3 shadow-lg mt-6 animate-scale-in">
                <select className="bg-bgCream text-primary text-xs font-bold rounded-lg px-3 py-2 border-none focus:ring-0 cursor-pointer">
                  <option>كل التخصصات</option>
                  <option>التاريخ والآداب</option>
                  <option>اللغة العربية</option>
                  <option>الاقتصاد</option>
                </select>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="مثال: أسباب الثورة الصناعية، خوارزميات الفرز..."
                  className="flex-grow border-none focus:ring-0 text-sm py-2 px-2 text-primary placeholder-slate-400"
                />

                <button className="bg-accent hover:bg-accent/90 text-primary px-6 py-2.5 rounded-lg font-bold text-sm transition-all hover:scale-105 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  <span>ابحث</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            RECENT BOOKMARKS & READING HISTORY SECTION
            ========================================================================== */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-elegant overflow-hidden animate-slide-up">
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={cn(
                'flex-1 px-6 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all',
                activeTab === 'bookmarks'
                  ? 'bg-primary text-white'
                  : 'text-textMuted hover:text-primary hover:bg-slate-50'
              )}
            >
              <Bookmark className="w-4 h-4" />
              <span>العلامات الأخيرة</span>
              <span className="bg-accent/20 text-accent text-[10px] px-2 py-0.5 rounded-full">
                {recentBookmarks.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={cn(
                'flex-1 px-6 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all',
                activeTab === 'history'
                  ? 'bg-primary text-white'
                  : 'text-textMuted hover:text-primary hover:bg-slate-50'
              )}
            >
              <History className="w-4 h-4" />
              <span>سجل القراءة</span>
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'bookmarks' ? (
              <div className="space-y-4">
                {recentBookmarks.map((bookmark, index) => (
                  <div
                    key={bookmark.id}
                    className="group p-4 bg-bgCream rounded-xl border border-slate-100 hover:border-accent hover:shadow-elegant transition-all cursor-pointer animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <Bookmark className="w-4 h-4 text-accent" />
                          <h4 className="font-bold text-sm text-primary group-hover:text-accent transition-colors">
                            {bookmark.title}
                          </h4>
                        </div>
                        <p className="text-xs text-textMuted mb-2">
                          {bookmark.book} • صفحة {bookmark.page}
                        </p>
                        <p className="text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-200 font-amiri leading-relaxed">
                          &quot;{bookmark.highlight}&quot;
                        </p>
                      </div>
                      <div className="text-left shrink-0">
                        <span className="text-[10px] text-textMuted">{bookmark.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {readingHistory.map((session, index) => (
                  <div
                    key={session.id}
                    className="p-4 bg-bgCream rounded-xl border border-slate-100 hover:border-accent hover:shadow-elegant transition-all animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="text-xs text-textMuted">{session.date}</span>
                    </div>
                    <h4 className="font-bold text-sm text-primary mb-2 line-clamp-1">{session.title}</h4>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-textMuted">{session.duration}</span>
                      <span className="bg-accent/10 text-accent font-bold px-2 py-0.5 rounded-full">
                        {session.pagesRead} صفحة
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ==========================================================================
            MAIN GRID LAYOUT
            ========================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* ==========================================================================
              SIDEBAR - PWA STATUS & AI SUGGESTIONS
              ========================================================================== */}
          <div className="lg:col-span-1 space-y-6">

            {/* --- PWA OFFLINE SYNC STATUS MODULE --- */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-elegant overflow-hidden animate-slide-up hover-lift">
              <div className="bg-gradient-to-l from-primary to-primary/80 p-4 text-white">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm flex items-center gap-2">
                    <CloudDownload className="w-5 h-5" />
                    <span>مزامنة القراءة (PWA)</span>
                  </h4>
                  <button
                    onClick={handleSync}
                    className={cn(
                      'p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all',
                      isSyncing && 'animate-spin'
                    )}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                {/* Storage Indicator */}
                <div className="mb-4 p-3 bg-bgCream rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-primary">التخزين المحلي</span>
                    <span className="text-xs text-textMuted">4.2 MB / 50 MB</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full w-[8%]" />
                  </div>
                </div>

                {/* Downloaded Books */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-textMuted mb-2">الكتب المحملة ({downloadedBooks.length})</p>
                  {downloadedBooks.slice(0, 3).map((id) => {
                    const book = entitledBooks.find((b) => b.id === id);
                    if (!book) return null;
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between p-2 bg-success/5 border border-success/20 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          <span className="text-xs font-semibold text-primary truncate max-w-[140px]">
                            {book.title.split(' ').slice(0, 3).join(' ')}...
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* --- AI SMART SUGGESTIONS MODULE --- */}
            <div className="bg-gradient-to-br from-primary to-slate-900 rounded-xl shadow-elegant p-5 text-white animate-slide-up hover-lift relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-float" />

              <span className="text-[10px] text-accent font-bold tracking-wider uppercase mb-1 block relative z-10 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                توصيات الذكاء الاصطناعي
              </span>
              <h4 className="font-bold text-sm mb-4 relative z-10">مقترحات مرتبطة بمقرراتك</h4>

              <div className="space-y-3 relative z-10">
                {smartSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    className="w-full bg-white/10 border border-white/10 rounded-lg p-3 text-right hover:bg-white/20 hover:border-accent/50 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-accent font-bold">{suggestion.type}</span>
                      <div className="flex items-center gap-1">
                        <div className="w-12 bg-white/20 rounded-full h-1">
                          <div
                            className="bg-accent h-1 rounded-full"
                            style={{ width: `${suggestion.relevance}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-white/50">{suggestion.relevance}%</span>
                      </div>
                    </div>
                    <h5 className="text-xs font-semibold group-hover:text-accent transition-colors truncate">
                      {suggestion.title}
                    </h5>
                    <p className="text-[10px] text-white/50 mt-1 line-clamp-1">{suggestion.reason}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ==========================================================================
              MAIN CONTENT - MY ENTITLED TITLES
              ========================================================================== */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 animate-slide-up">
              <div>
                <h3 className="font-bold text-xl text-primary border-r-4 border-accent pr-3">
                  الرف الرقمي الخاص بك
                </h3>
                <p className="text-sm text-textMuted mt-1">
                  {entitledBooks.length} منشور متاح للقراءة
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-slate-200 rounded-lg text-xs font-semibold text-primary px-3 py-2 focus:border-accent cursor-pointer hover:border-accent/50 transition-colors"
                >
                  <option value="all">كل التصنيفات</option>
                  <option value="تاريخ">تاريخ</option>
                  <option value="لغويات">لغويات</option>
                  <option value="اقتصاد">اقتصاد</option>
                  <option value="منهجية">منهجية</option>
                  <option value="فلسفة">فلسفة</option>
                </select>

                <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-1.5 rounded transition-all',
                      viewMode === 'grid'
                        ? 'bg-primary text-white shadow'
                        : 'text-slate-400 hover:text-primary'
                    )}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-1.5 rounded transition-all',
                      viewMode === 'list'
                        ? 'bg-primary text-white shadow'
                        : 'text-slate-400 hover:text-primary'
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Books Grid/List - Modular Rendering */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBooks.map((book, index) => (
                  <BookCardGrid
                    key={book.id}
                    book={book}
                    index={index}
                    downloadedBooks={downloadedBooks}
                    toggleDownload={toggleDownload}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBooks.map((book, index) => (
                  <BookCardList
                    key={book.id}
                    book={book}
                    index={index}
                    downloadedBooks={downloadedBooks}
                    toggleDownload={toggleDownload}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ==========================================================================
   SUB-COMPONENTS - BOOK CARDS
   ========================================================================== */

function BookCardGrid({ book, index, downloadedBooks, toggleDownload }: {
  book: typeof entitledBooks[0];
  index: number;
  downloadedBooks: string[];
  toggleDownload: (id: string) => void;
}) {
  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-elegant overflow-hidden group hover:border-accent hover:shadow-elegant-lg transition-all duration-500 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="h-36 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <BookOpen className="w-12 h-12 text-accent/50 group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-3 right-3">
          <span
            className={cn(
              'text-[10px] font-bold px-2 py-0.5 rounded-full',
              book.access === 'open' ? 'bg-success text-white' : 'bg-accent text-primary'
            )}
          >
            {book.access === 'open' ? 'وصول حر' : 'مرخص'}
          </span>
        </div>
        {book.progress === 100 && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] bg-success/20 text-success px-2 py-0.5 rounded-full font-bold">
              مكتمل
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
          {book.category}
        </span>
        <h4 className="font-bold text-sm text-primary mt-1 mb-1 line-clamp-2 group-hover:text-accent transition-colors">
          {book.title}
        </h4>
        <p className="text-[11px] text-textMuted mb-3">{book.author}</p>

        <div className="mb-4">
          <div className="flex justify-between items-center text-[10px] font-bold mb-1">
            <span className="text-textMuted">نسبة القراءة</span>
            <span className={book.progress === 100 ? 'text-success' : 'text-primary'}>
              {book.progress}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={cn(
                'h-1.5 rounded-full transition-all duration-1000',
                book.progress === 100 ? 'bg-success' : 'bg-accent'
              )}
              style={{ width: `${book.progress}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/reader/${book.id}`}
            className="flex-grow bg-primary text-white hover:bg-primary/90 py-2 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-2 group-hover:bg-accent group-hover:text-primary"
          >
            <Play className="w-3 h-3" />
            {book.progress > 0 && book.progress < 100 ? 'متابعة' : 'ابدأ القراءة'}
          </Link>
          <button
            onClick={() => toggleDownload(book.id)}
            className={cn(
              'p-2 rounded-lg border transition-all hover:scale-105',
              downloadedBooks.includes(book.id)
                ? 'bg-success/10 border-success text-success'
                : 'border-slate-200 text-slate-400 hover:border-accent hover:text-accent'
            )}
            title={downloadedBooks.includes(book.id) ? 'تم التنزيل' : 'تنزيل للقراءة بدون اتصال'}
          >
            <CloudDownload className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:border-accent hover:text-accent transition-all hover:scale-105">
            <BookmarkPlus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function BookCardList({ book, index, downloadedBooks, toggleDownload }: {
  book: typeof entitledBooks[0];
  index: number;
  downloadedBooks: string[];
  toggleDownload: (id: string) => void;
}) {
  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-elegant p-4 flex items-center gap-4 hover:border-accent hover:shadow-elegant-lg transition-all animate-slide-up group"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="w-16 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shrink-0">
        <BookOpen className="w-6 h-6 text-accent/50" />
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold text-accent uppercase">{book.category}</span>
          <span
            className={cn(
              'text-[10px] font-bold px-2 py-0.5 rounded-full',
              book.access === 'open' ? 'bg-success/10 text-success' : 'bg-accent/10 text-primary'
            )}
          >
            {book.access === 'open' ? 'وصول حر' : 'مرخص'}
          </span>
        </div>
        <h4 className="font-bold text-sm text-primary group-hover:text-accent transition-colors">
          {book.title}
        </h4>
        <p className="text-[11px] text-textMuted">{book.author}</p>
      </div>

      <div className="hidden sm:block w-32">
        <div className="flex justify-between items-center text-[10px] font-bold mb-1">
          <span className="text-textMuted">التقدم</span>
          <span className={book.progress === 100 ? 'text-success' : 'text-primary'}>{book.progress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className={cn('h-1.5 rounded-full', book.progress === 100 ? 'bg-success' : 'bg-accent')}
            style={{ width: `${book.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/reader/${book.id}`}
          className="bg-primary text-white hover:bg-accent hover:text-primary px-4 py-2 rounded-lg font-bold text-xs transition-all flex items-center gap-2"
        >
          <Play className="w-3 h-3" />
          <span className="hidden sm:inline">
            {book.progress > 0 && book.progress < 100 ? 'متابعة' : 'قراءة'}
          </span>
        </Link>
        <button
          onClick={() => toggleDownload(book.id)}
          className={cn(
            'p-2 rounded-lg border transition-all',
            downloadedBooks.includes(book.id)
              ? 'bg-success/10 border-success text-success'
              : 'border-slate-200 text-slate-400 hover:border-accent hover:text-accent'
          )}
        >
          <CloudDownload className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
