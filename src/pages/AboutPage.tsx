import React from 'react';
import {
  Eye,
  Target,
  FileText,
  Users,
  Award,
  TrendingUp,
  CheckCircle2,
  ArrowLeft,
  MapPin,
  Phone,
} from 'lucide-react';
import { COMPANY_INFO, VISION_MISSION_GOALS } from '../data/catalogData';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visionIcons = [Eye, Target, FileText];

  return (
    <div>
      {/* High-Contrast Architectural Header */}
      <section className="bg-[#181612] text-white py-16 sm:py-20 border-b border-[#2E2A22]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-extrabold text-[#FBBF24] block mb-2">
            {COMPANY_INFO.parentBrand} · سجل حافل بالإنجازات الهندسية والعقارية
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">من نحن</h1>
          <p className="text-base sm:text-lg text-[#E7E5E4] max-w-xl mx-auto font-medium">
            تعرف أكثر على قصتنا ورسالتنا في التطوير العقاري وأعمال المقاولات والتشطيبات
          </p>
        </div>
      </section>

      {/* Main Story & Construction Showcase */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Right Story Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs font-extrabold text-[#78470A] mb-2">
                هويتنا ومسيرتنا الهندسية
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141413] mb-6">
                {COMPANY_INFO.fullTitle}
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#1F1E1B] leading-relaxed font-medium">
                <p>
                  شركة إعمار الأشراف للمقاولات والاستثمار العقاري (أبناء الشرايفة) هي شركة متخصصة في
                  أعمال التشييد والبناء وأعمال التشطيبات المتكاملة. نعمل على تقديم حلول متكاملة تلبي
                  احتياجات عملائنا بأعلى مستويات الجودة والالتزام الهندسي.
                </p>
                <p>
                  نحرص في إعمار الأشراف على تنفيذ مشروعات سكنية وتجارية بمعايير فنية دقيقة في كل من
                  التجمع الخامس (مشروع 124 A بالحي الأول، بيت الوطن)، مصر الجديدة (ميدان ابن سندر
                  والكوربة)، ومدينة نصر، مع الاهتمام بأدق التفاصيل في التصميم والتنفيذ بما يحقق
                  الراحة، المتانة، والقيمة الاستثمارية الحقيقية.
                </p>
                <p>
                  نعتمد على فريق عمل محترف من المهندسين الاستشاريين والتنفيذيين وخبرات عملية تضمن
                  تنفيذ الأعمال في الوقت المحدد وبجودة تفوق التوقعات، واضعين رضا العميل والثقة
                  المتبادلة في مقدمة أولوياتنا.
                </p>
              </div>

              {/* 3 Core Milestones */}
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
            </div>

            {/* Left Tower Construction Image */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D49B16]/40 shadow-md flex-1 min-h-[380px] bg-[#141310]">
                <img
                  src="/assets/extracted/about-crane.png"
                  alt="أعمال التشييد والمقاولات - إعمار الأشراف"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quantitative Impact Banner (+10K عميل سعيد | +500 منتج | 99% رضا العملاء) */}
      <section className="py-12 bg-[#FAF9F5] border-y border-[#E5E0D5]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-white border border-[#E2DDD2] rounded-2xl p-6 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#D49B16] text-[#141413] flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl font-extrabold text-[#78470A] tabular-nums">+10K</div>
              <div className="text-sm font-bold text-[#141413] mt-1">عميل ومتابع سعيد</div>
            </div>

            <div className="bg-white border border-[#E2DDD2] rounded-2xl p-6 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#D49B16] text-[#141413] flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-3xl font-extrabold text-[#78470A] tabular-nums">+500</div>
              <div className="text-sm font-bold text-[#141413] mt-1">
                وحدة عقارية وبند تشطيب منفذ
              </div>
            </div>

            <div className="bg-white border border-[#E2DDD2] rounded-2xl p-6 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#D49B16] text-[#141413] flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-3xl font-extrabold text-[#78470A] tabular-nums">99%</div>
              <div className="text-sm font-bold text-[#141413] mt-1">نسبة رضا العملاء</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Goals, Mission */}
      <section className="py-16 sm:py-20 bg-[#1B1813] text-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {VISION_MISSION_GOALS.map((item, idx) => {
              const IconComponent = visionIcons[idx] || Eye;
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

      {/* Distinguished Team Section (فريق عمل متميز) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <span className="text-xs font-extrabold text-[#78470A] block mb-2">
                الكوادر الهندسية والاستشارية
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141413] mb-4">
                فريق عمل متميز لخدمتكم
              </h2>
              <p className="text-sm sm:text-base text-[#2D2B28] leading-relaxed font-medium mb-6">
                نحن فريق من المهندسين والمحترفين الشغوفين بتقديم أفضل تجربة استثمار عقاري وتشطيب
                هندسي لعملائنا، بدءاً من الاستشارة العقارية واختيار الوحدة المناسبة وحتى التسليم
                النهائي على المفتاح.
              </p>

              <ul className="space-y-3 text-sm font-bold text-[#141413] mb-8">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0" />
                  <span>إشراف هندسي مباشر على جميع مراحل الخرسانات والمباني والعزل</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0" />
                  <span>قسم خاص للتصميم الداخلي ثلاثي الأبعاد (3D) وأعمال الديكور</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0" />
                  <span>استشارات عقارية وقانونية لضمان سلامة التراخيص والعقود</span>
                </li>
              </ul>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="/shop"
                  onClick={(e) => handleLink(e, '/shop')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#D49B16] hover:bg-[#B8830F] text-[#141413] font-extrabold text-sm transition-colors"
                >
                  <span>تصفح وحداتنا وخدماتنا</span>
                  <ArrowLeft className="w-4 h-4" />
                </a>
                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, '/contact')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] hover:bg-[#EFECE4] text-[#141413] font-extrabold text-sm transition-colors"
                >
                  <span>تواصل مع الإدارة الهندسية</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden border border-[#E2DDD2] shadow-md bg-[#141310]">
                <img
                  src="/assets/extracted/about-team.png"
                  alt="فريق عمل إعمار الأشراف"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Headquarters Callout Card */}
          <div className="mt-14 bg-[#FAF9F5] border border-[#D6D0C4] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#141413] text-[#FBBF24] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#141413]">
                  تفضلوا بزيارة مقرنا الرئيسي بمصر الجديدة
                </h3>
                <p className="text-sm font-medium text-[#2D2B28] mt-1">{COMPANY_INFO.address}</p>
              </div>
            </div>
            <a
              href={`tel:${COMPANY_INFO.phones[0]}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#141413] text-white font-extrabold text-sm whitespace-nowrap shrink-0"
            >
              <Phone className="w-4 h-4 text-[#FBBF24]" />
              <span dir="ltr" className="tabular-nums">
                {COMPANY_INFO.phones[0]}
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
