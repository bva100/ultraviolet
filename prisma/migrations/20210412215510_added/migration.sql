/*
  Warnings:

  - You are about to drop the column `Locale` on the `VariantContent` table. All the data in the column will be lost.
  - Added the required column `locale` to the `VariantContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VariantContent" DROP COLUMN "Locale",
ADD COLUMN     "locale" TEXT NOT NULL;
