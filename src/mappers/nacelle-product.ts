import { NacelleBase } from './nacelle-base';

export class NacelleProduct extends NacelleBase {
  handle: string;

  availableForSale : boolean;

  // availableForSale: boolean

  constructor(params: any) {
    super(params);

    if (!params.handle) {
      throw new Error('Nacelle Product mapper must have a handle param');
    } else {
      this.handle = params.handle;
    }

    if (!params.availableForSale) {
      throw new Error('Nacelle Product mapper must have the availableForSale parameter');
    } else {
      this.availableForSale = params.availableForSale;
    }
  }
}

export default { NacelleProduct };
