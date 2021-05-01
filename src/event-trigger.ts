import { WebhookEmitter } from './webhook-emitter';
import NacelleConnector from './connectors/nacelle';

export default async (topic: string, objectPayload: any, objectInput: any): Promise<boolean> => {
  // send webhooks to all listeners
  const webhookEvent = new WebhookEmitter(topic, objectPayload, objectInput);
  await webhookEvent.loadWebhooks();
  await webhookEvent.sendWebhooks();
  if (process.env.NACELLE_SPACE_ID && process.env.NACELLE_SPACE_TOKEN) {
    const products = [
      {
        id: '11',
        handle: 'food-replicator-v11',
        availableForSale: false,
        content: {
          productId: '11',
          id: '3',
          locale: 'en-us',
          title: 'Food Replicator Version 11',
          description: 'much graphql wow',
          published: false,
        },
      },
    ];
    const nacelleConnector = new NacelleConnector();
    nacelleConnector.indexProducts(products);
  } else {
    console.log('Do not forget to connect your Nacelle space to this instance of Ultraviolet =)');
  }
  // return true
  return true;
};
