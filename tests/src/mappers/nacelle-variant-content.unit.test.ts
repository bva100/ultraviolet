import { NacelleVariantContent } from '../../../src/mappers/nacelle-variant-content';

const paramsNoVariantId = {
  id: 123,
};
const paramsNoProductId = {
  id: 123,
  variantId: 987,
};
const paramsNoLocale = {
  id: 123,
  variantId: 987,
  productId: 654,
};
const params = {
  id: 123,
  variantId: 26,
  productId: 695,
  locale: 'en_US',
  title: 'Copper Coffee Pot',
  description: 'Make a perfect cup of coffee in a perfect copper coffee pot',
  swatchSrc: 'nacelle.com/swatches/ultraviolet/',
  fields: { foo: 'bar' },
  published: false,
  createdAt: '2021-04-12T19:54:41.390Z',
  updatedAt: '2021-04-12T19:58:24.840Z',
};
const nacelleVariantContent = new NacelleVariantContent(params);

test('Constructor throws error when no variant id is passed', () => {
  expect(() => {
    const noId = new NacelleVariantContent(paramsNoVariantId);
  }).toThrow('Nacelle Variant Content parameters must include a parent variantId');
});

test('Constructor sets variantId and casts to string', () => {
  expect(nacelleVariantContent.variantId).toBe(String(params.variantId));
});

test('Constructor throw error when no productId is passed', () => {
  expect(() => {
    const noProductId = new NacelleVariantContent(paramsNoProductId);
  }).toThrow('Nacelle Variant Content parameters must include a productId');
});

test('Constructor throws error when no variant locale is passed', () => {
  expect(() => {
    const noLocale = new NacelleVariantContent(paramsNoLocale);
  }).toThrow('Nacelle Variant Content parameters must include a locale');
});

test('Constructor sets title', () => {
  expect(nacelleVariantContent.title).toBe(params.title);
});

test('Constructor sets description', () => {
  expect(nacelleVariantContent.description).toBe(params.description);
});

test('Constructor sets swatchSrc', () => {
  expect(nacelleVariantContent.description).toBe(params.description);
});

test('Constructor sets fields', () => {
  expect(nacelleVariantContent.fields).toBe(params.fields);
});

test('Constructor sets published', () => {
  expect(nacelleVariantContent.published).toBe(params.published);
});

test('Constructor sets and formats createdAt', () => {
  expect(nacelleVariantContent.createdAt).toEqual(1618257281);
});

test('Constructor sets and formats updatedAt', () => {
  expect(nacelleVariantContent.updatedAt).toEqual(1618257505);
});
