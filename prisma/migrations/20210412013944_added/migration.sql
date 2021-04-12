-- CreateTable
CREATE TABLE "ProductContent" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER,
    "productHandle" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "title" TEXT,
    "description" TEXT,
    "fields" JSONB,
    "published" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductContent" ADD FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
