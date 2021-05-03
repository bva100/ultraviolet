import { WebhookEmitter } from './webhook-emitter';
import { NacelleEmitter } from './nacelle-emitter';

export default async (topic: string, objectPayload: any, objectInput: any): Promise<boolean> => {
  // send webhooks to all listeners
  const webhookEvent = new WebhookEmitter(topic, objectPayload, objectInput);
  await webhookEvent.loadWebhooks();
  await webhookEvent.sendWebhooks();

  // if (process.env.NACELLE_SPACE_ID && process.env.NACELLE_SPACE_TOKEN)
  const nacelleEmitter = new NacelleEmitter(topic, objectPayload);
  await nacelleEmitter.send();
  return true;
};
