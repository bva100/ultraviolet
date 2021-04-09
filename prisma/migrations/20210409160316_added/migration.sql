-- CreateTable
CREATE TABLE "VariantMetafield" (
    "id" SERIAL NOT NULL,
    "variantId" INTEGER,
    "namespace" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB,
    "helpText" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VariantMetafield" ADD FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
