import { NacelleProduct } from '../../../src/mappers/nacelle-product';

const paramsNoId = {
  id: 'abc123',
};

test('Constructor throws if no handle parameter exists', () => {
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
  handle: 'chair',
  availableForSale: false,
  productType: 'furniture',
  vendor: 'Knoll',
  tags: 'abc, 123, zyx',
  createdAt: '2021-04-12T19:54:41.390Z',
  updatedAt: '2021-04-12T19:58:24.840Z',
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

test('Constructor sets productType', () => {
  expect(nacelleProduct.productType).toBe(params.productType);
});

test('Constructor sets vendor', () => {
  expect(nacelleProduct.vendor).toBe(params.vendor);
});

test('Constructor sets and formats tags', () => {
  expect(nacelleProduct.tags).toEqual(['abc', '123', 'zyx']);
});

test('Constructor sets and formats createdAt', () => {
  expect(nacelleProduct.createdAt).toEqual(1618257281);
});

test('Constructor sets and formats updatedAt', () => {
  expect(nacelleProduct.updatedAt).toEqual(1618257505);
});
