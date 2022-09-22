<template>
  <div class="xtx-numbox">
    <!-- 某些场景不显示 -->
    <div class="label" v-if="isLabel">数量</div>
    <div class="numbox">
      <a href="javascript:;" @click="reduce">-</a>
      <input type="text" readonly :value="count" />
      <a href="javascript:;" @click="add">+</a>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'XtxNumber',
  props: {
    max: {
      type: Number
    },
    min: {
      type: Number,
      default: 1
    },
    modelValue: {
      type: Number
    },
    isLabel: {
      type: Boolean,
      default: true // 优先保证之前的使用组件的地方不受影响 再去扩展参数
    }
  },
  setup (props, { emit }) {
    const count = ref(props.modelValue)

    // 当父组件v-model绑定的数据发生变化的时候 自动更新同步
    // 第一个参数为监听对象 props.modelValue 第二参数为回调函数
    watch(() => {
      return props.modelValue
    }, () => {
      count.value = props.modelValue
    })

    const add = () => {
      if (count.value === props.max) return
      count.value++
      // 触发事件
      emit('update:modelValue', count.value)
      emit('change', count.value)
    }

    const reduce = () => {
      if (count.value === props.min) return
      count.value--
      // 触发事件
      emit('update:modelValue', count.value)
      emit('change', count.value)
    }

    return { count, add, reduce }
  }
}
</script>

<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
