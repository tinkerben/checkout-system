import { Checkout } from './checkout';
import { Pizza, Size } from './services/pizzaService';
import { PricingRule } from './models/pricingRule';

describe('checkout', () => {

  it('mutates its state and calculate cost just fine', async () => {
    const availableSizes: Pizza[] = [
      { size: Size.SMALL, name: 'Small Pizza', description: 'Test', retailPrice: 7 },
      { size: Size.MEDIUM, name: 'Medium Pizza', description: 'Test', retailPrice: 8 },
    ];

    const pricingRules: PricingRule[] = [
      { id: 1, size: Size.SMALL, deal: { discountedPrice : 4 }},
      { id: 1, size: Size.MEDIUM, deal: { getCount: 2, forCount: 1 }},
    ];

    const customer = {
      name: 'Test Candidate',
    };
    const c = new Checkout(customer, availableSizes, pricingRules);

    c.add(Size.SMALL);
    c.add(Size.SMALL);
    c.add(Size.MEDIUM);
    c.add(Size.MEDIUM);
    c.add(Size.MEDIUM);
    const result = c.total();

    expect(result).toStrictEqual('24.00');
  });

  describe('while put against test scenarios', () => {

    const availableSizes: Pizza[] = [
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

    it('resolves the total cost for default customer', () => {

      const pricingRules: PricingRule[] = [];

      const customer = {
        name: 'default',
      };
      const c = new Checkout(customer, availableSizes, pricingRules);

      c.add(Size.SMALL);
      c.add(Size.MEDIUM);
      c.add(Size.LARGE);
      const result = c.total();

      expect(result).toStrictEqual('49.97');

    });

    it('resolves the total cost for Microsoft', () => {

      const pricingRules: PricingRule[] = [
        { id: 1, size: Size.MEDIUM, deal: { discountedPrice : 299.99 }},
      ];

      const customer = {
        name: 'Microsoft',
      };
      const c = new Checkout(customer, availableSizes, pricingRules);

      c.add(Size.MEDIUM);
      c.add(Size.MEDIUM);
      c.add(Size.MEDIUM);
      c.add(Size.LARGE);
      const result = c.total();

      expect(result).toStrictEqual('45.97');

    });

    it('resolves the total cost for Amazon', () => {

      const pricingRules: PricingRule[] = [
        { id: 1, size: Size.SMALL, deal: { getCount: 3, forCount: 2 }},
      ];

      const customer = {
        name: 'Amazon',
      };
      const c = new Checkout(customer, availableSizes, pricingRules);

      c.add(Size.SMALL);
      c.add(Size.SMALL);
      c.add(Size.SMALL);
      c.add(Size.LARGE);
      const result = c.total();

      expect(result).toStrictEqual('67.96');

    });
  });
});
