import Koa from 'koa'
import josn from 'koa-json'
import logger from 'koa-logger'

import koaRouter from 'koa-router'
import auth from './server/routes/auth.js'
import api from './server/routes/api.js'

import jwt from 'koa-jwt'
import koaBodyparser from 'koa-bodyparser'

const app = new Koa()
const router = koaRouter()

app.use(koaBodyparser())
app.use(josn())
app.use(logger())

app.use(async function(ctx, next){
    let start = new Date
    await next()
    let ms = new Date - start
    console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.on('error', (err, ctx) => {
    console.log('server error', err)
})


router.use('/auth', auth.routes())
router.use('/api', jwt({secret: 'vue-koa-todo'}) ,api.routes())

app.use(router.routes())

app.listen('8888', () => {
    console.log('koa is listening in 8888')
})

export default app
