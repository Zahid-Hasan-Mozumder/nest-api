/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_link_key" ON "Bookmark"("link");
