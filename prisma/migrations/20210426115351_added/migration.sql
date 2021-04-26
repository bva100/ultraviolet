-- CreateTable
CREATE TABLE "ProductMedia" (
    "id" SERIAL NOT NULL,
    "productContentId" INTEGER,
    "src" TEXT NOT NULL,
    "thumbnailSrc" TEXT,
    "mimeType" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductMedia" ADD FOREIGN KEY ("productContentId") REFERENCES "ProductContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
