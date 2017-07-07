import user from '../models/user.js'
import jwt from 'jsonwebtoken'

const getUserInfo = async function(ctx){
    let id = ctx.params.id
    let result = await user.getUserId(id)

    ctx.body = result
}

const postUserAuth = async function(ctx){
    // 通过 koa-bodyparser 解析到body中
    let data = ctx.request.body
    console.log(data, 'ctx.request.body')
    let userInfo = await user.getUserByName(data.name)

    if (userInfo !== null) {
        if (userInfo.password !== data.password) {
            ctx.body = {
                success: -1,
                info: '密码错误'
            }
        } else {
            // 密码正确的话
            let userToken = {
                name: userInfo.user_name,
                id: userInfo.id
            }
            // 指定密钥，之后用来判断token合法性的标志
            let secret = 'vue-koa-todo'
            // 签发token 并返回
            let token = jwt.sign(userToken, secret)
            ctx.body = {
                success: 1,
                token: token
            }
        }
    } else {
        ctx.body = {
            success: -1,
            info: '用户名不存在'
        }
    }
}

export default {
    getUserInfo,
    postUserAuth
}
