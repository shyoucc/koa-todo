import api from '../controllers/todolist.js'
import koaRouter from 'koa-router'

const router = koaRouter()

router.get('/todolist/:id', api.getTodoList)
router.post('/todolist', api.createTodoList)
router.delete('/todolist/:userId/:id', api.removeTodoList),
router.put('/todolist/:userId/:id/:status', api.updateTodoList)

export default router
