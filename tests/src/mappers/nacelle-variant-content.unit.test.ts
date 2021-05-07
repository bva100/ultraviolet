import { NacelleVariantContent } from '../../../src/mappers/nacelle-variant-content';

const paramsNoVariantId = {
  id: 123,
};
const paramsNoLocale = {
  id: 123,
  variantId: 987,
};
const params = {
  id: 123,
  variantId: 26,
  locale: 'en_US',
  title: 'Copper Coffee Pot',
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

test('Constructor throws error when no variant locale is passed', () => {
  expect(() => {
    const noLocale = new NacelleVariantContent(paramsNoLocale);
  }).toThrow('Nacelle Variant Content parameters must include a locale');
});

test('Constructor sets title', () => {
  expect(nacelleVariantContent.title).toBe(params.title);
});
