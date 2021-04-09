import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post('/products', async (req, res) => {
  const data = { ...req.body };
  const newProduct = await prisma.product.create({
    data,
  });
  res.json(newProduct);
});

app.get('/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  if (product === null) {
    res.sendStatus(404);
  } else {
    res.json(product);
  }
});

app.get('/products/handle/:handle', async (req, res) => {
  const { handle } = req.params;
  const product = await prisma.product.findUnique({
    where: { handle },
  });
  if (product === null) {
    res.sendStatus(404);
  } else {
    res.json(product);
  }
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data,
    });
    res.json(product);
  } catch (error) {
    res.json({ error });
  }
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: 'success',
    });
  } catch (error) {
    res.json({ error });
  }
});

app.listen(3000, () => console.log('REST API server ready at: http://localhost:3000'));
