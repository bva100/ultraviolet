-- CreateTable
CREATE TABLE "VariantMedia" (
    "id" SERIAL NOT NULL,
    "variantContentId" INTEGER,
    "src" TEXT NOT NULL,
    "thumbnailSrc" TEXT,
    "mimeType" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VariantMedia" ADD FOREIGN KEY ("variantContentId") REFERENCES "VariantContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
