import { PrismaClient } from '@prisma/client';
import express from 'express';
import { EventEmitter } from 'events';
import { WebhookEmitter } from '../../webhook-emitter';

const productMetafieldsRouter = express.Router();
const prisma = new PrismaClient();
const emitter = new EventEmitter();

// CREATE a single product metafield
productMetafieldsRouter.post('/', async (req, res) => {
  const data = { ...req.body };
  try {
    const productMetafield = await prisma.productMetafield.create({
      data,
    });
    res.json(productMetafield);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// READ many product metafields
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

// READ product metafield by ID
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

// UPDATE a single product metafield by ID
productMetafieldsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const productMetafield = await prisma.productMetafield.update({
      where: { id: Number(id) },
      data,
    });
    res.json(productMetafield);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// Delete product metafield by ID
productMetafieldsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productMetafield = await prisma.productMetafield.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: 'DELETE successful',
      productMetafield,
    });
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

export default productMetafieldsRouter;
