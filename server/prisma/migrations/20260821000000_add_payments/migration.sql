-- Add payment tracking columns to orders
ALTER TABLE "orders" ADD COLUMN "status" TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE "orders" ADD COLUMN "stripe_session_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "orders_stripe_session_id_key" ON "orders"("stripe_session_id");
