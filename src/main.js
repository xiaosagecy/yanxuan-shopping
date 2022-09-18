// 1. vue2 new Vue() -> vue3  createApp()
// 2. vue2 Vue.use(插件) -> vue3  createApp().use(插件)

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
