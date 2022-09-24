<template>
  <RouterLink v-if="isLink" :to="`/good/${goods.id}`" class='goods-item'>
    <img v-lazy-img="goods.picture" alt="">
    <p class="name ellipsis">{{goods.name}}</p>
    <p class="desc ellipsis">{{goods.desc}}</p>
    <p class="price">&yen;{{goods.price}}</p>
  </RouterLink>
  <a v-else href="javascript:;" class='goods-item'>
    <img v-lazy-img="goods.picture" alt="">
    <p class="name ellipsis">{{goods.name}}</p>
    <p class="desc ellipsis">{{goods.desc}}</p>
    <p class="price">&yen;{{goods.price}}</p>
  </a>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    },
    isLink: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang='less'>
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  transition: all .5s;
  &:hover {
    transform: translate3d(0,-3px,0);
    box-shadow: 0 3px 8px rgba(0,0,0,0.2);
  }
  
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
</style>
