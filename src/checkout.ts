import { Size, Pizza } from './services/pizzaService';
import { PricingRule } from './models/pricingRule';
import { addItemToCart, getCartTotalCost, CartItem } from './services/cartService';

interface AppState {
  customer: Customer;
  cart: CartItem[];
  availableSizes: Pizza[];
  pricingRules: PricingRule[];
}

export interface Customer {
  name: string;
}

export const Checkout = class Checkout {
  private state: AppState;

  public constructor(customer: Customer, availableSizes: Pizza[], pricingRules: PricingRule[]) {
    this.state = {
      customer,
      cart: [],
      availableSizes,
      pricingRules,
    };
  };

  public add = (size: Size): void => {
    this.state.cart = addItemToCart(size, this.state.cart);
  };

  public total = (): string => {
    return getCartTotalCost(this.state.customer,
      this.state.cart,
      this.state.availableSizes,
      this.state.pricingRules
    );
  };
};
