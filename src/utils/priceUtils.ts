import { CartItem } from '../types/cart';

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const itemTotal = (item.price + item.customizations.reduce((sum, cust) => sum + cust.price, 0)) * item.quantity;
    return total + itemTotal;
  }, 0);
};

export const calculateDeliveryFee = (subtotal: number): number => {
  if (subtotal === 0) return 0;
  return subtotal > 500 ? 0 : 40; // Free delivery above 500
};

export const calculateTax = (subtotal: number): number => {
  return Math.round(subtotal * 0.05); // 5% GST
};

export const calculateDiscount = (subtotal: number, coupon?: { discountPercentage?: number, flatDiscount?: number, maxDiscount?: number }): number => {
  if (!coupon) return 0;

  let discount = 0;
  if (coupon.discountPercentage) {
    discount = (subtotal * coupon.discountPercentage) / 100;
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
  } else if (coupon.flatDiscount) {
    discount = coupon.flatDiscount;
  }

  return Math.min(discount, subtotal);
};

export const calculateTotal = (subtotal: number, deliveryFee: number, tax: number, discount: number): number => {
  return Math.max(0, subtotal + deliveryFee + tax - discount);
};
