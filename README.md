# 知识回顾-01
```
vue中的插件使用

  什么是插件？ 对vue本身功能的增强  vue-router  vuex  elementUI
  插件如何定义使用？  1. 定义插件   2.注册插件

  vue2
   1. 对象定义法
      const plugin = {
        install(Vue){
          // 只要你可以通过Vue做到的事情都可以定义成插件来完成
          // 1. 全局组件注册  Vue.compoennt
          // 2. 全局指令注册  Vue.directive
          // 3. 原型挂载      Vue.prototype.$http = function(){}
        }
      }

      Vue.use(plugin) // 当调用use方法的时候 实际上是自动执行了插件的install方法 然后注入了实参Vue
   2. 函数定义法
      
      function plugin(Vue){
        // 只要你可以通过Vue做到的事情都可以定义成插件来完成
        // 1. 全局组件注册  Vue.compoennt
        // 2. 全局指令注册  Vue.directive
        // 3. 原型挂载      Vue.prototype.$http = function(){}
      }
      Vue.use(plugin)
      // 当插件是函数的时候 函数本身就会被当成install方法自动执行 其他机制完全一样

  vue3

   1. 对象定义法
       const plugin = {
        install(app){
          // 只要你可以通过Vue做到的事情都可以定义成插件来完成
          // 1. 全局组件注册  app.compoennt
          // 2. 全局指令注册  app.directive
        }
      }

      createApp() -> app -> app.use(plugin) // 当调用use方法的时候 实际上是自动执行了插件的install方法 然后注入了实参app
   2. 函数定义法

```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
