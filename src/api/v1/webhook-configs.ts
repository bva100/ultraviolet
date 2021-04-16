import { PrismaClient } from '@prisma/client';
import express from 'express';

const webhookConfigRouter = express.Router();
const prisma = new PrismaClient();

webhookConfigRouter.post('/', async (req, res) => {
  const data = { ...req.body };
  try {
    const webhookConfig = await prisma.webhookConfig.create({
      data,
    });
    res.json(webhookConfig);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

webhookConfigRouter.get('/', async (req, res) => {
  const { skip, take } = req.params;
  const { topic } = req.query;
  try {
    if (topic) {
      const webhookConfigs = await prisma.webhookConfig.findMany({
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 25,
        where: { topic: String(topic) },
      });
      res.json(webhookConfigs);
    } else {
      const webhookConfigs = await prisma.webhookConfig.findMany({
        skip: skip ? Number(skip) : 0,
        take: take ? Number(take) : 25,
      });
      res.json(webhookConfigs);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

webhookConfigRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const webhookConfig = await prisma.webhookConfig.findUnique({
      where: { id: Number(id) },
    });
    if (webhookConfig === null) {
      res.sendStatus(404);
    } else {
      res.json(webhookConfig);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

webhookConfigRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const webhookConfig = await prisma.webhookConfig.update({
      where: { id: Number(id) },
      data,
    });
    res.json(webhookConfig);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

webhookConfigRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const webhookConfig = await prisma.webhookConfig.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: 'DELETE successful',
      webhookConfig,
    });
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

export { webhookConfigRouter };
