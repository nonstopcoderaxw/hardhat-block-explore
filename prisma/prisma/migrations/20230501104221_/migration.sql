/*
  Warnings:

  - You are about to drop the column `decodedLogs` on the `Log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "decodedLogs",
ADD COLUMN     "decodedLog" JSONB;
