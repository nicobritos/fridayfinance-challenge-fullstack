-- CreateIndex
CREATE INDEX "Transaction_currency_idx" ON "Transaction" USING HASH ("currency");

-- CreateIndex
CREATE INDEX "Transaction_amount_idx" ON "Transaction" USING HASH ("amount");

-- CreateIndex
CREATE INDEX "Transaction_accountId_idx" ON "Transaction" USING HASH ("accountId");

-- CreateIndex
CREATE INDEX "Transaction_date_idx" ON "Transaction"("date");
