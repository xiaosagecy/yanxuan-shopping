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

# 知识回顾-03
```
<!-- 
  1. 原型链
     对于对象属性（方法）查找机制的描述
     当前对象身上如果找不到就委托给它的原型对象去找

  2. 作用域链
     对于变量的查找机制的描述
     当前作用域中找不到会去外层的作用域中找 但是js里是静态作用域 不是运行时决定的
     作用链的形成是在解析的时候就已经确定下来的了 不是在代码运行的时候决定的

  3. 闭包
     内部函数引用了外部函数中的变量 延长作用域链
     比如说在一个函数中return了另外一个函数 在这个函数中使用了外层函数变量 外层执行之后
     由于引用的关系 导致外层函数中的变量没有被销毁 体现出来的就是闭包

     闭包有哪些场景？
      1. 立即执行函数  (function(){})()
      2. 保护内部的变量
      3. setup  return { fn }
      4. vue2 响应式的实现  data Object.defineProperty()
      5. react hook

     闭包有什么缺点？
      只要用闭包 就必定会内存泄漏 不对！！！

      内存泄漏  是指在我们不知道的情况下 无法预期情况下 不小心的情况 导致该销毁的内存没有销毁
      这个时候才能算是内存泄漏

      如果我明确就是想使用闭包保护变量不销毁的特性 而去主动实现了一些功能！！！

  vue中  
    1. 在模板中使用到的都是当前组件对象身上的属性或者方法 走的是原型链机制
    2. 在script标签声明的变量 + 各个函数中 setup methods..方法中声明的变量 走的是作用域链
-->

<script>
  // a  b都为对象 b对象成为a对象的原型对象  显式的方式创建了一个原型链出来
  const a = {
    name: 'cp'
  }
  const b = {
    age: 18
  }
  Object.setPrototypeOf(a, b) // a的原型对象指向b
  console.log(a.age) // 从a找 a不找就去它的原型对象b上面找

  const name = 'this is global name'
  function foo () {
    console.log(name)
  }
  function bar () {
    const name = 'this is bar name'
    foo()
  }
  bar()  // name打印出来的是什么？


  function getPerson () {
    const user = {
      name: 'cp'
    }
    return {
      getName () {
        return user.name
      },
      setName (newName) {
        user.name = newName
      }
    }
  }

  const p = getPerson()
  console.log(p.getName())
  p.setName('瑞哥')
  console.log(p.getName())
  p = null

</script>
```

# 知识回顾-04
```
# 数量组件

1. 不加任何交互的静态结构写出来
2. 实现一个最基本的增减交互
3. 通过 props 的传入限制当前的最大值和最小值
4. 通过传统的子传父 绑定的一个事件 通过封装 v-model

注意：v-model 一般模式

1. 父传子 为了实现子组件中的状态始终和父组件保持同步  
   子组件初始化状态时以 props 中的 modelValue 的值作为初始值 + watch 监听 props 值的变化 一旦变化立刻进行重新赋值

2. 子传父 为了实现子组件中最新的一个 count 需要同步到父组件中的某个属性
   emit('update:modelValue',count)

vue3 v-model 语法糖的小变化

1. value -> modelValue
2. input -> update:modelValue

# 热榜组件封装

特点：业务强绑定的
怎么做的？ 结构抽象出来复用 + 通过传入一个不同的 type 从而适配不同的接口请求数据 适配不同的 title 显示

注意事项: 模板中使用的属性和方法几乎都是当前组件身上的属性和方法 包括 data、setup、methods、computed、props 这些选项中的属性都会自动代理挂载到当前组件的实例身上

# 表单校验

1. 单独校验 + 兜底校验不变的
2. 如果你做的 C 端的项目 UI 定制可能会比较强 不使用 elementUI 组件库 -> 体积比较小的插件
3. 所有的插件语法套路都是固定的 按照文档按部就班的配置即可
```

# 知识回顾-05
```
# 函数式组件的封装

1. 组件渲染的模式

   1. 跟随 template 渲染 不受开发者的控制 直接跟着 vue 走
   2. 命令式的方法调用渲染 受开发者控制 灵活性更加强

2. 封装的前置知识

   1. createVNode -> 创建虚拟 dom js 对象 [vue2 中没有开发这个方法 vue3 才开放了出来 h]
   2. render -> 把 createVNode 生成的虚拟 dom 渲染为真实的 dom

3. 封装的思路

   1. 使用 createVNode 把写好的 message 组件生成虚拟 dom 并且传入必要的参数
   2. 使用原生的方法 createElement 创建一个挂载节点 div
   3. 调用 render 方法把 VNode 和挂载节点传入 完成正式的渲染

4. 坑: 同一个文件夹中如果同时存在多个 index 开头的文件 index.js -> index.vue

# 购物车[简单的模型 比实际的购物车简单一些 足够理解流程]

1. 加入购物车
   调用添加接口 -> 后端会生成一个新的购物车列表 list -> 再次调用获取购物车列表的接口
   -> 存入 vuex [ls] -> 渲染

   易错点: actions [ctx, { skuId, count}]-> dispatch('action', {skuId, count})

2. 删除购物车

   删除接口 -> 后端更新 list -> 再次调用获取购物车列表的接口 -> 存入 vuex -> 视图【getters】

3. getters
   基于 state 的计算属性 你变我也变

   总钱数: 把 list 中每一项的单价乘以数量累加
   总数量: 把 list 中每一项的 count 值累加

   reduce:累加方法 list.reduce((p, c)=> p + c, 0) [c 的位置根据业务情况做相应修改即可]
```

# 知识回顾-06
```
# vuex + v-model

1. 问题描述: 当 vuex 开启严格模式 并且组件通过 v-model 直接绑定了 vuex 中的 state 中的数据
   由于 vuex 架构的限制 只容许通过提交 mutation 修改 而 v-model 由于语法糖的关系会绕过 mutation
   直接修改数据 所以会报错

2. 如何解决: 不走 v-model 还是通过提交 mutation 的方式

   具体实施：[单选组件]

   1. 单选组件以 vuex 中的数据为主回显状态 :model-value="i.selected"
   2. 单选组件中进行状态切换的时候可以把最新的状态同步到 vuex 中 state 的位置 @change="change"
      在 change 的回调中继续提交 mutation 函数修改数据

3. 小的细节: 监听事件时除了默认事件参数如何添加额外的参数

   ```vue
   <checkBox @change="change" />
   <!-- 获取到默认的事件参数加上额外的参数-->
   <checkBox @change="(selected) => change(selected, i)" />
   ```

# 原生的数组方法

1. 数组的查找方法  
   find: 如果你想找到对应的项 然后操作它的话
   findIndex: 如果找到它 然后删除它 index splice(index,1)

2. 判断方法
   every: 数组中的每一项必须都满足条件 -> true
   some: 数组中只要一个满足条件 -> true

# 数量组件优化

1. 场景: 在开发的过程中突然发现之前写的组件需要增加额外的功能
2. 解决：设计了一个新的 prop 参数 优先兼容之前用到的地方不受影响 default:true

# tab 切换类交互的通用实现

核心逻辑

1.  点击时记录下来当前的点击项 [index / id / obj]
2.  使用记录下来的标识和 v-for 遍历时生成的 item 做对比，控制一个动态类名
    :class="{ active: curId === item.id}"
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
> 使用Form把需要检验的范围包起来，Field就相当于input标签
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

# 数组find方法--场景购物车
```js
const cartList = [
      {
        id: "1223002",
        skuId: "300334894",
        name: "MFi认证苹果快充编织数据线（1.2米）",
        attrsText: "颜色:夜黑+银白（两件装） 长度:升级加固加长版（1.2米）+12W双口充电器 ",
        specs: [],
        picture: "https://yanxuan-item.nosdn.127.net/c86961c7e22acb1b62c5493ccf6a4b03.png",
        price: "129.80",
        nowPrice: "129.80",
        nowOriginalPrice: "129.80",
        selected: true,
        stock: 9450,
        count: 2,
        isEffective: true,
        discount: null,
        isCollect: false,
        postFee: 7.00
      }
    ]

    const item = cartList.find(item => item.skuId = 300334894)
    // 但是这个值item是引用类型 item.selected 修改 原cartList[0].selected也发生修改
    item.selected = false

    console.log(item)
    console.log(cartList)
    console.log(item === cartList[0]) // true
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
