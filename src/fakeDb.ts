import { Pizza, Size } from './services/pizzaService';
import { PricingRule } from './models/pricingRule';

// In real application, these functions will get a real data from a data source

// Assuming that we get this from database or other API, thus the async
// Assuming that these ads would be unique
export const getAllSizes = async (): Promise<Pizza[]> => {
  return [
    {
      size: Size.SMALL,
      name: 'Small Pizza',
      description: '10" pizza for one person',
      retailPrice: 11.99,
    },
    {
      size: Size.MEDIUM,
      name: 'Medium Pizza',
      description: '12" pizza for one person',
      retailPrice: 15.99,
    },
    {
      size: Size.LARGE,
      name: 'Large Pizza',
      description: '15" pizza for one person',
      retailPrice: 21.99,
    },
  ];
};

// Assuming that we get this from database or other API, thus the async
// Assuming that the pricing rules here are the only one applicable for a customer
export const getPricingRulesForCustomer = async (): Promise<PricingRule[]> => {
  return [
    { id: 0, size: Size.SMALL, deal: { getCount: 3, forCount: 2 }},
    // { id: 1, size: Size.LARGE, deal: { getCount: 5, forCount: 4 }},
    { id: 1, size: Size.LARGE, deal: { discountedPrice: 19.99 }},
    { id: 2, size: Size.MEDIUM, deal: { getCount: 5, forCount: 4 }},
  ];
};
