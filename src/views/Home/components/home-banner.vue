<template>
  <!-- 使用轮播图 -->
  <div class="home-banner">
    <XtxSlider :sliders="bannerList" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { findBanner } from '@/api/home'
export default {
  name: 'HomeBanner',
  setup () {
    const bannerList = ref([])
    async function fetchList () {
      const res = await findBanner()
      bannerList.value = res.result
    }
    fetchList()
    return {
      bannerList
    }
  }
}
</script>

<style scoped lang='less'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>
