import { WebhookEmitter } from './webhook-emitter';
import { NacelleEmitter } from './nacelle-emitter';

export default async (topic: string, objectPayload: any, objectInput: any): Promise<boolean> => {
  // eslint-disable-next-line max-len
  if (process.env.NACELLE_SPACE_ID && process.env.NACELLE_SPACE_TOKEN && process.env.NACELLE_DATA_INGESTION_ENDPOINT && process.env.NACELLE_DATA_SOURCE_ID) {
    const nacelleEmitter = new NacelleEmitter(topic, objectPayload);
    await nacelleEmitter.send();
  } else {
    // eslint-disable-next-line no-console
    console.log('Do not forget to connect your Nacelle space to this instance of Ultraviolet =)');
  }

  // send webhooks to all listeners
  const webhookEvent = new WebhookEmitter(topic, objectPayload, objectInput);
  await webhookEvent.loadWebhooks();
  await webhookEvent.sendWebhooks();

  return true;
};
