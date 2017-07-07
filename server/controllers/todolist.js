import todoList from '../models/todolist.js'

const getTodoList = async function(ctx){
    let id = ctx.params.id
    let result = await todoList.getTodoListById(id)
    ctx.body = {
        success: 1,
        list: result
    }
}

const createTodoList = async function(ctx){
    let data = ctx.request.body
    let result = await todoList.createTodoList(data)

    ctx.body = {
        success: 1
    }
}

const removeTodoList = async function(ctx){
    let id = ctx.params.id
    let user_id = ctx.params.userId
    let result = await todoList.removeTodoList(id, user_id)

    ctx.body = {
        success: 1
    }
}

const updateTodoList = async function(ctx){
    let id = ctx.params.id
    let user_id = ctx.params.userId
    let status = ctx.params.status

    let result = await todoList.updateTodoList(id, user_id, status)

    ctx.body = {
        success: 1
    }
}

export default {
    getTodoList,
    createTodoList,
    removeTodoList,
    updateTodoList
}
