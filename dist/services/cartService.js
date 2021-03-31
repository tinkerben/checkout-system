"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deal_1 = require("../models/deal");
const dealService_1 = require("./dealService");
const pizzaService_1 = require("./pizzaService");
;
exports.calculateCartItem = (customer, pricingRules, item) => {
    const matchingDiscountRules = pricingRules.filter(r => {
        return r.id == pizzaService_1.CustomerEnum[customer.name.toUpperCase()];
    });
    const noOfMatchingDiscountRules = matchingDiscountRules.length;
    const matchingPricingRules = pricingRules.filter(r => {
        return r.id == pizzaService_1.CustomerEnum[customer.name.toUpperCase()] && r.size == item.size;
    });
    const noOfMatchingPricingRules = matchingPricingRules.length;
    let cost;
    cost = item.count * item.basePrice;
    // console.info('info: calculate with retail price');
    const thePricingRule = matchingDiscountRules[noOfMatchingDiscountRules - 1];
    if (matchingDiscountRules[noOfMatchingDiscountRules - 1] && deal_1.isCustomerDiscount(thePricingRule.deal)) {
        cost = dealService_1.calculateCustomerDiscountCost(thePricingRule.deal, item.count);
        console.info('info: calculate with CustomerDiscount');
    }
    if (noOfMatchingPricingRules > 0) {
        const thePricingRule = matchingPricingRules[noOfMatchingPricingRules - 1];
        cost = dealService_1.calculateGetXForYCost(thePricingRule.deal, item.count, item.basePrice);
        console.info('info: calculate with GetXForYCost' + cost);
    }
    return cost;
};
// Using object.assign, needs polyfill if this end up in IE 11 or below
exports.addItemToCart = (size, cart) => {
    if (cart.filter(ci => { return ci.size == size; }).length == 0) {
        cart.push({ size, count: 1 });
        return cart;
    }
    else {
        const firstMatchedCartItemIndex = cart.findIndex(ci => { return ci.size == size; });
        const firstMatchedCartItem = cart[firstMatchedCartItemIndex];
        const updatedCartItem = Object.assign(Object.assign({}, firstMatchedCartItem), { count: firstMatchedCartItem.count + 1 });
        return Object.assign([...cart], { [firstMatchedCartItemIndex]: updatedCartItem });
    }
};
;
const getPizzaPrice = (cartItem, priceTable) => {
    const price = pizzaService_1.getPizzaPriceFromSource(cartItem.size, priceTable);
    return Object.assign(Object.assign({}, cartItem), { basePrice: price });
};
exports.getCartTotalCost = (customer, cart, availableSizes, pricingRules) => {
    const cost = cart
        .map(ci => getPizzaPrice(ci, availableSizes))
        .map(cip => exports.calculateCartItem(customer, pricingRules, cip))
        .reduce((accumulator, current) => { return accumulator + current; }, 0);
    const roundedCost = dealService_1.numberToMoney(cost);
    return roundedCost;
};
