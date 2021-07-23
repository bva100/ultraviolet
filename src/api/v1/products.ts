import { PrismaClient } from '@prisma/client';
import express from 'express';
import eventTrigger from '../../event-trigger';

const productsRouter = express.Router();
const prisma = new PrismaClient();

productsRouter.post('/', async (req, res) => {
  const data = { ...req.body };
  try {
    const newProduct = await prisma.product.create({
      data,
    });
    res.json(newProduct);
    eventTrigger('create-product', newProduct, data);
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
    eventTrigger('update-product', product, data);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

productsRouter.put('/handle/:handle', async (req, res) => {
  const { handle } = req.params;
  const data = { ...req.body };
  try {
    const product = await prisma.product.update({
      where: { handle },
      data,
    });
    res.json(product);
    eventTrigger('update-product', product, data);
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
    eventTrigger('delete-product', product, {});
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
    eventTrigger('delete-product', product, {});
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

productsRouter.post('/reindex', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        content: true,
        variants: true,
        metafields: true,
      },
    });
    products.forEach((product) => {
      eventTrigger('update-product', product, {});
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

export { productsRouter };
