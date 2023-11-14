/*
  Warnings:

  - You are about to drop the column `ip` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `refreshed_at` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `user_agent` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `buckets` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `objects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth"."sessions" DROP COLUMN "ip",
DROP COLUMN "refreshed_at",
DROP COLUMN "user_agent";

-- AlterTable
ALTER TABLE "storage"."buckets" DROP COLUMN "owner_id";

-- AlterTable
ALTER TABLE "storage"."objects" DROP COLUMN "owner_id";

-- AddForeignKey
ALTER TABLE "storage"."buckets" ADD CONSTRAINT "buckets_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
