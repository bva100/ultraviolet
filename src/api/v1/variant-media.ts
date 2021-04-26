import { PrismaClient } from '@prisma/client';
import express from 'express';
import eventTrigger from '../../event-trigger';

const variantMediaRouter = express.Router();
const prisma = new PrismaClient();

// routes
variantMediaRouter.post('/', async (req, res) => {
  const data = { ...req.body };
  try {
    const variantMedia = await prisma.variantMedia.create({
      data,
      include: {
        VariantContent: {
          include: {
            Variant: {
              include: {
                Product: true,
              },
            },
          },
        },
      },
    });
    res.json(variantMedia);
    eventTrigger('create-variant-media', variantMedia, data);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

variantMediaRouter.get('/', async (req, res) => {
  const { skip, take, variantContentId } = req.query;
  try {
    if (variantContentId) {
      const variantMedia = await prisma.variantMedia.findMany({
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 25,
        where: { variantContentId: Number(variantContentId) },
      });
      res.json(variantMedia);
    } else {
      const variantMedia = await prisma.variantMedia.findMany({
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 25,
      });
      res.json(variantMedia);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

variantMediaRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const variantMedia = await prisma.variantMedia.findUnique({
      where: { id: Number(id) },
    });
    if (variantMedia === null) {
      res.sendStatus(404);
    } else {
      res.json(variantMedia);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

export { variantMediaRouter };
