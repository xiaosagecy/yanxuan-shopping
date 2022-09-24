// 导入数据库操作模块
const db = require('../db/index')

// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')

// 导入配置文件
const config = require('../config')


// 登录处理函数
exports.login = (req, res) => {
  const userinfo = req.body
  res.send('ok')
}
