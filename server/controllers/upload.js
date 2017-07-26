let qiniu = require("qiniu")

// 七牛Bucket的名称
const qiniuBucketName = ''
// 七牛账号的公钥
const qiniuAccessKey = ''
// 七牛账号的私钥
const qiniuSecretKey = ''

const qiniuBucketHost = ''
// 七牛转码时队列的名称
const qiniuPipeline = ''

qiniu.conf.ACCESS_KEY = qiniuAccessKey
qiniu.conf.SECRET_KEY = qiniuSecretKey

let fops = 'imageMogr2/format/webp'

const policy = (name, fileName) => {
    let encoded = new Buffer(`${qiniuBucketName}:webp/${fileName}`).toString('base64')
    let persist
    if (qiniuPipeline !== '') {
        persist = {
            persistentOps: `${fops}|saveas/${encoded}` ,
            persistentPipeline: qiniuPipeline
        }
    } else {
        persist = {}
    }
    return Object.assign({},persist,{
        scope: name,
        deadline: new Date().getTime() + 600,
    })
}

const getQiniuTokenFromFileName = (fileName) => {
    let key = `${qiniuBucketName}:${fileName}`
    let putPolicy = new qiniu.rs.PutPolicy(policy(key, fileName))

    let upToken = putPolicy.uploadToken()

    return {
        upToken,
        key,
        bucketHost: qiniuBucketHost,
        supportWebp: qiniuPipeline !== ''
    }

}

const getUploadToken = async function(ctx){
    let name = ctx.request.body.key
    let result = await getQiniuTokenFromFileName(name)
    ctx.body = {
        success: 1,
        token: result
    }
}

export default {
    getUploadToken
}
