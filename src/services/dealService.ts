import { CustomerDiscount, GetXForY } from '../models/deal';

export const calculateCustomerDiscountCost = (deal: CustomerDiscount, noOfItemsInTheCart: number): number => {
  const cost = noOfItemsInTheCart * deal.discountedPrice;
  return cost;
};

export const calculateGetXForYCost = (deal: GetXForY, noOfItemsInTheCart: number, retailPrice: number): number => {
  const noOfItemWithRetailPrice = noOfItemsInTheCart % deal.getCount;
  const noOfItemWithDealPrice = Math.floor(noOfItemsInTheCart / deal.getCount) * deal.getCount;

  // Do the division last, and also always perform calculation with no floation points
  const dealPrice = deal.forCount * (retailPrice * 100) / deal.getCount / 100;
  const cost = (noOfItemWithDealPrice * dealPrice) + (noOfItemWithRetailPrice * retailPrice);
  return cost;
};

export const numberToMoney = (input: number): string => {
  return input.toFixed(2);
};
