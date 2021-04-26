import { PrismaClient } from '@prisma/client';
import express from 'express';
import eventTrigger from '../../event-trigger';

const productMediaRouter = express.Router();
const prisma = new PrismaClient();

// routes
productMediaRouter.post('/', async (req, res) => {
  const data = { ...req.body };
  try {
    const productMedia = await prisma.productMedia.create({
      data,
      include: {
        ProductContent: {
          include: {
            Product: true,
          },
        },
      },
    });
    res.json(productMedia);
    eventTrigger('create-product-media', productMedia, data);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

productMediaRouter.get('/', async (req, res) => {
  const { skip, take, productContentId } = req.query;
  try {
    if (productContentId) {
      const productMedia = await prisma.productMedia.findMany({
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 25,
        where: { productContentId: Number(productContentId) },
      });
      res.json(productMedia);
    } else {
      const productMedia = await prisma.productMedia.findMany({
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 25,
      });
      res.json(productMedia);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

export { productMediaRouter };
