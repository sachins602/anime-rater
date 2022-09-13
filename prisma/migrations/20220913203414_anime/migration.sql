/*
  Warnings:

  - A unique constraint covering the columns `[userId,animeId]` on the table `UserAnime` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserAnime_userId_animeId_key` ON `UserAnime`(`userId`, `animeId`);
