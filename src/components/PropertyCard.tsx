import React from 'react';
import { Eye, Heart, ShoppingBag, MapPin } from 'lucide-react';
import { PropertyItem } from '../data/catalogData';

interface PropertyCardProps {
  item: PropertyItem;
  onNavigate: (path: string) => void;
  onAddToCart: (item: PropertyItem) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  layout?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  item,
  onNavigate,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  layout = 'grid',
}) => {
  const detailPath = `/property/${item.slug}`;

  const handleDetailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(detailPath);
  };

  if (layout === 'list') {
    return (
      <article className="bg-white border border-[#E2DDD2] rounded-xl overflow-hidden shadow-xs hover:border-[#B8830F] transition-all flex flex-col sm:flex-row">
        <div className="relative sm:w-72 shrink-0 bg-[#1C1917] aspect-4/3 sm:aspect-auto">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => onToggleWishlist(item.id)}
            aria-label={isWishlisted ? `إزالة ${item.title} من المفضلة` : `إضافة ${item.title} للمفضلة`}
            className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/95 text-[#141413] hover:text-[#B91C1C] flex items-center justify-center shadow-sm transition-colors cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 ${
                isWishlisted ? 'fill-[#B91C1C] text-[#B91C1C]' : 'text-[#141413]'
              }`}
            />
          </button>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
          <div>
            {/* Clean unboxed metadata with typographic separators */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-[#57534E] mb-2">
              <span className="text-[#78470A]">{item.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{item.areaSqm} م²</span>
              {item.bedrooms && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{item.bedrooms} غرف</span>
                </>
              )}
              {item.discountPercent && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#B91C1C] font-extrabold tabular-nums">
                    خصم {item.discountPercent}%
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
              <h3 className="text-lg font-extrabold text-[#141413]">
                <a
                  href={detailPath}
                  onClick={handleDetailClick}
                  className="hover:text-[#78470A] transition-colors"
                >
                  {item.title}
                </a>
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-[#78470A] tabular-nums">
                  {item.priceFormatted}
                </span>
                {item.oldPriceFormatted && (
                  <span className="text-xs font-semibold text-[#6B665E] line-through tabular-nums">
                    {item.oldPriceFormatted}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs font-semibold text-[#57534E] flex items-center gap-1 mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#78470A] shrink-0" />
              <span>{item.location}</span>
            </p>

            <p className="text-sm text-[#2D2B28] leading-relaxed">{item.shortDescription}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#EFECE4]">
            <span className="text-xs font-bold text-[#3F3C37]">
              مقدم يبدأ من <span className="tabular-nums">{item.downPaymentMinPercent}%</span> · تقسيط حتى{' '}
              <span className="tabular-nums">{item.maxInstallmentYears}</span> سنوات
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onAddToCart(item)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] hover:bg-[#F0ECE1] text-[#141413] text-xs font-extrabold transition-colors whitespace-nowrap cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#78470A]" />
                <span>طلب معاينة</span>
              </button>
              <a
                href={detailPath}
                onClick={handleDetailClick}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D49B16] hover:bg-[#B8830F] text-[#141413] text-xs font-extrabold transition-colors whitespace-nowrap"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>عرض التفاصيل</span>
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white border border-[#E2DDD2] rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#B8830F] transition-all flex flex-col justify-between">
      <div>
        {/* Image Frame - 4:3 consistent aspect ratio */}
        <div className="relative aspect-4/3 bg-[#1C1917] overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-200"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

          {/* Wishlist button */}
          <button
            type="button"
            onClick={() => onToggleWishlist(item.id)}
            aria-label={isWishlisted ? `إزالة ${item.title} من المفضلة` : `إضافة ${item.title} للمفضلة`}
            className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/95 text-[#141413] hover:text-[#B91C1C] flex items-center justify-center shadow-sm transition-colors cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 ${
                isWishlisted ? 'fill-[#B91C1C] text-[#B91C1C]' : 'text-[#141413]'
              }`}
            />
          </button>

          {/* Single subtle status/discount tag */}
          {item.discountPercent ? (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#B91C1C] text-white text-[11px] font-extrabold tabular-nums shadow-xs">
              خصم {item.discountPercent}%
            </span>
          ) : item.isFeatured ? (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#141413]/90 text-[#FDE047] text-[11px] font-extrabold shadow-xs">
              وحدة مميزة
            </span>
          ) : null}

          {/* Bottom-right area & code on dark scrim for immediate scan */}
          <div className="absolute bottom-2.5 right-3 left-3 flex items-center justify-between text-white text-xs font-bold">
            <span className="drop-shadow-xs">{item.subcategoryLabel}</span>
            <span className="tabular-nums bg-black/65 px-2 py-0.5 rounded text-[11px]">
              {item.areaSqm} م²
            </span>
          </div>
        </div>

        {/* Content Body - High Contrast Light Mode */}
        <div className="p-4 sm:p-5">
          {/* Unboxed metadata line */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#57534E] mb-1.5">
            <span>{item.categoryLabel}</span>
            {item.bedrooms && (
              <>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{item.bedrooms} غرف</span>
              </>
            )}
            {item.gardenOrRoofSqm && (
              <>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">+{item.gardenOrRoofSqm} م² حديقة/روف</span>
              </>
            )}
          </div>

          {/* Price - Deep Royal Bronze on White (Contrast > 7:1) */}
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-lg sm:text-xl font-extrabold text-[#78470A] tabular-nums">
              {item.priceFormatted}
            </span>
            {item.oldPriceFormatted && (
              <span className="text-xs font-semibold text-[#6B665E] line-through tabular-nums">
                {item.oldPriceFormatted}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-[16px] font-extrabold text-[#141413] leading-snug mb-1.5 line-clamp-1">
            <a
              href={detailPath}
              onClick={handleDetailClick}
              className="hover:text-[#78470A] transition-colors"
            >
              {item.title}
            </a>
          </h3>

          {/* Description */}
          <p className="text-xs font-medium text-[#3F3C37] leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {item.shortDescription}
          </p>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 flex items-center gap-2">
        <a
          href={detailPath}
          onClick={handleDetailClick}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#D49B16] hover:bg-[#B8830F] text-[#141413] text-xs font-extrabold transition-colors whitespace-nowrap"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>عرض التفاصيل</span>
        </a>
        <button
          type="button"
          onClick={() => onAddToCart(item)}
          aria-label={`إضافة ${item.title} لطلب المعاينة`}
          className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-lg border border-[#D6D0C4] bg-[#FAF9F5] hover:bg-[#141413] hover:text-white hover:border-[#141413] text-[#141413] text-xs font-extrabold transition-colors whitespace-nowrap cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>حجز معاينة</span>
        </button>
      </div>
    </article>
  );
};
