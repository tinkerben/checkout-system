"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkout_1 = require("./checkout");
const pizzaService_1 = require("./services/pizzaService");
const helper_1 = require("./helper");
const run = async () => {
    const availableSizes = await helper_1.getAllSizes();
    const pricingRules = await helper_1.getPricingRulesForCustomer();
    const customer = { name: 'Amazon' };
    // Constructor cannot be async and this is why we are using a factory pattern
    // where the params are already resolved before hand
    const checkout = new checkout_1.Checkout(customer, availableSizes, pricingRules);
    checkout.add(pizzaService_1.Size.MEDIUM);
    checkout.add(pizzaService_1.Size.MEDIUM);
    checkout.add(pizzaService_1.Size.MEDIUM);
    checkout.add(pizzaService_1.Size.LARGE);
    // checkout.add(Size.SMALL);
    // checkout.add(Size.SMALL);
    // checkout.add(Size.SMALL);
    // checkout.add(Size.LARGE);
    console.log(checkout.total());
};
run();
