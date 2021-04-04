// import { isCustomerDiscount, isGetXForY} from '../models/deal';
import {calculateCustomerDiscountCost, calculateGetXForYCost, numberToMoney} from './dealService';
import { PricingRule } from '../models/pricingRule';
import {Size, Pizza, getPizzaPriceFromSource, CustomerEnum} from './pizzaService';
import {Customer} from "../checkout";
import {isCustomerDiscount, isGetXForY} from "..";

export interface CartItem {
  size: Size;
  count: number;
};

export const calculateCartItem = (customer: Customer, pricingRules: PricingRule[], item: CartItemWithPrice): number => {
  const matchingRules = pricingRules.filter(r => {
    return r.id == (<any>CustomerEnum)[customer.name.toUpperCase()];
  });

  let cost;
  cost = item.count * item.basePrice;

  matchingRules.forEach(i => {
    if (isCustomerDiscount(i.deal) && i.size == item.size) {
      cost = calculateCustomerDiscountCost(i.deal, item.count);
    }

    if (isGetXForY(i.deal) &&  i.size == item.size) {
      cost = calculateGetXForYCost(i.deal, item.count, item.basePrice);
    }
  });

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
