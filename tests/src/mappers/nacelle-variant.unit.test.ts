import { NacelleVariant } from '../../../src/mappers/nacelle-variant';

const paramsNoProductId = {
  id: 123,
};
const paramsNoPrice = {
  id: 123,
  productId: 987,
};
const paramsNoPriceCurrency = {
  id: 123,
  productId: 987,
  price: 19.99,
};
const params = {
  id: 123,
  productId: 987,
  availableForSale: false,
  price: 20.12,
  priceCurrency: 'usd',
  compareAtPrice: 29.95,
  quantityAvailable: 100,
  sku: 'foobar',
  weight: 1.98,
  weightUnit: 'lbs',
  createdAt: '2021-04-12T19:54:41.390Z',
  updatedAt: '2021-04-12T19:58:24.840Z',
};

test('Constructor throws if no product id exists', () => {
  expect(() => {
    const nacelleVariant = new NacelleVariant(paramsNoProductId);
  }).toThrow('Nacelle Variant parameters must include a parent productId');
});

const nacelleVariant = new NacelleVariant(params);

test('Constructor sets and casts productId to a string', () => {
  expect(nacelleVariant.productId).toBe(String(params.productId));
});

test('Constructor sets availableForSale', () => {
  expect(nacelleVariant.availableForSale).toBe(params.availableForSale);
});

test('Constructor throws if no price exists', () => {
  expect(() => {
    const nacelleVariantNoPrice = new NacelleVariant(paramsNoPrice);
  }).toThrow('Nacelle Variant parameters must include a price');
});

test('Constructor sets price ', () => {
  expect(nacelleVariant.price).toBe(params.price);
});

test('Constructor throw is no priceCurrency exsits', () => {
  expect(() => {
    const nacelleVairantNoPriceCurrency = new NacelleVariant(paramsNoPriceCurrency);
  });
});

test('Constructor sets priceCurrency', () => {
  expect(nacelleVariant.priceCurrency).toBe(params.priceCurrency);
});

test('Constructor sets compareAtPrice', () => {
  expect(nacelleVariant.compareAtPrice).toBe(params.compareAtPrice);
});

test('Constructor sets quantityAvailable', () => {
  expect(nacelleVariant.quantityAvailable).toBe(params.quantityAvailable);
});

test('Constructor sets sku', () => {
  expect(nacelleVariant.sku).toBe(params.sku);
});

test('Constructor sets weight', () => {
  expect(nacelleVariant.weight).toBe(params.weight);
});

test('Constructor sets weightUnit', () => {
  expect(nacelleVariant.weightUnit).toBe(params.weightUnit);
});

test('Constructor sets and formats createdAt', () => {
  expect(nacelleVariant.createdAt).toEqual(1618257281);
});

test('Constructor sets and formats updatedAt', () => {
  expect(nacelleVariant.updatedAt).toEqual(1618257505);
});
