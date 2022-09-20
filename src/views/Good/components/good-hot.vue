<template>
  <div class="goods-hot">
    <h3>{{ TYPES[type] }}</h3>
    <!-- 商品区域 -->
    <RouterLink class="goods-item" to="/" v-for="item in goodList" :key="item.id">
      <img :src="item.picture" alt="">
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<script>
/**
 * 封装思路：
 * 1.先把静态架子做出来
 * 2.再请求数据渲染
 * 3.再考虑props传值
 */

import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { findHotGoods } from '@/api/good'
// 准备一个枚举对象
const TYPES = {
  1: '24热榜',
  2: '周热榜',
  3: '总热榜'
}
export default {
  name: 'hot-index',
  props: {
    type: {
      type: String
    }
  },
  setup (props) {
    const goodList = ref([])
    const route = useRoute()
    const loadList = async () => {
      const res = await findHotGoods({
        id: route.params.id,
        type: props.type // 决定请求热榜的类型
      })
      goodList.value = res.result
    }

    loadList()
    return {
      goodList, TYPES
    }
  }
}
</script>

<style lang="less" scoped>
  .goods-hot {
    h3 {
      height: 70px;
      background: @helpColor;
      font-size: 18px;
      line-height: 70px;
      padding-left: 25px;
      margin-bottom: 10px;
      font-weight: normal;
    }
    .goods-item {
      display: block;
      padding: 20px 30px;
      text-align: center;
      background: #fff;
      img {
        width: 160px;
        height: 160px;
      }
      p {
        padding-top: 10px;
      }
      .name {
        font-size: 16px;
      }
      .desc {
        color: #999;
        height: 29px;
      }
      .price {
        color: @priceColor;
        font-size: 20px;
      }
    }
  }
</style>
