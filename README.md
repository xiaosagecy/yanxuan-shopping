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

# 知识回顾-02
```
# 图片懒加载插件

1. 场景: 电商类的图片资源很多 没有必要一次性都加载 按需加载
2. 基础原理: 图片进入到视口区域 图片的资源正式发送
3. 实现流程

   1. 定义一个插件

   ```js
   const plugin = {
     install(app) {
       app.directive('lazy-img', {
         mounted(el, binding) {
           // el: img dom
           // binding: value - img url
         },
       })
     },
   }
   createApp().use(plugin)
   ```

   2. 编写核心逻辑
      [vueUse useInterSectionObserver -> 监听 img 是否进入视口 + img.src = url]

   ```js
   const plugin = {
     install(app) {
       app.directive('lazy-img', {
         mounted(el, binding) {
           // el: img dom
           // binding: value - img url
           if (true) {
             el.src = binding.value
           }
         },
       })
     },
   }
   ```

# 路由的缓存

1. 机制: path 不变的情况下 占位符参数发生了变化 vue-router 会默认复用组件
2. 问题: 进行路由切换的时候 新内容无法渲染
3. 解决方案：
   1. key router-view 强制破坏缓存
   2. onBeforeRouteUpdate 实现精确更新
4. 如何选择
   根据场景，如果性能能有要求，就选择 2 否则选择更加简单的 1 人资选择 1

# 基于业务逻辑的函数封装

1. 场景: setup 不应该写太多的业务逻辑代码 它的作用其实更加应该是组合的作用
2. 怎么做

   1. 找到每一个独立的业务逻辑 把代码抽象到一个一个的小函数中 在函数中独立管理自己业务的数据
      异步请求 最后把数据或者事件回调函数 以对象的方法 return 出去

   2. setup 中执行抽象出去的函数 以解构赋值的方式把数据和函数再引入回来 供组件的模板使用

3. 好处
   1. 纯 js 不是组件 没有组件带来的通信成本
   2. 可维护性上

# 面板组件封装

1. 场景: 人气推荐 新鲜好物 这俩个模块 结构上非常一致内容不一样 结构是重复的可以复用
2. 如何抽象: 找到相同和不同的地方 相同的地方就是我们要复用的 不同的地方就是要通过参数传入的

   1. 静态结构搭建起来[重复的部分]
   2. 找不到四个不同的地方 主标题 + 副标题 props 右侧 + 主体内容 模板 slot
   3. 使用的时候传入不同的内容

3. 纯展示类组件的封装


# vee-validate表单检验示例
```js
<template>
  <div id="app">
    <Form ref="formRef" :validation-schema="schema" v-slot="{ errors }">
      <div>账号：<Field name="username" v-model="form.username" /></div>
      <!-- 当账号输入有错误（校验规则没通过）/没有输入密码会展示 -->
      <div v-if="errors.username"><i class="iconfont icon-warning" /> {{errors.username}}</div>

      <div>密码：<Field name="password" v-model="form.password" /></div>
      <!-- 当密码输入有错误（校验规则没通过）/没有输入密码会展示 -->
      <div v-if="errors.password"><i class="iconfont icon-warning" /> {{errors.password}}</div>
    </Form>
    <button @click='doLogin'>登陆</button>
  </div>
</template>

<script>
// npm i vee-validate 第三方包 用于校验表单
import { Form, Field } from 'vee-validate'
import { reactive,ref } from 'vue'
export default {
  name: 'App',
  components: {
    Form, Field
  },
  setup(){
    // 表单
    const form = reactive({
      username: '',
      password: ''
    })
    // 检验规则
    const schema = {
      username(value){
        // 密码不通过 给提示 通过return true
        if(!value) return '请输入账号'
        return true
      },
      password(value){
        if(!value) return '请输入密码'
        if(!/^\w{6,24}$/.test(value)) return '密码长度为6-24位'
        return true
      }
    }

    const formRef = ref(null)
    const doLogin = async () => {
      // 1. 获取表单组件的实例对象
      // 2. 调用它身上的validate -> promise对象
      const result = await formRef.value.validate()
      console.log(result) // 所有的表单都通过校验时才返回true
      if (result) {
        console.log('去登陆')
      }
    }

    return {
      form, schema,formRef,doLogin
    }
  }
}
</script>

<style>

</style>

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
