-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_created_for_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_post_by_fkey`;

-- AlterTable
ALTER TABLE `comment` ADD COLUMN `event_created_for` VARCHAR(191) NULL,
    MODIFY `created_for` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `event` (
    `id` VARCHAR(191) NOT NULL,
    `post_by` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `event_type` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `event_post_by_idx`(`post_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `comment_event_created_for_idx` ON `comment`(`event_created_for`);

-- RenameIndex
ALTER TABLE `comment` RENAME INDEX `comment_created_by_fkey` TO `comment_created_by_idx`;

-- RenameIndex
ALTER TABLE `comment` RENAME INDEX `comment_created_for_fkey` TO `comment_created_for_idx`;

-- RenameIndex
ALTER TABLE `post` RENAME INDEX `post_post_by_fkey` TO `post_post_by_idx`;
