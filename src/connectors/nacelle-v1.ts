/* eslint-disable */
import axios from 'axios';

class NacelleConnector {

  endpoint = 'https://v1.dilithiumindex.com/graphql'

  headers = {
    'Content-Type': 'application/json',
    // 'x-nacelle-space-id': process.env.NACELLE_SPACE_ID || '',
    'x-nacelle-space-id': 'stellar-vessel-mX2IUziMsG',
    // 'x-nacelle-space-token': process.env.NACELLE_SPACE_TOKEN || '',
    'x-nacelle-space-token': '846966bf-9715-4dec-89e1-4195638f235b',
    'client-name': 'Ultraviolet PIM',
  }

  async indexProducts(products:any) {
    const body = {
      query: `
      mutation Index($input: IndexProductsInput) {
        indexProducts(input: $input),
        {
          count
          ids
        } 
      }`,
      variables: {
        input: {
          pim: {
            syncSource: 'custom',
            syncSourceDomain: 'gamma-nova-jewelery.myshopify.com',
            defaultLocale: 'en-us'
          },
          products: [{
            handle: 'phaser-gun-4',
            locale: 'en-us',
            pimSyncSourceProductId: 'phsr782',
            title: 'Original Phase Gun',
            description: 'The most common and standard direct energy weapon in the arsenal of Starfleet. Classified as a particle weapon',
            availableForSale: true
          },
          {
            handle: 'food-replicator',
            locale: 'en-us',
            pimSyncSourceProductId: 'foodprint1701',
            title: 'Food Replicator',
            description: 'A molecule synthasizer that uses anti-matter conversion technology. Used to feed the crew.',
            availableForSale: true
          }]
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
        console.log(res);
      });
  }
}

export default NacelleConnector;
