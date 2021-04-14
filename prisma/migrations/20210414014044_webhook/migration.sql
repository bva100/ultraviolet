/*
  Warnings:

  - The `objectInput` column on the `Webhook` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `objectPayload` on the `Webhook` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Webhook" DROP COLUMN "objectPayload",
ADD COLUMN     "objectPayload" JSONB NOT NULL,
DROP COLUMN "objectInput",
ADD COLUMN     "objectInput" JSONB;
