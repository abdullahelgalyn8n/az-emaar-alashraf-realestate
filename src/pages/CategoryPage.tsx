import React, { useState } from 'react';
import {
  FolderOpen,
  ArrowLeft,
  Calculator,
  ZoomIn,
  X,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import {
  CATEGORIES,
  CategoryId,
  PROJECT_124A_BLUEPRINTS,
  PROPERTIES,
  PropertyItem,
  RESIDENTIAL_SUBCATEGORIES,
  SubcategoryId,
  BlueprintGalleryItem,
} from '../data/catalogData';
import {
  calculateFinishingEstimate,
  FinishingTier,
  formatEGP,
} from '../utils/catalogLogic';
import { PropertyCard } from '../components/PropertyCard';

interface CategoryPageProps {
  categoryId: CategoryId;
  activeSubcategory: SubcategoryId;
  onNavigate: (path: string) => void;
  onAddToCart: (item: PropertyItem) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryId,
  activeSubcategory,
  onNavigate,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}) => {
  const categoryMeta =
    CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];

  const [blueprintFilter, setBlueprintFilter] = useState<
    'all' | 'facade' | 'floorplan' | 'entrance' | 'facilities'
  >('all');
  const [selectedBlueprint, setSelectedBlueprint] =
    useState<BlueprintGalleryItem | null>(null);

  // Interactive Finishing Estimator state (for 'finishing' category)
  const [estArea, setEstArea] = useState<number>(180);
  const [estTier, setEstTier] = useState<FinishingTier>('royal-vip');
  const [estSmartHome, setEstSmartHome] = useState<boolean>(true);

  const finishingEstimate = calculateFinishingEstimate(
    estArea,
    estTier,
    estSmartHome
  );

  // Filter properties for this category & subcategory
  const categoryProperties = PROPERTIES.filter((p) => {
    if (p.category !== categoryId) return false;
    if (activeSubcategory !== 'all' && p.subcategory !== activeSubcategory) {
      return false;
    }
    return true;
  });

  const filteredBlueprints = PROJECT_124A_BLUEPRINTS.filter((bp) =>
    blueprintFilter === 'all' ? true : bp.type === blueprintFilter
  );

  const finishingGallery = PROJECT_124A_BLUEPRINTS.filter(
    (bp) => bp.type === 'entrance' || bp.type === 'facade'
  );

  const handleSubcategorySelect = (subId: SubcategoryId) => {
    if (subId === 'all') {
      onNavigate(categoryMeta.route);
    } else {
      onNavigate(`${categoryMeta.route}?area=${subId}`);
    }
  };

  return (
    <div>
      {/* 1. High-Contrast Category Hero Banner (Fixes original washed-out white header) */}
      <section className="relative bg-[#181612] text-white overflow-hidden border-b border-[#2E2A22]">
        <img
          src={categoryMeta.heroImage}
          alt={categoryMeta.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#141310]/95 via-[#181612]/85 to-[#141310]/80" />

        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-right">
          <span className="text-xs sm:text-sm font-extrabold text-[#FBBF24] block mb-2">
            إعمار الأشراف للمقاولات والاستثمار العقاري · {categoryMeta.statsLabel}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
            {categoryMeta.title}
          </h1>
          <p className="text-base sm:text-lg font-bold text-[#FDE047] mb-3">
            {categoryMeta.subtitle}
          </p>
          <p className="text-sm sm:text-base text-[#E7E5E4] max-w-3xl leading-relaxed">
            {categoryMeta.description}
          </p>
        </div>
      </section>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* 2. Subcategories Section (الأقسام الفرعية) for Residential */}
        {categoryId === 'residential' && (
          <section>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#141413]">
                  الأقسام الفرعية والمناطق الجغرافية
                </h2>
                <p className="text-xs sm:text-sm font-medium text-[#3F3C37] mt-1">
                  اختر المنطقة لعرض الوحدات السكنية المتاحة بها برابط مباشر مستقل
                </p>
              </div>
              {activeSubcategory !== 'all' && (
                <button
                  type="button"
                  onClick={() => handleSubcategorySelect('all')}
                  className="px-4 py-2 rounded-lg bg-[#141413] text-[#FDE047] text-xs font-extrabold cursor-pointer"
                >
                  عرض جميع المناطق ({PROPERTIES.filter((p) => p.category === 'residential').length})
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RESIDENTIAL_SUBCATEGORIES.map((sub) => {
                const isSelected = activeSubcategory === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() =>
                      handleSubcategorySelect(isSelected ? 'all' : sub.id)
                    }
                    className={`text-right rounded-2xl p-6 border transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#141413] text-white border-[#D49B16] shadow-md'
                        : 'bg-white text-[#141413] border-[#E2DDD2] hover:border-[#78470A] shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#D49B16] text-[#141413]'
                            : 'bg-[#FEF3C7] text-[#78470A]'
                        }`}
                      >
                        <FolderOpen className="w-6 h-6" />
                      </div>
                      <span
                        className={`text-xs font-extrabold tabular-nums ${
                          isSelected ? 'text-[#FBBF24]' : 'text-[#78470A]'
                        }`}
                      >
                        {sub.projectsCount} وحدات متاحة
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold mb-1">{sub.title}</h3>
                      <p
                        className={`text-xs leading-relaxed mb-4 ${
                          isSelected ? 'text-[#E7E5E4]' : 'text-[#3F3C37]'
                        }`}
                      >
                        {sub.subtitle}
                      </p>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-extrabold ${
                          isSelected ? 'text-[#FBBF24]' : 'text-[#78470A]'
                        }`}
                      >
                        <span>{isSelected ? 'معروض حالياً (إلغاء التصفية)' : 'تسوق الوحدات الآن'}</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* 3. Interactive Finishing Cost Calculator & Real Portfolio Gallery for 'finishing' */}
        {categoryId === 'finishing' && (
          <>
            <section className="bg-white border border-[#E2DDD2] rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-2 text-[#78470A] text-xs font-extrabold">
                    <Calculator className="w-4 h-4" />
                    <span>حاسبة مقايسة التشطيب الهندسي التقديرية</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#141413]">
                    احسب تكلفة تشطيب وحدتك السكنية أو الفيلا فوراً
                  </h2>
                  <p className="text-xs sm:text-sm text-[#3F3C37] leading-relaxed">
                    حدد مساحة وحدتك ومستوى التشطيب المطلوب لمعرفة التكلفة التقديرية شاملة التأسيس
                    الهندسي والضمان قبل طلب المعاينة المجانية.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="finishing-area-input"
                        className="block text-xs font-extrabold text-[#141413] mb-1.5"
                      >
                        مساحة الوحدة (بالمتر المربع): <span className="text-[#78470A] tabular-nums">{estArea} م²</span>
                      </label>
                      <input
                        id="finishing-area-input"
                        type="range"
                        min={70}
                        max={600}
                        step={10}
                        value={estArea}
                        onChange={(e) => setEstArea(Number(e.target.value))}
                        className="w-full accent-[#D49B16] cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-[#141413] mb-1.5">
                        مستوى الباقة الهندسية:
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { id: 'super-lux', label: 'سوبر لوكس' },
                          { id: 'ultra-lux', label: 'ألترا لوكس' },
                          { id: 'royal-vip', label: 'ملكي VIP' },
                        ].map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setEstTier(t.id as FinishingTier)}
                            className={`py-2 px-2 rounded-lg text-xs font-extrabold border transition-colors cursor-pointer ${
                              estTier === t.id
                                ? 'bg-[#141413] text-[#FDE047] border-[#141413]'
                                : 'bg-[#FAF9F5] text-[#141413] border-[#D6D0C4]'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <label className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#141413] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={estSmartHome}
                      onChange={(e) => setEstSmartHome(e.target.checked)}
                      className="accent-[#78470A] w-4 h-4"
                    />
                    <span>إضافة منظومة المنزل الذكي (Smart Home & Sound System)</span>
                  </label>
                </div>

                {/* Estimate Output Card */}
                <div className="lg:col-span-5 bg-[#FAF9F5] border border-[#D6D0C4] rounded-xl p-6 space-y-3">
                  <div className="text-xs font-bold text-[#57534E]">
                    التكلفة الإجمالية التقديرية ({finishingEstimate.areaSqm} م²):
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#78470A] tabular-nums">
                    {formatEGP(finishingEstimate.totalEstimatedCost)}
                  </div>
                  <div className="space-y-1.5 pt-3 border-t border-[#E5E0D5] text-xs font-semibold text-[#2D2B28]">
                    <div className="flex justify-between">
                      <span>تكلفة التأسيس والتشطيب الأساسي:</span>
                      <span className="tabular-nums font-bold">{formatEGP(finishingEstimate.baseCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>التصميم ثلاثي الأبعاد 3D Max:</span>
                      <span className="tabular-nums font-bold">
                        {finishingEstimate.design3DCost === 0
                          ? 'مجاناً بالباقة الملكية'
                          : formatEGP(finishingEstimate.design3DCost)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>مدة التنفيذ التعاقدية:</span>
                      <span className="tabular-nums font-bold">
                        {finishingEstimate.estimatedDurationDays} يوم عمل
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('/contact')}
                    className="w-full mt-2 py-2.5 px-4 rounded-lg bg-[#D49B16] hover:bg-[#B8830F] text-[#141413] font-extrabold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    احجز معاينة ورفع مقاسات مجانية الآن
                  </button>
                </div>
              </div>
            </section>

            {/* Real Architectural Finishing Portfolio Gallery (Replaces duplicate logos in original screenshot) */}
            <section>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#141413]">
                    معرض صور التشطيبات والمداخل الفندقية والواجهات
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-[#3F3C37] mt-1">
                    نماذج حقيقية من تصميم وتنفيذ شركة إعمار الأشراف بالرخام الطبيعي والأخشاب والإضاءة الحديثة
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {finishingGallery.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedBlueprint(item)}
                    className="group text-right bg-white border border-[#E2DDD2] rounded-xl overflow-hidden shadow-xs hover:border-[#78470A] transition-all cursor-pointer"
                  >
                    <div className="relative aspect-4/3 bg-[#141310] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.titleAr}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <span className="absolute bottom-2 left-2 w-8 h-8 rounded-lg bg-black/75 text-white flex items-center justify-center">
                        <ZoomIn className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="p-3.5">
                      <span className="text-[11px] font-bold text-[#78470A] block">
                        {item.areaInfo}
                      </span>
                      <h3 className="text-sm font-extrabold text-[#141413] mt-0.5 line-clamp-1">
                        {item.titleAr}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {/* 4. Project 124 A Architectural Gallery & Floorplans (معرض الصور والمساقط الأفقية) for Residential */}
        {categoryId === 'residential' && (
          <section className="bg-white border border-[#E2DDD2] rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EFECE4]">
              <div>
                <span className="text-xs font-extrabold text-[#78470A] block mb-1">
                  دليل المساقط الهندسية والواجهات · مشروع 124 A الحي الأول
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#141413]">
                  معرض الصور والتقسيمات المعمارية (13 لوحة هندسية)
                </h2>
              </div>

              {/* Filter Tabs for the 13 Blueprints */}
              <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF9F5] p-1.5 rounded-xl border border-[#E5E0D5]">
                {[
                  { id: 'all', label: 'الكل (13)' },
                  { id: 'floorplan', label: 'المساقط الأفقية للشقق (6)' },
                  { id: 'entrance', label: 'المداخل الفندقية (3)' },
                  { id: 'facade', label: 'الواجهة المعمارية (1)' },
                  { id: 'facilities', label: 'المرافق والبدروم (3)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setBlueprintFilter(
                        tab.id as 'all' | 'facade' | 'floorplan' | 'entrance' | 'facilities'
                      )
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-colors cursor-pointer ${
                      blueprintFilter === tab.id
                        ? 'bg-[#141413] text-[#FDE047]'
                        : 'text-[#2D2B28] hover:text-[#141413]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredBlueprints.map((bp) => (
                <button
                  key={bp.id}
                  type="button"
                  onClick={() => setSelectedBlueprint(bp)}
                  className="group text-right bg-[#FAF9F5] border border-[#E2DDD2] rounded-xl overflow-hidden hover:border-[#78470A] hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
                >
                  <div className="relative aspect-4/3 bg-white overflow-hidden border-b border-[#E5E0D5]">
                    <img
                      src={bp.image}
                      alt={bp.titleAr}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain p-1 group-hover:scale-103 transition-transform duration-200"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-1 rounded bg-[#141413]/85 text-white text-[10px] font-bold flex items-center gap-1">
                      <ZoomIn className="w-3 h-3 text-[#FBBF24]" />
                      <span>تكبير المخطط</span>
                    </span>
                  </div>
                  <div className="p-3.5">
                    <div className="text-[11px] font-bold text-[#78470A] mb-0.5">
                      {bp.typeLabel} · {bp.areaInfo}
                    </div>
                    <h3 className="text-xs sm:text-sm font-extrabold text-[#141413] line-clamp-1">
                      {bp.titleAr}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 5. Available Properties in this Category (العقارات المتاحة) */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#141413]">
                العقارات والوحدات المتاحة
              </h2>
              <p className="text-xs sm:text-sm font-medium text-[#3F3C37] mt-0.5">
                جميع الوحدات المعروضة متاحة للمعاينة الميدانية الفورية والحجز المباشر
              </p>
            </div>
            <span className="text-sm font-extrabold text-[#78470A] bg-[#FEF3C7] px-3.5 py-1.5 rounded-lg border border-[#D49B16]/40 tabular-nums">
              {categoryProperties.length} عقار متاح
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProperties.map((item) => (
              <PropertyCard
                key={item.id}
                item={item}
                onNavigate={onNavigate}
                onAddToCart={onAddToCart}
                isWishlisted={wishlist.includes(item.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox Modal for Inspecting Architectural Blueprints */}
      {selectedBlueprint && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedBlueprint.titleAr}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedBlueprint(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#D6D0C4]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-[#181612] text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#FBBF24] block">
                  {selectedBlueprint.typeLabel} · {selectedBlueprint.areaInfo}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold">
                  {selectedBlueprint.titleAr}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBlueprint(null)}
                aria-label="إغلاق المخطط"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-[#FAF9F5] flex items-center justify-center">
              <img
                src={selectedBlueprint.image}
                alt={selectedBlueprint.titleAr}
                referrerPolicy="no-referrer"
                className="max-h-[60vh] w-auto object-contain rounded-lg border border-[#E2DDD2] bg-white p-2"
              />
            </div>

            <div className="px-6 py-4 bg-white border-t border-[#E5E0D5] flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs sm:text-sm font-medium text-[#2D2B28] max-w-xl">
                {selectedBlueprint.description}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedBlueprint(null);
                  onNavigate('/contact');
                }}
                className="px-4 py-2 rounded-lg bg-[#D49B16] text-[#141413] text-xs font-extrabold cursor-pointer whitespace-nowrap"
              >
                اطلب كراسة الشروط والمساحات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
