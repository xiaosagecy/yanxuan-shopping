<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <home-category-vue />
        <!-- banner轮播图 -->
        <home-banner-vue />
      </div>
    </div>
  </div>
</template>

<script>
import homeBannerVue from './components/home-banner.vue'
import homeCategoryVue from './components/home-category.vue'
export default {
  name: 'home-index',
  components: {
    homeBannerVue,
    homeCategoryVue
  }
}
</script>

<style lang="less" scoped>
.homeBox {
  color: @helpColor;
}

</style>
