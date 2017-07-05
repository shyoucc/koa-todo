<template>
  <div class="index">
      <div class="title">
        <h1>{{msg}}</h1>
      </div>
      <div class="addContent">
        <el-input placeholder="请输入内容" v-model="input">
          <el-button slot="append" @click="add">添加</el-button>
        </el-input>
      </div>
      <div class="list">
        <el-tabs type="border-card">
          <el-tab-pane label="要做的事">
              <div class="item">
                  <span>晚上有饭局</span>
                  <div>
                    <el-button type="success" size="mini">完成</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                  </div>
              </div>
          </el-tab-pane>
          <el-tab-pane label="完成的事">
              <div class="item">
                  <span>明天去图书馆</span>
                  <div>
                    <el-button type="info" size="mini">还原</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                  </div>
              </div>
          </el-tab-pane>
        </el-tabs>
      </div>

  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: 'todo',
      input: ''
    }
  },
  methods: {
    add () {
      console.log(123)
    }
  }
}
</script>

<style scoped lang='scss'>
  .index {
    width: 600px;
    margin: 0 auto;
    .title {
      color: #1D8CE0;
    }
    .list {
      margin-top: 20px;
      .item {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
      }
    }
  }
</style>

