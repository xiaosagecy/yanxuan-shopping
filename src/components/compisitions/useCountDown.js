import { ref, computed } from 'vue'
// 核心逻辑: 每隔一秒减一  定时器setInterval  --
// 技术点: vueUse -> useIntervalFn -> 每隔1s执行一个我们自己的逻辑，这个逻辑可以是任何事情
// 1. start函数增加开始倒计时的初始值
// 2. 控制最小减少到0就停止
// 3. 把秒格式化成xx分xx秒 -> dayjs

import { useIntervalFn } from '@vueuse/core'
import dayjs from 'dayjs'
function useCountDown () {
  const time = ref(0)
  const formatTime = computed(() => {
    return dayjs.unix(time.value).format('mm分ss秒')
  })
  // resume:开始倒计时
  // pause:停止倒计时
  const { pause, resume } = useIntervalFn(() => {
    // 自己的逻辑
    // 加一个判断 如果time.value已经到0就停止
    if (time.value === 0) {
      return pause()
    }
    time.value--
  }, 1000)
  const start = (count) => {
    // 开始倒计时的方法
    // 在开始之前先把count赋值给time
    time.value = count
    resume()
  }
  const stop = () => {
    // 停止倒计时
    pause()
  }
  return {
    time,
    formatTime,
    start,
    stop
  }
}

export { useCountDown }
