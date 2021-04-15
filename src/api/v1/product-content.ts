import { PrismaClient } from '@prisma/client';
import express from 'express';
import { EventEmitter } from 'events';
import { WebhookEmitter } from '../../webhook-emitter';

const productContentRouter = express.Router();
const prisma = new PrismaClient();
const emitter = new EventEmitter();

productContentRouter.post('/', async (req, res) => {
  const data = { ...req.body };
  try {
    const productContent = await prisma.productContent.create({
      data,
    });
    res.json(productContent);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

productContentRouter.get('/', async (req, res) => {
  const { skip, take, productHandle } = req.query;
  try {
    if (productHandle) {
      const productContent = await prisma.productContent.findMany({
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 25,
        where: { productHandle: String(productHandle) },
      });
      res.json(productContent);
    } else {
      const productContent = await prisma.productContent.findMany({
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 25,
      });
      res.json(productContent);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

productContentRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productContent = await prisma.productContent.findUnique({
      where: { id: Number(id) },
    });
    if (productContent === null) {
      res.sendStatus(404);
    } else {
      res.json(productContent);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// UPDATE a single product content by ID
productContentRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const productContent = await prisma.productContent.update({
      where: { id: Number(id) },
      data,
    });
    res.json(productContent);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// DELETE a single product content by ID
productContentRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productContent = await prisma.productContent.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: 'DELETE successful',
      productContent,
    });
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

export { productContentRouter };
