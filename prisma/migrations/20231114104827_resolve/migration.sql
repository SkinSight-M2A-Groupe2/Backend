-- DropForeignKey
ALTER TABLE "storage"."buckets" DROP CONSTRAINT "buckets_owner_fkey";

-- AlterTable
ALTER TABLE "auth"."sessions" ADD COLUMN     "ip" INET,
ADD COLUMN     "refreshed_at" TIMESTAMP(6),
ADD COLUMN     "user_agent" TEXT;

-- AlterTable
ALTER TABLE "storage"."buckets" ADD COLUMN     "owner_id" TEXT;

-- AlterTable
ALTER TABLE "storage"."objects" ADD COLUMN     "owner_id" TEXT;
