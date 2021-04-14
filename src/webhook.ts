export class Webhook {
  url: string

  signature: string

  constructor(url: string, signature: string) {
    this.url = url;
    this.signature = signature;
  }
}

export default { Webhook };
