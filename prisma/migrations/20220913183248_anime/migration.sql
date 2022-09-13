-- CreateTable
CREATE TABLE `UserAnime` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `animeId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserAnime` ADD CONSTRAINT `UserAnime_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAnime` ADD CONSTRAINT `UserAnime_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `Animes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
