/*
  Warnings:

  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Link";

-- CreateTable
CREATE TABLE "links" (
    "code" VARCHAR(8) NOT NULL,
    "target_url" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_clicked" TIMESTAMPTZ(6),

    CONSTRAINT "links_pkey" PRIMARY KEY ("code")
);
