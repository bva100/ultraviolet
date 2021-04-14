import { WebhookEmitter } from '../../src/webhook-emitter';

const topic = 'create-product';
const objectId = 25;
const objectPayload = { foo: 'bar', boom: 'baz' };
const objectInput = { foo: 'bar' };
const emitter = new WebhookEmitter(topic, objectId, objectPayload, objectInput);

test('Constructor sets topic', () => {
  expect(emitter.topic = topic);
});
