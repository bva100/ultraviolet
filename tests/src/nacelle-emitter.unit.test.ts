import { NacelleEmitter } from '../../src/nacelle-emitter';
import { NacelleProduct } from '../../src/mappers/nacelle-product';
import { NacelleProductContent } from '../../src/mappers/nacelle-product-content';
import nacelleVariant, { NacelleVariant } from '../../src/mappers/nacelle-variant';

const topic = 'create-product';
const objectNoId = { foo: 'bar' };
const productObject = {
  id: 'abc123',
  handle: 'ghost-chair',
  availableForSale: true,
  productType: 'furniture',
  vendor: 'Ghost',
  tags: null,
  createdAt: '2021-04-12T19:54:41.390Z',
  updatedAt: '2021-04-12T19:58:24.840Z',
};

test('Constructor throws error when object does not have an id', () => {
  expect(() => {
    const noId = new NacelleEmitter(topic, objectNoId);
  }).toThrow('Object must have an id when invoking the Nacelle emitter');
});

const nacelleEmitter = new NacelleEmitter(topic, productObject);

test('Constructor sets topic', () => {
  expect(nacelleEmitter.topic).toBe(topic);
});

test('Constructor sets object', () => {
  expect(nacelleEmitter.object).toBe(productObject);
});

test('loadMapper uses product mapping for topics which are related to products', () => {
  expect(nacelleEmitter.mappedObject).toEqual(new NacelleProduct(productObject));
});

const productContentObject = {
  id: 123,
  productId: 22,
  locale: 'en_US',
  title: 'foobar',
  description: 'this is a foo bar',
  fields: { foo: 'bar' },
  published: false,
  createdAt: '2021-04-12T19:54:41.390Z',
  updatedAt: '2021-04-12T19:58:24.840Z',
};
const nacelleProdContentEmitter = new NacelleEmitter('update-product-content', productContentObject);

test('loadMapper uses product content mapping for topics which are related to product content ', () => {
  expect(nacelleProdContentEmitter.mappedObject).toEqual(new NacelleProductContent(productContentObject));
});

const variantObject = {
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

const nacelleVariantEmitter = new NacelleEmitter('create-variant', variantObject);

test('loadMapper uses variant mapping for topics which are related to variants ', () => {
  expect(nacelleVariantEmitter.mappedObject).toEqual(new NacelleVariant(variantObject));
});
