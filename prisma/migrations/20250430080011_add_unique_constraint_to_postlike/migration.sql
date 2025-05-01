/*
  Warnings:

  - A unique constraint covering the columns `[postId,userId]` on the table `PostLikes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PostLikes_postId_userId_key` ON `PostLikes`(`postId`, `userId`);
