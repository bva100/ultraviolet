-- CreateTable
CREATE TABLE "ProductMetafield" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER,
    "namespace" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB,
    "helpText" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductMetafield" ADD FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
