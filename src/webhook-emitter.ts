export class WebhookEmitter {
  topic: string;

  objectId: number;

  objectPayload: any;

  objectInput: any;

  constructor(topic: string, objectId: number, objectPayload: any, objectInput: any) {
    this.topic = topic;
    this.objectId = objectId;
    this.objectPayload = objectPayload;
    this.objectInput = objectInput;
  }
}

export default { WebhookEmitter };
