import { PrismaClient } from '@prisma/client';
import express from 'express';
import { WebhookEmitter } from '../../webhook-emitter';

const productsRouter = express.Router();
const prisma = new PrismaClient();

productsRouter.post('/', async (req, res) => {
  const data = { ...req.body };
  try {
    const newProduct = await prisma.product.create({
      data,
    });
    res.json(newProduct);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

productsRouter.get('/', async (req, res) => {
  const { skip, take } = req.query;
  try {
    const products = await prisma.product.findMany({
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 25,
      include: {
        content: true,
        variants: true,
        metafields: true,
      },
    });
    res.json(products);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

productsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        content: true,
        variants: true,
        metafields: true,
      },
    });
    if (product === null) {
      res.sendStatus(404);
    } else {
      res.json(product);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

productsRouter.get('/handle/:handle', async (req, res) => {
  const { handle } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { handle },
      include: {
        content: true,
        variants: true,
        metafields: true,
      },
    });
    if (product === null) {
      res.sendStatus(404);
    } else {
      res.json(product);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

productsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data,
    });
    res.json(product);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

function eventTrigger(topic: string, objectPayload: string, objectIntput: string): boolean => {
  const webhookEvent = new WebhookEmitter(topic, objectPayload, objectIntput);
  await webhookEvent.loadWebhooks();
  await webhookEvent.sendWebhooks();
  return true
});

productsRouter.put('/handle/:handle', async (req, res) => {
  const { handle } = req.params;
  const data = { ...req.body };
  delete data.handle;
  try {
    const product = await prisma.product.update({
      where: { handle },
      data,
    });
    res.json(product);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

productsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: 'DELETE successful',
      product,
    });
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

productsRouter.delete('/handle/:handle', async (req, res) => {
  const { handle } = req.params;
  try {
    const product = await prisma.product.delete({
      where: { handle },
    });
    res.json({
      message: 'DELETE successful',
      product,
    });
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

export { productsRouter };
