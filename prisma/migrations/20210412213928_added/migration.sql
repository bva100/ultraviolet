-- CreateTable
CREATE TABLE "VariantContent" (
    "id" SERIAL NOT NULL,
    "variantId" INTEGER,
    "productHandle" TEXT NOT NULL,
    "Locale" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "swatchSrc" TEXT,
    "fields" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VariantContent" ADD FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
