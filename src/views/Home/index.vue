<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <home-category-vue />
        <!-- banner轮播图 -->
        <home-banner-vue />
        <!-- test -->
        <HomePanel title="人气推荐" subTitle="哈哈哈">
          <template #right>这个右边</template>
          <template #main>主体</template>
        </HomePanel>
        <!--  test end-->
      </div>
    </div>
  </div>
</template>

<script>
import homeBannerVue from './components/home-banner.vue'
import homeCategoryVue from './components/home-category.vue'
import HomePanel from './components/home-pannel.vue'
export default {
  name: 'home-index',
  components: {
    homeBannerVue,
    homeCategoryVue,
    HomePanel
  }
}
</script>

<style lang="less" scoped>
.homeBox {
  color: @helpColor;
}

</style>
