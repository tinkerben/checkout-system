import { Checkout } from './checkout';
import { Size} from './services/pizzaService';
import { getAllSizes, getPricingRulesForCustomer } from './fakeDb';

const run = async () => {

  const availableSizes = await getAllSizes();
  const pricingRules = await getPricingRulesForCustomer();
  const customer = { name: 'Amazon' };

  const checkout = new Checkout(customer, availableSizes, pricingRules);

  checkout.add(Size.MEDIUM);
  checkout.add(Size.MEDIUM);
  checkout.add(Size.MEDIUM);
  checkout.add(Size.LARGE);
  // checkout.add(Size.LARGE);
  // checkout.add(Size.LARGE);
  // checkout.add(Size.LARGE);
  // checkout.add(Size.LARGE);

  // checkout.add(Size.SMALL);
  // checkout.add(Size.SMALL);
  // checkout.add(Size.SMALL);
  // checkout.add(Size.LARGE);

  console.log('Total $' + checkout.total());
};

run();
