import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  HelpCircle,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { COMPANY_INFO, FAQ_ITEMS } from '../data/catalogData';
import { validateBookingForm } from '../utils/catalogLogic';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('استفسار عن وحدة سكنية / مشروع 124 A');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateBookingForm({ fullName, phone, email, notes });
    if (!res.valid) {
      setError(res.error || 'يرجى التحقق من البيانات.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div>
      {/* High-Contrast Header */}
      <section className="bg-[#181612] text-white py-14 sm:py-18 border-b border-[#2E2A22]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-extrabold text-[#FBBF24] block mb-2">
            نحن هنا لخدمتكم على مدار الأسبوع · {COMPANY_INFO.parentBrand}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
            تواصل معنا
          </h1>
          <p className="text-sm sm:text-base text-[#E7E5E4] max-w-xl mx-auto">
            تواصل مباشرة مع الإدارة الهندسية والمبيعات لحجز معاينة ميدانية أو طلب مقايسة تشطيب
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Information Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-[#E2DDD2] rounded-2xl p-6 shadow-xs space-y-5">
              <h2 className="text-xl font-extrabold text-[#141413]">
                بيانات الاتصال المباشر
              </h2>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#78470A] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#57534E]">أرقام المبيعات والإدارة</div>
                  <div className="text-sm font-extrabold text-[#141413] tabular-nums mt-0.5" dir="ltr">
                    {COMPANY_INFO.phones.join(' - ')}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#78470A] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#57534E]">خدمة عملاء واتساب</div>
                  <div className="text-sm font-extrabold text-[#141413] tabular-nums mt-0.5" dir="ltr">
                    {COMPANY_INFO.whatsapp.join(' - ')}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#78470A] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#57534E]">البريد الإلكتروني الرسمي</div>
                  <div className="text-sm font-extrabold text-[#141413] font-mono mt-0.5">
                    {COMPANY_INFO.email}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#78470A] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#57534E]">عنوان المقر الرئيسي</div>
                  <div className="text-sm font-extrabold text-[#141413] mt-0.5 leading-relaxed">
                    {COMPANY_INFO.address}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#78470A] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#57534E]">مواعيد العمل</div>
                  <div className="text-sm font-extrabold text-[#141413] mt-0.5">
                    {COMPANY_INFO.workingHours}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Contact & Consultation Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E2DDD2] rounded-2xl p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-extrabold text-[#141413]">
                  تم إرسال رسالتك إلى فريق إعمار الأشراف بنجاح
                </h2>
                <p className="text-sm text-[#2D2B28] max-w-md mx-auto">
                  شكراً لتواصلك معنا أ/ <strong>{fullName}</strong>. سيقوم المهندس المختص بالرد عليك
                  هاتفياً في أقرب وقت.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFullName('');
                    setPhone('');
                    setNotes('');
                  }}
                  className="px-6 py-2.5 rounded-lg bg-[#D49B16] text-[#141413] font-extrabold text-xs cursor-pointer"
                >
                  إرسال رسالة جديدة
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <h2 className="text-xl font-extrabold text-[#141413] mb-2">
                  أرسل طلب استشارة أو معاينة
                </h2>

                {error && (
                  <div
                    role="alert"
                    className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-xs font-bold text-[#B91C1C] flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-extrabold text-[#141413] mb-1.5"
                    >
                      الاسم بالكامل *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="أدخل اسمك الكريم"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] text-sm font-semibold text-[#141413] focus:outline-none focus:border-[#78470A]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-extrabold text-[#141413] mb-1.5"
                    >
                      رقم الهاتف / واتساب *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01000092117"
                      dir="ltr"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] text-sm font-semibold text-[#141413] text-right tabular-nums focus:outline-none focus:border-[#78470A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-extrabold text-[#141413] mb-1.5"
                    >
                      البريد الإلكتروني
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] text-sm font-semibold text-[#141413] focus:outline-none focus:border-[#78470A]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-extrabold text-[#141413] mb-1.5"
                    >
                      القسم المختص
                    </label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] text-xs sm:text-sm font-bold text-[#141413] focus:outline-none focus:border-[#78470A]"
                    >
                      <option>استفسار عن وحدة سكنية / مشروع 124 A</option>
                      <option>أعمال التشطيبات والديكورات ورفع المقاسات</option>
                      <option>مبيعات المحلات التجارية والمقرات الإدارية</option>
                      <option>المقاولات العامة والتشييد</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-notes"
                    className="block text-xs font-extrabold text-[#141413] mb-1.5"
                  >
                    تفاصيل الرسالة أو الاستفسار
                  </label>
                  <textarea
                    id="contact-notes"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="اكتب استفسارك أو المساحة المطلوبة أو الموعد المناسب للمعاينة..."
                    className="w-full p-3.5 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] text-sm font-semibold text-[#141413] focus:outline-none focus:border-[#78470A]"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#D49B16] hover:bg-[#B8830F] text-[#141413] font-extrabold text-sm transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الرسالة الآن</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

interface LegalPageProps {
  section: 'privacy' | 'terms' | 'faq';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ section, onNavigate }) => {
  const titles = {
    privacy: 'سياسة الخصوصية وحماية بيانات العملاء',
    terms: 'الشروط والأحكام التعاقدية',
    faq: 'الأسئلة الشائعة حول الوحدات والتشطيبات',
  };

  return (
    <div>
      <section className="bg-[#181612] text-white py-14 border-b border-[#2E2A22] text-center">
        <div className="max-w-[1360px] mx-auto px-4">
          <span className="text-xs font-extrabold text-[#FBBF24] block mb-2">
            معلومات قانونية وإرشادية · {COMPANY_INFO.shortName}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold">{titles[section]}</h1>
        </div>
      </section>

      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
        {section === 'faq' ? (
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-[#E2DDD2] rounded-2xl p-6 shadow-xs"
              >
                <h2 className="text-base sm:text-lg font-extrabold text-[#141413] flex items-center gap-2 mb-2">
                  <HelpCircle className="w-5 h-5 text-[#78470A] shrink-0" />
                  <span>{faq.q}</span>
                </h2>
                <p className="text-sm text-[#2D2B28] leading-relaxed font-medium pr-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        ) : section === 'privacy' ? (
          <div className="bg-white border border-[#E2DDD2] rounded-2xl p-6 sm:p-8 space-y-4 text-sm text-[#2D2B28] leading-relaxed font-medium">
            <div className="flex items-center gap-2 text-base font-extrabold text-[#141413]">
              <ShieldCheck className="w-5 h-5 text-[#78470A]" />
              <span>التزامنا بحماية خصوصية عملائنا</span>
            </div>
            <p>
              تلتزم شركة {COMPANY_INFO.name} بالحفاظ التام على سرية البيانات الشخصية وأرقام الهواتف
              المدخلة عبر نماذج حجز المعاينات أو طلبات التشطيب، ولا تتم مشاركتها مع أي أطراف خارجية
              تحت أي ظرف.
            </p>
            <p>
              تُستخدم البيانات حصرياً للتواصل المباشر من قِبل الإدارة الهندسية أو قسم المبيعات لتنسيق
              المعاينات الميدانية وإرسال المقايسات وعروض الأسعار الرسمية.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-[#E2DDD2] rounded-2xl p-6 sm:p-8 space-y-4 text-sm text-[#2D2B28] leading-relaxed font-medium">
            <div className="flex items-center gap-2 text-base font-extrabold text-[#141413]">
              <FileText className="w-5 h-5 text-[#78470A]" />
              <span>الضوابط التعاقدية والمقايسات الهندسية</span>
            </div>
            <p>
              جميع الأسعار والمساحات المعلنة للوحدات السكنية والتجارية وباقات التشطيب تخضع للعقود
              الرسمية والمقايسات التفصيلية المعتمدة بمقر الشركة في مصر الجديدة.
            </p>
            <p>
              طلب المعاينة عبر الموقع الإلكتروني مجاني بالكامل ولا يرتب أي التزام مالي على العميل إلا
              بعد المعاينة على الطبيعة وتوقيع العقود الرسمية.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
