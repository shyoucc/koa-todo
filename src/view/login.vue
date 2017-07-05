<template>
  <div class="login">
      <div class="title">
        <h1>{{msg}}</h1>
      </div>
      <div class="content">
          <el-input style="margin-bottom:10px" v-model="id" placeholder="请输入账号"></el-input>
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
      msg: 'login',
      input: '',
      id: '',
      pwd: ''
    }
  },
  methods: {
    login () {
      this.$router.push({name: 'index'})
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
