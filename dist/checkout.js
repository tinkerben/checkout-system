"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cartService_1 = require("./services/cartService");
// Unlike the pseudocode, the constructor for Checkout needs pricingRules, availableSizes, and customer
// constructor cannot be async thus the params needs to be resolved before hand
exports.Checkout = class Checkout {
    constructor(customer, availableSizes, pricingRules) {
        this.add = (size) => {
            this.state.cart = cartService_1.addItemToCart(size, this.state.cart);
        };
        this.total = () => {
            return cartService_1.getCartTotalCost(this.state.customer, this.state.cart, this.state.availableSizes, this.state.pricingRules);
        };
        this.state = {
            customer,
            cart: [],
            availableSizes,
            pricingRules,
        };
    }
    ;
};
