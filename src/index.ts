import { PrismaClient } from '@prisma/client';
import express, { application } from 'express';
import { allowedNodeEnvironmentFlags } from 'node:process';
import { visitFunctionBody } from 'typescript';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// *****************
// *** PRODUCTS ***
// *****************

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
  const products = await prisma.product.findMany({
    include: {
      variants: true,
      metafields: true,
    },
  });
  res.json(products);
});

// READ a single product by ID
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      variants: true,
      metafields: true,
    },
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
    include: {
      variants: true,
      metafields: true,
    },
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

// **************************
// *** PRODUCT METAFIELDS ***
// **************************

// CREATE a single product metafield
app.post('/product-metafields', async (req, res) => {
  const data = { ...req.body };
  const productMetafield = await prisma.productMetafield.create({
    data,
  });
  res.json(productMetafield);
});

// READ product metafield by ID
app.get('/product-metafields/:id', async (req, res) => {
  const { id } = req.params;
  const productMetafield = await prisma.productMetafield.findUnique({
    where: { id: Number(id) },
  });
  res.json(productMetafield);
});

// READ many product metafields
app.get('/product-metafields', async (req, res) => {
  const productMetafield = await prisma.productMetafield.findMany();
  res.json(productMetafield);
});

// UPDATE a single product metafield by ID
app.put('/product-metafields/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  data.updatedAt = new Date().toISOString();
  const productMetafield = await prisma.productMetafield.update({
    where: { id: Number(id) },
    data,
  });
  res.json(productMetafield);
});

// Delete product metafield by ID
app.delete('/product-metafields/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productMetafield = await prisma.productMetafield.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: 'DELETE successful',
      productMetafield,
    });
  } catch (error) {
    res.json({ error });
  }
});

// *****************
// *** VARIANTS ****
// *****************

// Create a new variant
app.post('/variants', async (req, res) => {
  const data = { ...req.body };
  const variant = await prisma.variant.create({
    data,
  });
  res.json(variant);
});

// READ all variants
app.get('/variants', async (req, res) => {
  const variants = await prisma.variant.findMany();
  res.json(variants);
});

// READ variant by ID
app.get('/variants/:id', async (req, res) => {
  const { id } = req.params;
  const variant = await prisma.variant.findUnique({
    where: { id: Number(id) },
  });
  res.json(variant);
});

// UPDATE a single variant by ID
app.put('/variants/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  const variant = await prisma.variant.update({
    where: { id: Number(id) },
    data,
  });
  res.json(variant);
});

// DELETE a single variant by ID
app.delete('/variants/:id', async (req, res) => {
  const { id } = req.params;
  const variant = await prisma.variant.delete({
    where: { id: Number(id) },
  });
  res.json({
    message: 'DELETE successful',
    variant,
  });
});

// **************************
// *** VARIANT METAFIELDS ***
// **************************

// CREATE a single variant metafield
app.post('/variant-metafields', async (req, res) => {
  const data = { ...req.body };
  const variantMetafield = await prisma.variantMetafield.create({
    data,
  });
  res.json(variantMetafield);
});

// READ variant metafields
app.get('/variant-metafields', async (req, res) => {
  const variantMetafields = await prisma.variantMetafield.findMany();
  res.json(variantMetafields);
});

//  READ a variant metafield by ID
app.get('/variant-metafields/:id', async (req, res) => {
  const { id } = req.params;
  const variantMetafield = await prisma.variantMetafield.findUnique({
    where: { id: Number(id) },
  });
  res.json(variantMetafield);
});

// UPDATE a variant metafield by ID
app.put('/variant-metafields/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  data.updatedAt = new Date().toISOString();
  const variantMetafield = await prisma.variantMetafield.update({
    where: { id: Number(id) },
    data,
  });
  res.json(variantMetafield);
});

// DELETE a variant metafield by ID
// Delete product metafield by ID
app.delete('/variant-metafields/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const variantMetafield = await prisma.variantMetafield.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: 'DELETE successful',
      variantMetafield,
    });
  } catch (error) {
    res.json({ error });
  }
});

app.listen(3000, () => console.log('REST API server ready at: http://localhost:3000'));
