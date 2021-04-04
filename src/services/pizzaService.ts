export enum Size {
  SMALL, MEDIUM, LARGE
};

export enum CustomerEnum {
  MICROSOFT,
  AMAZON,
  FACEBOOK,
};

export interface Pizza {
  size: Size;
  name: string;
  description: string;
  retailPrice: number;
};

export const getPizzaPriceFromSource = (size: Size, availablePizzas: Pizza[]): number => {
  try {
    return availablePizzas.filter(a => { return a.size == size; })[0].retailPrice;
  } catch (e) {
    throw new Error(`error: getPizzaPriceFromSource - ${e.message}`);
  }
};
