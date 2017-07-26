import qiniu from '../controllers/upload.js'
import koaRouter from 'koa-router'

const router = koaRouter()

router.post('/getToken', qiniu.getUploadToken)

export default router
