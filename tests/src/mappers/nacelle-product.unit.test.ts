import { NacelleProduct } from '../../../src/mappers/nacelle-product';

const paramsNoId = {
  id: 'abc123',
};

test('Constuctor throws if no handle parameter exists', () => {
  expect(() => {
    const nacelleProductNoHandle = new NacelleProduct(paramsNoId);
  }).toThrow('Nacelle Product mapper must have a handle param');
});

const paramsNoAvailableForSale = {
  id: 'abc123',
  handle: 'foobar',
};

test('Constructor throws if the availableForSale parameter does not exist', () => {
  expect(() => {
    const nacelleProductNoAvailableForSales = new NacelleProduct(paramsNoAvailableForSale);
  }).toThrow('Nacelle Product mapper must have the availableForSale parameter');
});

const params = {
  id: 'zyx123',
  handle: 'foobar',
  availableForSale: true,
};

const nacelleProduct = new NacelleProduct(params);

test('Constructor sets id', () => {
  expect(nacelleProduct.id).toBe(params.id);
});

test('Constructor sets handle', () => {
  expect(nacelleProduct.handle).toBe(params.handle);
});

test('Constructor sets availableForSale', () => {
  expect(nacelleProduct.availableForSale).toBe(params.availableForSale);
});
