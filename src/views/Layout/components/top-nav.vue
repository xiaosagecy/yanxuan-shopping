<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="token">
          <li>
            <a href="javascript:;"><i class="iconfont icon-user"></i>{{ nickname }}</a>
          </li>
          <li><a href="javascript:;" @click="loginOut">退出登录</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;">请先登录</a></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'top-nav',
  setup () {
    const store = useStore()

    // 要使用store里的属性必须要计算属性来映射
    const token = computed(() => {
      return store.state.user.profile.token
    })

    const nickname = computed(() => {
      return store.state.user.profile.nickname
    })

    // 退出登陆
    const route = useRoute()
    const router = useRouter()
    const loginOut = () => {
      // 1.退出登陆 清空用户资料
      store.commit('user/removeProfile')
      // 2.记录当前的地址+参数 携带过去跳转登陆页
      // console.log(route.fullPath) // 在分类页退出 /category/1010000
      // console.log(encodeURIComponent(route.fullPath)) // %2Fcategory%2F1010000
      router.push({
        path: '/login',
        query: {
          redirect: encodeURIComponent(route.fullPath)
        }
      })
    }

    return {
      token, nickname, loginOut
    }
  }
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      // 这个是什么意思？ 技巧 去除第一个li后面所有的li
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
