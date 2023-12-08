/*
  Warnings:

  - You are about to drop the column `event_created_for` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `post_by` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[related_post]` on the table `event` will be added. If there are existing duplicate values, this will fail.
  - Made the column `created_for` on table `comment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `related_post` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `comment_event_created_for_idx` ON `comment`;

-- DropIndex
DROP INDEX `event_post_by_idx` ON `event`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `event_created_for`,
    MODIFY `created_for` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `createdAt`,
    DROP COLUMN `description`,
    DROP COLUMN `post_by`,
    DROP COLUMN `title`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `related_post` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `post_type` VARCHAR(191) NOT NULL DEFAULT 'post';

-- CreateIndex
CREATE UNIQUE INDEX `event_related_post_key` ON `event`(`related_post`);
