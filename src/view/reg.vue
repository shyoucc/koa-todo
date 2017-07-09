<template>
  <div class="register">
      <div class="title">
        <h1>{{msg}}</h1>
      </div>
      <div class="content">
          <el-input placeholder="请输入账号" v-model="name" style="margin-bottom:10px">
            <template slot="prepend">账号</template>
          </el-input>
          <el-input placeholder="请输入密码" v-model="pwd" type="password" style="margin-bottom:10px">
            <template slot="prepend">密码</template>
          </el-input>
          <el-input placeholder="请输入密码" v-model="pwdsure" type="password" style="margin-bottom:10px">
            <template slot="prepend">密码确认</template>
          </el-input>
          <el-button type="primary" @click="register">确定</el-button>
          <el-button type="primary" @click.native="back">返回</el-button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      msg: '注册',
      name: '',
      pwd: '',
      pwdsure: ''
    }
  },
  methods: {
    register () {
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang='scss'>
  .register {
    width: 600px;
    margin: 0 auto;
    .title {
      color: #1D8CE0;
    }
    .content {

    }
  }
</style>
