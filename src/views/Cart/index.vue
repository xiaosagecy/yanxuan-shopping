<template>
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120"><XtxCheckbox>全选</XtxCheckbox></th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-for="i in cartList" :key="i.id">
              <!--
                v-model语法糖的关系绕过mutation直接修改vuex中的数据
                解决: 不使用v-model 还是走传统的提交mutation函数
                1. 使用vuex中的数据回显单选框组件 -> :model-value的属性
                2. 组件操作修改的时候新的状态交给vuex中的state -> @change + 提交mutation
              -->
              <td>
                <XtxCheckbox
                  :model-value="i.selected"
                  @change="(selected) => checkChange(i, selected)"
                />
              </td>
              <td>
                <div class="goods">
                  <RouterLink to="/"
                    ><img :src="i.picture" alt=""
                  /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ i.name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ i.price }}</p>
                <p>比加入时降价 <span class="red">&yen;20.00</span></p>
              </td>
              <td class="tc">
                <XtxNumBox />
              </td>
              <td class="tc"><p class="f16 red">&yen;200.00</p></td>
              <td class="tc">
                <p><a class="green" href="javascript:;">删除</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          共 {{ allCount }} 件商品，已选择 {{ selectedCount }} 件，商品合计：
          <span class="red">¥{{ selectedPrice }}</span>
        </div>
        <div class="total">
          <XtxButton type="primary">下单结算</XtxButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'XtxCartPage',
  setup() {
    const store = useStore()
    const cartList = computed(() => {
      return store.state.cart.cartList
    })

    // 商品总数
    const allCount = computed(() => {
      return store.getters['cart/allCount']
    })

    // 已选商品数
    const selectedCount = computed(() => {
      return store.getters['cart/selectedCount']
    })

    // 已选商品核算价格
    const selectedPrice = computed(() => {
      return store.getters['cart/selectedPrice']
    })

    // 单选
    const checkChange = (i, selected) => {
      console.log(i, selected)
      // 把最新的选中状态通过提交mutation修改到对应的位置
      // 关键点：除了拿到当前最新的选择状态之外 还需要一个非常关键的 skuId 目的是为了能找到要修改的那一项
      store.commit('cart/singleCheck', {
        skuId: i.skuId,
        selected
      })
    }

    return {
      cartList,
      allCount,
      selectedCount,
      selectedPrice,
      checkChange
    }
  }
}
</script>

<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>