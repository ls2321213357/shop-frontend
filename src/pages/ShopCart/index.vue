<template>
  <div class="cart">
    <el-button type="primary" @click="goHome">
      <i class="el-icon-arrow-left"></i>
      去商城逛逛啦
    </el-button>
    <h4>全部商品</h4>
    <!-- 登录后的操作 -->
    <div v-if="isLogin">
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
          <ul
            class="cart-list"
            v-for="(shopInfo, index) in shopCartInfo"
            :key="index"
          >
            <li class="cart-list-con1">
              <input
                type="checkbox"
                name="chk_list"
                :checked="shopInfo.selected == 1"
                @click="updateCheck(shopInfo, $event)"
              />
            </li>
            <li class="cart-list-con2">
              <img :src="shopInfo.defaultPicUrl" />
              <div class="item-msg">
                {{ shopInfo.title }}
              </div>
            </li>
            <li class="cart-list-con4">
              <span class="price">{{ shopInfo.price }}</span>
            </li>
            <li class="cart-list-con5">
              <a class="mins" @click="handler('mins', -1, shopInfo)">-</a>
              <input
                autocomplete="off"
                type="text"
                :minnum="1"
                class="itxt"
                :value="shopInfo.count > 0 ? shopInfo.count : 1"
                @change="handler('change', $event.target.value * 1, shopInfo)"
              />
              <a class="plus" @click="handler('plus', 1, shopInfo)">+</a>
            </li>
            <li class="cart-list-con6">
              <span class="sum">{{ shopInfo.price * shopInfo.count }}</span>
            </li>
            <li class="cart-list-con7">
              <a class="sindelet" @click="deleteGoods(shopInfo)">删除</a>
              <br />
              <a>移到收藏</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="cart-tool">
        <div class="select-all">
          <input
            type="checkbox"
            class="chooseAll"
            :checked="checkedAll && shopCartInfo.length > 0"
            @click="selectAll"
          />
          <span>全选</span>
        </div>
        <div class="option">
          <a @click="deleteAllGoods">删除选中的商品</a>
          <a>移到我的关注</a>
          <a>清除下柜商品</a>
        </div>
        <div class="money-box">
          <div class="chosed">
            已选择
            <span>{{ selectedShop }}</span>
            件商品
          </div>
          <div class="sumprice">
            <em>总价（不含运费） ：</em>
            <i class="summoney">{{ totalPrice }}</i>
          </div>
          <div class="sumbtn">
            <a class="sum-btn">结算</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 未登录时候的操作 -->
    <div v-else>
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
          <ul
            class="cart-list"
            v-for="(goodInfo, index) in shopDateInfo"
            :key="index"
          >
            <li class="cart-list-con1">
              <input
                type="checkbox"
                name="chk_list"
                :checked="goodInfo.selected == 1"
                @click="updateCheckGoods(goodInfo, $event)"
              />
            </li>
            <li class="cart-list-con2">
              <img :src="goodInfo.skuList[0].skuPicList[0].picUrl" />
              <div class="item-msg">
                {{
                  goodInfo.skuList[0].title + goodInfo.spu.subTitle
                }}&nbsp;&nbsp;&nbsp;{{ goodInfo.specification }}
              </div>
            </li>
            <li class="cart-list-con4">
              <span class="price">{{ goodInfo.skuList[0].price }}</span>
            </li>
            <li class="cart-list-con5">
              <a
                class="mins"
                @click="handlerGoods('mins', -1, goodInfo, index)"
              >
                -
              </a>
              <input
                autocomplete="off"
                type="text"
                :minnum="1"
                class="itxt"
                :value="goodInfo.count > 0 ? goodInfo.count : 1"
                @change="
                  handlerGoods(
                    'change',
                    $event.target.value * 1,
                    goodInfo,
                    index,
                  )
                "
              />
              <a class="plus" @click="handlerGoods('plus', 1, goodInfo, index)">
                +
              </a>
            </li>
            <li class="cart-list-con6">
              <span class="sum">
                {{ goodInfo.skuList[0].price * goodInfo.count }}
              </span>
            </li>
            <li class="cart-list-con7">
              <a class="sindelet" @click="deleteShopGoods(index)">删除</a>
              <br />
              <a>移到收藏</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="cart-tool">
        <div class="select-all">
          <input
            type="checkbox"
            class="chooseAll"
            :checked="checkedAllGoods && shopDateInfo.length > 0"
            @click="selectAllGoods"
          />
          <span>全选</span>
        </div>
        <div class="option">
          <a @click="deleteAllShop">删除选中的商品</a>
          <a>移到我的关注</a>
          <a>清除下柜商品</a>
        </div>
        <div class="money-box">
          <div class="chosed">
            已选择
            <span>{{ selectedGoods }}</span>
            件商品
          </div>
          <div class="sumprice">
            <em>总价（不含运费） ：</em>
            <i class="summoney">{{ totalPriceGoods }}</i>
          </div>
          <div class="sumbtn">
            <router-link class="sum-btn" to="/login">结算</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRefToken } from '@/util/token';
import { Message } from 'element-ui';
import { mapState } from 'vuex';
//引用节流操作
import throttle from 'lodash/throttle';
export default {
  name: 'ShopCart',
  data() {
    return {
      isLogin: getRefToken() ? true : false,
      shopDateInfo: [],
    };
  },
  created() {
    this.getShopData();
  },
  beforeMount() {
    let shopDate = [];
    if (localStorage.getItem('cartList')) {
      let shopGoodsInfo = localStorage.getItem('cartList').split('@');
      shopGoodsInfo.forEach((item) => {
        shopDate.push(JSON.parse(item));
      });
      this.shopDateInfo = shopDate;
    }
  },
  mounted() {
    if (localStorage.getItem('cartList') && getRefToken()) {
      this.shopDateInfo.forEach((item) => {
        this.$store.dispatch('getAddGoodsShopCart', {
          count: item.count,
          specification: item.specification,
          skuID: item.skuList[0].id.toString(),
        });
      });
      try {
        this.shopDateInfo = [];
        localStorage.removeItem('cartList');
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    //发送获取购物车请求
    getShopData() {
      this.$store.dispatch('getUserShopCartInfo');
    },
    //获取购物车商品种类数量
    getShopNum() {
      this.$store.dispatch('getUserShopCartNum');
    },
    //单选
    async updateCheck(shopInfo, event) {
      let isChecked = event.target.checked ? '1' : '2';
      await this.$store.dispatch('getChangeShopCheck', {
        selected: isChecked,
        skuId: shopInfo.skuID,
        specification: shopInfo.productSkuSpecification,
      });
      setTimeout(() => {
        if (this.reqCode == 200) {
          Message({
            type: 'success',
            message: this.reqMsg || '服务器繁忙',
          });
        } else {
          Message({
            type: 'error',
            message: this.reqMsg || '服务器繁忙',
          });
        }
        this.getShopData();
      }, 800);
    },
    //全选
    selectAll(event) {
      let isChecked = event.target.checked ? '1' : '2';
      this.shopCartInfo.forEach((item) => {
        // this.updateCheck(item, event);
        this.$store.dispatch('getChangeShopCheck', {
          selected: isChecked,
          skuId: item.skuID,
          specification: item.productSkuSpecification,
        });
      });
      setTimeout(() => {
        if (this.reqCode == 200) {
          Message({
            type: 'success',
            message: this.reqMsg || '服务器繁忙',
          });
        } else {
          Message({
            type: 'error',
            message: this.reqMsg || '服务器繁忙',
          });
        }
        this.getShopData();
      }, 1000);
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
          disNum = shopInfo.count > 1 ? -1 : 0;
          break;
        case 'change':
          //当为不合法的输入
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - shopInfo.count;
          }
          break;
      }
      try {
        await this.$store.dispatch('changeShopCartNum', {
          count: disNum,
          skuID: shopInfo.skuID,
          specification: shopInfo.productSkuSpecification,
        });
        this.getShopData();
      } catch (error) {
        alert('服务器繁忙~~');
      }
    }, 500),
    //发送删除购物车商品请求
    deleteGoods(shopInfo) {
      this.$store.dispatch('reqDeleteGoods', {
        skuID: shopInfo.skuID,
        specification: shopInfo.productSkuSpecification,
      });
      setTimeout(() => {
        if (this.reqCode == 200) {
          Message({
            type: 'success',
            message: this.reqMsg || '服务器繁忙',
          });
        } else {
          Message({
            type: 'error',
            message: this.reqMsg || '服务器繁忙',
          });
        }
        this.getShopData();
        this.getShopNum();
      }, 800);
    },
    //删除全部勾选的产品
    deleteAllGoods() {
      this.$store.dispatch('deleteAllShopCart');
      try {
        setTimeout(() => {
          Message({
            type: 'success',
            message: '删除成功',
          });
          this.getShopData();
          this.getShopNum();
        }, 1000);
      } catch (error) {
        Message({
          type: 'error',
          message: error.message,
        });
      }
    },
    ////////////////////未登录的操作//////////////////
    //重新放到localstorage中
    reqLocalStorage() {
      let editInfo = '';
      this.shopDateInfo.forEach((item) => {
        editInfo = editInfo + '@' + JSON.stringify(item);
      });
      localStorage.setItem('cartList', editInfo.slice(1));
    },
    //加入购物车的话就去登录
    getShopDataGoods() {
      this.$router.push('/login');
    },
    //单选
    async updateCheckGoods(goodInfo, event) {
      let isChecked = event.target.checked ? 1 : 2;
      goodInfo.selected = isChecked;
    },
    //全选
    selectAllGoods(event) {
      let isChecked = event.target.checked ? 1 : 2;
      this.shopDateInfo.forEach((item) => {
        item.selected = isChecked;
      });
    },
    //删除购物车商品
    deleteShopGoods(index) {
      this.shopDateInfo.splice(index, 1);
      this.reqLocalStorage();
    },
    //删除全选商品
    deleteAllShop() {
      let shopSum = 0;
      this.shopDateInfo.forEach((item) => {
        item.selected == 1 ? (shopSum += 1) : (shopSum += 0);
      });
      if (shopSum == this.shopDateInfo.length) {
        this.shopDateInfo = [];
        localStorage.removeItem('cartList');
      }
    },
    //更改购物车商品数量
    handlerGoods: throttle(async function (type, disNum, goodInfo, index) {
      switch (type) {
        case 'plus':
          disNum = 1;
          break;
        case 'mins':
          //产品个数大于1才能给服务器传-1
          disNum = goodInfo.count > 1 ? -1 : 0;
          break;
        case 'change':
          //当为不合法的输入
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - goodInfo.count;
          }
          break;
      }
      this.shopDateInfo[index].count += disNum;
      this.reqLocalStorage();
    }, 500),
  },
  //获取数据
  computed: {
    ...mapState({
      shopCartInfo: (state) => state.shopCart.shopCartInfo || [],
      reqCode: (state) => state.shopCart.reqCode,
      reqMsg: (state) => state.shopCart.reqMsg,
    }),
    //总价格
    totalPrice() {
      let sum = 0;
      this.shopCartInfo.forEach((item) => {
        if (item.selected == 1) {
          sum += item.count * item.price;
        } else {
          sum = 0;
        }
      });
      return sum;
    },
    //判断全选按钮是否复选
    checkedAll() {
      //every遍历数组中的每一项
      return this.shopCartInfo.every((item) => item.selected == 1);
    },
    //选中了几个商品
    selectedShop() {
      let selectCount = 0;
      this.shopCartInfo.forEach((item) => {
        item.selected == 1 ? (selectCount += 1) : (selectCount += 0);
      });
      return selectCount;
    },
    ////////////未登录时操作///////////////
    //总价
    totalPriceGoods() {
      let sum = 0;
      this.shopDateInfo.forEach((item) => {
        if (item.selected == 1) {
          sum += item.count * item.skuList[0].price;
        }
      });
      return sum;
    },
    //选中了几个商品
    selectedGoods() {
      let selectCount = 0;
      this.shopDateInfo.forEach((item) => {
        item.selected == 1 ? (selectCount += 1) : (selectCount += 0);
      });
      return selectCount;
    },
    //判断全选按钮是否复选
    checkedAllGoods() {
      //every遍历数组中的每一项
      return this.shopDateInfo.every((item) => item.selected == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  cursor: pointer;
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
            height: 36px;
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
