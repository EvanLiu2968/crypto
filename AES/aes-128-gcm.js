const crypto = require('crypto')
const { Buffer } = require('buffer')

const encodeMode = 'base64'

/**
 * @description: 加密
 * @param {*} word
 * @param {*} keyStr
 */
const encrypt = function (word, keyStr) {
  keyStr = keyStr || '10210b07c5cf31b30f722f9b5896de5c' // 16位密钥
  try {
    var pwd = Buffer.from(keyStr, 'hex')
    var iv = crypto.randomBytes(12) // 12位iv
    var cipher = crypto.createCipheriv('aes-128-gcm', pwd, iv)

    var enc = cipher.update(word, 'utf8', encodeMode)
    enc += cipher.final(encodeMode)
    var tags = cipher.getAuthTag()
    enc = Buffer.from(enc, encodeMode)
    // 由于和java对应的AES/GCM/PKCS5Padding模式对应 所以采用这个拼接
    var totalLength = iv.length + enc.length + tags.length
    var bufferMsg = Buffer.concat([iv, enc, tags], totalLength)
    return bufferMsg.toString(encodeMode)
  } catch (e) {
    console.log("Encrypt is error", e)
    return null
  }
}

/**
 * @description: 解密
 * @param {*} word
 * @param {*} keyStr
 */
const decrypt = function (word, keyStr) {
  keyStr = keyStr || '10210b07c5cf31b30f722f9b5896de5c' // 16位密钥
  try {
    var tmpSerect = Buffer.from(word, encodeMode)
    var pwd = Buffer.from(keyStr, 'hex')
    // 读取数组
    var iv = tmpSerect.slice(0, 12)
    var cipher = crypto.createDecipheriv('aes-128-gcm', pwd, iv)
    // 这边的数据为 去除头的iv16位和尾部的tags的16位
    var msg = cipher.update(tmpSerect.slice(12, tmpSerect.length - 16))
    return msg.toString('utf8')
  } catch (e) {
    console.log("Decrypt is error", e)
    return null
  }
}

// test
console.log('aes-128-gcm 加解密测试：')
const aesData = encrypt('Hope is a good thing and maybe the best of things.')
console.log('加密结果', aesData)
console.log('解密结果', decrypt(aesData))
