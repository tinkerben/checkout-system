import { PricingRule } from '../models/pricingRule';
import { Size } from './pizzaService';
import { CustomerDiscount, GetXForY } from '../models/deal';
import { calculateGetXForYCost } from './dealService';
import { calculateCartItem, addItemToCart, CartItemWithPrice, CartItem } from './cartService';
import {Customer} from "../checkout";

describe('calculateCartItem', () => {

  const discountedDeal: CustomerDiscount = {
    discountedPrice: 10,
  };

  const bundleDeal: GetXForY = {
    getCount: 4,
    forCount: 3,
  };

  const firstDeal = { id: 1, size: Size.SMALL, deal: discountedDeal };
  const secondDeal = { id: 2, size: Size.SMALL, deal: bundleDeal };
  const pricingRules: PricingRule[] = [ firstDeal, secondDeal ];

  describe('when the size matches several pricing rules', () => {
    const item: CartItemWithPrice = {
      size: Size.SMALL,
      count: 5,
      basePrice: 18,
    };

    const customer: Customer = {
      name: 'Amazon'
    }

    it('takes the last one', () => {
      const result = calculateCartItem(customer, pricingRules, item);
      expect(result).toStrictEqual(calculateGetXForYCost(secondDeal.deal, item.count, item.basePrice));
    });
  });

  describe('when the size does not match the pricing rules', () => {
    const item: CartItemWithPrice = {
      size: Size.LARGE,
      count: 5,
      basePrice: 28,
    };

    const customer: Customer = {
      name: 'Microsoft'
    }

    it('calculate based on the default price', () => {
      const result = calculateCartItem(customer, pricingRules, item);
      expect(result).toStrictEqual(item.count * item.basePrice);
    });
  });

});

describe('addItemToCart', () => {
  it('adds item to an empty cart', () => {
    const existingCart: CartItem[] = [];
    const newPizza: Size = Size.LARGE;
    const expectedResult: CartItem[] = [{ size: Size.LARGE, count: 1 }];

    const result: CartItem[] = addItemToCart(newPizza, existingCart);
    expect(result).toStrictEqual(expectedResult);
  });

  it('adds new item to a cart', () => {
    const existingCart: CartItem[] = [{ size: Size.LARGE, count: 1 }];
    const newPizza: Size = Size.MEDIUM;
    const expectedResult: CartItem[] = [
      { size: Size.LARGE, count: 1 },
      { size: Size.MEDIUM, count: 1 },
    ];

    const result: CartItem[] = addItemToCart(newPizza, existingCart);
    expect(result).toStrictEqual(expectedResult);
  });

  it('increments the count of existing item in a cart', () => {
    const existingCart: CartItem[] = [{ size: Size.LARGE, count: 8 }];
    const newPizza: Size = Size.LARGE;
    const expectedResult: CartItem[] = [
      { size: Size.LARGE, count: 9 },
    ];

    const result: CartItem[] = addItemToCart(newPizza, existingCart);
    expect(result).toStrictEqual(expectedResult);
  });
});
