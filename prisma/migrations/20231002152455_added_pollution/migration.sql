-- CreateTable
CREATE TABLE "Pollution" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Pollution_pkey" PRIMARY KEY ("id")
);
