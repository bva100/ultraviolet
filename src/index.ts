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
      content: true,
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
      content: true,
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
      content: true,
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
// *** PRODUCT CONTENT ******
// **************************

// CREATE product content
app.post('/product-content', async (req, res) => {
  const data = { ...req.body };
  const productContent = await prisma.productContent.create({
    data,
  });
  res.json(productContent);
});

// READ many product content
app.get('/product-content', async (req, res) => {
  const productContent = await prisma.productContent.findMany();
  res.json(productContent);
});

// READ a product content by ID
app.get('/product-content/:id', async (req, res) => {
  const { id } = req.params;
  const productContent = await prisma.productContent.findUnique({
    where: { id: Number(id) },
  });
  res.json(productContent);
});

// UPDATE a single product content by ID
app.put('/product-content/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  const productContent = await prisma.productContent.update({
    where: { id: Number(id) },
    data,
  });
  res.json(productContent);
});

// DELETE a single product content by ID
app.delete('/product-content/:id', async (req, res) => {
  const { id } = req.params;
  const productContent = await prisma.productContent.delete({
    where: { id: Number(id) },
  });
  res.json({
    message: 'DELETE successful',
    productContent,
  });
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

// CREATE a new variant
app.post('/variants', async (req, res) => {
  const data = { ...req.body };
  const variant = await prisma.variant.create({
    data,
  });
  res.json(variant);
});

// READ all variants
app.get('/variants', async (req, res) => {
  const variants = await prisma.variant.findMany({
    include: {
      content: true,
      metafields: true,
    },
  });
  res.json(variants);
});

// READ variant by ID
app.get('/variants/:id', async (req, res) => {
  const { id } = req.params;
  const variant = await prisma.variant.findUnique({
    where: { id: Number(id) },
    include: {
      content: true,
      metafields: true,
    },
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
// *** VARIANT CONTENT ***
// **************************

// CREATE a single variant content
app.post('/variant-content', async (req, res) => {
  const data = { ...req.body };
  const variantContent = await prisma.variantContent.create({
    data,
  });
  res.json(variantContent);
});

// READ many variant content
app.get('/variant-content', async (req, res) => {
  const variantContent = await prisma.variantContent.findMany();
  res.json(variantContent);
});

// READ a single variant content by ID
app.get('/variant-content/:id', async (req, res) => {
  const { id } = req.params;
  const variantContent = await prisma.variantContent.findUnique({
    where: { id: Number(id) },
  });
  res.json(variantContent);
});

// UPDATE a single variant content by ID
app.put('/variant-content/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  const variantContent = await prisma.variantContent.update({
    where: { id: Number(id) },
    data,
  });
  res.json(variantContent);
});

// DELETE a single variant content by ID
app.delete('/variant-content/:id', async (req, res) => {
  const { id } = req.params;
  const variantContent = await prisma.variantContent.delete({
    where: { id: Number(id) },
  });
  res.json({
    message: 'DELETE successful',
    variantContent,
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
  const variantMetafield = await prisma.variantMetafield.update({
    where: { id: Number(id) },
    data,
  });
  res.json(variantMetafield);
});

// DELETE a variant metafield by ID
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
