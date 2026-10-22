import React, { useState } from 'react';
import {
  ShoppingBag,
  ArrowLeft,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Phone,
  User,
  Mail,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/catalogData';
import {
  CartEntry,
  calculateCartSummary,
  formatEGP,
  validateBookingForm,
} from '../utils/catalogLogic';

interface CartPageProps {
  entries: CartEntry[];
  onNavigate: (path: string) => void;
  onRemoveEntry: (propertyId: string) => void;
  onUpdateEntry: (
    propertyId: string,
    updates: Partial<Pick<CartEntry, 'requestType' | 'preferredPayment'>>
  ) => void;
  onClearCart: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  entries,
  onNavigate,
  onRemoveEntry,
  onUpdateEntry,
  onClearCart,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    refNumber: string;
    customerName: string;
    customerPhone: string;
    itemsCount: number;
    totalValue: number;
  } | null>(null);

  const summary = calculateCartSummary(entries);

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingForm({
      fullName,
      phone,
      email,
      preferredDate,
      notes,
    });
    if (!validation.valid) {
      setFormError(validation.error || 'يرجى التحقق من البيانات المدخلة.');
      return;
    }
    setFormError(null);
    const refNumber = `EA-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedBooking({
      refNumber,
      customerName: fullName.trim(),
      customerPhone: phone.trim(),
      itemsCount: summary.totalUnits,
      totalValue: summary.totalPortfolioValue,
    });
    onClearCart();
  };

  if (confirmedBooking) {
    return (
      <div className="py-16 sm:py-24 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-white border border-[#E2DDD2] rounded-2xl p-8 sm:p-10 shadow-sm space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs font-extrabold text-[#78470A] block">
            إعمار الأشراف للمقاولات والاستثمار العقاري
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141413]">
            تم تأكيد طلب المعاينة والحجز رقم #{confirmedBooking.refNumber}
          </h1>
          <p className="text-sm text-[#2D2B28] leading-relaxed">
            شكراً لك أ/ <strong>{confirmedBooking.customerName}</strong>. تم استلام طلبك لعدد (
            {confirmedBooking.itemsCount}) وحدة/باقة بقيمة إجمالية{' '}
            <strong className="tabular-nums">{formatEGP(confirmedBooking.totalValue)}</strong>،
            وسيقوم مهندس المبيعات بالتواصل معك على الرقم{' '}
            <strong dir="ltr" className="tabular-nums">
              {confirmedBooking.customerPhone}
            </strong>{' '}
            خلال ساعات العمل الرسمية لتأكيد الموعد.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/shop')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#D49B16] hover:bg-[#B8830F] text-[#141413] font-extrabold text-sm cursor-pointer"
            >
              <span>متابعة تصفح الوحدات</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] text-[#141413] font-extrabold text-sm cursor-pointer"
            >
              <span>العودة للرئيسية</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty Cart State (Matches User Screenshot screencapture-emaaralashraf-site-cart)
  if (entries.length === 0) {
    return (
      <div className="py-16 sm:py-24 max-w-xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-[#F2EFE9] border border-[#E2DDD2] flex items-center justify-center mx-auto mb-6 text-[#6B5B3E]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141413] mb-3">
          السلة فارغة
        </h1>
        <p className="text-sm font-medium text-[#3F3C37] mb-7">
          لم تقم بإضافة أي وحدات عقارية أو باقات تشطيب إلى سلة طلبات المعاينة والحجز بعد.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/shop')}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-[#D49B16] hover:bg-[#B8830F] text-[#141413] font-extrabold text-sm transition-colors cursor-pointer"
        >
          <span>متابعة التسوق</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-14 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141413]">
            سلة طلبات المعاينة والحجز العقاري
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[#3F3C37] mt-1">
            راجع الوحدات وباقات التشطيب المختارة وأكمل بياناتك لتحديد موعد المعاينة أو الحجز المبدئي
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('/shop')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#78470A] hover:underline cursor-pointer"
        >
          <span>إضافة وحدات أخرى</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Right Column: Selected Units (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {entries.map(({ property, requestType, preferredPayment }) => (
            <article
              key={property.id}
              className="bg-white border border-[#E2DDD2] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
            >
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={property.image}
                  alt={property.title}
                  referrerPolicy="no-referrer"
                  className="w-24 h-20 rounded-xl object-cover shrink-0 border border-[#E5E0D5]"
                />
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-[#78470A]">
                    {property.categoryLabel} · كود {property.code}
                  </div>
                  <h2 className="text-base font-extrabold text-[#141413]">
                    {property.title}
                  </h2>
                  <div className="text-sm font-extrabold text-[#78470A] tabular-nums">
                    {property.priceFormatted}
                  </div>

                  {/* Request Type & Payment selectors per item */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <select
                      aria-label={`نوع الطلب لـ ${property.title}`}
                      value={requestType}
                      onChange={(e) =>
                        onUpdateEntry(property.id, {
                          requestType: e.target.value as 'inspection' | 'reservation',
                        })
                      }
                      className="px-2.5 py-1 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] text-xs font-bold text-[#141413]"
                    >
                      <option value="inspection">طلب معاينة ميدانية (مجاناً)</option>
                      <option value="reservation">حجز مبدئي للوحدة</option>
                    </select>

                    <select
                      aria-label={`نظام السداد لـ ${property.title}`}
                      value={preferredPayment}
                      onChange={(e) =>
                        onUpdateEntry(property.id, {
                          preferredPayment: e.target.value as 'cash' | 'installments',
                        })
                      }
                      className="px-2.5 py-1 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] text-xs font-bold text-[#141413]"
                    >
                      <option value="installments">نظام التقسيط</option>
                      <option value="cash">دفع نقدي (كاش)</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRemoveEntry(property.id)}
                aria-label={`حذف ${property.title} من السلة`}
                className="p-2.5 rounded-lg text-[#B91C1C] hover:bg-[#FEE2E2] transition-colors cursor-pointer self-end sm:self-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </article>
          ))}
        </div>

        {/* Left Column: Summary & Customer Verification Form (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E2DDD2] rounded-2xl p-6 sm:p-7 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-[#141413] mb-4">
              ملخص الطلب وبيانات التواصل
            </h2>
            <div className="space-y-2.5 p-4 rounded-xl bg-[#FAF9F5] border border-[#E5E0D5] text-xs sm:text-sm font-semibold text-[#2D2B28]">
              <div className="flex justify-between">
                <span>عدد الوحدات / الباقات المختارة:</span>
                <span className="font-extrabold text-[#141413] tabular-nums">
                  {summary.totalUnits} وحدة
                </span>
              </div>
              <div className="flex justify-between">
                <span>إجمالي القيمة العقارية:</span>
                <span className="font-extrabold text-[#78470A] tabular-nums">
                  {formatEGP(summary.totalPortfolioValue)}
                </span>
              </div>
              {summary.totalDiscountSavings > 0 && (
                <div className="flex justify-between text-[#15803D]">
                  <span>إجمالي التوفير من العروض الحالية:</span>
                  <span className="font-extrabold tabular-nums">
                    {formatEGP(summary.totalDiscountSavings)}
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-[#E5E0D5]">
                <span>رسوم طلب المعاينة الميدانية:</span>
                <span className="font-extrabold text-[#15803D]">مجاناً (0 ج.م)</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmitBooking} className="space-y-4" noValidate>
            {formError && (
              <div
                role="alert"
                className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-xs font-bold text-[#B91C1C] flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="cart-fullname"
                className="block text-xs font-extrabold text-[#141413] mb-1.5"
              >
                الاسم بالكامل *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#57534E] absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="cart-fullname"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="مثال: م. أحمد محمود الشافعي"
                  className="w-full pr-10 pl-3.5 py-2.5 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] text-sm font-semibold text-[#141413] focus:outline-none focus:border-[#78470A]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cart-phone"
                className="block text-xs font-extrabold text-[#141413] mb-1.5"
              >
                رقم الهاتف / واتساب *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#57534E] absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="cart-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01000092117"
                  dir="ltr"
                  className="w-full pr-10 pl-3.5 py-2.5 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] text-sm font-semibold text-[#141413] text-right tabular-nums focus:outline-none focus:border-[#78470A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="cart-email"
                  className="block text-xs font-extrabold text-[#141413] mb-1.5"
                >
                  البريد الإلكتروني (اختياري)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#57534E] absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="cart-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pr-9 pl-3 py-2 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] text-xs font-semibold text-[#141413] focus:outline-none focus:border-[#78470A]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cart-date"
                  className="block text-xs font-extrabold text-[#141413] mb-1.5"
                >
                  الموعد المفضل للمعاينة
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#57534E] absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="cart-date"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pr-9 pl-3 py-2 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] text-xs font-semibold text-[#141413] focus:outline-none focus:border-[#78470A]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="cart-notes"
                className="block text-xs font-extrabold text-[#141413] mb-1.5"
              >
                ملاحظات أو استفسارات هندسية
              </label>
              <textarea
                id="cart-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أرغب في معاينة الوحدة على الطبيعة والاطلاع على جدول الدفعات..."
                className="w-full p-3 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] text-xs font-semibold text-[#141413] focus:outline-none focus:border-[#78470A]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-xl bg-[#D49B16] hover:bg-[#B8830F] text-[#141413] font-extrabold text-sm transition-colors shadow-xs cursor-pointer"
            >
              تأكيد وإرسال طلب المعاينة والحجز
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
