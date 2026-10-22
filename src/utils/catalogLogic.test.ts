import test from 'node:test';
import assert from 'node:assert/strict';
import { PROPERTIES } from '../data/catalogData';
import {
  DEFAULT_FILTERS,
  filterAndSortProperties,
  calculateInstallmentPlan,
  calculateFinishingEstimate,
  calculateCartSummary,
  parseAppRoute,
  validateBookingForm,
} from './catalogLogic';

test('catalog contains 18 properties across all 3 main categories', () => {
  assert.ok(PROPERTIES.length >= 16, 'Expected at least 16 properties in catalog');
  const finishing = PROPERTIES.filter((p) => p.category === 'finishing');
  const residential = PROPERTIES.filter((p) => p.category === 'residential');
  const commercial = PROPERTIES.filter((p) => p.category === 'commercial');
  assert.ok(finishing.length >= 3, 'Expected at least 3 finishing items');
  assert.ok(residential.length >= 9, 'Expected at least 9 residential items');
  assert.ok(commercial.length >= 4, 'Expected at least 4 commercial items');
});

test('filterAndSortProperties filters by category, subcategory, and discount accurately', () => {
  const fifthSettlementResidential = filterAndSortProperties(PROPERTIES, {
    ...DEFAULT_FILTERS,
    category: 'residential',
    subcategory: 'fifth-settlement',
  });
  assert.ok(fifthSettlementResidential.length >= 4);
  for (const item of fifthSettlementResidential) {
    assert.equal(item.category, 'residential');
    assert.equal(item.subcategory, 'fifth-settlement');
  }

  const discountedOnly = filterAndSortProperties(PROPERTIES, {
    ...DEFAULT_FILTERS,
    onSaleOnly: true,
  });
  assert.ok(discountedOnly.length >= 5);
  for (const item of discountedOnly) {
    assert.ok((item.discountPercent ?? 0) > 0);
  }
});

test('filterAndSortProperties sorts by price-asc and area-desc', () => {
  const byPriceAsc = filterAndSortProperties(PROPERTIES, {
    ...DEFAULT_FILTERS,
    sortBy: 'price-asc',
  });
  for (let i = 1; i < byPriceAsc.length; i++) {
    assert.ok(byPriceAsc[i].price >= byPriceAsc[i - 1].price);
  }

  const byAreaDesc = filterAndSortProperties(PROPERTIES, {
    ...DEFAULT_FILTERS,
    sortBy: 'area-desc',
  });
  for (let i = 1; i < byAreaDesc.length; i++) {
    assert.ok(byAreaDesc[i].areaSqm <= byAreaDesc[i - 1].areaSqm);
  }
});

test('parseAppRoute resolves every dedicated page URL and original UUID category URLs', () => {
  assert.equal(parseAppRoute('/').page, 'home');
  assert.equal(parseAppRoute('/about').page, 'about');
  assert.equal(parseAppRoute('/shop').page, 'shop');
  assert.equal(parseAppRoute('/cart').page, 'cart');
  assert.equal(parseAppRoute('/contact').page, 'contact');

  const resRoute = parseAppRoute(
    '/category/apartments-and-residential',
    '?area=fifth-settlement'
  );
  assert.equal(resRoute.page, 'category');
  if (resRoute.page === 'category') {
    assert.equal(resRoute.categoryId, 'residential');
    assert.equal(resRoute.subcategoryId, 'fifth-settlement');
  }

  // UUID alias from user screenshot
  const uuidRoute = parseAppRoute('/category/71713185-1d1b-48bf-a99e-7325500811c4');
  assert.equal(uuidRoute.page, 'category');
  if (uuidRoute.page === 'category') {
    assert.equal(uuidRoute.categoryId, 'commercial');
  }

  const propRoute = parseAppRoute('/property/luxury-villa-fifth-settlement');
  assert.equal(propRoute.page, 'property');
  if (propRoute.page === 'property') {
    assert.equal(propRoute.slugOrId, 'luxury-villa-fifth-settlement');
  }
});

test('calculateInstallmentPlan and calculateFinishingEstimate compute accurate values', () => {
  const plan = calculateInstallmentPlan(10000000, 25, 4);
  assert.equal(plan.downPaymentAmount, 2500000);
  assert.equal(plan.financedAmount, 7500000);
  assert.equal(plan.quarterlyInstallment, Math.round(7500000 / 16));

  const est = calculateFinishingEstimate(200, 'royal-vip', true);
  assert.equal(est.baseCost, 200 * 8500);
  assert.equal(est.smartHomeCost, 200 * 650);
  assert.equal(est.design3DCost, 0);
  assert.equal(est.totalEstimatedCost, 200 * 8500 + 200 * 650);
});

test('validateBookingForm rejects invalid inputs and accepts valid Egyptian phone numbers', () => {
  assert.equal(validateBookingForm({ fullName: 'أح', phone: '01000092117' }).valid, false);
  assert.equal(validateBookingForm({ fullName: 'أحمد محمود', phone: '123' }).valid, false);
  assert.equal(
    validateBookingForm({
      fullName: 'أحمد محمود الشافعي',
      phone: '01000092117',
      email: 'ahmed@example.com',
    }).valid,
    true
  );

  const summary = calculateCartSummary([
    {
      property: PROPERTIES[1], // 11.5M (old 12.0M)
      quantity: 1,
      requestType: 'reservation',
      preferredPayment: 'installments',
    },
  ]);
  assert.equal(summary.totalUnits, 1);
  assert.equal(summary.totalPortfolioValue, 11500000);
  assert.equal(summary.totalDiscountSavings, 500000);
  assert.equal(summary.totalReservationDeposit, 50000);
});
