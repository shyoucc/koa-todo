import Sequelize from 'sequelize'

const todoList = new Sequelize('mysql://root:1989224@localhost/laravel', {
    define: {
        timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
    }
})

export default {
    todoList
}
