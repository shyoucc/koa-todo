import api from '../controllers/todolist.js'
import Router from 'koa-router'

const router = Router()

router.get('/todolist/:id', api.getTodoList)
router.post('/todolist', api.createTodoList)

export default router
