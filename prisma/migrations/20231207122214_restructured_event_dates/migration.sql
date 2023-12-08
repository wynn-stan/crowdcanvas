/*
  Warnings:

  - You are about to drop the column `date` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `event` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `date`,
    DROP COLUMN `end_time`,
    DROP COLUMN `start_time`,
    ADD COLUMN `end_date` DATETIME(3) NOT NULL,
    ADD COLUMN `start_date` DATETIME(3) NOT NULL;
