"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCustomerDiscountCost = (deal, noOfItemsInTheCart) => {
    const cost = noOfItemsInTheCart * deal.discountedPrice;
    return cost;
};
exports.calculateGetXForYCost = (deal, noOfItemsInTheCart, retailPrice) => {
    const noOfItemWithRetailPrice = noOfItemsInTheCart % deal.getCount;
    const noOfItemWithDealPrice = Math.floor(noOfItemsInTheCart / deal.getCount) * deal.getCount;
    // Do the division last, and also always perform calculation with no floation points
    const dealPrice = deal.forCount * (retailPrice * 100) / deal.getCount / 100;
    const cost = (noOfItemWithDealPrice * dealPrice) + (noOfItemWithRetailPrice * retailPrice);
    return cost;
};
exports.numberToMoney = (input) => {
    return input.toFixed(2);
};
