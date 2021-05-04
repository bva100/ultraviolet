import NacelleConnector from './connectors/nacelle';
import { NacelleBase } from '../src/mappers/nacelle-base';
import { NacelleProduct } from '../src/mappers/nacelle-product';
import { NacelleProductContent } from '../src/mappers/nacelle-product-content';

export class NacelleEmitter {
  topic: string;

  object: any;

  mappedObject: NacelleBase;

  constructor(topic: string, object: any) {
    this.topic = topic;
    this.object = object;
    if (!object.id) {
      throw new Error('Object must have an id when invoking the Nacelle emitter');
    }
    this.mappedObject = new NacelleBase(object);
    this.loadMapper();
  }

  loadMapper(): this {
    if (this.topic === 'create-product' || this.topic === 'update-product' || this.topic === 'delete-product') {
      this.mappedObject = new NacelleProduct(this.object);
    }
    if (this.topic === 'create-product-content' || this.topic === 'update-product-content') {
      this.mappedObject = new NacelleProductContent(this.object);
    }
    return this;
  }

  async send(): Promise<any> {
    if (!process.env.NACELLE_SPACE_ID && !process.env.NACELLE_SPACE_TOKEN) {
      console.log('Do not forget to connect your Nacelle space to this instance of Ultraviolet =)');
    }
    const nacelleConnector = new NacelleConnector();
    if (this.topic === 'create-product' || this.topic === 'update-product') {
      return nacelleConnector.indexProducts([this.mappedObject]);
    }
    if (this.topic === 'create-product-content' || this.topic === 'update-product-content') {
      return nacelleConnector.indexProductContent([this.mappedObject]);
    }
    return false;
  }
}

export default { NacelleEmitter };
