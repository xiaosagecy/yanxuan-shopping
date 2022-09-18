<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li v-for="item in list" :key="item.id"><a href="#">{{item.name}}</a></li>
  </ul>
</template>

<script>
import { ref } from 'vue'
import { getCategory } from '@/api/home'
export default {
  setup () {
    const list = ref([])

    async function fetchCategory () {
      const res = await getCategory()
      console.log(res)
      list.value = res.result
    }

    // 选择一个合适的时机调用函数 - onMounted
    fetchCategory()

    return { list }
  }
}
</script>

<style scoped lang='less'>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
  }
}
</style>
