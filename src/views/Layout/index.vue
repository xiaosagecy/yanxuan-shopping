<template>
  <div>this is layout----{{name}}</div>
  <!-- 二级路由 -->
  <router-view />
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'layout-index',
  data () {
    return {
      name: 'this is name'
    }
  },
  setup () {
    const title = ref('this is ref title')
    const count = ref(100)
    console.log(count.value)
    return {
      title,
      count
    }
  }
}
</script>
