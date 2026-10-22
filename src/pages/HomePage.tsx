import React, { useState } from 'react';
import {
  ArrowLeft,
  Building2,
  ShieldCheck,
  Award,
  Users,
  Eye,
  Target,
  FileText,
  Star,
} from 'lucide-react';
import {
  CATEGORIES,
  COMPANY_INFO,
  PROPERTIES,
  PropertyItem,
  TESTIMONIALS,
  VISION_MISSION_GOALS,
  CategoryId,
} from '../data/catalogData';
import { PropertyCard } from '../components/PropertyCard';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onAddToCart: (item: PropertyItem) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | CategoryId>('all');

  const filteredFeatured = PROPERTIES.filter((item) =>
    activeTab === 'all' ? true : item.category === activeTab
  ).slice(0, 8);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visionIcons = [Eye, Target, FileText];

  return (
    <div>
      {/* 1. Hero Section with High-Contrast Scrim */}
      <section className="relative bg-[#141310] text-white overflow-hidden">
        <img
          src="/assets/extracted/hero-bg.png"
          alt="أعمال التشييد والبناء - إعمار الأشراف"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#141310]/85 via-[#141310]/70 to-[#141310]/95" />

        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <p className="text-xs sm:text-sm font-bold text-[#FBBF24] tracking-wide mb-3">
            {COMPANY_INFO.parentBrand} · سجل هندسي وعقاري معتمد بالقاهرة الجديدة ومصر الجديدة
          </p>
          <h1 className="text-2xl sm:text-5xl lg:text-[52px] font-extrabold text-white leading-[1.35] sm:leading-[1.28] max-w-4xl mx-auto mb-6 text-balance">
            إعمار الأشراف للمقاولات والاستثمار العقاري وأعمال التشطيبات
          </h1>
          <p className="text-base sm:text-lg text-[#E7E5E4] max-w-2xl mx-auto leading-relaxed mb-9 font-medium">
            {COMPANY_INFO.tagline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/shop"
              onClick={(e) => handleLink(e, '/shop')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#D49B16] hover:bg-[#B8830F] text-[#141413] font-extrabold text-sm sm:text-base transition-colors shadow-md whitespace-nowrap"
            >
              <span>لحجز الخدمات وتصفح الوحدات</span>
              <ArrowLeft className="w-4 h-4" />
            </a>
            <a
              href="/about"
              onClick={(e) => handleLink(e, '/about')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-white/35 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base transition-colors whitespace-nowrap"
            >
              <span>من نحن</span>
            </a>
          </div>

          {/* 4-Column Quantitative Proof Bar */}
          <div className="mt-16 pt-8 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-6 text-right">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#FBBF24] tabular-nums">
                +10 سنوات
              </div>
              <div className="text-xs sm:text-sm text-[#E7E5E4] font-semibold mt-1">
                خبرة في التشييد والاستثمار العقاري
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#FBBF24] tabular-nums">
                +50 مشروع
              </div>
              <div className="text-xs sm:text-sm text-[#E7E5E4] font-semibold mt-1">
                مشروعات سكنية وتجارية وتشطيبات منجزة
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#FBBF24] tabular-nums">
                +500 وحدة
              </div>
              <div className="text-xs sm:text-sm text-[#E7E5E4] font-semibold mt-1">
                شقق وفيلات ومحلات ومقرات إدارية
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#FBBF24] tabular-nums">
                99%
              </div>
              <div className="text-xs sm:text-sm text-[#E7E5E4] font-semibold mt-1">
                نسبة رضا العملاء والالتزام بمواعيد التسليم
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Browse Categories Section (تصفح الأقسام) */}
      <section className="py-16 sm:py-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141413] mb-2">
            تصفح الأقسام الرئيسية
          </h2>
          <p className="text-sm sm:text-base font-medium text-[#3F3C37]">
            اختر القسم المناسب لاحتياجاتك العقارية أو الهندسية وانتقل مباشرة لصفحته المتخصصة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={cat.route}
              onClick={(e) => handleLink(e, cat.route)}
              className="group relative rounded-2xl overflow-hidden bg-[#141310] border border-[#E2DDD2] aspect-4/3 flex flex-col justify-end p-6 shadow-xs hover:shadow-lg transition-all"
            >
              <img
                src={cat.heroImage}
                alt={cat.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-300"
              />
              {/* Measured Dark Scrim for Guaranteed 8:1 Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141310] via-[#141310]/65 to-transparent" />

              <div className="relative z-10">
                <span className="text-xs font-extrabold text-[#FBBF24] block mb-1">
                  {cat.statsLabel}
                </span>
                <h3 className="text-xl font-extrabold text-white mb-1.5">{cat.title}</h3>
                <p className="text-xs text-[#E7E5E4] line-clamp-2 mb-4 leading-relaxed">
                  {cat.subtitle}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#141413] bg-[#D49B16] group-hover:bg-[#FBBF24] px-3.5 py-2 rounded-lg transition-colors">
                  <span>تصفح القسم الآن</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 3. About Section (من نحن) - High-Contrast Light Mode Split */}
      <section className="py-16 sm:py-20 bg-white border-y border-[#E5E0D5]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Right Text Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs font-extrabold text-[#78470A] mb-2">
                تعرف علينا · {COMPANY_INFO.parentBrand}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#141413] mb-5">
                من نحن — إعمار الأشراف للمقاولات والاستثمار العقاري
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#2D2B28] leading-relaxed font-medium">
                <p>
                  شركة إعمار الأشراف للمقاولات والاستثمار العقاري هي شركة متخصصة في أعمال التشييد
                  والبناء وأعمال التشطيبات المتكاملة. نعمل على تقديم حلول هندسية وعقارية تلبي
                  احتياجات عملائنا بأعلى مستويات الجودة والالتزام.
                </p>
                <p>
                  نحرص في إعمار الأشراف على تنفيذ مشروعات سكنية وتجارية بمعايير فنية دقيقة، مع
                  الاهتمام بأدق التفاصيل في التصميم المعماري والتنفيذ الإنشائي، بما يحقق الراحة،
                  المتانة، والقيمة الاستثمارية الحقيقية.
                </p>
                <p>
                  نعتمد على فريق عمل محترف وخبرات عملية تضمن تنفيذ الأعمال في الوقت المحدد وبجودة
                  تفوق التوقعات، واضعين رضا العميل والثقة المتبادلة في مقدمة أولوياتنا.
                </p>
              </div>

              {/* 3 Stat Cards with High-Contrast Bronze & Obsidian Typography */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-[#FAF9F5] border border-[#D6D0C4] rounded-xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#78470A] tabular-nums">
                    +10
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#141413] mt-1">
                    سنوات خبرة
                  </div>
                </div>
                <div className="bg-[#FAF9F5] border border-[#D6D0C4] rounded-xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#78470A] tabular-nums">
                    +50
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#141413] mt-1">
                    مشروع منجز
                  </div>
                </div>
                <div className="bg-[#FAF9F5] border border-[#D6D0C4] rounded-xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#78470A] tabular-nums">
                    +100
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#141413] mt-1">
                    عميل سعيد
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a
                  href="/about"
                  onClick={(e) => handleLink(e, '/about')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#141413] hover:bg-[#292724] text-white text-xs sm:text-sm font-extrabold transition-colors"
                >
                  <span>اقرأ المزيد عن الشركة ومشروعاتنا</span>
                  <ArrowLeft className="w-4 h-4 text-[#FBBF24]" />
                </a>
                <a
                  href="/category/apartments-and-residential"
                  onClick={(e) => handleLink(e, '/category/apartments-and-residential')}
                  className="text-xs sm:text-sm font-extrabold text-[#78470A] hover:underline"
                >
                  مشاهدة المساقط الهندسية لمشروع 124 A ←
                </a>
              </div>
            </div>

            {/* Left Visual Column */}
            <div className="lg:col-span-5 relative flex flex-col">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D49B16]/40 shadow-md flex-1 min-h-[380px] bg-[#141310]">
                <img
                  src="/assets/extracted/about-crane.png"
                  alt="مشاريع إعمار الأشراف الإنشائية"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 left-4 bg-[#141310]/90 backdrop-blur-xs border border-white/15 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between text-xs font-bold text-[#FBBF24] mb-1">
                    <span>إشراف هندسي متكامل</span>
                    <span>كود مصري معتمد</span>
                  </div>
                  <p className="text-xs text-[#E7E5E4]">
                    تنفيذ الخرسانات والواجهات والتشطيبات الداخلية بأعلى معايير الجودة والأمان.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Properties & Services Catalog (لحجز خدماتنا) */}
      <section className="py-16 sm:py-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold text-[#78470A] block mb-1">
              كتالوج الوحدات والخدمات المحدث
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141413]">
              لحجز خدماتنا وأحدث الطروحات العقارية
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Functional Filter Segmented Controls */}
            <div
              role="tablist"
              aria-label="تصفية الوحدات المعروضة"
              className="flex flex-wrap items-center gap-1 p-1 bg-[#EAE5D9] rounded-xl"
            >
              {[
                { id: 'all', label: `الكل (${PROPERTIES.length})` },
                { id: 'residential', label: 'الوحدات السكنية (9)' },
                { id: 'finishing', label: 'التشطيبات والفيلات (3)' },
                { id: 'commercial', label: 'المحلات والمكاتب (4)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id as 'all' | CategoryId)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#141413] text-[#FDE047] shadow-xs'
                      : 'text-[#2D2B28] hover:text-[#141413]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <a
              href="/shop"
              onClick={(e) => handleLink(e, '/shop')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#D6D0C4] bg-white hover:bg-[#FEF3C7] text-xs font-extrabold text-[#78470A] transition-colors whitespace-nowrap"
            >
              <span>عرض الكل في المتجر</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFeatured.map((item) => (
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

      {/* 5. Vision, Goals, Mission Section (رؤيتنا · أهدافنا · رسالتنا) */}
      <section className="py-16 sm:py-20 bg-[#1B1813] text-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {VISION_MISSION_GOALS.map((item, idx) => {
              const IconComponent = visionIcons[idx] || ShieldCheck;
              return (
                <div
                  key={item.id}
                  className="bg-white text-[#141413] rounded-2xl p-7 sm:p-8 text-center border border-[#E5E0D5] shadow-md flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[#FEF3C7] border border-[#D49B16]/40 flex items-center justify-center text-[#78470A] mb-5">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#141413] mb-3">{item.title}</h3>
                  <p className="text-sm text-[#2D2B28] leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Client Testimonials Section (آراء عملائنا) */}
      <section className="py-16 sm:py-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141413] mb-2">
            آراء عملائنا وشركاء النجاح
          </h2>
          <p className="text-sm sm:text-base font-medium text-[#3F3C37]">
            تجارب موثقة من ملاك الوحدات السكنية والتجارية وعملاء باقات التشطيب الهندسي
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.id}
              className="bg-white border border-[#E2DDD2] rounded-2xl p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-[#141413]">{t.name}</h3>
                    <p className="text-xs font-bold text-[#78470A] mt-0.5">{t.role}</p>
                  </div>
                  <div className="flex items-center gap-0.5 text-[#D49B16]" aria-label="تقييم 5 نجوم">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D49B16]" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#2D2B28] leading-relaxed font-medium">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#F4F1EA] text-[11px] font-bold text-[#57534E]">
                عميل موثق لدى شركة إعمار الأشراف
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
