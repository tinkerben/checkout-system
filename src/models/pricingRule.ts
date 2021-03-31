import { Size } from '../services/pizzaService';
import { Deal } from './deal';

export interface PricingRule {
  id: number;
  size: Size;
  deal: Deal;
};
