import { NacelleProductContent } from '../../../src/mappers/nacelle-product-content';

const paramsNoProductid = {
  id: 123,
};

test('Constructor throws if no productId parameter is passed', () => {
  expect(() => {
    const nacelleProductContentNoProductId = new NacelleProductContent(paramsNoProductid);
  }).toThrow('Nacelle Product Content parameters must include a parent productId');
});

const paramsNoLocale = {
  id: 654,
  productId: 24,
};

test('Constructor throws if no locale parameter is passed', () => {
  expect(() => {
    const nacelleProductContentNoLocale = new NacelleProductContent(paramsNoLocale);
  }).toThrow('Nacelle Product Content parameters must include a locale');
});

const params = {
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

const nacelleProductContent = new NacelleProductContent(params);

test('Constructor sets title', () => {
  expect(nacelleProductContent.title).toBe(params.title);
});

test('Constructor sets description', () => {
  expect(nacelleProductContent.description).toBe(params.description);
});

test('Constructor sets fields', () => {
  expect(nacelleProductContent.fields).toBe(params.fields);
});

test('Constructor sets published', () => {
  expect(nacelleProductContent.published).toBe(params.published);
});

test('Constructor sets and formats createdAt', () => {
  expect(nacelleProductContent.createdAt).toEqual(1618257281);
});

test('Constructor sets and formats updatedAt', () => {
  expect(nacelleProductContent.updatedAt).toEqual(1618257505);
});
