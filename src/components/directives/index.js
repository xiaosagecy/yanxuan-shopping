// 图片懒加载 指令
import { useIntersectionObserver } from '@vueuse/core'

const plugin = {
  // vue2中传入Vue
  install (app) {
    // main.js中使用app.use() 就会自动执行install函数并且传入当前实例对象app
    // console.log(app)
    app.directive('lazy-img', {
      // 依旧是指令绑定的元素对象挂载完毕时自动执行
      // el: 图片dom元素  binding.value:图片真实的url
      mounted (el, binding) {
        // console.log(el, binding)
        // 当我们的滚动条把视图下拉，视图进入页面的可视区域触发

        // 图片懒加载核心逻辑：判断图片是否进入到视口区域如果进来才发送图片请求
        // 技术解决： 1.如何判断图片进入视口？   2.如何发送图片请求 [操作图片的src=url]
        // vueUse插件提供了一个专门用来监控dom是否进入视口区域！！
        const { stop } = useIntersectionObserver(
          // 监听目标元素
          el,
          ([{ isIntersecting }], observerElement) => {
            // 进入视口 true  出去视口 false
            console.log(isIntersecting)
            if (isIntersecting) {
              // 满足条件把图片的url交给图片的src属性 浏览器会自动发送图片请求
              el.src = binding.value
              // 对当前的el停止监听
              stop()
            }
          },
          // 刚进入视口区域就立刻执行回调 0 - 1
          { threshold: 0 }
        )
      }
    })
  }
}

export default plugin
