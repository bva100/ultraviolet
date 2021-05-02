import { NacelleBase } from '../../../src/mappers/nacelle-base';

const paramsWithNoId = {};

test('Throws if no id is passed as a constructor parameter', () => {
  expect(() => {
    const nacelleBase = new NacelleBase(paramsWithNoId);
  }).toThrow('Nacelle mapper objects must have an ID passed in the parameter');
});

const params = { id: 'abc123' };
const nacelleBase = new NacelleBase(params);

test('Constructor to set id ', () => {
  expect(nacelleBase.id).toBe(params.id);
});
