(function () {
    const ImagePicker = function (options) {
        let defaultOptions = {
          element: null,
          url: null,
          method: 'post',
          uploadCallback: null,
          fallbackImage: null,
          // 自动上传
          auto: true,
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
        // 获取文件列表对象
        let files = e.target.files || e.dataTransfer.files
        this.files = this.files.concat(this.options.filterFn(files))
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
        if (this.options.auto) {
            this.upload()
        }
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
                this.deleteCallBack(fileDelete)
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

    ImagePicker.prototype.upload = function () {
        let that = this
        let files = this.files
        let options = this.options
        for (var i = 0; i < files.length; i++) {
            let file = files[i];
            (function (file) {
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
                                options.successCallback(file, xhr.responseText)
                                that._deleteFileFn(file)
                                // 全部上传完毕
                                if (that.files.length === 0) {
                                    options.pcompleteCallback()
                                }
                            } else {
                                 options.failCallback(file, xhr.responseText)
                            }
                        }
                    }
                    // 开始上传
                    xhr.open(options.method, that.url, true)
                    xhr.setRequestHeader('X_FILENAME', encodeURIComponent(file.name))
                    xhr.send(file)
                }
            })(file)
        }
    }

    window.ImagePicker = ImagePicker
})()
