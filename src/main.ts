import { Hono } from 'https://deno.land/x/hono@v3.10.2/mod.ts'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))

const address = '0xe8DD674Cf196496C2D432ccFAf7F3B9AeeA2F90C'

app.post('/invoice/create', (c) => {
    return c.json({
        status: 'success',
        message: 'Invoice created',
        data: {
            id: '12345',
            amount: 1000,
            currency: 'ETH',
            walletAddress: address,
        },
    })
})

Deno.serve(app.fetch)
