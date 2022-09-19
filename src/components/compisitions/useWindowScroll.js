// 自定义的useWindowScroll
// 1. 函数 参数和返回值[Ref[number]]
// 2. 根据滚动事件拿到当前滚动距离顶部的像素值 不断地交给y
import { ref } from 'vue'
function useWindowScroll () {
  const y = ref(0)
  // 核心逻辑：监听滚动行为的发生的 拿到当前距离顶部的像素值 不断地交给y
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollTop
    y.value = h
  })
  return {
    y
  }
}

export { useWindowScroll }
