import Koa from 'koa'
import josn from 'koa-json'
import logger from 'koa-logger'

import koaRouter from 'koa-router'

const app = new Koa()
const routesr = koaRouter()

app.use(josn())
app.use(logger())

app.use(async function(ctx, next){
    let start = new Date
    await next()
    let ms = new Date - start
    console.log('%s %s - %s', ctx.method, ctx.url, ms)

    ctx.response.type = 'text/html'
    ctx.response.body = '<h1>Hello, koa2!</h1>'
})

app.on('error', (err, ctx) => {
    console.log('server error', err)
})

app.listen('8888', () => {
    console.log('koa is listening in 8888')
})

export default app
