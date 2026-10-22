import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  LayoutGrid,
  List,
  Star,
  Tag,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { CategoryId, PROPERTIES, PropertyItem, SubcategoryId } from '../data/catalogData';
import {
  DEFAULT_FILTERS,
  FilterState,
  filterAndSortProperties,
  SortOption,
  formatEGP,
} from '../utils/catalogLogic';
import { PropertyCard } from '../components/PropertyCard';

interface ShopPageProps {
  initialSearchQuery?: string;
  onNavigate: (path: string) => void;
  onAddToCart: (item: PropertyItem) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialSearchQuery = '',
  onNavigate,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    searchQuery: initialSearchQuery,
  });
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const results = filterAndSortProperties(PROPERTIES, filters);

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleRadioFilter = (
    type: 'all' | 'category' | 'subcategory',
    val: string
  ) => {
    if (type === 'all') {
      setFilters((prev) => ({ ...prev, category: 'all', subcategory: 'all' }));
    } else if (type === 'category') {
      setFilters((prev) => ({
        ...prev,
        category: val as CategoryId,
        subcategory: 'all',
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        category: 'all',
        subcategory: val as SubcategoryId,
      }));
    }
  };

  return (
    <div>
      {/* High-Contrast Dark Header with Search Bar */}
      <section className="bg-[#181612] text-white py-12 sm:py-16 border-b border-[#2E2A22]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            حجز خدماتنا والمتجر العقاري
          </h1>
          <p className="text-sm sm:text-base text-[#E7E5E4] mb-7 max-w-xl mx-auto">
            تصفح كافة الوحدات السكنية، المحلات والمكاتب الإدارية، وباقات التشطيبات المتكاملة
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="w-5 h-5 text-[#57534E] absolute right-4 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={filters.searchQuery}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
              }
              placeholder="ابحث عن عقار، مشروع 124 A، التجمع، مصر الجديدة، أو باقة تشطيب..."
              aria-label="ابحث عن عقار أو خدمة"
              className="w-full pr-12 pl-4 py-3.5 rounded-full bg-white text-[#141413] placeholder:text-[#57534E] font-semibold text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-[#D49B16]"
            />
          </div>
        </div>
      </section>

      {/* Main Content: Sidebar Filters + Property Grid */}
      <section className="py-10 sm:py-14 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Right Sidebar Filters (3 cols on Desktop) */}
          <aside
            aria-label="فلاتر البحث العقاري"
            className="lg:col-span-3 bg-white border border-[#E2DDD2] rounded-2xl p-5 shadow-xs space-y-6"
          >
            {/* Header & Reset */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EFECE4]">
              <div className="flex items-center gap-2 font-extrabold text-base text-[#141413]">
                <SlidersHorizontal className="w-4 h-4 text-[#78470A]" />
                <span>فلترة النتائج</span>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs font-extrabold text-[#78470A] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>مسح الفلاتر</span>
              </button>
            </div>

            {/* 1. Category & Area Filter */}
            <div>
              <h2 className="text-sm font-extrabold text-[#141413] mb-3">الفئة والمنطقة</h2>
              <div className="space-y-2 text-xs sm:text-sm font-semibold text-[#2D2B28]">
                <label className="flex items-center justify-between gap-2 cursor-pointer py-1 hover:text-[#78470A]">
                  <span>جميع العقارات والخدمات</span>
                  <input
                    type="radio"
                    name="shop-cat-filter"
                    checked={filters.category === 'all' && filters.subcategory === 'all'}
                    onChange={() => handleRadioFilter('all', 'all')}
                    className="accent-[#78470A] w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between gap-2 cursor-pointer py-1 hover:text-[#78470A]">
                  <span>مدينة نصر</span>
                  <input
                    type="radio"
                    name="shop-cat-filter"
                    checked={filters.subcategory === 'nasr-city'}
                    onChange={() => handleRadioFilter('subcategory', 'nasr-city')}
                    className="accent-[#78470A] w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between gap-2 cursor-pointer py-1 hover:text-[#78470A]">
                  <span>مصر الجديدة</span>
                  <input
                    type="radio"
                    name="shop-cat-filter"
                    checked={filters.subcategory === 'heliopolis'}
                    onChange={() => handleRadioFilter('subcategory', 'heliopolis')}
                    className="accent-[#78470A] w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between gap-2 cursor-pointer py-1 hover:text-[#78470A]">
                  <span>مشاريع التجمع الخامس</span>
                  <input
                    type="radio"
                    name="shop-cat-filter"
                    checked={filters.subcategory === 'fifth-settlement'}
                    onChange={() => handleRadioFilter('subcategory', 'fifth-settlement')}
                    className="accent-[#78470A] w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between gap-2 cursor-pointer py-1 hover:text-[#78470A]">
                  <span>أعمال التشطيبات والديكورات</span>
                  <input
                    type="radio"
                    name="shop-cat-filter"
                    checked={filters.category === 'finishing'}
                    onChange={() => handleRadioFilter('category', 'finishing')}
                    className="accent-[#78470A] w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between gap-2 cursor-pointer py-1 hover:text-[#78470A]">
                  <span>مبيعات الشقق والوحدات السكنية</span>
                  <input
                    type="radio"
                    name="shop-cat-filter"
                    checked={filters.category === 'residential'}
                    onChange={() => handleRadioFilter('category', 'residential')}
                    className="accent-[#78470A] w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between gap-2 cursor-pointer py-1 hover:text-[#78470A]">
                  <span>مبيعات المحلات التجارية</span>
                  <input
                    type="radio"
                    name="shop-cat-filter"
                    checked={filters.category === 'commercial'}
                    onChange={() => handleRadioFilter('category', 'commercial')}
                    className="accent-[#78470A] w-4 h-4"
                  />
                </label>
              </div>
            </div>

            {/* 2. Price Range Filter */}
            <div className="pt-4 border-t border-[#EFECE4]">
              <h2 className="text-sm font-extrabold text-[#141413] mb-3">نطاق السعر</h2>
              <input
                type="range"
                min={0}
                max={15000000}
                step={250000}
                value={filters.maxPrice}
                aria-label="الحد الأقصى للسعر"
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    maxPrice: Number(e.target.value),
                  }))
                }
                className="w-full accent-[#D49B16] cursor-pointer mb-3"
              />
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="block text-[#57534E] font-bold mb-1">من</span>
                  <input
                    type="number"
                    min={0}
                    max={15000000}
                    step={100000}
                    value={filters.minPrice}
                    aria-label="السعر من"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: Number(e.target.value) || 0,
                      }))
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] text-[#141413] font-bold tabular-nums"
                  />
                </div>
                <div>
                  <span className="block text-[#57534E] font-bold mb-1">إلى</span>
                  <input
                    type="number"
                    min={0}
                    max={15000000}
                    step={100000}
                    value={filters.maxPrice}
                    aria-label="السعر إلى"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxPrice: Number(e.target.value) || 15000000,
                      }))
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] text-[#141413] font-bold tabular-nums"
                  />
                </div>
              </div>
              <div className="text-[11px] font-bold text-[#57534E] text-center mt-2 tabular-nums">
                {formatEGP(filters.minPrice)} — {formatEGP(filters.maxPrice)}
              </div>
            </div>

            {/* 3. Rating Filter */}
            <div className="pt-4 border-t border-[#EFECE4]">
              <h2 className="text-sm font-extrabold text-[#141413] mb-3">التقييم</h2>
              <div className="space-y-2 text-xs font-bold text-[#2D2B28]">
                {[4.9, 4.8, 0].map((minR) => (
                  <button
                    key={minR}
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, minRating: minR }))}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-colors cursor-pointer ${
                      filters.minRating === minR
                        ? 'bg-[#FEF3C7] border-[#D49B16] text-[#141413]'
                        : 'bg-[#FAF9F5] border-[#E5E0D5] text-[#3F3C37] hover:bg-[#F4F1EA]'
                    }`}
                  >
                    <span>{minR === 0 ? 'جميع التقييمات' : `${minR} نجوم وأكثر`}</span>
                    <div className="flex items-center gap-0.5 text-[#D49B16]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D49B16]" />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Special Filters (فلاتر خاصة) */}
            <div className="pt-4 border-t border-[#EFECE4]">
              <h2 className="text-sm font-extrabold text-[#141413] mb-3">فلاتر خاصة</h2>
              <div className="space-y-2.5 text-xs sm:text-sm font-bold text-[#1F1E1B]">
                <label className="flex items-center justify-between gap-2 cursor-pointer">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                    <span>متاح للحجز الفوري</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
                    }
                    className="accent-[#78470A] w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between gap-2 cursor-pointer">
                  <span className="inline-flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#B91C1C]" />
                    <span>عروض وتخفيضات الكاش</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={filters.onSaleOnly}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, onSaleOnly: e.target.checked }))
                    }
                    className="accent-[#78470A] w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between gap-2 cursor-pointer">
                  <span className="inline-flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#78470A]" />
                    <span>وحدات وباقات مميزة</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={filters.featuredOnly}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, featuredOnly: e.target.checked }))
                    }
                    className="accent-[#78470A] w-4 h-4"
                  />
                </label>
              </div>
            </div>
          </aside>

          {/* Left Results Area (9 cols on Desktop) */}
          <div className="lg:col-span-9">
            {/* Toolbar: Count + Sort + Layout Toggle */}
            <div className="bg-white border border-[#E2DDD2] rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
              <div className="text-sm font-extrabold text-[#141413]">
                عرض <span data-testid="shop-results-count" className="text-[#78470A] tabular-nums">{results.length}</span> عقار وخدمة متاحة
              </div>

              <div className="flex items-center gap-3">
                <label htmlFor="shop-sort-select" className="text-xs font-bold text-[#57534E]">
                  ترتيب حسب:
                </label>
                <select
                  id="shop-sort-select"
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as SortOption,
                    }))
                  }
                  className="px-3 py-2 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] text-xs font-extrabold text-[#141413] focus:outline-none focus:border-[#78470A]"
                >
                  <option value="newest">الأحدث</option>
                  <option value="price-asc">السعر: من الأقل إلى الأعلى</option>
                  <option value="price-desc">السعر: من الأعلى إلى الأقل</option>
                  <option value="area-desc">المساحة: من الأكبر إلى الأصغر</option>
                  <option value="rating-desc">الأعلى تقييماً</option>
                </select>

                <div className="flex items-center gap-1 bg-[#FAF9F5] border border-[#D6D0C4] rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setLayout('grid')}
                    aria-label="عرض شبكي"
                    className={`p-1.5 rounded transition-colors cursor-pointer ${
                      layout === 'grid'
                        ? 'bg-[#D49B16] text-[#141413]'
                        : 'text-[#57534E] hover:text-[#141413]'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayout('list')}
                    aria-label="عرض قائمة"
                    className={`p-1.5 rounded transition-colors cursor-pointer ${
                      layout === 'list'
                        ? 'bg-[#D49B16] text-[#141413]'
                        : 'text-[#57534E] hover:text-[#141413]'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Grid / Empty State */}
            {results.length === 0 ? (
              <div className="bg-white border border-[#E2DDD2] rounded-2xl p-12 text-center">
                <h3 className="text-lg font-extrabold text-[#141413] mb-2">
                  لا توجد وحدات مطابقة لفلاتر البحث الحالية
                </h3>
                <p className="text-sm text-[#57534E] mb-6">
                  جرب توسيع نطاق السعر أو إعادة ضبط الفلاتر لاستعراض جميع العقارات المتاحة.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-lg bg-[#D49B16] text-[#141413] font-extrabold text-sm cursor-pointer"
                >
                  إعادة ضبط الفلاتر
                </button>
              </div>
            ) : (
              <div
                className={
                  layout === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {results.map((item) => (
                  <PropertyCard
                    key={item.id}
                    item={item}
                    onNavigate={onNavigate}
                    onAddToCart={onAddToCart}
                    isWishlisted={wishlist.includes(item.id)}
                    onToggleWishlist={onToggleWishlist}
                    layout={layout}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
