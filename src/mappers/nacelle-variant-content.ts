import { NacelleBase } from './nacelle-base';

export class NacelleVariantContent extends NacelleBase {
  variantId: string;

  locale: string;

  constructor(params: any) {
    super(params);

    if (!params.variantId) {
      throw new Error('Nacelle Variant Content parameters must include a parent variantId');
    } else {
      this.variantId = String(params.variantId);
    }

    if (!params.locale) {
      throw new Error('Nacelle Variant Content parameters must include a locale');
    } else {
      this.locale = params.locale;
    }
  }
}

export default { NacelleVariantContent };
