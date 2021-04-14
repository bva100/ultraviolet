import { Webhook } from '../../src/webhook';

const url = 'www.foobar.com';
const signature = 'abc123';
const webhook = new Webhook(url, signature);

test('Constructor sets url', () => {
  expect(webhook.url).toBe(url);
});

test('Constructor sets signature', () => {
  expect(webhook.signature).toBe(signature);
});
