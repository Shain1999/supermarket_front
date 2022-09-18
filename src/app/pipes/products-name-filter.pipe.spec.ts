import { ProductsNameFilterPipe } from './products-name-filter.pipe';

describe('ProductsNameFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductsNameFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
