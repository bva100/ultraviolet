import { PrismaClient } from '@prisma/client';
import express, { application } from 'express';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// *****************
// *** PRODUCTS ***
// *****************

// CREATE a new product
app.post('/api/v1/products', async (req, res) => {
  const data = { ...req.body };
  try {
    const newProduct = await prisma.product.create({
      data,
    });
    res.json(newProduct);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// READ products
app.get('/api/v1/products', async (req, res) => {
  const { skip, take } = req.query;
  try {
    const products = await prisma.product.findMany({
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 25,
      include: {
        content: true,
        variants: true,
        metafields: true,
      },
    });
    res.json(products);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// READ a single product by ID
app.get('/api/v1/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
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
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// READ a single product by Handle
app.get('/api/v1/products/handle/:handle', async (req, res) => {
  const { handle } = req.params;
  try {
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
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// UPDATE a single product by ID
app.put('/api/v1/products/:id', async (req, res) => {
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
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// UPDATE a single product by Handle
app.put('/api/v1/products/handle/:handle', async (req, res) => {
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
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// DELETE a single product by ID
app.delete('/api/v1/products/:id', async (req, res) => {
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
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// DELETE a single product by Handle
app.delete('/api/v1/products/handle/:handle', async (req, res) => {
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
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// **************************
// *** PRODUCT CONTENT ******
// **************************

// CREATE product content
app.post('/api/v1/product-content', async (req, res) => {
  const data = { ...req.body };
  try {
    const productContent = await prisma.productContent.create({
      data,
    });
    res.json(productContent);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// READ many product content
app.get('/api/v1/product-content', async (req, res) => {
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

// READ a product content by ID
app.get('/api/v1/product-content/:id', async (req, res) => {
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

// UPDATE a single product content by ID
app.put('/api/v1/product-content/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const productContent = await prisma.productContent.update({
      where: { id: Number(id) },
      data,
    });
    res.json(productContent);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// DELETE a single product content by ID
app.delete('/api/v1/product-content/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productContent = await prisma.productContent.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: 'DELETE successful',
      productContent,
    });
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// **************************
// *** PRODUCT METAFIELDS ***
// **************************

// CREATE a single product metafield
app.post('/api/v1/product-metafields', async (req, res) => {
  const data = { ...req.body };
  try {
    const productMetafield = await prisma.productMetafield.create({
      data,
    });
    res.json(productMetafield);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// READ many product metafields
app.get('/api/v1/product-metafields', async (req, res) => {
  const { skip, take } = req.query;
  try {
    const productMetafields = await prisma.productMetafield.findMany({
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 25,
    });
    res.json(productMetafields);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// READ product metafield by ID
app.get('/api/v1/product-metafields/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productMetafield = await prisma.productMetafield.findUnique({
      where: { id: Number(id) },
    });
    if (productMetafield === null) {
      res.sendStatus(404);
    } else {
      res.json(productMetafield);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// UPDATE a single product metafield by ID
app.put('/api/v1/product-metafields/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const productMetafield = await prisma.productMetafield.update({
      where: { id: Number(id) },
      data,
    });
    res.json(productMetafield);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// Delete product metafield by ID
app.delete('/api/v1/product-metafields/:id', async (req, res) => {
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
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// *****************
// *** VARIANTS ****
// *****************

// CREATE a new variant
app.post('/api/v1/variants', async (req, res) => {
  const data = { ...req.body };
  try {
    const variant = await prisma.variant.create({
      data,
    });
    res.json(variant);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// READ all variants
app.get('/api/v1/variants', async (req, res) => {
  const { skip, take } = req.query;
  try {
    const variants = await prisma.variant.findMany({
      skip: skip ? Number(skip) : 0,
      take: take ? Number(take) : 25,
      include: {
        content: true,
        metafields: true,
      },
    });
    res.json(variants);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// READ variant by ID
app.get('/api/v1/variants/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const variant = await prisma.variant.findUnique({
      where: { id: Number(id) },
      include: {
        content: true,
        metafields: true,
      },
    });
    if (variant === null) {
      res.sendStatus(404);
    } else {
      res.json(variant);
    }
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// UPDATE a single variant by ID
app.put('/api/v1/variants/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const variant = await prisma.variant.update({
      where: { id: Number(id) },
      data,
    });
    res.json(variant);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// DELETE a single variant by ID
app.delete('/api/v1/variants/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const variant = await prisma.variant.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: 'DELETE successful',
      variant,
    });
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// **************************
// *** VARIANT CONTENT ***
// **************************

// CREATE a single variant content
app.post('/api/v1/variant-content', async (req, res) => {
  const data = { ...req.body };
  try {
    const variantContent = await prisma.variantContent.create({
      data,
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

// READ many variant content
app.get('/api/v1/variant-content', async (req, res) => {
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

// READ a single variant content by ID
app.get('/api/v1/variant-content/:id', async (req, res) => {
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

// UPDATE a single variant content by ID
app.put('/api/v1/variant-content/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const variantContent = await prisma.variantContent.update({
      where: { id: Number(id) },
      data,
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

// DELETE a single variant content by ID
app.delete('/api/v1/variant-content/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const variantContent = await prisma.variantContent.delete({
      where: { id: Number(id) },
    });
    res.json({
      message: 'DELETE successful',
      variantContent,
    });
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// **************************
// *** VARIANT METAFIELDS ***
// **************************

// CREATE a single variant metafield
app.post('/api/v1/variant-metafields', async (req, res) => {
  const data = { ...req.body };
  try {
    const variantMetafield = await prisma.variantMetafield.create({
      data,
    });
    res.json(variantMetafield);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// READ variant metafields
app.get('/api/v1/variant-metafields', async (req, res) => {
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

//  READ a variant metafield by ID
app.get('/api/v1/variant-metafields/:id', async (req, res) => {
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

// UPDATE a variant metafield by ID
app.put('/api/v1/variant-metafields/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  try {
    const variantMetafield = await prisma.variantMetafield.update({
      where: { id: Number(id) },
      data,
    });
    res.json(variantMetafield);
  } catch (error) {
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// DELETE a variant metafield by ID
app.delete('/api/v1/variant-metafields/:id', async (req, res) => {
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
    res.json({
      code: String(error.code),
      meta: error.meta,
      message: String(error.message),
    });
  }
});

// **************************
// *** WEBHOOK CONFIGS ******
// **************************

// CREATE a single webhook config
app.post('/api/v1/webhook-configs', async (req, res) => {
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

// READ webhook configs
app.get('/api/v1/webhook-configs', async (req, res) => {
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

// READ webhook config by ID
app.get('/api/v1/webhook-configs/:id', async (req, res) => {
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

// UPDATE a webhook config by ID
app.put('/api/v1/webhook-configs/:id', async (req, res) => {
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

// DELETE a webhook config by ID
app.delete('/api/v1/webhook-configs/:id', async (req, res) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('REST API server ready at: http://localhost:3000'));
