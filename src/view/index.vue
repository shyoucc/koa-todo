<template>
  <div class="index">
      <div class="title">
        <h1>{{msg}}</h1>
        <p>{{userinfo.name}}, 回来啦，赶紧记录一下吧</p>
      </div>
      <div class="upload">
          <label class="el-button el-button--primary" for="xFile">上传文件</label>
          <form>
            <input type="file" id="xFile" ref="upload" style="position:absolute;clip:rect(0 0 0 0);" multiple>
          </form>
      </div>
      <div class="addContent">
        <el-input placeholder="请输入内容" v-model="value" @keyup.enter.native="add">
          <el-button slot="append" @click="add">添加</el-button>
        </el-input>
      </div>
      <div class="list">
        <el-tabs type="border-card">
          <el-tab-pane label="要做的事">
              <transition-group name="item" tag="div">
                <div :key="item.id" class="item" v-for="item in todolist" v-if="item.status === 0">
                    <span>{{item.content}}</span>
                    <div>
                      <el-button type="success" size="mini" @click="update(item)">完成</el-button>
                      <el-button type="danger" size="mini" @click="remove(item)">删除</el-button>
                    </div>
                </div>
              </transition-group>
          </el-tab-pane>
          <el-tab-pane label="完成的事">
              <div class="item" v-for="item in todolist" v-if="item.status === 1">
                  <span style="text-decoration: line-through;color: #969696;">{{item.content}}</span>
                  <div>
                    <el-button type="info" size="mini" @click="update(item)">还原</el-button>
                  </div>
              </div>
          </el-tab-pane>
        </el-tabs>
      </div>

  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  name: 'index',
  data () {
    return {
      msg: '作业本',
      userinfo: {},
      todolist: [],
      value: '',
      up: ''
    }
  },
  methods: {
    update (item) {
      let status = item.status === 0 ? 1 : 0
      console.log(status, 'status')
      this.$http.put('/api/todolist/' + this.userinfo.id + '/' + item.id + '/' + status).then((res) => {
        console.log(res, 'update')
        if (res.data.success === 1) {
          // this.$message({
          //   type: 'success',
          //   message: '更新成功'
          // })
          this.getList()
        }
      }, () => {
        this.$message.error('服务器有错误！')
      })
    },
    remove (item) {
      this.$http.delete('/api/todolist/' + this.userinfo.id + '/' + item.id).then((res) => {
        console.log(res)
        if (res.data.success === 1) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        }
      }, () => {
        this.$message.error('服务器有错误！')
      })
    },
    add () {
      let obj = {
        status: false,
        content: this.value,
        id: this.userinfo.id
      }
      this.$http.post('/api/todolist', obj).then((res) => {
        if (res.data.success === 1) {
          // this.$message({
          //   type: 'success',
          //   message: '添加成功'
          // })
          this.getList()
          this.value = ''
        } else {
          this.$message.error('添加失败')
        }
        console.log(res, 'add')
      }, () => {
        this.$message.error('服务器有错误！')
      })
    },
    getUserInfo () {
      let token = sessionStorage.getItem('vue-koa-todo')
      if (token && token !== null) {
        // 解析token
        let decode = jwtDecode(token, 'vue-koa-todo')
        if (decode) this.userinfo = decode
      }

      console.log(this.userinfo, '个人信息')
    },
    getList () {
      this.$http.get('/api/todolist/' + this.userinfo.id).then((res) => {
        if (res.data.success === 1) {
          this.todolist = res.data.list.reverse()
        } else {
          this.$message.error('获取失败')
        }
        console.log(res, 'get')
      }, () => {
        this.$message.error('服务器有错误！')
      })
    }
  },
  mounted () {
      let button = this.$refs.upload
      this.up = new window.ImagePicker({
        element: button
      })
  },
  created () {
    this.getUserInfo()
    this.getList()
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
    .upload {
      margin-bottom: 15px;
    }
    .list {
      margin-top: 20px;
      font-size: 20px;
      .item {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
      }
      .item-enter-active, .item-leave-active {
        transition: all .5s;
      }
      .item-enter, .item-leave-to
      /* .list-leave-active for <2.1.8 */ {
        opacity: 0;
        transform: translateY(15px);
      }
    }
  }
</style>

