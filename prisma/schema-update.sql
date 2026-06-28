-- New columns on Workflow
ALTER TABLE "Workflow" ADD COLUMN IF NOT EXISTS "webhookId" TEXT;
ALTER TABLE "Workflow" ADD COLUMN IF NOT EXISTS "scheduleCron" TEXT;
ALTER TABLE "Workflow" ADD COLUMN IF NOT EXISTS "scheduleEnabled" BOOLEAN NOT NULL DEFAULT false;
CREATE UNIQUE INDEX IF NOT EXISTS "Workflow_webhookId_key" ON "Workflow"("webhookId");

-- Credentials table
CREATE TABLE IF NOT EXISTS "Credential" (
    "id"        TEXT NOT NULL,
    "name"      TEXT NOT NULL,
    "type"      TEXT NOT NULL,
    "data"      JSONB NOT NULL DEFAULT '{}',
    "userId"    TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);
DO $$ BEGIN
  ALTER TABLE "Credential" ADD CONSTRAINT "Credential_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
