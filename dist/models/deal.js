"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
exports.isCustomerDiscount = (deal) => {
    return deal.discountedPrice !== undefined;
};
exports.isGetXForY = (deal) => {
    return deal.getCount !== undefined;
};
