import express from 'express';
import { PrismaClient } from '@prisma/client';
import { EventEmitter } from 'events';
import { WebhookEmitter } from '../src/webhook-emitter';
import productsRouter from '../src/api/v1/products';
import productContentRouter from '../src/api/v1/product-content';
import productMetafieldsRouter from '../src/api/v1/product-metafields';
import variantsRouter from '../src/api/v1/variants';
import variantContentRouter from '../src/api/v1/variant-content';
import variantMetafieldsRouter from '../src/api/v1/variant-metafields';
import webhookConfigRouter from '../src/api/v1/webhook-configs';

const prisma = new PrismaClient();
const app = express();
const emitter = new EventEmitter();

app.use(express.json());
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/product-content', productContentRouter);
app.use('/api/v1/product-metafields', productMetafieldsRouter);
app.use('/api/v1/variants', variantsRouter);
app.use('/api/v1/variant-content', variantContentRouter);
app.use('/api/v1/variant-metafields', variantMetafieldsRouter);
app.use('/api/v1/webhook-configs', webhookConfigRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('REST API server ready at: http://localhost:3000'));
