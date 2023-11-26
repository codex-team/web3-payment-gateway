import { Hono } from 'https://deno.land/x/hono@v3.10.2/mod.ts'
import { cors } from 'https://deno.land/x/hono/middleware.ts'
import { address, amount } from "./constants.ts";


const app = new Hono()

app.use('*', cors())


app.get('/', (c) => c.text('Hello Hono!'))

app.post('/invoice/create', (c) => {
    return c.json({
        status: 'success',
        message: 'Invoice created',
        data: {
            id: '12345',
            amount: amount,
            currency: 'ETH',
            walletAddress: address,
        },
    })
})

Deno.serve(app.fetch)
