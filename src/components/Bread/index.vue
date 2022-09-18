<template>
  <div class='xtx-bread'>
    <slot/>
  </div>
</template>

<script>
// 分隔符数据是位于Bread组件中 而对于分隔符数据的使用是在底层的组件中使用
// provide/inject
import { provide } from 'vue'
export default {
  name: 'XtxBread',
  props: {
    separator: {
      type: String,
      default: '>'
    }
  },
  setup (props) {
    // 为底层组件提供数据
    provide('separator', props.separator)
  }
}
</script>

<style scoped lang='less'>
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
