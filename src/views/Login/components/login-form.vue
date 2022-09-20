<template>
  <div class="account-box">
    <div class="form">
      <!--
        errors: 包含了所有表单项校验不过时的错误信息
       -->
      <Form
        ref="formRef"
        class="form"
        :validation-schema="schema"
        v-slot="{ errors }"
      >
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <!-- <input type="text" placeholder="请输入用户名或手机号" /> -->
            <Field
              v-model="form.account"
              name="account"
              type="text"
              placeholder="请输入用户名"
              :class="{ error: errors.account }"
            />
          </div>
          <!-- 表单验证错误信息提示 只有校验不过 发生错误时 errors中才有对应的错误字段值-->
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />{{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              :class="{ error: errors.password }"
              v-model="form.password"
              name="password"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </Form>
      <a href="javascript:;" class="btn" @click="doLogin">登录</a>
    </div>
  </div>
</template>

<script>
// 1.从插件中导入两个内置的组件 From Field
import { Form, Field } from 'vee-validate'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
// 2.定义表单需要的表单的对象以及校验对象
// 3.在模版使用Form组件包裹整个表单区域 并且绑定规则对象
// 4.使用Field组件替换我们原生的input标签 添加v-model指定校验规则字段
export default {
  components: {
    Form,
    Field
  },
  setup () {
    // 表单对象
    const form = reactive({
      account: '', // 账号
      password: '' // 密码
    })

    // 校验规则
    const schema = {
      account (value) {
        // 校验逻辑 校验不过时 return错误提示 校验通过就是return true
        if (!value) return '请输入账号'
        return true
      },
      password (value) {
        if (!value) return '请输入密码'
        if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
        return true
      }
    }

    const formRef = ref(null)
    const store = useStore()
    const doLogin = async () => {
      // 1.获取表单组件实例对象
      // 2.调用它身上的validate  -> promise对象
      const res = await formRef.value.validate()
      // console.log(res) // 如果表达检验都通过 return true
      if (res) {
        // 检验通过 返回true 进行登陆处理
        // vuex管理数据 + 组件只负责触发action函数
        store.dispatch('user/fetchProfile', form)
      }
    }

    return {
      form,
      schema,
      formRef,
      doLogin
    }
  }
}
</script>

<style lang="less" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 20px 20px 20px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
