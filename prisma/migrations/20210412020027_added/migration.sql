/*
  Warnings:

  - Made the column `updatedAt` on table `ProductContent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Variant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `VariantMetafield` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProductContent" ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Variant" ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "VariantMetafield" ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
