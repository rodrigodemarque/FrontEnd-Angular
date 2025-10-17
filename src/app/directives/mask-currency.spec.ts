import { MaskCurrency } from './mask-currency';

describe('MaskCurrency', () => {
  it('should create an instance', () => {
    const directive = new MaskCurrency();
    expect(directive).toBeTruthy();
  });
});
