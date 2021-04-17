import { PrismaClient } from '@prisma/client';
import ValidationResponse from './validation-response';

const prisma = new PrismaClient();

// possible actions are: 'create', 'update', 'delete
export default async (action: string, inputData: any): Promise<ValidationResponse> => {
  if (action === 'create' && !inputData.productId) {
    return new ValidationResponse(false, 422, 'Product Content must include a productId which is the ID of the parent product', inputData);
  }

  // get handle for parent product
  const cleansedData = inputData;
  try {
    // get product handle associated with parent product by querying with productId
    if (action === 'create') {
      const product = await prisma.product.findUnique({
        where: { id: Number(inputData.productId) },
      });
      if (product === null) {
        return new ValidationResponse(false, 404, `Parent Product with id ${inputData.productId} was not found`, inputData);
      }
      cleansedData.productHandle = product.handle;
    } else if (action === 'update') {
      // do not allow product handle to be updated
      delete cleansedData.productHandle;
    }
    return new ValidationResponse(true, 200, 'Product Content inputData is valid', cleansedData);
  } catch (error) {
    console.log(error);
    return new ValidationResponse(false, 422, 'Unable to query for Parent Product', inputData);
  }
};
