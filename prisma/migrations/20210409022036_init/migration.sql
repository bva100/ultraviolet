-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "handle" TEXT NOT NULL,
    "productType" TEXT,
    "vendor" TEXT,
    "tags" TEXT,
    "availableForSale" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER,
    "availableForSale" BOOLEAN NOT NULL DEFAULT true,
    "price" DECIMAL(65,30) NOT NULL,
    "priceCurrency" TEXT NOT NULL,
    "compareAtPrice" DECIMAL(65,30),
    "quantityAvailable" INTEGER NOT NULL,
    "sku" TEXT,
    "weight" DECIMAL(65,30),
    "weightUnit" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product.handle_unique" ON "Product"("handle");

-- AddForeignKey
ALTER TABLE "Variant" ADD FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
