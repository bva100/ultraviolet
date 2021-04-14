import { prisma, PrismaClient } from '.prisma/client';
import { Webhook } from './webhook';

export class WebhookEmitter {
  orm: typeof prisma | any;

  topic: string;

  objectId: number;

  objectPayload: any;

  objectInput: any;

  webhooks: Webhook[];

  constructor(orm: any, topic: string, objectId: number, objectPayload: any, objectInput: any) {
    this.orm = orm;
    this.topic = topic;
    this.objectId = objectId;
    this.objectPayload = objectPayload;
    this.objectInput = objectInput;
    this.webhooks = [];
  }

  async loadHooks(): Promise<any> {
    // const webhookConfigs = this.orm.webhookConfigs.findMany({
    //   where: {topic: this.topic}},
    // })
    const prisma = new PrismaClient();
    const webhookConfigs = await prisma.webhookConfig.findMany({
      where: { topic: this.topic },
    });
    console.log('webhook configs ', webhookConfigs);
    // return webhookConfigs;
  }
}

export default { WebhookEmitter };
