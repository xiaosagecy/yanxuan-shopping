// 导入 mysql 模块
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1',
  user: '数据库账号',
  password: '数据库密码',
  database: '具体连接到数据库名字'
})

// 向外共享 db 数据库连接对象
module.exports = db
