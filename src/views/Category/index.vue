<template>
  <div class="container m-top-20">
    <div class="top-category">
      <!-- 轮播图 -->
      <XtxSlider :sliders="bannerList" />
      <!-- 分类列表 -->
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <a href="javascript:;">
              <img :src="i.picture" />
              <p>{{i.name}}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { findBanner } from '@/api/home'
import { findTopCategory } from '@/api/category'
import { useRoute } from 'vue-router'
export default {
  name: 'category-index',
  setup () {
    const bannerList = ref([])
    async function fetchList () {
      const res = await findBanner()
      bannerList.value = res.result
    }
    fetchList()

    const categoryData = ref({})
    const route = useRoute() // this.$route
    async function fetchCategory () {
      // 如何在setup获取路由参数id
      const res = await findTopCategory(route.params.id)
      console.log(res)
      categoryData.value = res.result
    }
    fetchCategory()
    return {
      bannerList,
      categoryData
    }
  }
}
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }
}
</style>
