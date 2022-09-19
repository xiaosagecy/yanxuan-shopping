import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { findTopCategory } from '@/api/category'
function useCategory () {
  const categoryData = ref({})
  const route = useRoute() // this.$route
  async function fetchCategory () {
    // 如何在setup获取路由参数id
    const res = await findTopCategory(route.params.id)
    // console.log(res)
    categoryData.value = res.result
  }
  fetchCategory()
  return {
    categoryData
  }
}

export default useCategory
