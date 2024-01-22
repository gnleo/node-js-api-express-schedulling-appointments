-- CreateTable
CREATE TABLE "patient" (
    "id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patient_document_key" ON "patient"("document");

-- CreateIndex
CREATE UNIQUE INDEX "patient_email_key" ON "patient"("email");

-- AddForeignKey
ALTER TABLE "patient" ADD CONSTRAINT "patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
