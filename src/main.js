// 1. vue2 new Vue() -> vue3  createApp()
// 2. vue2 Vue.use(插件) -> vue3  createApp().use(插件)

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局公共样式
import '@/style/common.less'

// 注册全局插件
import componentPlugin from '@/components'

createApp(App).use(componentPlugin).use(store).use(router).mount('#app')
