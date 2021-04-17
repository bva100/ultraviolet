import { PrismaClient } from '@prisma/client';
import express from 'express';
import eventTrigger from '../../event-trigger';
import validateProductContentInput from '../../validation/v1/validate-product-content-input';

const productContentRouter = express.Router();
const prisma = new PrismaClient();

// routes
productContentRouter.post('/', async (req, res) => {
  let data = { ...req.body };
  const validated = await validateProductContentInput('create', data);
  if (!validated.valid) {
    res.status(validated.status).json({
      message: validated.message,
      inputData: data,
    });
    return false;
  }
  data = validated.cleansedData;
  try {
    const productContent = await prisma.productContent.create({
      data,
      include: {
        Product: true,
      },
    });
    res.json(productContent);
    eventTrigger('create-product-content', productContent, data);
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

productContentRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  let data = { ...req.body };
  const validated = await validateProductContentInput('update', data);
  if (!validated.valid) {
    res.status(validated.status).json({
      message: validated.message,
      inputData: data,
    });
    return false;
  }
  data = validated.cleansedData;
  try {
    const productContent = await prisma.productContent.update({
      where: { id: Number(id) },
      data,
      include: {
        Product: true,
      },
    });
    res.json(productContent);
    eventTrigger('update-product-content', productContent, data);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

productContentRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productContent = await prisma.productContent.delete({
      where: { id: Number(id) },
      include: {
        Product: true,
      },
    });
    res.json({
      message: 'DELETE successful',
      productContent,
    });
    eventTrigger('delete-product-content', productContent, {});
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

export { productContentRouter };
