import { NacelleBase } from './nacelle-base';

export class NacelleVariant extends NacelleBase {
  productId: string;

  availableForSale: boolean;

  price: number;

  priceCurrency: string;

  compareAtPrice: number | null;

  quantityAvailable: number | null;

  sku: string | null;

  weight: number | null;

  weightUnit: string | null;

  createdAt: number | null;

  updatedAt: number | null;

  constructor(params: any) {
    super(params);

    if (!params.productId) {
      throw new Error('Nacelle Variant parameters must include a parent productId');
    } else {
      this.productId = String(params.productId);
    }

    if (params.availableForSale === null) {
      this.availableForSale = false;
    } else {
      this.availableForSale = params.availableForSale;
    }

    if (!params.price) {
      throw new Error('Nacelle Variant parameters must include a price');
    } else {
      this.price = params.price;
    }

    if (!params.priceCurrency) {
      throw new Error('Nacelle Variant parameters must include a priceCurrency');
    } else {
      this.priceCurrency = params.priceCurrency;
    }

    if (params.compareAtPrice) {
      this.compareAtPrice = params.compareAtPrice;
    } else {
      this.compareAtPrice = null;
    }

    if (params.quantityAvailable) {
      this.quantityAvailable = params.quantityAvailable;
    } else {
      this.quantityAvailable = null;
    }

    if (params.sku) {
      this.sku = params.sku;
    } else {
      this.sku = null;
    }

    if (params.weight) {
      this.weight = params.weight;
    } else {
      this.weight = null;
    }

    if (params.weightUnit) {
      this.weightUnit = params.weightUnit;
    } else {
      this.weightUnit = params.weightUnit;
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

export default { NacelleVariant };
