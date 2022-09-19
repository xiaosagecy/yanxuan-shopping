// 自定义useWindowScroll
import {ref} from 'vue'
function useWindowScroll(){
  // 监听滚动事件 不断地 把当前距离顶部的距离赋值给h
  window.addEventListener('scroll',()=> {
    // 定义一个响应式的y
    const y = ref(0)
    //        当前scroll距离顶部的距离的像素值
    const h = document.documentElement.scrollTop

    y.value = h
  })

  return { y }
}

export { useWindowScroll }