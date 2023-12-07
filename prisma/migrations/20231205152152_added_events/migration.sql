/*
  Warnings:

  - You are about to drop the column `location` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `event` table. All the data in the column will be lost.
  - Added the required column `address` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `location`,
    DROP COLUMN `url`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL;
