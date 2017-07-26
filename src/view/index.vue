<template>
  <div class="index">
      <div class="title">
        <h1>{{msg}}</h1>
        <p>{{userinfo.name}}, 回来啦，赶紧记录一下吧</p>
      </div>
      <div class="upload">
          <label class="el-button el-button--primary" for="xFile">上传文件</label>
          <form>
            <input type="file" id="xFile" ref="upload" style="position:absolute;clip:rect(0 0 0 0);">
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
                    <!-- 组件上传图片 -->
<!--                     <el-dialog title="图片上传" size="small" :visible.sync="item.isUploadShow">
                      <el-upload
                        action="//up.qbox.me/"
                        type="drag"
                        :drag="true"
                        :thumbnail-mode="true"
                        :on-success="handleSuccess"
                        :before-upload="beforeUpload"
                        :data="form"
                        >
                        <i class="el-icon-upload"></i>
                      </el-upload>
                    </el-dialog> -->
                    <span>{{item.content}}</span>
                    <div>
                      <el-button type="success" size="mini" @click="update(item)">完成</el-button>
                      <!-- <el-button type="warning" size="mini" @click.native="uploadshow(item)">上传图片</el-button> -->
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
import moment from 'moment'

export default {
  name: 'index',
  data () {
    return {
      msg: 'test',
      userinfo: {},
      todolist: [],
      value: '',
      up: '',
      bucketHost: '',
      supportWebp: '',
      form: {}
    }
  },
  methods: {
    update (item) {
      let status = item.status === 0 ? 1 : 0
      this.$http.put('/api/todolist/' + this.userinfo.id + '/' + item.id + '/' + status).then((res) => {
        if (res.data.success === 1) {
          this.getList()
        }
      }, () => {
        this.$message.error('服务器有错误！')
      })
    },
    remove (item) {
      this.$http.delete('/api/todolist/' + this.userinfo.id + '/' + item.id).then((res) => {
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
    },
    getList () {
       this.$http.get('/api/todolist/' + this.userinfo.id).then((res) => {
        if (res.data.success === 1) {
          this.todolist = res.data.list.reverse()
          this.todolist.forEach((one) => {
              this.$set(one, 'isUploadShow', false)
          })
        } else {
          this.$message.error('获取失败')
        }
      }, () => {
        this.$message.error('服务器有错误！')
      })
    },
    uploadshow (one) {
        this.$set(one, 'isUploadShow', true)
    },
    // 获取七牛的token
    beforeUpload (file) {
      console.log(file, 'popo')
      let curr = moment().format('YYYYMMDD').toString()
      let prefix = moment(file.lastModified).format('HHmmss').toString()
      let suffix = file.name
      let key = encodeURI(`${curr}/${prefix}_${suffix}`)

      return this.$http.post('/qiniu/getToken', { key }).then((res) => {
          this.bucketHost = res.data.token.bucketHost
          this.supportWebp = res.data.token.supportWebp
          this.form = {
            key,
            token: res.data.token.upToken
          }
          this.up.upload(this.form)
      })
    },
    handleSuccess (response, file) {
      console.log(response, 'response')
      console.log(file, 'file')
      let key = response.key
      let name = file.name
      let prefix = this.supportWebp ? 'webp/' : ''
      let img = `![${name}](${this.bucketHost}/${prefix}${encodeURI(key)})`
      console.log(img, 'imgimg')
    }
  },
  mounted () {
      let that = this
      let button = this.$refs.upload
      this.up = new window.ImagePicker({
        element: button,
        beforeUpload: that.beforeUpload,
        url: '//up.qbox.me/',
        successCallback: that.handleSuccess,
        data: that.form
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

