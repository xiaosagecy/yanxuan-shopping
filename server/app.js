const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const joi = require('joi')
const path = require('path')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
// 导入配置文件
const config = require('./config')

const compression = require('compression')

// 静态资源托管
app.use(compression())
app.use(express.static('./dist'))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 配置静态资源目录 整一个文件夹 通过域名能访问
app.use(express.static(path.join(__dirname, './public/uploads/')))
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// -------------------挂载中间件处理-----------------------------------------
// 响应数据的中间件
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// -------------------挂载路由模块------------------------------------------
// 导入用户登录注册模块路由
const userRoute = require('./router/user')
app.use('/api', userRoute)



// -----------------------------------------------------------------------
// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.send({ status: 1, message: err.message })
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.send({ status: 1, message: '身份认证失败!' })
  // 未知错误
  res.send({ status: 1, message: err.message })
})

app.listen(3000, () => {
  console.log('api server is running at http://127.0.0.1:3000')
})
