/*
  Warnings:

  - You are about to drop the `Webhook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Webhook";

-- CreateTable
CREATE TABLE "WebhookConfig" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "signature" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
