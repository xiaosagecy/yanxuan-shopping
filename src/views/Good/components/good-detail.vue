<template>
  <div class="goods-tabs" v-if="goods.details">
    <nav>
      <a>商品详情</a>
    </nav>
    <div class="goods-detail" v-if="goods && goods.details">
      <!-- 属性 -->
      <ul class="attrs">
        <li v-for="item in goods.details.properties" :key="item.value">
          <span class="dt">{{ item.name }}</span>
          <span class="dd">{{ item.value }}</span>
        </li>
      </ul>
      <!-- 图片 -->
      <img  v-for="item in goods.details.pictures"
        :key="item"
        :src="item" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsDetail',
  props: {
    goods: {
      type: Object,
      default: () => {} // 默认值为空对象不能直接写{} 会报错，正确做法写函数返回空对象
    }
  }
}
</script>

<style lang='less' scoped>
  .goods-tabs {
    min-height: 600px;
    background: #fff;
    nav {
      height: 70px;
      line-height: 70px;
      display: flex;
      border-bottom: 1px solid #f5f5f5;
      a {
        padding: 0 40px;
        font-size: 18px;
        position: relative;
         > span {
          color: @priceColor;
          font-size: 16px;
          margin-left: 10px;
        }
      }
    }
  }
  .goods-detail {
    padding: 40px;
    .attrs {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 30px;
      li {
        display: flex;
        margin-bottom: 10px;
        width: 50%;
        .dt {
          width: 100px;
          color: #999;
        }
        .dd {
          flex: 1;
          color: #666;
        }
      }
    }
    > img {
      width: 100%;
    }
  }

  // 在less中 & 为父选择符
</style>
