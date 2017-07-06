import todoList from '../models/todolist.js'

const getTodoList = async function(ctx){
    let id = ctx.params.id
    let result = await todoList.getTodoListById(id)
    ctx.response.body = result
}

const createTodoList = async function(ctx){
    let data = ctx.request.body
    let result = await todoList.createTodoList(data)

    ctx.body = {
        success: 1
    }
}

export default {
    getTodoList,
    createTodoList
}
