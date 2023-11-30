const jsrsasign = require('jsrsasign')

const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvV3VCCBG4HgnHEEKCYSITsWrT+fE6BItvlEZFPLEwtuGHxZJcTSScFmp9V8ro41uMnJQCM+wNofWi94XhwG3DK1QLq5BgRI+Wd1adH2tRCwF+3SJK/m3OmJagCuEEns/gAGNLKiZp+TRTdCsWqMg0dqioY/6Df1kl0MQfXFcZXNR8RbRZ71s9giZTXATvuh9u7oZBARp6KDAnsgwNTsQqHVfuyl0WTmQfsFLEH5w234LhuU4dlgv0lY786mqwKooeHK5kwy0niKeLOJjJjHll36QYcca+1cwmlkeXsEbCQCIooEDW1ba1/iwbczh5OW5SxOutkWWfnB4xNecnMiG4wIDAQAB'
const privateKey = 'MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC9XdUIIEbgeCccQQoJhIhOxatP58ToEi2+URkU8sTC24YfFklxNJJwWan1XyujjW4yclAIz7A2h9aL3heHAbcMrVAurkGBEj5Z3Vp0fa1ELAX7dIkr+bc6YlqAK4QSez+AAY0sqJmn5NFN0KxaoyDR2qKhj/oN/WSXQxB9cVxlc1HxFtFnvWz2CJlNcBO+6H27uhkEBGnooMCeyDA1OxCodV+7KXRZOZB+wUsQfnDbfguG5Th2WC/SVjvzqarAqih4crmTDLSeIp4s4mMmMeWXfpBhxxr7VzCaWR5ewRsJAIiigQNbVtrX+LBtzOHk5blLE662RZZ+cHjE15ycyIbjAgMBAAECggEAAszFXpZjleQQ5/kKNfPQtCF2E/tgTPIf3QWD8mxYfm0SgZkpwtO9Ko4Y1jjvAz8PFw3boxW3DEdb47uH64YZ98UEP3xyGX90jo2YTcqh6jUgbYReltjdXa6gme6KyF8sJC9hr/xaMUJP2e+w7LImxROPfgYL83MArr/eGYy4igNw+qhOvO74nlQFWqvvx2uyNCztX3a2aiKlov/Ypdl4ffGQFrKBRQxCkfb1K1bfmG8aRU7tBVSOh9g4jhbFZLqQlLTDOGWmaWtdcbVig92Npzel+o3breFF/+JfehyuxIhaAOEWyf4FuQsQjYWcP3JVj/2Wzvn0DQg57/hPa225uQKBgQDgEkxpYW1oZ07aSZsBybmK6aBGWXrYWNLraAiqnH8EX+XHhdb61aX0yvt5CNRoO5hSWscg2iur3YKkcRnP9FrsayHUwTzrX3hho04pk5hIjzPevG+e2Bf193sTplmi4hkVYqtcYT1EC/e+jZc2VC/e36mjxiOANXn7VpBBJkQNtQKBgQDYWZAuGnfDwH0Q/rxhphCqd3L5ZhbxPRioqMAkuCRQEh+RzIvQBa6oD06iqVZNfzezQGiBvyiW3zqFMvRiMgidM8wGl/0DWSSXqdr3/MlLdVKRXHfrKqgk7lPGbmOJy7oh0WD3zC5FaLl0wlAmZgWi2pkfIZl+YTHw1HRuShhhNwKBgQCs9fL9tTLa0EPRw9de/fO3ArexFgj5Tzcgd2GZMMvq+ItKBEn5vUkpODX9K4+qFbZye5gSB9aGB6p8fMFMAHbe36NxsufvV/Z4h7Ih7cgy2jdTy2jt2ChGuQ3METBHxvdNxqg32ueLyyElee4rBbkd9M/hl2R35s+N7zfS0lLdsQKBgQDYC9BMCchRZZY+83LhPHlmEXRyEv2UF8PZIPMHeA9jGkYGTbHMoPACCY8oJlv1dbYEvave7Sq2RuLkgrbCnF43xbLXXs2dm1ZMUaVFgVzuipFScXmbEHTqtEhaXn/t6dDM1o6zxWTrkSGptCVfwv+b2hmQmffy2VKKwU4nmLxxzwKBgQDUwYMkaciE/Cz9E8GdR7S+alFMHfegKE8GGAg9NFK98P+vpQTioSziEAynGX3Dm4ecIfp5v8oGjf5QTyvGUUf22ivZrKw/DB7c9nm0oQw5aiuPUEJlTKbZnz8Sz6R2S/MqMim0qbv2D7gmhA0XVlFAZDmiB4f/QqO3JkTUVqwlJg=='

// 加密
function encrypt(encryptData) {
  // 转换成pem格式的秘钥, 生成秘钥实例 (RSAKey)
  const publicPemKey = '-----BEGIN PUBLIC KEY-----\n' + publicKey + '\n-----END PUBLIC KEY-----'
  var pub = jsrsasign.KEYUTIL.getKey(publicPemKey)
  var enc = jsrsasign.KJUR.crypto.Cipher.encrypt(encryptData, pub, 'RSAOAEP256')
  return jsrsasign.hextob64(enc)
}

// 解密
function decrypt(decryptData) {
  // 转换成pem格式的秘钥, 生成秘钥实例 (RSAKey)
  const privatePemKey = '-----BEGIN PRIVATE KEY-----\n' + privateKey + '\n-----END PRIVATE KEY-----'
  var prv = jsrsasign.KEYUTIL.getKey(privatePemKey)
  var dec = jsrsasign.KJUR.crypto.Cipher.decrypt(jsrsasign.b64utohex(decryptData), prv, 'RSAOAEP256')
  return dec
}

// test
console.log('rsa-oaep-sha256 加解密测试：')
const rsaData = encrypt('evanliu2968@gmail.com')
console.log('加密结果', rsaData)
console.log('解密结果', decrypt(rsaData))
