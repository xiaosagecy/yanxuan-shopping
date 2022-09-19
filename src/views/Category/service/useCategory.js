import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { findTopCategory } from '@/api/category'
function useCategory () {
  const categoryData = ref({})
  const route = useRoute() // this.$route
  /**
   * 解决在category页面路径id变化，页面却没有变化
   *  原因：路由path没变只有参数（params.id）发生变化，vue-router会复用当前页面组件component
   *       复用后路由对应的组件不会重新渲染，生命周期不会执行，所有id变了，没法发送新的请求
   *  表现出来的样子：就是路由id变了，内容没变
   */

  // 在首次渲染完毕的之后 不传参数的时候 以当前的路由参数为主
  // 当路由切换的时候 以传入的id为主
  async function fetchCategory (id = route.params.id) {
    // 如何在setup获取路由参数id
    const res = await findTopCategory(id)
    // console.log(res)
    categoryData.value = res.result
  }
  fetchCategory()

  onBeforeRouteUpdate((to) => {
    // 在每次路由切换的时候自动执行
    // console.log(to)
    fetchCategory(to.params.id)
  })
  return {
    categoryData
  }
}

export default useCategory
