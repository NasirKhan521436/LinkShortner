-- CreateTable
CREATE TABLE "Link" (
    "code" VARCHAR(8) NOT NULL,
    "target_url" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_clicked" TIMESTAMPTZ(6),

    CONSTRAINT "Link_pkey" PRIMARY KEY ("code")
);
