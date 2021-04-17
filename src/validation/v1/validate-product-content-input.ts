import { PrismaClient } from '@prisma/client';
import ValidationResponse from './validation-response';

const prisma = new PrismaClient();

export default async (inputData: any): Promise<ValidationResponse> => {
  if (!inputData.productId) {
    return new ValidationResponse(false, 422, 'Product Content must include a productId which is the ID of the parent product', inputData);
  }
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(inputData.productId) },
    });
    if (product === null) {
      return new ValidationResponse(false, 404, `Parent Product with id ${inputData.productId} was not found`, inputData);
    }
    const cleansedData = inputData;
    cleansedData.productHandle = product.handle;
    return new ValidationResponse(true, 200, 'Product Content inputData is valid', cleansedData);
  } catch (error) {
    console.log(error);
    return new ValidationResponse(false, 422, `Unable to query for Parent Product with id ${inputData.productId}`, inputData);
  }
};
