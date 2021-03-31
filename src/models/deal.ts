export interface CustomerDiscount {
  discountedPrice: number;
};
export interface GetXForY {
  getCount: number;
  forCount: number;
};

export type Deal = CustomerDiscount | GetXForY;

export const isCustomerDiscount = (deal: Deal): deal is CustomerDiscount => {
  return (deal as CustomerDiscount).discountedPrice !== undefined;
};

export const isGetXForY = (deal: Deal): deal is GetXForY => {
  return (deal as GetXForY).getCount !== undefined;
};
