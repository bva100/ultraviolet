import axios from 'axios';
import { PrismaClient } from '.prisma/client';
import { Webhook } from './webhook';

export class WebhookEmitter {
  topic: string;

  objectPayload: any;

  objectInput: any;

  webhooks: Webhook[];

  constructor(topic: string, objectPayload: any, objectInput: any) {
    this.topic = topic;
    this.objectPayload = objectPayload;
    this.objectInput = objectInput;
    this.webhooks = [];
  }

  async loadWebhooks(): Promise<Webhook[]> {
    const prisma = new PrismaClient();
    const webhookConfigs = await prisma.webhookConfig.findMany({
      where: { topic: this.topic },
    });
    this.webhooks = webhookConfigs.map((webhookConfig: any) => {
      const webhook = new Webhook(webhookConfig.url, webhookConfig.signature);
      return webhook;
    });
    return this.webhooks;
  }

  async sendWebhooks(): Promise<boolean> {
    this.webhooks.forEach(async (webhook) => {
      try {
        const response = await axios.post(webhook.url, {
          topic: this.topic,
          objectPayload: this.objectPayload,
          objectInput: this.objectInput,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'x-ultraviolet-signature': webhook.signature,
          },
        });
      } catch (error) {
        console.log(error);
        return false;
      }
    });
    return true;
  }
}

export default { WebhookEmitter };
