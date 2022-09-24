const express = require('express')

const router = express.Router()

// 导入路由处理函数
const handler = require('../router_handler/user')

router.post('/login',handler.login)

module.exports = router