<template>
  <topNavVue />
  <!-- 吸顶 -->
  <headerStickyVue />
  <topHeader />
  <main>
     <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <layoutFooterVue />

</template>

<script>
import topNavVue from './components/top-nav.vue'
import topHeader from './components/top-header.vue'
import layoutFooterVue from './components/layout-footer.vue'
import headerStickyVue from './components/header-sticky.vue'
import { useStore } from 'vuex'
export default {
  name: 'layout-index',
  components: {
    topNavVue,
    topHeader,
    layoutFooterVue,
    headerStickyVue
  },
  setup () {
    const store = useStore() // // 返回值就是store实例 === this.$store
    store.dispatch('category/getCategoryList')
  }

}
</script>
