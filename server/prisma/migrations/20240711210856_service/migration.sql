/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Subcategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Worker` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Worker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Created';

-- AlterTable
ALTER TABLE "Worker" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RepairType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RepairType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "repairTypeId" INTEGER NOT NULL,
    "workerId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DeviceToRepairType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_OrderToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DeviceToRepairType_AB_unique" ON "_DeviceToRepairType"("A", "B");

-- CreateIndex
CREATE INDEX "_DeviceToRepairType_B_index" ON "_DeviceToRepairType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToService_AB_unique" ON "_OrderToService"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToService_B_index" ON "_OrderToService"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_name_key" ON "Subcategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Worker_email_key" ON "Worker"("email");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_repairTypeId_fkey" FOREIGN KEY ("repairTypeId") REFERENCES "RepairType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToRepairType" ADD CONSTRAINT "_DeviceToRepairType_A_fkey" FOREIGN KEY ("A") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToRepairType" ADD CONSTRAINT "_DeviceToRepairType_B_fkey" FOREIGN KEY ("B") REFERENCES "RepairType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToService" ADD CONSTRAINT "_OrderToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToService" ADD CONSTRAINT "_OrderToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
