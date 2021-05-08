import { NacelleConnector } from './connectors/nacelle';
import { NacelleBase } from '../src/mappers/nacelle-base';
import { NacelleProduct } from '../src/mappers/nacelle-product';
import { NacelleProductContent } from '../src/mappers/nacelle-product-content';
import { NacelleVariant } from '../src/mappers/nacelle-variant';
import { NacelleVariantContent } from '../src/mappers/nacelle-variant-content';

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
    switch (this.topic) {
      case 'create-product':
      case 'update-product':
        this.mappedObject = new NacelleProduct(this.object);
        break;

      case 'create-product-content':
      case 'update-product-content':
        this.mappedObject = new NacelleProductContent(this.object);
        break;

      case 'create-variant':
      case 'update-variant':
        this.mappedObject = new NacelleVariant(this.object);
        break;

      case 'create-variant-content':
      case 'update-variant-content':
        this.mappedObject = new NacelleVariantContent(this.object);
        break;

      default:
        this.mappedObject = new NacelleBase(this.object);
        break;
    }
    return this;
  }

  async send(): Promise<any> {
    const nacelleConnector = new NacelleConnector();
    if (this.topic === 'create-product' || this.topic === 'update-product') {
      return nacelleConnector.indexProducts([this.mappedObject]);
    }
    if (this.topic === 'create-product-content' || this.topic === 'update-product-content') {
      return nacelleConnector.indexProductContent([this.mappedObject]);
    }
    if (this.topic === 'create-variant' || this.topic === 'update-variant') {
      return nacelleConnector.indexVariants([this.mappedObject]);
    }
    if (this.topic === 'create-variant-content' || this.topic === 'update-variant-content') {
      return nacelleConnector.indexVariantContent([this.mappedObject]);
    }
    return false;
  }
}

export default { NacelleEmitter };
