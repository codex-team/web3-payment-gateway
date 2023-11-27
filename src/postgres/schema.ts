import { integer, pgTable, serial, text, timestamp, varchar, uuid, bigint } from 'npm:drizzle-orm/pg-core';


export const invoices = pgTable('invoices', {
    id: uuid("id").primaryKey().defaultRandom(),
    chainId: integer("chain_id").notNull(),
    walletAddress: varchar("wallet_address").notNull(),
    amount: bigint("amount", { mode: "bigint" }).notNull(),
    status: text("status").notNull().default("pending"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;