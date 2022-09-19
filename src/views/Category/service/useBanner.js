import { ref } from 'vue'
import { findBanner } from '@/api/home'
function useBanner () {
  const bannerList = ref([])
  async function fetchList () {
    const res = await findBanner()
    bannerList.value = res.result
  }
  fetchList()
  return {
    bannerList
  }
}

export default useBanner
