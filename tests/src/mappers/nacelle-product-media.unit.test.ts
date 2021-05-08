import { NacelleProductMedia } from '../../../src/mappers/nacelle-product-media';

const paramsNoProductId = {
  id: 1,
};
const paramsNoLocale = {
  id: 1,
  productId: 123,
};
const paramsNoSrc = {
  id: 1,
  productId: 123,
  locale: 'en_US',
};
const paramsNoType = {
  id: 1,
  productId: 123,
  locale: 'en_US',
  src: 'foobar.com/images/1.png',
};
const params = {
  id: 1,
  productContentId: 22,
  ProductContent: {
    productId: 123,
    locale: 'en_US',
  },
  src: 'foobar.com/images/1.png',
  thumbnailSrc: 'foobar.com/images/small/1.png',
  type: 'png',
  mimeType: 'image/png',
};

const nacelleProductMedia = new NacelleProductMedia(params);

test('Constructor throws when no productId is passed', () => {
  expect(() => {
    const noProductId = new NacelleProductMedia(paramsNoProductId);
  }).toThrow('Nacelle Product Media mapper must have the parent productId parameter');
});

test('Constructor throws when no locale is passed', () => {
  expect(() => {
    const noLocale = new NacelleProductMedia(paramsNoLocale);
  }).toThrow('Nacelle Product Media mapper must have the locale parameter');
});

test('Constructor throws when no src is passed', () => {
  expect(() => {
    const noSrc = new NacelleProductMedia(paramsNoSrc);
  }).toThrow('Nacelle Product Media mapper must have the src parameter');
});

test('Constructor throws when no type attribute is passed', () => {
  expect(() => {
    const noType = new NacelleProductMedia(paramsNoType);
  }).toThrow('Nacelle Product Media mapper must have the type parameter');
});
