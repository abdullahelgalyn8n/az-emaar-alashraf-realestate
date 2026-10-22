import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/catalogData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#181612] text-[#E7E5E4] border-t border-[#2E2A22]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Mission */}
          <div>
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="inline-flex items-center gap-3 mb-4"
            >
              <img
                src={COMPANY_INFO.logoDark}
                alt={COMPANY_INFO.name}
                referrerPolicy="no-referrer"
                className="h-14 w-auto object-contain rounded"
              />
              <div>
                <span className="block text-base font-extrabold text-white">
                  {COMPANY_INFO.shortName}
                </span>
                <span className="block text-xs text-[#FBBF24] font-semibold">
                  {COMPANY_INFO.parentBrand} للمقاولات والاستثمار العقاري
                </span>
              </div>
            </a>
            <p className="text-sm text-[#D6D3CD] leading-relaxed mb-5">
              {COMPANY_INFO.tagline}
            </p>
            <div className="text-xs text-[#A8A29E] font-medium">
              مواعيد العمل الرسمية: {COMPANY_INFO.workingHours}
            </div>
          </div>

          {/* Col 2: Quick Links & Legal */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-extrabold text-white mb-4">روابط سريعة</h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-[#D6D3CD]">
                <li>
                  <a
                    href="/"
                    onClick={(e) => handleLink(e, '/')}
                    className="hover:text-[#FBBF24] transition-colors"
                  >
                    الرئيسية
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    onClick={(e) => handleLink(e, '/about')}
                    className="hover:text-[#FBBF24] transition-colors"
                  >
                    من نحن
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    onClick={(e) => handleLink(e, '/shop')}
                    className="hover:text-[#FBBF24] transition-colors"
                  >
                    حجز خدماتنا
                  </a>
                </li>
                <li>
                  <a
                    href="/category/finishing-and-decor"
                    onClick={(e) => handleLink(e, '/category/finishing-and-decor')}
                    className="hover:text-[#FBBF24] transition-colors"
                  >
                    أعمال التشطيبات والديكورات
                  </a>
                </li>
                <li>
                  <a
                    href="/category/apartments-and-residential"
                    onClick={(e) => handleLink(e, '/category/apartments-and-residential')}
                    className="hover:text-[#FBBF24] transition-colors"
                  >
                    مبيعات الشقق والوحدات السكنية
                  </a>
                </li>
                <li>
                  <a
                    href="/category/commercial-shops"
                    onClick={(e) => handleLink(e, '/category/commercial-shops')}
                    className="hover:text-[#FBBF24] transition-colors"
                  >
                    مبيعات المحلات التجارية
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    onClick={(e) => handleLink(e, '/contact')}
                    className="hover:text-[#FBBF24] transition-colors"
                  >
                    تواصل معنا
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-white mb-4">معلومات قانونية</h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-[#D6D3CD]">
                <li>
                  <a
                    href="/privacy"
                    onClick={(e) => handleLink(e, '/privacy')}
                    className="hover:text-[#FBBF24] transition-colors"
                  >
                    سياسة الخصوصية
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    onClick={(e) => handleLink(e, '/terms')}
                    className="hover:text-[#FBBF24] transition-colors"
                  >
                    الشروط والأحكام
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    onClick={(e) => handleLink(e, '/faq')}
                    className="hover:text-[#FBBF24] transition-colors"
                  >
                    الأسئلة الشائعة
                  </a>
                </li>
                <li>
                  <a
                    href="/cart"
                    onClick={(e) => handleLink(e, '/cart')}
                    className="hover:text-[#FBBF24] transition-colors"
                  >
                    سلة طلبات المعاينة
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h3 className="text-sm font-extrabold text-white mb-4">تواصل معنا</h3>
            <ul className="space-y-3.5 text-sm text-[#D6D3CD]">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FBBF24] shrink-0 mt-1" />
                <div className="tabular-nums font-semibold" dir="ltr">
                  {COMPANY_INFO.phones.join(' - ')}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-[#FBBF24] shrink-0 mt-1" />
                <div className="tabular-nums font-semibold" dir="ltr">
                  {COMPANY_INFO.whatsapp.join(' - ')}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FBBF24] shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-[#FBBF24] transition-colors font-mono text-xs sm:text-sm"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FBBF24] shrink-0 mt-1" />
                <span className="leading-relaxed">{COMPANY_INFO.address}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Social */}
          <div>
            <h3 className="text-sm font-extrabold text-white mb-4">النشرة البريدية والعروض</h3>
            <p className="text-xs text-[#D6D3CD] leading-relaxed mb-4">
              اشترك لتصلك أحدث الطروحات السكنية بمشاريع التجمع ومصر الجديدة وعروض باقات التشطيب.
            </p>
            {subscribed ? (
              <div className="p-3.5 rounded-lg bg-[#14532D]/40 border border-[#22C55E]/40 text-xs text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0" />
                <span>تم تسجيل بريدك الإلكتروني بنجاح في نشرة إعمار الأشراف.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 mb-6">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="البريد الإلكتروني"
                  aria-label="البريد الإلكتروني للنشرة البريدية"
                  className="flex-1 min-w-0 px-3.5 py-2.5 rounded-lg bg-[#26231D] border border-[#3F3A30] text-sm text-white placeholder:text-[#A8A29E] focus:outline-none focus:border-[#FBBF24]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-[#D49B16] hover:bg-[#B8830F] text-[#141413] font-extrabold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  اشترك
                </button>
              </form>
            )}

            <div className="pt-4 border-t border-[#2E2A22]">
              <a
                href="/shop"
                onClick={(e) => handleLink(e, '/shop')}
                className="inline-flex items-center gap-2 text-xs font-extrabold text-[#FBBF24] hover:text-white transition-colors"
              >
                <span>تصفح جميع الوحدات المتاحة (16 وحدة)</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-[#2E2A22] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8A29E]">
          <p>جميع الحقوق محفوظة. <a href="https://azagency.online/" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold">A.Z Agency</a> 2026 ©</p>
          <div className="flex items-center gap-4">
            <a
              href="/privacy"
              onClick={(e) => handleLink(e, '/privacy')}
              className="hover:text-white transition-colors"
            >
              سياسة الخصوصية
            </a>
            <span>·</span>
            <a
              href="/terms"
              onClick={(e) => handleLink(e, '/terms')}
              className="hover:text-white transition-colors"
            >
              الشروط والأحكام
            </a>
            <span>·</span>
            <a
              href="/faq"
              onClick={(e) => handleLink(e, '/faq')}
              className="hover:text-white transition-colors"
            >
              الأسئلة الشائعة
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
