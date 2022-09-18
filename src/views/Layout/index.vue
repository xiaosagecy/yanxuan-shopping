<template>
  <topNavVue />
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
export default {
  name: 'layout-index',
  components: {
    topNavVue,
    topHeader,
    layoutFooterVue
  }

}
</script>
