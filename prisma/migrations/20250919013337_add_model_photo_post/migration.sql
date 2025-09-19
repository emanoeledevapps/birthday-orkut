-- CreateTable
CREATE TABLE "public"."PhotoPost" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PhotoPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."PhotoPost" ADD CONSTRAINT "PhotoPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
