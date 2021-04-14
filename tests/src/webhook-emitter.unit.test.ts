import { PrismaClient } from '.prisma/client';
import { WebhookEmitter } from '../../src/webhook-emitter';

const orm = new PrismaClient();
const topic = 'create-product';
const objectId = 25;
const objectPayload = { foo: 'bar', boom: 'baz' };
const objectInput = { foo: 'bar' };
const emitter = new WebhookEmitter(orm, topic, objectId, objectPayload, objectInput);

test('Constructor sets orm', () => {
  expect(emitter.orm).toBe(orm);
});

test('Constructor sets topic', () => {
  expect(emitter.topic).toBe(topic);
});

test('Constructor sets objectId', () => {
  expect(emitter.objectId).toBe(objectId);
});

test('Constuctor sets objectPayload', () => {
  expect(emitter.objectPayload).toBe(objectPayload);
});

test('Constructor sets objectInput', () => {
  expect(emitter.objectInput).toBe(objectInput);
});

test('webhook configs', async () => {
  await emitter.loadHooks();
});
