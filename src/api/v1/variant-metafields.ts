import { PrismaClient } from '@prisma/client';
import express from 'express';
import eventTrigger from '../../event-trigger';

const variantMetafieldsRouter = express.Router();
const prisma = new PrismaClient();

variantMetafieldsRouter.post('/', async (req, res) => {
  const data = { ...req.body };
  try {
    const variantMetafield = await prisma.variantMetafield.create({
      data,
      include: {
        Variant: {
          include: {
            Product: true,
          },
        },
      },
    });
    res.json(variantMetafield);
    eventTrigger('create-variant-metafield', variantMetafield, data);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

variantMetafieldsRouter.get('/', async (req, res) => {
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

variantMetafieldsRouter.get('/:id', async (req, res) => {
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

variantMetafieldsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const variantMetafield = await prisma.variantMetafield.update({
      where: { id: Number(id) },
      data,
      include: {
        Variant: {
          include: {
            Product: true,
          },
        },
      },
    });
    res.json(variantMetafield);
    eventTrigger('update-variant-metafield', variantMetafield, data);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

variantMetafieldsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const variantMetafield = await prisma.variantMetafield.delete({
      where: { id: Number(id) },
      include: {
        Variant: {
          include: {
            Product: true,
          },
        },
      },
    });
    res.json({
      message: 'DELETE successful',
      variantMetafield,
    });
    eventTrigger('delete-variant-metafield', variantMetafield, {});
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

export { variantMetafieldsRouter };
