import express from 'express';
import { PrismaClient } from '@prisma/client';
import { EventEmitter } from 'events';
import { WebhookEmitter } from '../src/webhook-emitter';
import productsRouter from '../src/api/v1/products';
import productContentRouter from '../src/api/v1/product-content';
import productMetafieldsRouter from '../src/api/v1/product-metafields';
import variantsRouter from '../src/api/v1/variants';

const prisma = new PrismaClient();
const app = express();
const emitter = new EventEmitter();

app.use(express.json());
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/product-content', productContentRouter);
app.use('/api/v1/product-metafields', productMetafieldsRouter);
app.use('/api/v1/variants', variantsRouter);

// **************************
// *** VARIANT CONTENT ***
// **************************

// CREATE a single variant content
app.post('/api/v1/variant-content', async (req, res) => {
  const data = { ...req.body };
  try {
    const variantContent = await prisma.variantContent.create({
      data,
    });
    res.json(variantContent);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// READ many variant content
app.get('/api/v1/variant-content', async (req, res) => {
  const { skip, take } = req.query;
  try {
    const variantContent = await prisma.variantContent.findMany({
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 25,
    });
    res.json(variantContent);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// READ a single variant content by ID
app.get('/api/v1/variant-content/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const variantContent = await prisma.variantContent.findUnique({
      where: { id: Number(id) },
    });
    if (variantContent === null) {
      res.sendStatus(404);
    } else {
      res.json(variantContent);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// UPDATE a single variant content by ID
app.put('/api/v1/variant-content/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const variantContent = await prisma.variantContent.update({
      where: { id: Number(id) },
      data,
    });
    res.json(variantContent);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// DELETE a single variant content by ID
app.delete('/api/v1/variant-content/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const variantContent = await prisma.variantContent.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: 'DELETE successful',
      variantContent,
    });
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// **************************
// *** VARIANT METAFIELDS ***
// **************************

// CREATE a single variant metafield
app.post('/api/v1/variant-metafields', async (req, res) => {
  const data = { ...req.body };
  try {
    const variantMetafield = await prisma.variantMetafield.create({
      data,
    });
    res.json(variantMetafield);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// READ variant metafields
app.get('/api/v1/variant-metafields', async (req, res) => {
  const { skip, take } = req.query;
  try {
    const variantMetafields = await prisma.variantMetafield.findMany({
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 25,
    });
    res.json(variantMetafields);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

//  READ a variant metafield by ID
app.get('/api/v1/variant-metafields/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const variantMetafield = await prisma.variantMetafield.findUnique({
      where: { id: Number(id) },
    });
    if (variantMetafield === null) {
      res.sendStatus(404);
    } else {
      res.json(variantMetafield);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// UPDATE a variant metafield by ID
app.put('/api/v1/variant-metafields/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const variantMetafield = await prisma.variantMetafield.update({
      where: { id: Number(id) },
      data,
    });
    res.json(variantMetafield);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// DELETE a variant metafield by ID
app.delete('/api/v1/variant-metafields/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const variantMetafield = await prisma.variantMetafield.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: 'DELETE successful',
      variantMetafield,
    });
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// **************************
// *** WEBHOOK CONFIGS ******
// **************************

// CREATE a single webhook config
app.post('/api/v1/webhook-configs', async (req, res) => {
  const data = { ...req.body };
  try {
    const webhookConfig = await prisma.webhookConfig.create({
      data,
    });
    res.json(webhookConfig);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// READ webhook configs
app.get('/api/v1/webhook-configs', async (req, res) => {
  const { skip, take } = req.params;
  const { topic } = req.query;
  try {
    if (topic) {
      const webhookConfigs = await prisma.webhookConfig.findMany({
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 25,
        where: { topic: String(topic) },
      });
      res.json(webhookConfigs);
    } else {
      const webhookConfigs = await prisma.webhookConfig.findMany({
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 25,
      });
      res.json(webhookConfigs);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// READ webhook config by ID
app.get('/api/v1/webhook-configs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const webhookConfig = await prisma.webhookConfig.findUnique({
      where: { id: Number(id) },
    });
    if (webhookConfig === null) {
      res.sendStatus(404);
    } else {
      res.json(webhookConfig);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// UPDATE a webhook config by ID
app.put('/api/v1/webhook-configs/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const webhookConfig = await prisma.webhookConfig.update({
      where: { id: Number(id) },
      data,
    });
    res.json(webhookConfig);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// DELETE a webhook config by ID
app.delete('/api/v1/webhook-configs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const webhookConfig = await prisma.webhookConfig.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: 'DELETE successful',
      webhookConfig,
    });
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('REST API server ready at: http://localhost:3000'));
