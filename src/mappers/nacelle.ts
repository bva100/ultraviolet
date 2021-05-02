import { NacelleProduct } from './nacelle-product';

export class NacelleMapper {
  origObject: any;

  objectType: string;

  constructor(origObject: any, objectType: string) {
    this.origObject = origObject;
    this.objectType = objectType;
  }

  map(): any {
    if (this.objectType === 'product') {
      return this.mapProduct();
    }
    return null;
  }

  mapProduct(): NacelleProduct {
    const mappedProduct: any = {};
    if (this.origObject.id) {
      mappedProduct.id = this.origObject.id;
    }
    if (this.origObject.handle) {
      mappedProduct.handle = this.origObject.handle;
    }
    if (this.origObject.availableForSale) {
      mappedProduct.availableForSale = this.origObject.availableForSale;
    }
    return new NacelleProduct(mappedProduct);
  }
}

export default { NacelleMapper };
