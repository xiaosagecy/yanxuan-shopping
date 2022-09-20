// 完成吸顶效果 yarn add @vueuse/core
<template>
  <div class="app-header-sticky" :class="{ show: y > 27 }">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 抽离出去的导航组件 -->
      <HeaderNav />
      <div class="left">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
/**
  吸顶交互的实现思路
   1. 基于滚动事件 scroll
   2. 在事件发生时判断滚动距离 如果满足某个条件 固定到顶部 如果不满足 就消失

  代码技术实现
   1. 如何监听scroll事件   window
   2. 如何得知当前的滚动距离？ 较复杂
   3. 如何固定的顶部？   fixed

  解决问题路径：1. 查一下有没有现成的方案 开源的稳定的现成方案   2.自己写
  具体的技术: vueUse -> 给到我们一个随着滚动行为发生时产出一个距离顶部的像素值 拿到这个像素值做判断
  实现步骤
    1. 实现一个顶部吸顶的组件
    2. 通过vueUse实现具体的功能
    根据当前的滚动距离 控制show类型的显示 如果超过某个距离 show显示 如果不超过某个距离 show不显示
 */
import HeaderNav from './header-nav'
// import { useWindowScroll } from '@vueuse/core'
import { useWindowScroll } from '@/components/compisitions/useWindowScroll'

export default {
  name: 'AppHeaderSticky',
  components: { HeaderNav },
  setup () {
    // y表示当前window距离顶部滚动的像素 响应式的
    const { y } = useWindowScroll()
    return {
      y
    }
  }
}
</script>
<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 此处为关键样式!!!
  // 默认情况下完全把自己移动到上面
  transform: translateY(-100%);
  // 完全透明
  opacity: 0;
  // 显示出来的类名
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url("~@/assets/images/logo1.png") no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
