'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  ArrowLeft,
  BookOpen,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', name: 'كل التصنيفات', count: 1250 },
  { id: 'history', name: 'التاريخ والآداب', count: 245 },
  { id: 'languages', name: 'اللغة والأدب', count: 180 },
  { id: 'science', name: 'العلوم والتقنية', count: 156 },
  { id: 'economics', name: 'الاقتصاد والأعمال', count: 120 },
  { id: 'law', name: 'القانون والسياسة', count: 98 },
];

const books = [
  {
    id: '1',
    title: 'تاريخ البحرين الحديث والمعاصر',
    author: 'قسم التاريخ - جامعة البحرين',
    category: 'history',
    price: null,
    rating: 4.8,
    reviews: 156,
    image: 'https://images.pexels.com/photos/590009/pexels-photo-590009.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    title: 'مناهج البحث في العلوم الإنسانية',
    author: 'د. أحمد المناعي',
    category: 'history',
    price: 25,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.pexels.com/photos/5053760/pexels-photo-5053760.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    title: 'اللغة العربية وعلومها',
    author: 'د. فاطمة الجشي',
    category: 'languages',
    price: null,
    rating: 4.9,
    reviews: 203,
    image: 'https://images.pexels.com/photos/7683866/pexels-photo-7683866.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '4',
    title: 'التحولات الاقتصادية في الخليج',
    author: 'د. عبدالله خالد',
    category: 'economics',
    price: null,
    rating: 4.5,
    reviews: 67,
    image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '5',
    title: 'مقدمة في الفلسفة الإسلامية',
    author: 'د. محمود الراشد',
    category: 'history',
    price: 30,
    rating: 4.7,
    reviews: 112,
    image: 'https://images.pexels.com/photos/6947410/pexels-photo-6947410.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '6',
    title: 'علم الاجتماع المعاصر',
    author: 'د. نورة الحمد',
    category: 'science',
    price: null,
    rating: 4.4,
    reviews: 45,
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');

  const filteredBooks =
    selectedCategory === 'all'
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-bgCream">
        {/* Hero Search */}
        <section className="bg-primary text-white py-12 relative overflow-hidden">
          <div className="absolute inset-0 hero-pattern opacity-20" />
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl font-black mb-4">المكتبة الرقمية</h1>
              <p className="text-white/70 mb-6">
                ابحث في أكثر من 12,000 منشور أكاديمي عربي
              </p>

              <div className="bg-white p-2 rounded-xl flex items-center gap-2 shadow-lg">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-bgCream text-primary text-sm font-bold rounded-lg px-3 py-2 border-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث بالعنوان أو المؤلف..."
                  className="flex-grow border-none focus:ring-0 text-sm text-primary placeholder-slate-400"
                />
                <button className="bg-accent text-primary px-6 py-2 rounded-lg font-bold text-sm hover:bg-accent/90 transition-colors flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  <span>ابحث</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 shrink-0">
              <div className="bg-white rounded-xl border border-slate-200 shadow-elegant p-5 sticky top-28">
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-accent" />
                  التصفية
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-textMuted mb-2">
                      التصنيف
                    </label>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={cn(
                            'w-full text-right px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between',
                            selectedCategory === cat.id
                              ? 'bg-primary text-white'
                              : 'bg-bgCream text-primary hover:bg-slate-100'
                          )}
                        >
                          <span>{cat.name}</span>
                          <span
                            className={cn(
                              'text-xs font-bold',
                              selectedCategory === cat.id
                                ? 'text-white/70'
                                : 'text-textMuted'
                            )}
                          >
                            {cat.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-textMuted mb-2">
                      نوع الوصول
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="accent-accent rounded" />
                        <span className="text-sm text-primary">وصول حر (OA)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="accent-accent rounded" />
                        <span className="text-sm text-primary">مرخص</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-textMuted">
                  عرض {filteredBooks.length} من {books.length} منشور
                </p>

                <div className="flex items-center gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg text-xs font-semibold text-primary px-3 py-2"
                  >
                    <option value="popular">الأكثر شعبية</option>
                    <option value="newest">الأحدث</option>
                    <option value="rating">الأعلى تقييماً</option>
                  </select>

                  <div className="flex bg-white border border-slate-200 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={cn(
                        'p-1.5 rounded transition-colors',
                        viewMode === 'grid'
                          ? 'bg-primary text-white'
                          : 'text-slate-400 hover:text-primary'
                      )}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={cn(
                        'p-1.5 rounded transition-colors',
                        viewMode === 'list'
                          ? 'bg-primary text-white'
                          : 'text-slate-400 hover:text-primary'
                      )}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Books Grid */}
              <div className={cn('grid gap-6', viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1')}>
                {filteredBooks.map((book, index) => (
                  <Link
                    key={book.id}
                    href={`/books/${book.id}`}
                    className={cn(
                      'bg-white rounded-xl border border-slate-200 shadow-elegant overflow-hidden group hover:border-accent hover:shadow-elegant-lg transition-all',
                      viewMode === 'grid' ? '' : 'flex items-center gap-4 p-4'
                    )}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {viewMode === 'grid' ? (
                      <>
                        <div className="h-48 relative overflow-hidden">
                          <img
                            src={book.image}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3">
                            <span
                              className={cn(
                                'text-[10px] font-bold px-2 py-1 rounded-full',
                                book.price
                                  ? 'bg-accent text-primary'
                                  : 'bg-success text-white'
                              )}
                            >
                              {book.price ? `${book.price} د.ك` : 'وصول حر'}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-sm text-primary group-hover:text-accent transition-colors mb-1 line-clamp-2">
                            {book.title}
                          </h3>
                          <p className="text-xs text-textMuted mb-3">{book.author}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-accent fill-accent" />
                              <span className="text-xs font-bold text-primary">{book.rating}</span>
                              <span className="text-xs text-textMuted">({book.reviews})</span>
                            </div>
                            <ArrowLeft className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-20 h-28 shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={book.image}
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="font-bold text-sm text-primary group-hover:text-accent transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-xs text-textMuted">{book.author}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-accent fill-accent" />
                              <span className="text-xs font-bold text-primary">{book.rating}</span>
                            </div>
                            <span
                              className={cn(
                                'text-[10px] font-bold px-2 py-0.5 rounded-full',
                                book.price
                                  ? 'bg-accent text-primary'
                                  : 'bg-success text-white'
                              )}
                            >
                              {book.price ? `${book.price} د.ك` : 'وصول حر'}
                            </span>
                          </div>
                        </div>
                        <ArrowLeft className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
