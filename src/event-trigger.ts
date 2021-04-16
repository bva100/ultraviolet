import { WebhookEmitter } from '../src/webhook-emitter';

export default async (topic: string, objectPayload: any, objectInput: any): Promise<boolean> => {
  // send webhooks to all listeners
  const webhookEvent = new WebhookEmitter(topic, objectPayload, objectInput);
  await webhookEvent.loadWebhooks();
  await webhookEvent.sendWebhooks();
  // send to Nacelle if connection exists
  // return true
  return true;
};
