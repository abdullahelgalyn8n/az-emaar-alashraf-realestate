/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { MessageCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { COMPANY_INFO, PropertyItem } from './data/catalogData';
import { CartEntry, parseAppRoute } from './utils/catalogLogic';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { CartPage } from './pages/CartPage';
import { ContactPage, LegalPage } from './pages/ContactAndLegalPage';

export default function App() {
  const [routeState, setRouteState] = useState(() => ({
    pathname: window.location.pathname,
    search: window.location.search,
  }));

  const [quickSearchQuery, setQuickSearchQuery] = useState('');

  const [cart, setCart] = useState<CartEntry[]>(() => {
    try {
      const saved = localStorage.getItem('emaar_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('emaar_wishlist_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastItem, setToastItem] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('emaar_cart_v1', JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('emaar_wishlist_v1', JSON.stringify(wishlist));
    } catch {
      // ignore storage errors
    }
  }, [wishlist]);

  useEffect(() => {
    const handlePopState = () => {
      setRouteState({
        pathname: window.location.pathname,
        search: window.location.search,
      });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const currentRoute = parseAppRoute(routeState.pathname, routeState.search);

  useEffect(() => {
    document.title = `${currentRoute.title} | ${COMPANY_INFO.name}`;
  }, [currentRoute.title]);

  const navigate = (to: string) => {
    const url = new URL(to, window.location.origin);
    window.history.pushState({}, '', url.pathname + url.search);
    setRouteState({
      pathname: url.pathname,
      search: url.search,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (
    property: PropertyItem,
    requestType: 'inspection' | 'reservation' = 'inspection',
    preferredPayment: 'cash' | 'installments' = 'installments'
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((e) => e.property.id === property.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          requestType,
          preferredPayment,
        };
        return updated;
      }
      return [
        ...prev,
        {
          property,
          quantity: 1,
          requestType,
          preferredPayment,
        },
      ];
    });
    setToastItem(property.title);
    setTimeout(() => setToastItem(null), 3200);
  };

  const handleRemoveFromCart = (propertyId: string) => {
    setCart((prev) => prev.filter((e) => e.property.id !== propertyId));
  };

  const handleUpdateCartEntry = (
    propertyId: string,
    updates: Partial<Pick<CartEntry, 'requestType' | 'preferredPayment'>>
  ) => {
    setCart((prev) =>
      prev.map((e) => (e.property.id === propertyId ? { ...e, ...updates } : e))
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleWishlist = (propertyId: string) => {
    setWishlist((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleQuickSearch = (query: string) => {
    setQuickSearchQuery(query);
    navigate('/shop');
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#FAF9F5] text-[#141413]">
      <Navbar
        currentRoute={currentRoute}
        navigate={navigate}
        cartCount={cart.length}
        wishlistCount={wishlist.length}
        onQuickSearch={handleQuickSearch}
      />

      <main className="flex-1">
        {currentRoute.page === 'home' && (
          <HomePage
            onNavigate={navigate}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentRoute.page === 'about' && <AboutPage onNavigate={navigate} />}

        {currentRoute.page === 'shop' && (
          <ShopPage
            key={quickSearchQuery}
            initialSearchQuery={quickSearchQuery}
            onNavigate={navigate}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentRoute.page === 'category' && (
          <CategoryPage
            categoryId={currentRoute.categoryId}
            activeSubcategory={currentRoute.subcategoryId}
            onNavigate={navigate}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentRoute.page === 'property' && (
          <PropertyDetailPage
            slugOrId={currentRoute.slugOrId}
            onNavigate={navigate}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentRoute.page === 'cart' && (
          <CartPage
            entries={cart}
            onNavigate={navigate}
            onRemoveEntry={handleRemoveFromCart}
            onUpdateEntry={handleUpdateCartEntry}
            onClearCart={handleClearCart}
          />
        )}

        {currentRoute.page === 'contact' && <ContactPage onNavigate={navigate} />}

        {currentRoute.page === 'legal' && (
          <LegalPage section={currentRoute.section} onNavigate={navigate} />
        )}
      </main>

      <Footer onNavigate={navigate} />

      {/* Cart Feedback Toast */}
      {toastItem && (
        <div
          role="status"
          className="fixed bottom-20 right-6 z-50 bg-[#141413] text-white border border-[#D49B16] rounded-xl px-4 py-3 shadow-xl flex items-center gap-3 max-w-sm"
        >
          <CheckCircle2 className="w-5 h-5 text-[#4ADE80] shrink-0" />
          <div className="text-xs">
            <div className="font-extrabold text-[#FDE047]">تمت الإضافة للسلة</div>
            <div className="text-[#E7E5E4] line-clamp-1">{toastItem}</div>
          </div>
          <button
            type="button"
            onClick={() => {
              setToastItem(null);
              navigate('/cart');
            }}
            className="mr-auto px-2.5 py-1 rounded bg-[#D49B16] text-[#141413] font-extrabold text-[11px] flex items-center gap-1 whitespace-nowrap cursor-pointer"
          >
            <span>عرض السلة</span>
            <ArrowLeft className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Quick Contact Button (Matches reference bottom-left green chat button) */}
      <button
        type="button"
        onClick={() => navigate('/contact')}
        aria-label="تواصل معنا عبر واتساب أو الاستشارات المباشرة"
        className="fixed bottom-5 left-5 z-40 w-13 h-13 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
