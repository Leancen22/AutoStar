/*
  Warnings:

  - You are about to drop the column `youtubeUrl` on the `Car` table. All the data in the column will be lost.
  - Added the required column `video` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "youtubeUrl",
ADD COLUMN     "video" TEXT NOT NULL;
