import { PrismaClient } from '@prisma/client';
import express from 'express';
import eventTrigger from '../../event-trigger';

const variantContentRouter = express.Router();
const prisma = new PrismaClient();

variantContentRouter.post('/', async (req, res) => {
  const data = { ...req.body };
  try {
    const variantContent = await prisma.variantContent.create({
      data,
    });
    res.json(variantContent);
    eventTrigger('create-variant-content', variantContent, data);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

variantContentRouter.get('/', async (req, res) => {
  const { skip, take } = req.query;
  try {
    const variantContent = await prisma.variantContent.findMany({
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 25,
    });
    res.json(variantContent);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

variantContentRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const variantContent = await prisma.variantContent.findUnique({
      where: { id: Number(id) },
    });
    if (variantContent === null) {
      res.sendStatus(404);
    } else {
      res.json(variantContent);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

variantContentRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const variantContent = await prisma.variantContent.update({
      where: { id: Number(id) },
      data,
    });
    res.json(variantContent);
    eventTrigger('update-variant-content', variantContent, data);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

variantContentRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const variantContent = await prisma.variantContent.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: 'DELETE successful',
      variantContent,
    });
    eventTrigger('delete-variant-content', variantContent, {});
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

export { variantContentRouter };
