import { NacelleBase } from './nacelle-base';

export class NacelleProductMedia extends NacelleBase {
  productId: string

  locale: string;

  src: string;

  type: string;

  // media: {
  //   id: string,
  //   src: string,
  //   thumbnailSrc: string | null,
  //   type: string,
  //   mimeType: string | null
  // }

  constructor(params: any) {
    super(params);

    if (!params.productId) {
      if (params.ProductContent && params.ProductContent.productId) {
        this.productId = String(params.ProductContent.productId);
      } else {
        throw new Error('Nacelle Product Media mapper must have the parent productId parameter');
      }
    } else {
      this.productId = String(params.productId);
    }

    if (!params.locale) {
      if (params.ProductContent && params.ProductContent.locale) {
        this.locale = params.ProductContent.locale;
      } else {
        throw new Error('Nacelle Product Media mapper must have the locale parameter');
      }
    } else {
      this.locale = params.locale;
    }

    if (!params.src) {
      throw new Error('Nacelle Product Media mapper must have the src parameter');
    } else {
      this.src = params.src;
    }

    if (!params.type) {
      throw new Error('Nacelle Product Media mapper must have the type parameter');
    } else {
      this.type = params.type;
    }
  }
}

export default { NacelleProductMedia };
