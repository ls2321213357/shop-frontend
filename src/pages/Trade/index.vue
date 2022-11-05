<template>
  <div class="trade-container">
    <el-button type="primary" @click="goHome">
      <i class="el-icon-arrow-left"></i>
      去商城逛逛啦
    </el-button>
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div class="addAddress">
        <el-button type="primary" @click="centerDialogVisible = true">
          新增收货地址
        </el-button>
        <!-- 新增收货地址 -->
        <el-dialog
          title="请输入新的地址"
          :visible.sync="centerDialogVisible"
          width="40%"
          center
          :modal="true"
          custom-class="dialog"
        >
          <br />
          <el-cascader
            placeholder="请选择省、市、区"
            :options="addressList"
            clearable
            :props="treeProps"
            size="medium"
            v-model="addressValue"
          ></el-cascader>
          <div class="user">
            <el-input
              v-model="userName"
              placeholder="收货人姓名"
              clearable
            ></el-input>
          </div>
          <div class="phone">
            <el-input
              v-model="phone"
              placeholder="请输入收货人手机号"
              clearable
            ></el-input>
          </div>
          <div class="detailInfo">
            <el-input
              v-model="detailAddress"
              placeholder="请输入详细地址"
              clearable
            ></el-input>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handlerSubmitUserAddress">
              确 定
            </el-button>
          </span>
        </el-dialog>
      </div>
      <div class="address clearFix">
        <span class="username selected">张三</span>
        <p>
          <span class="s1">北京市昌平区宏福科技园综合楼6层</span>
          <span class="s2">15010658793</span>
          <span class="s3" @click="changeUserAddress">修改地址</span>
          <span class="s4" @click="setDefaultAddress">默认地址</span>
        </p>
        <!-- 修改收货地址 -->
        <el-dialog
          title="请输入新的地址"
          :visible.sync="centerDialogVisibleChange"
          width="40%"
          center
          :modal="true"
          custom-class="dialog"
        >
          <br />
          <el-cascader
            placeholder="请选择省、市、区"
            :options="addressList"
            clearable
            :props="treeProps"
            size="medium"
            v-model="addressValue"
          ></el-cascader>
          <div class="user">
            <el-input
              v-model="userName"
              placeholder="收货人姓名"
              clearable
            ></el-input>
          </div>
          <div class="phone">
            <el-input
              v-model="phone"
              placeholder="请输入收货人手机号"
              clearable
            ></el-input>
          </div>
          <div class="detailInfo">
            <el-input
              v-model="detailAddress"
              placeholder="请输入详细地址"
              clearable
            ></el-input>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisibleChange = false">
              取 消
            </el-button>
            <el-button type="primary" @click="handlerChangeSubmitUserAddress">
              确 定
            </el-button>
          </span>
        </el-dialog>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span
          class="username"
          :class="{ selected: payWay }"
          @click="payWay = true"
        >
          在线支付
        </span>
        <span
          class="username"
          style="margin-left: 5px"
          :class="{ selected: !payWay }"
          @click="payWay = false"
        >
          货到付款
        </span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">顺丰快递</span>
          <p>配送时间：后天上午09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="list in cartProductVOList"
          :key="list.skuID"
        >
          <li>
            <img :src="list.defaultPicUrl" alt="" />
          </li>
          <li>
            <p>
              {{ list.title }}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>{{ list.price }}</h3>
          </li>
          <li>{{ list.count }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b>
            <i>{{ cartProductVOList.length }}</i>
            件商品，总商品金额
          </b>
          <span>¥{{ tradeListInfo.totalMoney }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>{{ tradeListInfo.freight }}.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:
        <span>¥{{ tradeListInfo.payMoney }}</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>北京市昌平区宏福科技园综合楼6层</span>
        收货人：
        <span>张三</span>
        <span>15010658793</span>
      </div>
    </div>
    <div class="sub clearFix">
      <router-link class="subBtn" to="/pay">提交订单</router-link>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { mapState } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Trade',
  data() {
    return {
      //控制新增地址弹窗
      centerDialogVisible: false,
      //控制修改地址弹窗
      centerDialogVisibleChange: false,
      //收件人名字
      userName: '',
      //收件人手机号
      phone: '',
      //省市区的地址
      addressValue: [],
      //用户的id
      id: '',
      //详细地址
      detailAddress: '',
      //自定义地区数据
      treeProps: {
        value: 'id',
        label: 'name',
        children: 'picList',
      },
      //付款方式
      payWay: true,
    };
  },
  mounted() {
    let cartProductList = JSON.parse(localStorage.getItem('orderDate'));
    //获取订单请求
    this.$store.dispatch('getTradeListInfo', { cartProductList });
    //获取地址信息
    this.$store.dispatch('getGoodsAddress');
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    //添加收货地址回调
    async handlerSubmitUserAddress() {
      try {
        await this.$store.dispatch('getAddAddress', {
          countyID: this.addressValue[2],
          defaultStatus: 2,
          detailAddress: this.detailAddress,
          receiverName: this.userName,
          receiverPhone: this.phone,
        });
        Message({
          type: 'success',
          message: '添加成功🥰',
        });
        this.userName = '';
        this.phone = '';
        this.addressValue = [];
        this.detailAddress = '';
      } catch (error) {
        Message({
          type: 'error',
          message: '服务器繁忙添加失败😭',
        });
      }
      this.centerDialogVisible = false;
    },
    //设置默认收货地址
    setDefaultAddress() {
      console.log(111);
    },
    //修改收货地址
    async changeUserAddress() {
      this.centerDialogVisibleChange = true;
    },
    //修改收货地址回调
    async handlerChangeSubmitUserAddress() {
      try {
        await this.$store.dispatch('getChangeAddress', {
          countyID: this.addressValue[2],
          defaultStatus: 2,
          id: this.id,
          detailAddress: this.detailAddress,
          receiverName: this.userName,
          receiverPhone: this.phone,
        });
        Message({
          type: 'success',
          message: '修改成功😘',
        });
        this.userName = '';
        this.phone = '';
        this.addressValue = [];
        this.detailAddress = '';
      } catch (error) {
        Message({
          type: 'error',
          message: '服务器繁忙修改失败😶',
        });
      }
      this.centerDialogVisibleChange = false;
    },
  },
  computed: {
    ...mapState({
      //所有商品
      tradeListInfo: (state) => state.trade.tradeListInfo || [],
      //地址选项
      addressList: (state) => state.trade.addressList || [],
    }),
    cartProductVOList() {
      return this.tradeListInfo.cartProductVOList || [];
    },
  },
};
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;
    position: relative;
    .addAddress {
      float: right;
      position: absolute;
      right: 25px;
      top: 20px;
      .user {
        position: absolute;
        top: 60px;
        left: 30px;
      }
      .phone {
        position: absolute;
        top: 115px;
        left: 30px;
      }
    }

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: '';
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .selected {
        border-color: rgb(2, 94, 131);
      }

      .selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 130px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        li {
          line-height: 30px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            width: 300px;
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }
          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px '微软雅黑';
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>
