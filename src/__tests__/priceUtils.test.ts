import {
  calculateSubtotal,
  calculateDeliveryFee,
  calculateTax,
  calculateDiscount,
  calculateTotal
} from '../utils/priceUtils';
import { CartItem } from '../types/cart';

describe('priceUtils', () => {
  const mockItems: CartItem[] = [
    {
      id: '1',
      foodId: 'food-1',
      restaurantId: 'res-1',
      name: 'Item 1',
      price: 100,
      quantity: 2,
      customizations: [
        { customizationId: 'c1', customizationTitle: 'T', optionId: 'o1', optionName: 'O1', price: 20 }
      ]
    }
  ];

  test('calculateSubtotal should correctly sum item prices and customizations', () => {
    // (100 + 20) * 2 = 240
    expect(calculateSubtotal(mockItems)).toBe(240);
  });

  test('calculateDeliveryFee should be 0 for subtotal > 500', () => {
    expect(calculateDeliveryFee(600)).toBe(0);
    expect(calculateDeliveryFee(400)).toBe(40);
  });

  test('calculateTax should be 5%', () => {
    expect(calculateTax(200)).toBe(10);
  });

  test('calculateDiscount should apply percentage discount', () => {
    const coupon = { discountPercentage: 10, maxDiscount: 50 };
    expect(calculateDiscount(200, coupon)).toBe(20);
    expect(calculateDiscount(600, coupon)).toBe(50);
  });

  test('calculateTotal should correctly sum all parts', () => {
    expect(calculateTotal(240, 40, 12, 20)).toBe(272);
  });
});
