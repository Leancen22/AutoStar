/*
  Warnings:

  - You are about to drop the column `video` on the `Car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "video",
ADD COLUMN     "youtubeUrl" TEXT[] DEFAULT ARRAY[]::TEXT[];
