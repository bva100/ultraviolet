import { NacelleConnector, responseHandler } from '../../../src/connectors/nacelle';
import { NacelleProduct } from '../../../src/mappers/nacelle-product';

const params = {
  id: 1,
  handle: 'captain-chair',
  productType: 'bridge furniture',
  vendor: 'Jupiter Station',
  tags: 'JLP, leather, futuristic',
  availableForSale: true,
  createdAt: '2021-04-12T19:54:41.390Z',
  updatedAt: '2021-04-12T19:58:24.840Z',
  // variants
  // metafields
  // content
};
const product = new NacelleProduct(params);
const products = [product];
const objectName = 'product';

const resDataErrors = {
  data: {
    errors: [
      {
        message: 'this is an error',
      },
    ],
  },
};
const res = { data: { foo: 'bar' } };
const resError = { foo: 'bar' };

test('Expect responseHandler to return false when at least one an error is received', () => {
  expect(responseHandler(resDataErrors, products, objectName)).toBe(false);
});

test('Expect responseHandler to return true when no error are received ', () => {
  expect(responseHandler(res, products, objectName)).toBe(true);
});
