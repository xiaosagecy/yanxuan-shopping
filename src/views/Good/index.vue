<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="goodData && goodData.brand">
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <!-- 图片预览区 -->
          <XtxImageView :imageList="goodData.mainPictures" />
          <!-- 统计数量 -->
          <ul class="goods-sales">
            <li>
              <p>销量人气</p>
              <p>{{ goodData.salesCount }}+</p>
              <p><i class="iconfont icon-task-filling"></i>销量人气</p>
            </li>
            <li>
              <p>商品评价</p>
              <p>{{ goodData.commentCount }}+</p>
              <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
            </li>
            <li>
              <p>收藏人气</p>
              <p>{{ goodData.collectCount }}+</p>
              <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
            </li>
            <li>
              <p>品牌信息</p>
              <!--
                goodData.brand 是 undefined
                goodData一开始是空对象{} 在异步请求还未回来之前 模板会完成首次渲染
                {}.brand  ->  undefined
                undefined.name  -> js语法错误
                解决：手动控制渲染时机  v-if 只有数据返回之后才进行首次渲染 采取读取属性
              -->
              <p>{{ goodData.brand.name }}</p>
              <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
            </li>
          </ul>
        </div>
        <div class="spec">
          <!-- 商品信息区 -->
          <p class="g-name">{{ goodData.name }}</p>
          <p class="g-desc">{{ goodData.desc }}</p>
          <p class="g-price">
            <span>{{ goodData.price }}</span>
            <span>{{ goodData.oldPrice }}</span>
          </p>
          <div class="g-service">
            <dl>
              <dt>促销</dt>
              <dd>12月好物放送，App领券购买直降120元</dd>
            </dl>
            <dl>
              <dt>服务</dt>
              <dd>
                <span>无忧退货</span>
                <span>快速退款</span>
                <span>免费包邮</span>
                <a href="javascript:;">了解详情</a>
              </dd>
            </dl>
          </div>
          <!-- sku组件 -->
          <XtxGoodSku :goods="goodData" @change="skuChange" />
          <!-- 数据组件 -->
          <XtxNumber v-model="goodCount" />
          <!-- 按钮组件 -->
          <XtxButton type="primary" class="btn" @click="addCart">加入购物车</XtxButton>
        </div>
      </div>
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品详情 -->
          <goodDetailVue :goods="goodData"/>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <goodHotVue type="1"/>
          <goodHotVue type="2"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { findGoods } from '@/api/good'
import { useRoute, useRouter } from 'vue-router'
import goodDetailVue from './components/good-detail.vue'
import goodHotVue from './components/good-hot.vue'
import { useStore } from 'vuex'
import Message from '@/components/Message/index'
export default {
  name: 'good-index',
  components: {
    goodDetailVue,
    goodHotVue
  },
  setup () {
    const goodData = ref({})
    const route = useRoute()
    async function loadData () {
      const res = await findGoods(route.params.id) // this.$route.params.id
      goodData.value = res.result
    }
    loadData()

    // sku
    let skuObj = {}
    // 当商品规格选中触发
    // {skuId: '300523142', price: '73.90', oldPrice: '75.90', inventory: 5304, specsText: '规格：四层，27卷/箱'}
    function skuChange (sku) {
      // console.log(sku)
      skuObj = sku
    }

    const goodCount = ref(1)

    // 加入购物车
    const store = useStore()
    const router = useRouter()
    const addCart = async () => {
      // 先判断token是否为真，为真则是已登陆,为假就跳转登陆页
      const token = store.state.user.profile.token
      if (!token) {
        router.push('/login')
      } else {
        // 先判断是否选择了商品规格
        if (!skuObj.skuId) {
          return Message({ type: 'warn', text: '请选择有效的商品规格！' })
        }
        // 正式进行加入购物车业务
        // vuex管理的方式: 数据相关vuex + 组件触发action
        await store.dispatch('cart/fetchInsertCart', {
          skuId: skuObj.skuId,
          count: goodCount.value
        })

        Message({ type: 'success', text: '加入购物车成功！' })
      }
    }

    return {
      goodData,
      skuChange,
      goodCount,
      addCart
    }
  }
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}

.number-box {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
}
.g-name {
  font-size: 22px;
}
.g-desc {
  color: #999;
  margin-top: 10px;
}
.g-price {
  margin-top: 10px;
  span {
    &::before {
      content: "¥";
      font-size: 14px;
    }
    &:first-child {
      color: @priceColor;
      margin-right: 10px;
      font-size: 22px;
    }
    &:last-child {
      color: #999;
      text-decoration: line-through;
      font-size: 16px;
    }
  }
}
.g-service {
  background: #f5f5f5;
  width: 500px;
  padding: 20px 10px 0 10px;
  margin-top: 10px;
  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      color: #666;
      &:last-child {
        span {
          margin-right: 10px;
          &::before {
            content: "•";
            color: @xtxColor;
            margin-right: 2px;
          }
        }
        a {
          color: @xtxColor;
        }
      }
    }
  }
}
.goods-sales {
  display: flex;
  width: 400px;
  align-items: center;
  text-align: center;
  height: 140px;
  li {
    flex: 1;
    position: relative;
    ~ li::after {
      position: absolute;
      top: 10px;
      left: 0;
      height: 60px;
      border-left: 1px solid #e4e4e4;
      content: "";
    }
    p {
      &:first-child {
        color: #999;
      }
      &:nth-child(2) {
        color: @priceColor;
        margin-top: 10px;
      }
      &:last-child {
        color: #666;
        margin-top: 10px;
        i {
          color: @xtxColor;
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
          cursor: pointer;
        }
      }
    }
  }
}
.btn {
  margin-top: 20px;
  margin-left: 60px;
}
</style>
