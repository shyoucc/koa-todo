import db from '../config/db.js'

const userModel = '../schema/user.js'

const todoListDb = db.todoList;

// 用sequelize的import方法引入表结构，实例化了User。
const User = todoListDb.import(userModel)

// 注意是async function 而不是function。对于需要等待promise结果的函数都需要async await。
const getUserId = async function(id){
    // 用await控制异步操作，将返回的Promise对象里的数据返回出来。也就实现了“同步”的写法获取异步IO操作的数据
    let userInfo = await User.findOne({
        where: {
            id: id
        }
    })

    return userInfo
}

const getUserByName = async function(name){
    let userInfo = await User.findOne({
        where: {
            user_name: name
        }
    })

    return userInfo
}

export default {
    getUserId,
    getUserByName
}
