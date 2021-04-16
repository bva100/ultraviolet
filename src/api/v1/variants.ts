import { PrismaClient } from '@prisma/client';
import express from 'express';
import eventTrigger from '../../event-trigger';

const variantsRouter = express.Router();
const prisma = new PrismaClient();

variantsRouter.post('/', async (req, res) => {
  const data = { ...req.body };
  try {
    const variant = await prisma.variant.create({
      data,
    });
    res.json(variant);
    eventTrigger('create-variant', variant, data);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

variantsRouter.get('/', async (req, res) => {
  const { skip, take } = req.query;
  try {
    const variants = await prisma.variant.findMany({
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 25,
      include: {
        content: true,
        metafields: true,
      },
    });
    res.json(variants);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

variantsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const variant = await prisma.variant.findUnique({
      where: { id: Number(id) },
      include: {
        content: true,
        metafields: true,
      },
    });
    if (variant === null) {
      res.sendStatus(404);
    } else {
      res.json(variant);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

variantsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const variant = await prisma.variant.update({
      where: { id: Number(id) },
      data,
    });
    res.json(variant);
    eventTrigger('update-variant', variant, data);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

variantsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const variant = await prisma.variant.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: 'DELETE successful',
      variant,
    });
    eventTrigger('delete-variant', variant, {});
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

export { variantsRouter };
