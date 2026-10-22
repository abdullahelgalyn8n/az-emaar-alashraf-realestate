import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  ShoppingBag,
  PhoneCall,
  Calculator,
  ArrowRight,
  FileCheck2,
  Maximize2,
  BedDouble,
  Bath,
  Star,
} from 'lucide-react';
import { COMPANY_INFO, PROPERTIES, PropertyItem } from '../data/catalogData';
import { calculateInstallmentPlan, formatEGP } from '../utils/catalogLogic';
import { PropertyCard } from '../components/PropertyCard';

interface PropertyDetailPageProps {
  slugOrId: string;
  onNavigate: (path: string) => void;
  onAddToCart: (
    item: PropertyItem,
    requestType?: 'inspection' | 'reservation',
    preferredPayment?: 'cash' | 'installments'
  ) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  slugOrId,
  onNavigate,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}) => {
  const item =
    PROPERTIES.find((p) => p.slug === slugOrId || p.id === slugOrId) ||
    PROPERTIES[0];

  const [activeMedia, setActiveMedia] = useState<'photo' | 'blueprint'>('photo');
  const [downPercent, setDownPercent] = useState<number>(item.downPaymentMinPercent);
  const [years, setYears] = useState<number>(item.maxInstallmentYears);
  const [requestType, setRequestType] = useState<'inspection' | 'reservation'>(
    'inspection'
  );
  const [preferredPayment, setPreferredPayment] = useState<'cash' | 'installments'>(
    'installments'
  );
  const [addedFeedback, setAddedFeedback] = useState(false);

  const plan = calculateInstallmentPlan(item.price, downPercent, years);

  const relatedItems = PROPERTIES.filter(
    (p) => p.category === item.category && p.id !== item.id
  ).slice(0, 3);

  const handleAdd = () => {
    onAddToCart(item, requestType, preferredPayment);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2500);
  };

  return (
    <div className="py-10 sm:py-14 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => onNavigate('/shop')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#141413] hover:text-[#78470A] transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى جميع العقارات والخدمات</span>
        </button>
      </div>

      {/* Main 2-Column Split: Gallery & Specs (Right 7 cols) + Contiguous Booking Module (Left 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Right Column: Visual Gallery + Engineering Specs */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white border border-[#E2DDD2] rounded-2xl overflow-hidden shadow-xs">
            <div className="relative aspect-16/10 bg-[#141310] overflow-hidden">
              <img
                src={
                  activeMedia === 'blueprint' && item.blueprintImage
                    ? item.blueprintImage
                    : item.image
                }
                alt={item.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full ${
                  activeMedia === 'blueprint' ? 'object-contain bg-white p-3' : 'object-cover'
                }`}
              />
              {item.discountPercent && (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-[#B91C1C] text-white text-xs font-extrabold tabular-nums">
                  خصم خاص {item.discountPercent}%
                </span>
              )}
            </div>

            {/* Media Switcher Tabs */}
            {item.blueprintImage && (
              <div className="p-3 bg-[#FAF9F5] border-t border-[#E5E0D5] flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveMedia('photo')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-extrabold transition-colors cursor-pointer ${
                    activeMedia === 'photo'
                      ? 'bg-[#141413] text-[#FDE047]'
                      : 'bg-white text-[#141413] border border-[#D6D0C4]'
                  }`}
                >
                  الصورة المعمارية للوحدة
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMedia('blueprint')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-extrabold transition-colors cursor-pointer ${
                    activeMedia === 'blueprint'
                      ? 'bg-[#141413] text-[#FDE047]'
                      : 'bg-white text-[#141413] border border-[#D6D0C4]'
                  }`}
                >
                  المسقط الأفقي والمخطط الهندسي (2D)
                </button>
              </div>
            )}
          </div>

          {/* Full Description & Highlights */}
          <div className="bg-white border border-[#E2DDD2] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#141413] mb-3">
                الوصف التفصيلي للوحدة
              </h2>
              <p className="text-sm sm:text-base text-[#2D2B28] leading-relaxed font-medium">
                {item.fullDescription}
              </p>
            </div>

            {/* Highlights */}
            <div className="pt-5 border-t border-[#EFECE4]">
              <h3 className="text-base font-extrabold text-[#141413] mb-3">
                أبرز المميزات والضمانات
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {item.highlights.map((hl, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#D6D0C4] flex items-start gap-2 text-xs font-bold text-[#141413]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Structured Engineering Specifications Table */}
            <div className="pt-5 border-t border-[#EFECE4]">
              <h3 className="text-base font-extrabold text-[#141413] mb-4 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#78470A]" />
                <span>جدول المواصفات الفنية والهندسية</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {item.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E5E0D5] text-xs sm:text-sm"
                  >
                    <span className="font-bold text-[#57534E]">{spec.label}:</span>
                    <span className="font-extrabold text-[#141413]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Left Column: Contiguous Purchase & Installment Module */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          <div className="bg-white border border-[#E2DDD2] rounded-2xl p-6 sm:p-7 shadow-sm space-y-5">
            {/* Unboxed Metadata Line */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#57534E]">
              <span className="text-[#78470A]">{item.categoryLabel}</span>
              <span>·</span>
              <span>كود الوحدة: {item.code}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1 text-[#141413]">
                <Star className="w-3.5 h-3.5 fill-[#D49B16] text-[#D49B16]" />
                <span className="tabular-nums">{item.rating}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141413] leading-snug">
              {item.title}
            </h1>

            <p className="text-xs sm:text-sm font-bold text-[#3F3C37] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#78470A] shrink-0" />
              <span>{item.location}</span>
            </p>

            {/* Key Dimensions Bar */}
            <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E5E0D5] text-center">
              <div>
                <div className="text-[11px] font-bold text-[#57534E]">المساحة</div>
                <div className="text-sm font-extrabold text-[#141413] tabular-nums mt-0.5">
                  {item.areaSqm} م²
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#57534E]">الغرف</div>
                <div className="text-sm font-extrabold text-[#141413] tabular-nums mt-0.5">
                  {item.bedrooms ? `${item.bedrooms} غرف` : 'مفتوح / تجاري'}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#57534E]">الحالة</div>
                <div className="text-xs font-extrabold text-[#15803D] mt-0.5">متاح للحجز</div>
              </div>
            </div>

            {/* Price Block */}
            <div className="p-4 rounded-xl bg-[#FEF3C7]/55 border border-[#D49B16]/40">
              <div className="text-xs font-bold text-[#57534E] mb-1">السعر الإجمالي للوحدة:</div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#78470A] tabular-nums">
                  {item.priceFormatted}
                </span>
                {item.oldPriceFormatted && (
                  <span className="text-sm font-bold text-[#6B665E] line-through tabular-nums">
                    {item.oldPriceFormatted}
                  </span>
                )}
              </div>
              <div className="text-xs font-bold text-[#141413] mt-1.5">
                حالة التسليم: {item.deliveryStatus}
              </div>
            </div>

            {/* Request Type & Payment Selector */}
            <div className="space-y-3">
              <div>
                <span className="block text-xs font-extrabold text-[#141413] mb-1.5">
                  نوع الطلب المطلوب:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRequestType('inspection')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-extrabold border transition-colors cursor-pointer ${
                      requestType === 'inspection'
                        ? 'bg-[#141413] text-[#FDE047] border-[#141413]'
                        : 'bg-[#FAF9F5] text-[#141413] border-[#D6D0C4]'
                    }`}
                  >
                    حجز موعد معاينة ميدانية (مجاناً)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRequestType('reservation')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-extrabold border transition-colors cursor-pointer ${
                      requestType === 'reservation'
                        ? 'bg-[#141413] text-[#FDE047] border-[#141413]'
                        : 'bg-[#FAF9F5] text-[#141413] border-[#D6D0C4]'
                    }`}
                  >
                    حجز مبدئي للوحدة العقارية
                  </button>
                </div>
              </div>

              <div>
                <span className="block text-xs font-extrabold text-[#141413] mb-1.5">
                  نظام السداد المفضل:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPreferredPayment('installments')}
                    className={`py-2 px-3 rounded-lg text-xs font-extrabold border transition-colors cursor-pointer ${
                      preferredPayment === 'installments'
                        ? 'bg-[#FEF3C7] text-[#141413] border-[#D49B16]'
                        : 'bg-[#FAF9F5] text-[#3F3C37] border-[#D6D0C4]'
                    }`}
                  >
                    تقسيط على دفعات
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredPayment('cash')}
                    className={`py-2 px-3 rounded-lg text-xs font-extrabold border transition-colors cursor-pointer ${
                      preferredPayment === 'cash'
                        ? 'bg-[#FEF3C7] text-[#141413] border-[#D49B16]'
                        : 'bg-[#FAF9F5] text-[#3F3C37] border-[#D6D0C4]'
                    }`}
                  >
                    كاش (بخصم نقدي فوري)
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Installment Calculator */}
            <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E0D5] space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#78470A]">
                <Calculator className="w-4 h-4" />
                <span>حاسبة الأقساط التقديرية</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label
                    htmlFor="dp-percent"
                    className="block font-bold text-[#141413] mb-1"
                  >
                    المقدم ({downPercent}%):
                  </label>
                  <input
                    id="dp-percent"
                    type="range"
                    min={15}
                    max={60}
                    step={5}
                    value={downPercent}
                    onChange={(e) => setDownPercent(Number(e.target.value))}
                    className="w-full accent-[#D49B16]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="inst-years"
                    className="block font-bold text-[#141413] mb-1"
                  >
                    مدة التقسيط ({years} سنوات):
                  </label>
                  <input
                    id="inst-years"
                    type="range"
                    min={1}
                    max={6}
                    step={1}
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full accent-[#D49B16]"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5E0D5] space-y-1 text-xs font-semibold text-[#2D2B28]">
                <div className="flex justify-between">
                  <span>قيمة دفعة التعاقد ({plan.downPaymentPercent}%):</span>
                  <span className="font-extrabold text-[#141413] tabular-nums">
                    {formatEGP(plan.downPaymentAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>القسط الربع سنوي:</span>
                  <span className="font-extrabold text-[#78470A] tabular-nums">
                    {formatEGP(plan.quarterlyInstallment)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>ما يعادل شهرياً:</span>
                  <span className="font-bold text-[#3F3C37] tabular-nums">
                    {formatEGP(plan.monthlyInstallment)} / شهر
                  </span>
                </div>
              </div>
            </div>

            {/* Primary CTA Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-3.5 px-5 rounded-xl bg-[#D49B16] hover:bg-[#B8830F] text-[#141413] font-extrabold text-sm flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {addedFeedback
                    ? 'تمت الإضافة إلى سلة طلبات المعاينة بنجاح ✓'
                    : 'إضافة إلى سلة طلبات المعاينة والحجز'}
                </span>
              </button>

              {addedFeedback && (
                <button
                  type="button"
                  onClick={() => onNavigate('/cart')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#141413] text-[#FDE047] font-extrabold text-xs cursor-pointer"
                >
                  الانتقال لإتمام طلب المعاينة في السلة ←
                </button>
              )}

              <a
                href={`tel:${COMPANY_INFO.phones[0]}`}
                className="w-full py-3 px-5 rounded-xl border border-[#D6D0C4] bg-[#FAF9F5] hover:bg-[#EFECE4] text-[#141413] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#78470A]" />
                <span>اتصال مباشر بالمبيعات:</span>
                <span dir="ltr" className="tabular-nums">
                  {COMPANY_INFO.phones[0]}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Properties */}
      <section className="mt-16 pt-12 border-t border-[#E5E0D5]">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#141413] mb-6">
          وحدات وخدمات مشابهة في نفس الفئة
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedItems.map((rel) => (
            <PropertyCard
              key={rel.id}
              item={rel}
              onNavigate={onNavigate}
              onAddToCart={(it) => onAddToCart(it)}
              isWishlisted={wishlist.includes(rel.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
