<template>
  <div class="order-main">
    <div class="btn">
      <el-button type="primary" @click="goHome">
        <i class="el-icon-arrow-left"></i>
        去商城逛逛啦
      </el-button>
    </div>
    <div class="container">
      <div class="order-body">
        <!--左侧列表-->
        <div class="order-left">
          <dl>
            <dt>
              <i>·</i>
              订单中心
            </dt>
            <dd>
              <i class="iconfont icon-dingdan2"></i>
              我的订单
            </dd>
            <dd>
              <i class="iconfont icon-dingdan1"></i>
              团购订单
            </dd>
            <dd>
              <i class="iconfont icon-dingdan"></i>
              本地生活订单
            </dd>
            <dd>
              <i class="iconfont icon-qitadingdan"></i>
              我的预售
            </dd>
            <dd>
              <i class="iconfont icon-shouye"></i>
              评价晒单
            </dd>
            <dd>
              <i class="iconfont icon-quxiaodingdanxiao"></i>
              取消订单记录
            </dd>
          </dl>
          <dl>
            <dt>
              <i>·</i>
              关注中心
            </dt>
            <dd>关注的商品</dd>
            <dd>关注的店铺</dd>
            <dd>关注的专辑</dd>
            <dd>关注的品牌</dd>
            <dd>关注的活动</dd>
            <dd>浏览历史</dd>
          </dl>
        </div>
        <!-- 右侧内容 -->
        <div class="order-right">
          <div class="order-content">
            <div class="title">
              <h3>我的订单</h3>
            </div>
            <div class="chosetype">
              <table>
                <thead>
                  <tr>
                    <th width="25%">创建时间</th>
                    <th width="25%">订单详情</th>
                    <th width="13%">收货人</th>
                    <th>支付状态</th>
                    <th class="moeny">金额</th>
                    <th>订单状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
              </table>
            </div>
            <el-collapse accordion v-model="activeName">
              <el-collapse-item
                v-for="(order, index) in orderList"
                :key="order.id"
                @click.native="getOrderDetailInfo(order)"
                :name="index + 1"
              >
                <template slot="title">
                  <span class="ordertitle">
                    {{
                      dayjs(order.createdTime).format('YYYY-MM-DD  HH:mm:ss')
                    }}
                    <span class="order-num">订单编号:{{ order.id }}</span>
                    <span class="username">{{ order.receiverName }}</span>
                    <span class="pay-status">
                      {{
                        ['支付成功', '支付失败', '未支付'][order.payStatus - 1]
                      }}
                    </span>
                    <span class="order-price">{{ order.payMoney }}</span>
                    <span class="order-status">
                      {{
                        [
                          '待发货',
                          '已发货',
                          '已完成',
                          '已关闭',
                          '超时',
                          '待付款',
                        ][order.orderStatus - 1]
                      }}
                    </span>
                    <span
                      class="pull-right"
                      @click.stop="deleteOrder(order.id)"
                    >
                      <img src="./images/delete.png" />
                    </span>
                  </span>
                </template>
                <div class="orders">
                  <table class="order-item">
                    <tbody
                      v-loading="loading"
                      element-loading-text="拼命加载中.........."
                      element-loading-spinner="el-icon-loading"
                    >
                      <tr v-for="(orderInfo, index) in orderDetai" :key="index">
                        <td width="46%">
                          <div class="typographic">
                            <img :src="orderInfo.productPic" />
                            <a class="block-text">
                              {{ orderInfo.productName }}
                            </a>
                            <span>x{{ orderInfo.productQuantity }}</span>
                          </div>
                        </td>
                        <td
                          :rowspan="orderDetai.length"
                          v-if="index == 0"
                          width="16%"
                          class="center"
                        >
                          {{ order.receiverName }}
                        </td>
                        <td
                          :rowspan="orderDetai.length"
                          v-if="index == 0"
                          width="9%"
                          class="center"
                        >
                          {{
                            ['支付成功', '支付失败', '未支付'][
                              order.payStatus - 1
                            ]
                          }}
                        </td>
                        <td
                          :rowspan="orderDetai.length"
                          v-if="index == 0"
                          width="11%"
                          class="center"
                        >
                          <ul class="center">
                            <li>总金额¥{{ orderInfo.productPrice }}</li>
                            <li>
                              {{ ['在线支付', '货到付款'][order.payType + 1] }}
                            </li>
                          </ul>
                        </td>
                        <td
                          :rowspan="orderDetai.length"
                          v-if="index == 0"
                          width="8%"
                          class="center"
                        >
                          <a href="#">
                            {{
                              [
                                '待发货',
                                '已发货',
                                '已完成',
                                '已关闭',
                                '超时',
                                '待付款',
                              ][order.orderStatus - 1]
                            }}
                          </a>
                        </td>
                        <td
                          :rowspan="orderDetai.length"
                          v-if="index == 0"
                          width="13%"
                          class="center"
                        >
                          <ul class="unstyled">
                            <li>
                              <a target="_blank" @click="goPay">
                                {{
                                  order.payStatus == 1 ? '订单完成' : '去支付'
                                }}
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { mapState } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Order',
  data() {
    return {
      moveStatus: '',
      activeName: '1',
      loading: false,
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    //获取订单列表
    getOrderList() {
      this.$store.dispatch('getUserOrderList');
    },
    //回到主页
    goHome() {
      this.$router.push('/');
    },
    //发送订单详细列表请求
    async getDetailInfo(num) {
      try {
        this.loading = true;
        await this.$store.dispatch('getOrderDetailInfo', num);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        Message({
          type: 'error',
          messages: '获取订单信息失败',
        });
      }
    },
    //获取订单详细列表
    getOrderDetailInfo(order) {
      this.getDetailInfo(order.id);
    },
    //点击去支付
    goPay() {
      this.$router.push('/pay');
    },
    //删除一条订单记录
    async deleteOrder(num) {
      try {
        await this.$store.dispatch('getDeleteOrder', num);
        Message({ type: 'success', message: '删除成功🤷‍♂️' });
        this.getOrderList();
      } catch (error) {
        Message({ type: 'error', message: '删除失败😶' });
      }
    },
  },
  computed: {
    ...mapState({
      //订单主表
      orderList: (state) => state.order.orderList || [],
      //详细订单列表
      orderDetai: (state) => state.order.orderDetai || [],
    }),
  },
};
</script>

<style lang="less" scoped>
.order-main {
  .btn {
    margin-left: 20px;
  }
  margin: 0 auto;
  width: 1200px;

  .order-body {
    padding: 10px;
    color: #333;

    &:after {
      content: '';
      display: block;
      clear: both;
    }

    //左边
    .order-left {
      float: left;
      width: 16.67%;

      dl {
        line-height: 28px;

        dt {
          font-weight: 700;
          padding: 5px;

          i {
            color: #77b72c;
          }
        }

        dd {
          width: 100px;
          margin: 0 0 6px;
          border-bottom: 1px solid #ededed;
          text-align: center;
        }
      }
    }

    //右边
    .order-right {
      float: right;
      width: 83.33%;
      position: relative;
      //订单部分
      .order-content {
        margin: 0 20px;
        color: #666;
        //标题
        .title {
          margin-bottom: 22px;
          border: 1px solid #ddd;

          h3 {
            padding: 12px 10px;
            font-size: 15px;
            background-color: #f1f1f1;
          }
        }

        //表头
        .chosetype {
          margin-bottom: 15px;
          color: #666;

          table {
            border: 1px solid #e6e6e6;
            border-collapse: separate;
            border-radius: 2px;
            width: 100%;
            max-width: 100%;
            border-spacing: 0;
            .moeny {
              width: 76px;
            }
            th {
              padding: 6px 8px;
              color: #666;
              font-weight: 700;
              vertical-align: bottom;
              background-color: #f4f4f4;
              line-height: 18px;
              border-bottom: 1px solid #e6e6e6;
              font-size: 12px;
              text-align: left;
            }
          }
        }
        .ordertitle {
          font-weight: 700;
          .order-num {
            margin-left: 80px;
          }
          .username {
            display: inline-block;
            width: 60px;
            text-align: center;
            margin-left: 53px;
          }
          .pay-status {
            display: inline-block;
            width: 60px;
            text-align: center;
            margin-left: 70px;
          }
          .order-price {
            display: inline-block;
            width: 60px;
            text-align: center;
            margin-left: 40px;
          }
          .order-status {
            display: inline-block;
            width: 60px;
            text-align: center;
            margin-left: 27px;
          }
          .pull-right {
            margin-left: 42px;
          }
        }
        // 表单内容
        .orders {
          font-size: 12px;

          a {
            &:hover {
              color: #4cb9fc;
            }
          }

          table {
            border: 1px solid #e6e6e6;
            border-collapse: collapse;
            border-radius: 2px;
            width: 100%;
            margin-bottom: 18px;
            max-width: 100%;

            th {
              padding: 6px 8px;
              line-height: 18px;
              text-align: left;
              vertical-align: bottom;
              background-color: #f4f4f4;
              font-size: 12px;
              color: #666;

              .pull-right {
                float: right;
                cursor: pointer;

                img {
                  margin-right: 10px;
                  vertical-align: middle;
                }
              }
            }

            td {
              font-size: 12px;
              color: #666;
              padding: 6px 8px;
              line-height: 18px;
              text-align: left;
              vertical-align: middle;
              border: 1px solid #e6e6e6;

              &.center {
                text-align: center;
              }

              .typographic {
                img {
                  float: left;
                  margin-right: 10px;
                  width: 100px;
                  height: 100px;
                }
                .block-text {
                  margin-top: 18px;
                }
                a {
                  float: left;
                  min-width: 80px;
                  max-width: 180px;
                  font-weight: 700;
                }
                span {
                  float: left;
                  font-size: 18px;
                  margin-top: 30px;
                  min-width: 80px;
                  max-width: 250px;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
