import { Hono } from 'https://deno.land/x/hono@v3.10.2/mod.ts'
import { cors } from 'https://deno.land/x/hono/middleware.ts'


const app = new Hono()

app.use('*', cors())


app.get('/', (c) => c.text('Hello Hono!'))

const address = '0xe8DD674Cf196496C2D432ccFAf7F3B9AeeA2F90C'

app.post('/invoice/create', (c) => {
    return c.json({
        status: 'success',
        message: 'Invoice created',
        data: {
            id: '12345',
            amount: 0.0000001 * 10**18,
            currency: 'ETH',
            walletAddress: address,
        },
    })
})

Deno.serve(app.fetch)
