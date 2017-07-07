<template>
  <div class="login">
      <div class="title">
        <h1>{{msg}}</h1>
      </div>
      <div class="content">
          <el-input style="margin-bottom:10px" v-model="name" placeholder="请输入账号"></el-input>
          <el-input style="margin-bottom:10px" v-model="pwd" type="password" placeholder="请输入密码"></el-input>
          <el-button type="primary" @click="login">登陆</el-button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: ' welcome login',
      input: '',
      name: '',
      pwd: ''
    }
  },
  methods: {
    login () {
      let obj = {
        name: this.name,
        password: this.pwd
      }
      // console.log(that.$http.post)
      this.$http.post('/auth/user', obj).then((res) => {
        console.log(res, 'login')
        if (res.data.success === 1) {
          // 用sessionStorage把token存下来
          sessionStorage.setItem('vue-koa-todo', res.data.token)
          this.$message({
            type: 'success',
            message: '登录成功！'
          })
          this.$router.push({name: 'index'})
        } else {
          // 登录失败，显示提示语
          this.$message.error(res.data.info)
          // 将token清空
          sessionStorage.setItem('vue-koa-todo', null)
        }
      }, () => {
        this.$message.error('服务器有错误！')
        sessionStorage.setItem('vue-koa-todo', null)
      })
    }
  }
}
</script>

<style scoped lang='scss'>
  .login {
    width: 600px;
    margin: 0 auto;
    .title {
      color: #1D8CE0;
    }
    .content {

    }
  }
</style>
