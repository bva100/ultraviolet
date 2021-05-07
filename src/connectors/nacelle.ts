import axios from 'axios';
import { NacelleBase } from '../mappers/nacelle-base';

const responseHandler = (res: any, objects: NacelleBase[], objectName: string): boolean => {
  if (res.data) {
    if (res.data.errors) {
      if (process.env.NACELLE_CONNECTOR_VERBOSE) {
        console.error('Failed to send data for Nacelle. Check logs for more details.');
        console.dir(res.data.errors, { depth: null });
      }
      return false;
    }
    if (objects.length > 1 && process.env.NACELLE_CONNECTOR_VERBOSE) {
      console.log(`${objectName}s successfully sent to Nacelle's Data Ingestion engine`);
    } else if (objects.length <= 1 && process.env.NACELLE_CONNECTOR_VERBOSE) {
      console.log(`${objectName} with id ${objects[0].id} successfully sent to Nacelle's Data Ingestion engine`);
    }
    return true;
  }
  console.error('Failed to send to Nacelle. Please check environment variables for your Nacelle connection.');
  return false;
};
class NacelleConnector {
  dataSourceId = process.env.NACELLE_DATA_SOURCE_ID || '';

  endpoint = process.env.NACELLE_DATA_INGESTION_ENDPOINT || '';

  headers = {
    'Content-Type': 'application/json',
    'x-nacelle-space-id': process.env.NACELLE_SPACE_ID || '',
    'x-nacelle-space-token': process.env.NACELLE_SPACE_TOKEN || '',
    'client-name': 'Ultraviolet PIM',
  }

  async indexProducts(products: NacelleBase[]) {
    const body = {
      query: `
      mutation Index($input: IndexProductsInput!) {
        indexProducts(input: $input),
        {
          message,
          spaceId,
          userErrors {
            fields
            message
          }
        } 
      }`,
      variables: {
        input: {
          dataSourceId: this.dataSourceId,
          products,
        },
      },
    };

    await axios.post(this.endpoint, body, {
      headers: this.headers,
    })
      .catch((err) => {
        console.error(err);
      })
      .then((res) => {
        responseHandler(res, products, 'Product');
      });
  }

  async indexProductContent(productContent: NacelleBase[]) {
    const body = {
      query: `
      mutation Index($input: IndexProductContentInput!) {
        indexProductContent(input: $input),
        {
          message,
          spaceId,
          userErrors {
            fields
            message
          }
        } 
      }`,
      variables: {
        input: {
          dataSourceId: this.dataSourceId,
          productContent,
        },
      },
    };

    await axios.post(this.endpoint, body, {
      headers: this.headers,
    })
      .catch((err) => {
        console.error(err);
      })
      .then((res) => {
        responseHandler(res, productContent, 'Product Content');
      });
  }

  async indexVariants(variants: NacelleBase[]) {
    const body = {
      query: `
      mutation Index($input: IndexVariantsInput!) {
        indexVariants(input: $input),
        {
          message,
          spaceId,
          userErrors {
            fields
            message
          }
        } 
      }`,
      variables: {
        input: {
          dataSourceId: this.dataSourceId,
          variants,
        },
      },
    };

    await axios.post(this.endpoint, body, {
      headers: this.headers,
    })
      .catch((err) => {
        console.error(err);
      })
      .then((res) => {
        responseHandler(res, variants, 'Variant');
      });
  }

  async indexVariantContent(variantContent: NacelleBase[]) {
    const body = {
      query: `
      mutation Index($input: IndexVariantContentInput!) {
        indexVariantContent(input: $input),
        {
          message,
          spaceId,
          userErrors {
            fields
            message
          }
        } 
      }`,
      variables: {
        input: {
          dataSourceId: this.dataSourceId,
          variantContent,
        },
      },
    };

    await axios.post(this.endpoint, body, {
      headers: this.headers,
    })
      .catch((err) => {
        console.error(err);
      })
      .then((res) => {
        responseHandler(res, variantContent, 'Variant Content');
      });
  }
}

export { NacelleConnector, responseHandler };
