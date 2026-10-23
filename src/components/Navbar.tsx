import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Heart,
  Menu,
  X,
  Link2,
  Check,
  ChevronLeft,
  PhoneCall,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/catalogData';
import { ParsedRoute } from '../utils/catalogLogic';

interface NavbarProps {
  currentRoute: ParsedRoute;
  navigate: (to: string) => void;
  cartCount: number;
  wishlistCount: number;
  onQuickSearch: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  navigate,
  cartCount,
  wishlistCount,
  onQuickSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const navItems = [
    { label: 'الرئيسية', path: '/', active: currentRoute.page === 'home' },
    { label: 'من نحن', path: '/about', active: currentRoute.page === 'about' },
    { label: 'حجز خدماتنا', path: '/shop', active: currentRoute.page === 'shop' },
    {
      label: 'التشطيبات والديكورات',
      path: '/category/finishing-and-decor',
      active: currentRoute.page === 'category' && currentRoute.categoryId === 'finishing',
    },
    {
      label: 'الوحدات السكنية',
      path: '/category/apartments-and-residential',
      active: currentRoute.page === 'category' && currentRoute.categoryId === 'residential',
    },
    {
      label: 'المحلات التجارية',
      path: '/category/commercial-shops',
      active: currentRoute.page === 'category' && currentRoute.categoryId === 'commercial',
    },
    { label: 'تواصل معنا', path: '/contact', active: currentRoute.page === 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    onQuickSearch(searchInput);
  };

  const fullShareUrl = `https://${COMPANY_INFO.domain}${currentRoute.path}`;

  const handleCopyPageUrl = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E5E0D5] shadow-xs">
      {/* Main Navigation Row - High-contrast Light Mode */}
      <div className="max-w-[1360px] w-full mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Brand Wordmark & Official Crest */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-2.5 shrink-0 group focus-visible:outline-2 focus-visible:outline-[#854D0E] rounded-lg"
        >
          <img
            src={COMPANY_INFO.logoLight}
            alt={COMPANY_INFO.name}
            referrerPolicy="no-referrer"
            className="h-11 sm:h-13 w-auto object-contain"
          />
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-[#141413] group-hover:text-[#854D0E] transition-colors whitespace-nowrap">
            {COMPANY_INFO.shortName}
          </span>
        </a>

        {/* Zone 2: Single-line High-Contrast Navigation Links */}
        <nav
          aria-label="القائمة الرئيسية"
          className="hidden xl:flex items-center gap-1"
        >
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => handleLinkClick(e, item.path)}
              className={`px-2.5 py-2 rounded-lg text-[13px] font-bold transition-colors whitespace-nowrap shrink-0 ${
                item.active
                  ? 'text-[#78470A] bg-[#FEF3C7]/80 underline decoration-[#854D0E] decoration-2 underline-offset-8'
                  : 'text-[#1F1E1B] hover:text-[#78470A] hover:bg-[#F5F2EB]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Interactive Actions (Search, Cart, Direct Contact) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="البحث في العقارات والخدمات"
            className="p-2 rounded-lg text-[#1F1E1B] hover:bg-[#F5F2EB] hover:text-[#78470A] transition-colors focus-visible:outline-2 focus-visible:outline-[#854D0E] cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          <a
            href="/shop"
            onClick={(e) => handleLinkClick(e, '/shop')}
            aria-label={`الوحدات المفضلة (${wishlistCount})`}
            className="relative p-2 rounded-lg text-[#1F1E1B] hover:bg-[#F5F2EB] hover:text-[#78470A] transition-colors hidden sm:inline-flex items-center"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -left-1 min-w-5 h-5 px-1 rounded-full bg-[#141413] text-[#FDE047] text-[11px] font-bold flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </a>

          <a
            href="/cart"
            onClick={(e) => handleLinkClick(e, '/cart')}
            aria-label={`سلة طلبات المعاينة والحجز (${cartCount})`}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141413] text-white hover:bg-[#292724] transition-colors font-bold text-xs sm:text-sm whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-[#FBBF24]" />
            <span>السلة</span>
            <span
              data-testid="navbar-cart-count"
              className="px-1.5 py-0.5 rounded bg-[#D49B16] text-[#141413] text-xs font-extrabold tabular-nums"
            >
              {cartCount}
            </span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="فتح القائمة"
            className="xl:hidden p-2 rounded-lg text-[#141413] hover:bg-[#F5F2EB] border border-[#E5E0D5]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Quick Search Bar */}
      {searchOpen && (
        <div className="bg-[#FAF9F5] border-t border-[#E5E0D5] py-3 px-4 sm:px-6">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-3xl mx-auto flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#57534E] absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ابحث عن شقة، فيلا، مشروع 124 A، باقة تشطيب، أو محل تجاري..."
                className="w-full pr-10 pl-4 py-2.5 bg-white border border-[#D6D0C4] rounded-lg text-sm text-[#141413] placeholder:text-[#57534E] focus:outline-none focus:border-[#854D0E]"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#D49B16] hover:bg-[#B8830F] text-[#141413] font-bold text-sm rounded-lg transition-colors whitespace-nowrap"
            >
              بحث الآن
            </button>
          </form>
        </div>
      )}

      {/* Dedicated Page Route & Breadcrumb Bar - Gives every page a visible, shareable URL */}
      <div className="bg-[#F4F1EA] border-t border-[#E5E0D5] px-3 sm:px-6 lg:px-8 py-1.5">
        <div className="max-w-[1360px] w-full mx-auto flex items-center justify-between gap-2 text-xs overflow-hidden">
          {/* Breadcrumb navigation */}
          <div className="flex items-center gap-1.5 text-[#3F3C37] font-semibold truncate">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="hover:text-[#78470A] transition-colors shrink-0"
            >
              الرئيسية
            </a>
            {currentRoute.page !== 'home' && (
              <>
                <ChevronLeft className="w-3.5 h-3.5 text-[#78716C] shrink-0" />
                <span className="text-[#141413] font-bold truncate">{currentRoute.title}</span>
              </>
            )}
          </div>

          
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-[#E5E0D5] px-4 py-4 space-y-1.5 shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => handleLinkClick(e, item.path)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-bold ${
                item.active
                  ? 'bg-[#FEF3C7] text-[#78470A]'
                  : 'text-[#141413] hover:bg-[#F5F2EB]'
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 mt-2 border-t border-[#E5E0D5] flex items-center justify-between">
            <a
              href={`tel:${COMPANY_INFO.phones[0]}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#78470A]"
            >
              <PhoneCall className="w-4 h-4" />
              <span className="tabular-nums" dir="ltr">
                {COMPANY_INFO.phones[0]}
              </span>
            </a>
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="px-4 py-2 rounded-lg bg-[#D49B16] text-[#141413] text-xs font-extrabold"
            >
              طلب استشارة هندسية
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
