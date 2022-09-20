<template>
  <div class="page-login">
    <loginHeaderVue />
    <!-- 主体登录区域 -->
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <loginFormVue />
      </div>
    </section>
    <loginFooterVue />
  </div>
</template>

<script>
import loginHeaderVue from './components/login-header.vue'
import loginFooterVue from './components/login-footer.vue'
import loginFormVue from './components/login-form.vue'
export default {
  name: 'login-index',
  components: {
    loginHeaderVue,
    loginFooterVue,
    loginFormVue
  }
}
</script>

<style scoped lang='less'>
.login-section {
  background: url(../../assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}
</style>
