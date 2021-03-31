import { getPizzaPriceFromSource, Size, Pizza } from './pizzaService';

describe('getPizzaPriceFromSource', () => {
  it('gets the first available price', () => {
    const size = Size.LARGE;
    const availableSizes: Pizza[] = [
      { size: Size.LARGE, name: 'Large Pizza', description: '15" Pizza for four persons', retailPrice: 1000 },
      { size: Size.LARGE, name: 'Large Pizza', description: '12" Pizza for two persons', retailPrice: 999 },
    ];

    const result = getPizzaPriceFromSource(size, availableSizes);
    expect(result).toStrictEqual(1000);
  });

  // I don't really like handling error cases with Exception, but since we don't know what we need to do with edge
  // cases, throwing Exception makes sense in this case
  it('throws an exception if cannot find the price', () => {
    const size = Size.SMALL;
    const availableSizes: Pizza[] = [
      { size: Size.LARGE, name: 'Large Pizza', description: '15" Pizza for four persons', retailPrice: 1000 },
      { size: Size.MEDIUM, name: 'Medium Pizza', description: '12" Pizza for two persons', retailPrice: 999 },
    ];
    expect(() => getPizzaPriceFromSource(size, availableSizes)).toThrowError('error: getPizzaPriceFromSource - Cannot read property \'retailPrice\' of undefined');
  });
});
