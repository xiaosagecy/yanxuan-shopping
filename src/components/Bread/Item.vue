<template>
  <div class="xtx-bread-item">
    <!--
      如果to存在 有值 我们就渲染一个router-link标签
      如果to不存在  那就渲染一个span标签
     -->
    <router-link v-if="to" :to="to"><slot /></router-link>
    <span v-else><slot /></span>
    <!-- 分隔符 -->
    <i>{{ separator }}</i>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: String
    }
  },
  setup () {
    const separator = inject('separator')
    return {
      separator
    }
  }
}
</script>
<style lang="less" scoped>
.xtx-bread-item {
  // 最后一个i隐藏
  &:nth-last-of-type(1) {
    i {
      display: none;
    }
  }
}
</style>
