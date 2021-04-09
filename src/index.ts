import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// CREATE a new product
app.post('/products', async (req, res) => {
  const data = { ...req.body };
  const newProduct = await prisma.product.create({
    data,
  });
  res.json(newProduct);
});

// READ products
app.get('/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// READ a single product by ID
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

// READ a single product by Handle
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

// UPDATE a single product by ID
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  delete data.handle;
  data.updatedAt = new Date().toISOString();
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

// UPDATE a single product by Handle
app.put('/products/handle/:handle', async (req, res) => {
  const { handle } = req.params;
  const data = { ...req.body };
  delete data.handle;
  data.updatedAt = new Date().toISOString();
  try {
    const product = await prisma.product.update({
      where: { handle },
      data,
    });
    res.json(product);
  } catch (error) {
    res.json({ error });
  }
});

// DELETE a single product by ID
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: 'DELETE successful',
      product,
    });
  } catch (error) {
    res.json({ error });
  }
});

// DELETE a single product by Handle
app.delete('/products/handle/:handle', async (req, res) => {
  const { handle } = req.params;
  try {
    const product = await prisma.product.delete({
      where: { handle },
    });
    res.json({
      message: 'DELETE successful',
      product,
    });
  } catch (error) {
    res.json({ error });
  }
});

app.listen(3000, () => console.log('REST API server ready at: http://localhost:3000'));
