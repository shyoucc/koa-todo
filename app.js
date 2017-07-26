import Koa from 'koa'
import josn from 'koa-json'
import logger from 'koa-logger'

import auth from './server/routes/auth.js'
import api from './server/routes/api.js'
import qiniu from './server/routes/qiniu.js'

import jwt from 'koa-jwt'
import koaRouter from 'koa-router'

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

app.use(async function(ctx, next){
    try {
        await next()
    } catch (err){
        if (err.status === 401) {
            ctx.status = 401
            ctx.body = {
                success: -1,
                token: null,
                info: 'jwt'
            }
        } else {
            throw err
        }
    }
})

app.on('error', (err, ctx) => {
    console.log('server error', err)
})

router.use('/auth', auth.routes())
router.use('/qiniu', qiniu.routes())
router.use('/api', jwt({secret: 'vue-koa-todo'}), api.routes())

app.use(router.routes())

app.listen('8888', () => {
    console.log('koa is listening in 8888')
})

export default app
