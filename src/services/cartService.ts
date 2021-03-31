import { GetXForY, isCustomerDiscount} from '../models/deal';
import { calculateCustomerDiscountCost, calculateGetXForYCost, numberToMoney } from './dealService';
import { PricingRule } from '../models/pricingRule';
import {Size, Pizza, getPizzaPriceFromSource, CustomerEnum} from './pizzaService';
import {Customer} from "../checkout";

export interface CartItem {
  size: Size;
  count: number;
};

export const calculateCartItem = (customer: Customer, pricingRules: PricingRule[], item: CartItemWithPrice): number => {
  const matchingDiscountRules = pricingRules.filter(r => {
    return r.id == (<any>CustomerEnum)[customer.name.toUpperCase()];
  });
  const noOfMatchingDiscountRules = matchingDiscountRules.length;

  const matchingPricingRules = pricingRules.filter(r => {
    return r.id == (<any>CustomerEnum)[customer.name.toUpperCase()] && r.size == item.size;
  });
  const noOfMatchingPricingRules = matchingPricingRules.length;

  let cost;
  cost = item.count * item.basePrice;
  // console.info('info: calculate with retail price');

  const thePricingRule = matchingDiscountRules[noOfMatchingDiscountRules - 1];
  if (matchingDiscountRules[noOfMatchingDiscountRules - 1] && isCustomerDiscount(thePricingRule.deal)) {
    cost = calculateCustomerDiscountCost(thePricingRule.deal, item.count);
    // console.info('info: calculate with CustomerDiscount');
  }

  if (noOfMatchingPricingRules > 0) {
    const thePricingRule = matchingPricingRules[noOfMatchingPricingRules - 1];

    cost = calculateGetXForYCost(<GetXForY>thePricingRule.deal, item.count, item.basePrice);
    // console.info('info: calculate with GetXForYCost' + cost);
  }

  return cost;
};

// Using object.assign, needs polyfill if this end up in IE 11 or below
export const addItemToCart = (size: Size, cart: CartItem[]): CartItem[] => {
  if (cart.filter(ci => { return ci.size == size; }).length == 0) {
    cart.push({ size, count: 1 });
    return cart;
  } else {
    const firstMatchedCartItemIndex = cart.findIndex(ci => { return ci.size == size; });
    const firstMatchedCartItem = cart[firstMatchedCartItemIndex];
    const updatedCartItem = {...firstMatchedCartItem, count: firstMatchedCartItem.count + 1};
    return Object.assign([...cart], {[firstMatchedCartItemIndex]: updatedCartItem});
  }
};

export interface CartItemWithPrice extends CartItem {
  basePrice: number;
};

const getPizzaPrice = (cartItem: CartItem, priceTable: Pizza[]): CartItemWithPrice => {
  const price = getPizzaPriceFromSource(cartItem.size, priceTable);
  return {...cartItem, basePrice: price};
};

export const getCartTotalCost = (
  customer: Customer,
  cart: CartItem[],
  availableSizes: Pizza[],
  pricingRules: PricingRule[]
): string => {
  const cost = cart
    .map(ci => getPizzaPrice(ci, availableSizes))
    .map(cip => calculateCartItem(customer, pricingRules, cip))
    .reduce((accumulator, current) => { return accumulator + current;}, 0);

  const roundedCost = numberToMoney(cost);
  return roundedCost;
};
