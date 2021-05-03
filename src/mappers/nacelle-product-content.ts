import { NacelleBase } from './nacelle-base';

export class NacelleProductContent extends NacelleBase {
  productId: string;

  locale: string;

  title: string | null;

  description: string | null;

  fields: any;

  published: boolean;

  createdAt: number | null;

  updatedAt: number | null;

  constructor(params: any) {
    super(params);

    if (!params.productId) {
      throw new Error('Nacelle Product Content parameters must include a parent productId');
    } else {
      this.productId = String(params.productId);
    }

    if (!params.locale) {
      throw new Error('Nacelle Product Content parameters must include a locale');
    } else {
      this.locale = params.locale;
    }

    if (params.title) {
      this.title = params.title;
    } else {
      this.title = null;
    }

    if (params.description) {
      this.description = params.description;
    } else {
      this.description = null;
    }

    if (params.fields) {
      this.fields = params.fields;
    } else {
      this.fields = null;
    }

    if (params.published === null) {
      this.published = false;
    } else {
      this.published = params.published;
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

export default { NacelleProductContent };
