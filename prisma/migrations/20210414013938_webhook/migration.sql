-- CreateTable
CREATE TABLE "Webhook" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "objectPayload" TEXT NOT NULL,
    "objectInput" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
