/*
  Warnings:

  - Changed the type of `baseFeePerGas` on the `Block` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `difficulty` on the `Block` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gasLimit` on the `Block` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gasUsed` on the `Block` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Block" DROP COLUMN "baseFeePerGas",
ADD COLUMN     "baseFeePerGas" BIGINT NOT NULL,
DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" BIGINT NOT NULL,
DROP COLUMN "gasLimit",
ADD COLUMN     "gasLimit" BIGINT NOT NULL,
DROP COLUMN "gasUsed",
ADD COLUMN     "gasUsed" BIGINT NOT NULL;
