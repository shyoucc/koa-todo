import db from '../config/db.js'
import todoModel from '../schema/list.js'

const todoListDb = db.todoList

const TodoList = todoListDb.import(todoModel)

let getTodoListById = async function(id){
    let todoList = await TodoList.findAll({
        where: {
            user_id: id
        },
        // 返回的三个字段
        attributes: ['id', 'content', 'status']
    })

    return todoList
}

let createTodoList = async function(data){
    await TodoList.create({
        user_id: data.id,
        content: data.content,
        status: data.status
    })
    return
}

export default {
    getTodoListById,
    createTodoList
}
