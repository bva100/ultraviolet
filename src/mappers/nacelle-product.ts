import { NacelleBase } from './nacelle-base';

export class NacelleProduct extends NacelleBase {
  handle: string;

  availableForSale : boolean;

  productType: string | null;

  vendor: string | null;

  tags: string[] | null;

  createdAt: number | null;

  updatedAt: number | null;

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

    if (params.productType) {
      this.productType = params.productType;
    } else {
      this.productType = null;
    }

    if (params.vendor) {
      this.vendor = params.vendor;
    } else {
      this.vendor = null;
    }

    if (params.tags) {
      const tagArray = params.tags.split(',');
      this.tags = tagArray.map((tag: string) => tag.trim());
    } else {
      this.tags = null;
    }

    if (params.createdAt) {
      this.createdAt = Math.round(new Date(params.createdAt).getTime() / 1000);
    } else {
      this.createdAt = null;
    }

    if (params.updatedAt) {
      this.updatedAt = Math.round(new Date(params.updatedAt).getTime() / 1000);
    } else {
      this.updatedAt = null;
    }
  }
}

export default { NacelleProduct };
