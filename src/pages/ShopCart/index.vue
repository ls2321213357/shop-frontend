<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="shopInfo in shopData" :key="shopInfo.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="shopInfo.isChecked == 1"
              @click="updateCheck(shopInfo, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="shopInfo.imgUrl" />
            <div class="item-msg">
              {{ shopInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ shopInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('mins', -1, shopInfo)"
            >
              -
            </a>
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="shopInfo.skuNum"
              @change="handler('change', $event.target.value * 1, shopInfo)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('plus', 1, shopInfo)"
            >
              +
            </a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">
              {{ shopInfo.skuPrice * shopInfo.skuNum }}.00
            </span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteGoods(shopInfo)">
              删除
            </a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="checkedAll && shopData.length > 0"
          @click="selectAll"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllGoods">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>0</span>
          件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
//引用节流操作
import throttle from 'lodash/throttle';
export default {
  name: 'ShopCart',
  mounted() {
    this.getShopData();
  },
  //获取个人购物车数据
  methods: {
    //发送购物车请求
    getShopData() {
      this.$store.dispatch('getUserShopCartInfo');
    },
    //单选
    async updateCheck(shopInfo, event) {
      let isChecked = event.target.checked ? '1' : '0';
      await this.$store.dispatch('changeCheck', {
        skuId: shopInfo.skuId,
        isChecked,
      });
      this.getShopData();
    },
    //全选
    async selectAll(event) {
      try {
        let isChecked = event.target.checked ? '1' : '0';
        await this.$store.dispatch('seleteAllCheck', isChecked);
        this.getShopData();
      } catch (error) {
        alert(error.message);
      }
    },
    //type为了区分这三个元素(点击的是哪个)
    //disNum是记录变化量  +(1)  -(-1)  input中的是变化量
    //shopInfo是产品信息
    //为了防止用户点击增加或减少过快,因此使用了节流操作
    handler: throttle(async function (type, disNum, shopInfo) {
      switch (type) {
        case 'plus':
          disNum = 1;
          break;
        case 'mins':
          //产品个数大于1才能给服务器传-1
          disNum = shopInfo.skuNum > 1 ? -1 : 0;
          break;
        case 'change':
          //当为不合法的输入
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - shopInfo.skuNum;
          }
          break;
      }
      try {
        await this.$store.dispatch('changeShopCartNum', {
          skuId: shopInfo.skuId,
          skuNum: disNum,
        });
        this.getShopData();
      } catch (error) {
        alert(error.message);
      }
    }, 500),
    //派发action
    //使用trycatch进行捕捉
    //发送删除购物车商品请求
    async deleteGoods(shopInfo) {
      try {
        await this.$store.dispatch('deleteGoods', shopInfo.skuId);
        this.getShopData();
      } catch (error) {
        alert(error.message);
      }
    },
    //删除全部勾选的产品
    //由于无法获取参数,所以只能去派发action
    deleteAllGoods() {
      try {
        this.$store.dispatch('deleteAllShopCart');
        this.getShopData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
  //获取数据
  computed: {
    ...mapGetters(['shopList']),
    shopData() {
      return this.shopList.cartInfoList || [];
    },
    //总价格
    totalPrice() {
      let sum = 0;
      this.shopData.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    //判断全选按钮是否复选
    checkedAll() {
      //every遍历数组中的每一项
      return this.shopData.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;
          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
