import axios from 'axios';

class NacelleConnector {
  dataSourceId = process.env.NACELLE_DATA_SOURCE_ID || '';

  endpoint = 'https://index.api.nacelle.com/graphql';

  headers = {
    'Content-Type': 'application/json',
    'x-nacelle-space-id': process.env.NACELLE_SPACE_ID || '',
    'x-nacelle-space-token': process.env.NACELLE_SPACE_TOKEN || '',
    'client-name': 'Ultraviolet PIM',
  }

  async indexProducts(products: any) {
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
        console.dir(res, { depth: null });
        if (products.length > 1) {
          console.log('Product successfully sent to Nacelle\'s Data Ingestion engine');
        } else {
          console.log(`Product with id ${products[0].id} successfully sent to Nacelle's Data Ingestion engine`);
        }
      });
  }

  async indexProductContent(productContent: any) {
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
        if (productContent.length > 1) {
          console.log('Product Content successfully sent to Nacelle\'s Data Ingestion engine');
        } else {
          console.log(`Product Content with id ${productContent[0].id} successfully sent to Nacelle's Data Ingestion engine`);
        }
      });
  }
}

export default NacelleConnector;
