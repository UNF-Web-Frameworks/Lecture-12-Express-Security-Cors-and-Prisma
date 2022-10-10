-- CreateTable
CREATE TABLE "Dog" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "secretcmd" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Dog_id_key" ON "Dog"("id");
