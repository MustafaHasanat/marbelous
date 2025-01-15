-- CreateTable
CREATE TABLE "Marbelous" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "identifier" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Marbelous_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Marbelous_identifier_key" ON "Marbelous"("identifier");
