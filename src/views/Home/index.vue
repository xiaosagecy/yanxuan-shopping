<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <home-category-vue />
        <!-- banner轮播图 -->
        <home-banner-vue />
        <!-- test -->
        <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质保障">
          <template #right><xtx-more /></template>
          <template #main>
            <ul ref="pannel" class="goods-list">
              <li v-for="item in newList" :key="item.id">
                <RouterLink to="/">
                  <img :src="item.picture" alt="">
                  <p class="name">{{item.name}}</p>
                  <p class="price">{{item.price}}</p>
                </RouterLink>
              </li>
            </ul>
          </template>
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
import { findNew } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'home-index',
  components: {
    homeBannerVue,
    homeCategoryVue,
    HomePanel
  },
  setup () {
    const newList = ref([])
    async function getNewList () {
      const res = await findNew()
      newList.value = res.result
    }
    getNewList()
    return { newList }
  }
}
</script>

<style lang="less" scoped>
// 新鲜好物的ul
.goods-list {
  display: flex;
  justify-content: space-between; // 最左和最右没有空隙，space-around最左和最右有空隙 空隙为中间空隙的一半
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-emphasis: ellipsis;
      overflow: hidden; // 文字溢出部分隐藏
      white-space: nowrap;
    }
    .price {
      color: @priceColor;
    }
  }
}

</style>
