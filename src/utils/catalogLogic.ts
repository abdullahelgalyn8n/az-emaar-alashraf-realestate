import { CategoryId, PropertyItem, SubcategoryId } from '../data/catalogData';

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating-desc' | 'area-desc';

export interface FilterState {
  searchQuery: string;
  category: CategoryId | 'all';
  subcategory: SubcategoryId;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  featuredOnly: boolean;
  sortBy: SortOption;
}

export const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  category: 'all',
  subcategory: 'all',
  minPrice: 0,
  maxPrice: 15000000,
  minRating: 0,
  inStockOnly: false,
  onSaleOnly: false,
  featuredOnly: false,
  sortBy: 'newest',
};

export function filterAndSortProperties(
  items: PropertyItem[],
  filters: FilterState
): PropertyItem[] {
  const q = filters.searchQuery.trim().toLowerCase();

  const filtered = items.filter((item) => {
    if (filters.category !== 'all' && item.category !== filters.category) {
      return false;
    }
    if (filters.subcategory !== 'all' && item.subcategory !== filters.subcategory) {
      return false;
    }
    if (item.price < filters.minPrice || item.price > filters.maxPrice) {
      return false;
    }
    if (filters.minRating > 0 && item.rating < filters.minRating) {
      return false;
    }
    if (filters.inStockOnly && !item.inStock) {
      return false;
    }
    if (filters.onSaleOnly && (!item.discountPercent || item.discountPercent <= 0)) {
      return false;
    }
    if (filters.featuredOnly && !item.isFeatured) {
      return false;
    }
    if (q.length > 0) {
      const searchable = [
        item.title,
        item.shortDescription,
        item.location,
        item.categoryLabel,
        item.subcategoryLabel,
        item.code,
      ]
        .join(' ')
        .toLowerCase();
      if (!searchable.includes(q)) {
        return false;
      }
    }
    return true;
  });

  const sorted = [...filtered];
  switch (filters.sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      sorted.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
      break;
    case 'area-desc':
      sorted.sort((a, b) => b.areaSqm - a.areaSqm);
      break;
    case 'newest':
    default:
      sorted.sort((a, b) => b.createdAtOrder - a.createdAtOrder);
      break;
  }

  return sorted;
}

export interface InstallmentPlanResult {
  totalPrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  financedAmount: number;
  years: number;
  monthlyInstallment: number;
  quarterlyInstallment: number;
}

export function calculateInstallmentPlan(
  totalPrice: number,
  downPaymentPercent: number,
  years: number
): InstallmentPlanResult {
  const clampedPercent = Math.max(10, Math.min(90, downPaymentPercent));
  const clampedYears = Math.max(1, Math.min(10, years));
  const downPaymentAmount = Math.round((totalPrice * clampedPercent) / 100);
  const financedAmount = Math.max(0, totalPrice - downPaymentAmount);
  const totalMonths = clampedYears * 12;
  const totalQuarters = clampedYears * 4;

  return {
    totalPrice,
    downPaymentPercent: clampedPercent,
    downPaymentAmount,
    financedAmount,
    years: clampedYears,
    monthlyInstallment: Math.round(financedAmount / totalMonths),
    quarterlyInstallment: Math.round(financedAmount / totalQuarters),
  };
}

export type FinishingTier = 'super-lux' | 'ultra-lux' | 'royal-vip';

export interface FinishingEstimateResult {
  areaSqm: number;
  tier: FinishingTier;
  pricePerSqm: number;
  baseCost: number;
  smartHomeCost: number;
  design3DCost: number;
  totalEstimatedCost: number;
  estimatedDurationDays: number;
}

export function calculateFinishingEstimate(
  areaSqm: number,
  tier: FinishingTier,
  includeSmartHome: boolean
): FinishingEstimateResult {
  const validArea = Math.max(50, Math.min(1500, Math.round(areaSqm || 150)));
  const tierRates: Record<FinishingTier, number> = {
    'super-lux': 5300,
    'ultra-lux': 6800,
    'royal-vip': 8500,
  };
  const pricePerSqm = tierRates[tier];
  const baseCost = validArea * pricePerSqm;
  const smartHomeCost = includeSmartHome ? validArea * 650 : 0;
  const design3DCost = tier === 'royal-vip' ? 0 : validArea * 180;
  const totalEstimatedCost = baseCost + smartHomeCost + design3DCost;
  const estimatedDurationDays = validArea <= 160 ? 75 : validArea <= 260 ? 90 : 120;

  return {
    areaSqm: validArea,
    tier,
    pricePerSqm,
    baseCost,
    smartHomeCost,
    design3DCost,
    totalEstimatedCost,
    estimatedDurationDays,
  };
}

export interface CartEntry {
  property: PropertyItem;
  quantity: number;
  requestType: 'inspection' | 'reservation';
  preferredPayment: 'cash' | 'installments';
}

export interface CartSummary {
  totalUnits: number;
  totalPortfolioValue: number;
  totalDiscountSavings: number;
  totalReservationDeposit: number;
}

export function calculateCartSummary(entries: CartEntry[]): CartSummary {
  let totalUnits = 0;
  let totalPortfolioValue = 0;
  let totalDiscountSavings = 0;
  let totalReservationDeposit = 0;

  for (const entry of entries) {
    const qty = Math.max(1, entry.quantity);
    totalUnits += qty;
    totalPortfolioValue += entry.property.price * qty;
    if (entry.property.oldPrice && entry.property.oldPrice > entry.property.price) {
      totalDiscountSavings += (entry.property.oldPrice - entry.property.price) * qty;
    }
    // Serious reservation deposit is 50,000 EGP for reservation or 0 for free site inspection
    if (entry.requestType === 'reservation') {
      totalReservationDeposit += 50000 * qty;
    }
  }

  return {
    totalUnits,
    totalPortfolioValue,
    totalDiscountSavings,
    totalReservationDeposit,
  };
}

export type ParsedRoute =
  | { page: 'home'; path: string; title: string }
  | { page: 'about'; path: string; title: string }
  | { page: 'shop'; path: string; title: string }
  | { page: 'category'; categoryId: CategoryId; subcategoryId: SubcategoryId; path: string; title: string }
  | { page: 'property'; slugOrId: string; path: string; title: string }
  | { page: 'cart'; path: string; title: string }
  | { page: 'contact'; path: string; title: string }
  | { page: 'legal'; section: 'privacy' | 'terms' | 'faq'; path: string; title: string };

export function parseAppRoute(pathname: string, search: string = ''): ParsedRoute {
  const cleanPath = (pathname || '/').replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(search);
  const areaParam = params.get('area') as SubcategoryId | null;
  const validArea: SubcategoryId =
    areaParam === 'nasr-city' || areaParam === 'heliopolis' || areaParam === 'fifth-settlement'
      ? areaParam
      : 'all';

  if (cleanPath === '/' || cleanPath === '/home') {
    return { page: 'home', path: '/', title: 'الرئيسية' };
  }
  if (cleanPath === '/about') {
    return { page: 'about', path: '/about', title: 'من نحن' };
  }
  if (cleanPath === '/shop') {
    return { page: 'shop', path: '/shop', title: 'حجز خدماتنا والمتجر العقاري' };
  }
  if (cleanPath === '/cart') {
    return { page: 'cart', path: '/cart', title: 'سلة طلبات المعاينة والحجز' };
  }
  if (cleanPath === '/contact') {
    return { page: 'contact', path: '/contact', title: 'تواصل معنا' };
  }
  if (cleanPath === '/privacy') {
    return { page: 'legal', section: 'privacy', path: '/privacy', title: 'سياسة الخصوصية' };
  }
  if (cleanPath === '/terms') {
    return { page: 'legal', section: 'terms', path: '/terms', title: 'الشروط والأحكام' };
  }
  if (cleanPath === '/faq') {
    return { page: 'legal', section: 'faq', path: '/faq', title: 'الأسئلة الشائعة' };
  }

  // Category routes (supporting both readable slugs and original UUIDs from screenshots!)
  if (
    cleanPath === '/category/finishing-and-decor' ||
    cleanPath === '/category/finishing' ||
    cleanPath === '/category/cf178eaa-839c-47b1-aeb0-2d9f31e1be10'
  ) {
    return {
      page: 'category',
      categoryId: 'finishing',
      subcategoryId: validArea,
      path: '/category/finishing-and-decor',
      title: 'أعمال التشطيبات والديكورات',
    };
  }

  if (
    cleanPath === '/category/apartments-and-residential' ||
    cleanPath === '/category/residential' ||
    cleanPath === '/category/455feb64-c377-4684-81be-b580c9d92626'
  ) {
    return {
      page: 'category',
      categoryId: 'residential',
      subcategoryId: validArea,
      path:
        validArea !== 'all'
          ? `/category/apartments-and-residential?area=${validArea}`
          : '/category/apartments-and-residential',
      title: 'مبيعات الشقق والوحدات السكنية',
    };
  }

  if (
    cleanPath === '/category/commercial-shops' ||
    cleanPath === '/category/commercial' ||
    cleanPath === '/category/71713185-1d1b-48bf-a99e-7325500811c4'
  ) {
    return {
      page: 'category',
      categoryId: 'commercial',
      subcategoryId: validArea,
      path: '/category/commercial-shops',
      title: 'مبيعات المحلات التجارية',
    };
  }

  if (cleanPath.startsWith('/property/')) {
    const slugOrId = decodeURIComponent(cleanPath.replace('/property/', ''));
    return {
      page: 'property',
      slugOrId,
      path: `/property/${slugOrId}`,
      title: 'تفاصيل الوحدة العقارية',
    };
  }

  return { page: 'home', path: '/', title: 'الرئيسية' };
}

export interface BookingFormInput {
  fullName: string;
  phone: string;
  email?: string;
  preferredDate?: string;
  notes?: string;
}

export function validateBookingForm(input: BookingFormInput): {
  valid: boolean;
  error?: string;
} {
  const name = input.fullName.trim();
  const phone = input.phone.trim();

  if (name.length < 3) {
    return { valid: false, error: 'يرجى إدخال الاسم بالكامل (3 أحرف على الأقل).' };
  }
  const cleanDigits = phone.replace(/[\s\-+]/g, '');
  if (!/^\d{10,14}$/.test(cleanDigits)) {
    return { valid: false, error: 'يرجى إدخال رقم هاتف صحيح مكون من 10 إلى 14 رقماً.' };
  }
  if (input.email && input.email.trim().length > 0) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
      return { valid: false, error: 'يرجى إدخال بريد إلكتروني صحيح.' };
    }
  }
  return { valid: true };
}

export function formatEGP(amount: number): string {
  return new Intl.NumberFormat('ar-EG').format(Math.round(amount)) + ' ج.م';
}
