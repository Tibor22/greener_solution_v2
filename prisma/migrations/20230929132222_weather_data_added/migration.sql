-- CreateTable
CREATE TABLE "Weather" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "temperature" TEXT NOT NULL,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);
