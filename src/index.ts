import express from 'express';
import {
  productsRouter,
  productContentRouter,
  productMediaRouter,
  productMetafieldsRouter,
  variantsRouter,
  variantContentRouter,
  variantMetafieldsRouter,
  webhookConfigRouter,
} from './api/v1/index';

const app = express();

app.use(express.json());
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/product-content', productContentRouter);
app.use('/api/v1/product-metafields', productMetafieldsRouter);
app.use('/api/v1/product-media', productMediaRouter);
app.use('/api/v1/variants', variantsRouter);
app.use('/api/v1/variant-content', variantContentRouter);
app.use('/api/v1/variant-metafields', variantMetafieldsRouter);
app.use('/api/v1/webhook-configs', webhookConfigRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('REST API server ready at: http://localhost:3000'));
