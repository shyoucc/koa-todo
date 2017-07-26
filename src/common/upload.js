(function () {
    const ImagePicker = function (options) {
        let defaultOptions = {
          element: null,
          url: null,
          data: null,
          method: 'post',
          uploadCallback: null,
          fallbackImage: null,
          // 多个文件
          multiple: null,
          // 自动上传
          auto: true,
          // 上传前钩子 返回false 停止上传
          beforeUpload: function (files) {
            return true
          },
          // 文件过滤方法
          filterFn: function (files) {
            return files
          },
          // 选择后回调
          selectFileCallback: function () {},
          // 上传进度回调
          progressCallback: function () {},
          // 成功回调
          successCallback: function () {},
          // 失败回调
          failCallback: function () {},
          // 删除文件后回调
          deleteCallBack: function () {}
        }
        this.options = Object.assign({}, defaultOptions, options)
        this.files = []

        this._bindEvents()
    }

    // 获取选择的文件
    ImagePicker.prototype._getFilesFn = function (e) {
        let options = this.options

        // 获取文件列表对象
        let files = e.target.files || e.dataTransfer.files
        // 一层数组
        files = Array.prototype.slice.call(files)

        // 不是多传
        if (!options.multiple) {
          files = files.slice(0, 1)
          files = files[0]
        }

        let reject = options.beforeUpload(files)

        if (!reject) {
            throw new Error('beforeUpload must return true')
        }
        this.files = this.files.concat(options.filterFn(files))
        this._dealFileFn()
    }

    // 选中文件后的处理 回调
    ImagePicker.prototype._dealFileFn = function () {
        let files = this.files

        for (var i = 0; i < files.length; i++) {
             let file = files[i]
             file.index = i
        }

        this.options.selectFileCallback(this.files)
        // 上传
        // if (this.options.auto) {
            // this.upload()
        // }
    }

    // 删除文件
    ImagePicker.prototype._deleteFileFn = function (fileDelete) {
        let files = this.files

        let arrFile = []
        for (let i = 0; i < files.length; i++) {
            let file = files[i]
            if (file !== fileDelete) {
                arrFile.push(file)
            } else {
                this.options.deleteCallBack(fileDelete)
            }
        }
        this.fileFilter = arrFile
    }

    ImagePicker.prototype._bindEvents = function () {
        let that = this
        this.options.element.addEventListener('change', (e) => {
            that._getFilesFn(e)
        }, false)
    }

    // 解析xhr返回
    ImagePicker.prototype._getBody = function (xhr) {
      const text = xhr.responseText || xhr.response
      if (!text) {
        return text
      }

      try {
        return JSON.parse(text)
      } catch (e) {
        return text
      }
    }

    // ImagePicker.prototype._getError = function (action, xhr) {
    //     let msg
    //     if (xhr.response) {
    //       msg = `${xhr.status} ${xhr.response.error || xhr.response}`
    //     } else if (xhr.responseText) {
    //       msg = `${xhr.status} ${xhr.responseText}`
    //     } else {
    //       msg = `fail to post ${action} ${xhr.status}`
    //     }
    //     const err = new Error(msg)
    //     err.status = xhr.status
    //     err.method = 'post'
    //     err.url = action
    //     return err
    // }

    ImagePicker.prototype.upload = function (data) {
        let that = this
        let files = this.files
        let options = this.options
        console.log(files, 'files')
        for (var i = 0; i < files.length; i++) {
            ;(function (file) {
                // 对file作处理
                // file = file[0]
                // console.log(file, '2323')
                const formData = new FormData()
                if (data) {
                    Object.keys(data).map(key => {
                        formData.append(key, data[key])
                    })
                }
                formData.append('file', file)

                let xhr = new XMLHttpRequest()
                if (xhr.upload) {
                    // 上传进度
                    xhr.upload.addEventListener('progress', (e) => {
                        options.progressCallback(file, e.loaded, e.total)
                    }, false)
                    // 上传
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                options.successCallback(that._getBody(xhr), file)
                                that._deleteFileFn(file)
                                // 全部上传完毕
                                if (that.files.length === 0) {
                                    options.pcompleteCallback()
                                }
                            } else {
                                 options.failCallback(that._getBody(xhr), file)
                            }
                        }
                    }
                    // 开始上传
                    xhr.open(options.method, options.url, true)
                    // xhr.setRequestHeader('X_FILENAME', encodeURIComponent(formData.name))
                    // xhr.setRequestHeader('content-type', 'multipart/form-data')
                    xhr.send(formData)
                }
            })(files[i])
        }
    }

    window.ImagePicker = ImagePicker
})()
