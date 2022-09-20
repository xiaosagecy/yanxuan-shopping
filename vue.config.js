const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 自动加入的配置项  在这个位置把需要自动导入的less文件配置过来
  // 你要自动导入哪些文件 就把他们的路径配置过来
  // 做的事儿：启动项目的时候会自动把配置的less文件 导入到vue中的style区域
  // 终端输入 vue add style-resources-loader
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/style/var.less')
      ]
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '严选商城' // 修改项目标题
      return args
    })
  }
})
