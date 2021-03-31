"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pizzaService_1 = require("./services/pizzaService");
// In real application, these functions will get a real data from a data source
// Assuming that we get this from database or other API, thus the async
// Assuming that these ads would be unique
exports.getAllSizes = async () => {
    return [
        {
            size: pizzaService_1.Size.SMALL,
            name: 'Small Pizza',
            description: '10" pizza for one person',
            retailPrice: 11.99,
        },
        {
            size: pizzaService_1.Size.MEDIUM,
            name: 'Medium Pizza',
            description: '12" pizza for one person',
            retailPrice: 15.99,
        },
        {
            size: pizzaService_1.Size.LARGE,
            name: 'Large Pizza',
            description: '15" pizza for one person',
            retailPrice: 21.99,
        },
    ];
};
// Assuming that we get this from database or other API, thus the async
// Assuming that the pricing rules here are the only one applicable for a customer
exports.getPricingRulesForCustomer = async () => {
    return [
        { id: 0, size: pizzaService_1.Size.SMALL, deal: { getCount: 3, forCount: 2 } },
        { id: 1, size: pizzaService_1.Size.LARGE, deal: { discountedPrice: 19.99 } },
        { id: 2, size: pizzaService_1.Size.MEDIUM, deal: { getCount: 5, forCount: 4 } },
    ];
};
