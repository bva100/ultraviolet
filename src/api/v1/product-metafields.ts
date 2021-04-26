import { PrismaClient } from '@prisma/client';
import express from 'express';
import eventTrigger from '../../event-trigger';

const productMetafieldsRouter = express.Router();
const prisma = new PrismaClient();

productMetafieldsRouter.post('/', async (req, res) => {
  const data = { ...req.body };
  try {
    const productMetafield = await prisma.productMetafield.create({
      data,
      include: {
        Product: true,
      },
    });
    res.json(productMetafield);
    eventTrigger('create-product-metafield', productMetafield, data);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

productMetafieldsRouter.get('/', async (req, res) => {
  const { skip, take } = req.query;
  try {
    const productMetafields = await prisma.productMetafield.findMany({
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 25,
    });
    res.json(productMetafields);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

productMetafieldsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productMetafield = await prisma.productMetafield.findUnique({
      where: { id: Number(id) },
    });
    if (productMetafield === null) {
      res.sendStatus(404);
    } else {
      res.json(productMetafield);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

productMetafieldsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const productMetafield = await prisma.productMetafield.update({
      where: { id: Number(id) },
      data,
      include: {
        Product: true,
      },
    });
    res.json(productMetafield);
    eventTrigger('update-product-metafield', productMetafield, data);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

productMetafieldsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productMetafield = await prisma.productMetafield.delete({
      where: { id: Number(id) },
      include: {
        Product: true,
      },
    });
    res.json({
      message: 'DELETE successful',
      productMetafield,
    });
    eventTrigger('delete-product-metafield', productMetafield, {});
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

export { productMetafieldsRouter };
