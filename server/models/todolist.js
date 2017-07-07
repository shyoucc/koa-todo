import db from '../config/db.js'
const todoModel = '../schema/list.js'

const todoListDb = db.todoList

const TodoList = todoListDb.import(todoModel)

const getTodoListById = async function(id){
    let todoList = await TodoList.findAll({
        where: {
            user_id: id
        },
        // 返回的三个字段
        attributes: ['id', 'content', 'status']
    })

    return todoList
}

const createTodoList = async function(data){
    await TodoList.create({
        user_id: data.id,
        content: data.content,
        status: data.status
    })
    return
}

const removeTodoList = async function(id, user_id){
    await TodoList.destroy({
        where: {
            id,
            user_id
        }
    })
    return
}

const updateTodoList = async function(id, user_id, status){
    await TodoList.update(
        {
            status
        },
        {
            where: {
                id,
                user_id
            }
        }
    )
    return
}

export default {
    getTodoListById,
    createTodoList,
    removeTodoList,
    updateTodoList
}
