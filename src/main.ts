import { Hono } from "https://deno.land/x/hono@v3.10.2/mod.ts";
import { cors } from "https://deno.land/x/hono@v3.10.2/middleware.ts";
import { address, amount } from "./constants.ts";
import { NewInvoice, invoices } from "./postgres/schema.ts";
import db from "./postgres/db.ts";
import { eq } from 'npm:drizzle-orm';

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => c.text("Hello Hono!"));

if (!BigInt.prototype.hasOwnProperty("toJSON")) {
  Object.defineProperties(BigInt.prototype, {
      toJSON: {
          value: function (this: bigint) {
              return this.toString()
          }
      }
  })
}

app.post("/invoice/create", async (c) => {
  const invoice: NewInvoice = {
    chainId: 5,
    walletAddress: address,
    amount: BigInt(amount),
  }

  const inserted = await db.insert(invoices).values(invoice).returning();

  return c.json({
    status: "success",
    message: "Invoice created",
    data: inserted.shift(),
  });
});

app.get("/invoice/:id", async (c) => {
  const id = c.req.param('id')
  const invoice = await db.query.invoices.findFirst({
    where: eq(invoices.id, id)
  })

  return c.json({
    status: "success",
    message: "Invoice retrieved",
    data: invoice,
  });
})

Deno.serve(app.fetch);
