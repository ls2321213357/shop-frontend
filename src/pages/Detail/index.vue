<template>
  <div class="detail">
    <!-- 主要内容区域 -->
    <section class="con">
      <el-button type="primary" @click="goHome">
        <i class="el-icon-arrow-left"></i>
        继续去逛逛啦
      </el-button>
      <!-- 导航路径区域 -->
      <div class="conPoin" @click="$router.push('/home')">
        <span v-for="item in categories" :key="item.id">
          {{ item.name }}
        </span>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom :skuPicList="skuPicList" />
          <!-- 小图列表 -->
          <ImageList :skuPicList="skuPicList" />
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">
              {{ goodsDetail.skuList[0].title }}
            </h3>
            <p class="news">
              {{ goodsDetail.spu.subTitle }}
            </p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">
                  价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
                </div>
                <div class="price">
                  <i>¥</i>
                  <em>{{ goodsDetail.skuList[0].price }}</em>
                  <span>降价通知</span>
                </div>
                <div class="remark">
                  <i>累计购买</i>
                  <em>{{ goodsDetail.spu.sale }}</em>
                </div>
              </div>
              <div class="priceArea2">
                <div class="title">
                  <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                </div>
                <div class="fixWidth">
                  <i class="red-bg">加价购</i>
                  <em class="t-gray">
                    满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品
                  </em>
                </div>
              </div>
            </div>
            <div class="support">
              <div class="supportArea">
                <div class="title">
                  支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
                </div>
                <div class="fixWidth">
                  以旧换新，闲置物品回收 各种套餐超值抢 礼品购
                </div>
              </div>
              <div class="supportArea">
                <div class="title">配 送 至</div>
                <div class="fixWidth">广东省 深圳市 宝安区</div>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <dl>
                <dt class="title">规格</dt>
                <dd
                  changepirce="0"
                  v-for="(items, index) in productSkuSpecification"
                  :key="index"
                  :class="{ active: index == flag }"
                  @click="selectItem(items, index)"
                >
                  {{ items }}
                </dd>
              </dl>
            </div>
            <div class="cartWrap">
              <div class="controls">
                <input
                  autocomplete="off"
                  class="itxt"
                  v-model="num"
                  @change="changenum"
                />
                <a href="javascript:" class="plus" @click="num++">+</a>
                <a
                  href="javascript:"
                  class="mins"
                  @click="num <= 1 ? 1 : num--"
                >
                  -
                </a>
              </div>
              <div class="add">
                <el-button type="text" @click="addShopCart">
                  加入购物车
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ImageList from './ImageList/ImageList';
import Zoom from './Zoom/Zoom';
import { Message } from 'element-ui';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Detail',
  data() {
    return {
      flag: 99, //把当前的index动态绑定给this.flag
      num: 1,
    };
  },
  components: {
    ImageList,
    Zoom,
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
    //手动输入商品数量
    changenum(event) {
      const value = event.target.value * 1;
      if (isNaN(value) || value < 1) {
        this.num = 1;
      } else {
        this.num = value;
      }
    },
    //选择商品规格
    selectItem(item, index) {
      this.flag = index;
      this.rule = item;
    },
    open() {
      const url = require('./detailShop.png');
      this.$alert(
        `<img style="width:150px;height:170px;" src="${url}"}/>`,
        '加入购物车成功',
        {
          center: true, //文字居中
          dangerouslyUseHTMLString: true,
          confirmButtonText: '去购物车结算',
          cancelButtonText: '继续去逛逛',
          showCancelButton: true,
          showConfirmButton: true,
        },
      )
        .then(() => {
          this.$router.push('/shopcart');
        })
        .catch(() => {
          this.$router.push('/');
        });
    },
    //加入商品到购物车
    async addShopCart() {
      if (!localStorage.getItem('assToken')) {
        this.open();
        let goodRule = {
          count: this.num,
          specification: this.rule,
          selected: 1,
        };
        if (localStorage.getItem('cartList')) {
          let shopCart = localStorage.getItem('cartList');
          localStorage.setItem(
            'cartList',
            shopCart +
              '@' +
              JSON.stringify(Object.assign(this.goodsDetail, goodRule)),
          );
        } else {
          localStorage.setItem(
            'cartList',
            JSON.stringify(Object.assign(this.goodsDetail, goodRule)),
          );
        }
      } else {
        try {
          await this.$store.dispatch('getAddGoodsShopCart', {
            count: this.num,
            specification: this.rule,
            skuID: this.$route.params.skuid,
          });
          this.open();
        } catch (error) {
          console.log(error.message);
        }
      }
    },
    async getGoodsInfo() {
      try {
        await this.$store.dispatch('getGoodsDetail', this.$route.params.skuid);
      } catch (error) {
        Message({ type: 'error', message: '服务器繁忙请刷新页面' });
      }
    },
  },
  created() {
    this.getGoodsInfo();
    this.flag = 99;
  },
  computed: {
    ...mapState({
      goodsDetail: (state) => state.detail.goodsDetail || {},
    }),
    ...mapGetters(['skuPicList', 'categories']),
    productSkuSpecification() {
      return (
        Object.values(
          JSON.parse(this.goodsDetail.spu.productSpecification),
        )[0] || []
      );
    },
  },
};
</script>

<style lang="less">
.detail {
  cursor: pointer;
  .con {
    width: 1200px;
    margin: 15px auto 0;

    .conPoin {
      width: 200px;
      padding: 9px 15px 9px 0;

      & > span + span:before {
        content: '/\00a0';
        padding: 0 5px;
        color: #ccc;
      }
    }

    .mainCon {
      overflow: hidden;
      margin: 5px 0 15px;

      .previewWrap {
        float: left;
        width: 400px;
        position: relative;
      }

      .InfoWrap {
        width: 700px;
        height: 455px;
        float: right;

        .InfoName {
          font-size: 18px;
          line-height: 21px;
          margin-top: 15px;
          text-align: left;
        }

        .news {
          font-size: 14px;
          color: #e12228;
          margin-top: 20px;
        }

        .priceArea {
          background: #fee9eb;
          padding: 7px;
          margin: 13px 0;
          height: 170px;
          .priceArea1 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 20px;

            .title {
              font-weight: 700;
              font-size: 16px;
              float: left;
              margin-right: 35px;
            }

            .price {
              float: left;
              color: #c81623;

              i {
                font-size: 16px;
              }

              em {
                font-size: 24px;
                font-weight: 700;
              }

              span {
                font-size: 14px;
              }
            }
            .remark {
              float: right;
              margin-right: 95px;
            }
          }

          .priceArea2 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 25px;

            .title {
              font-size: 16px;
              font-weight: 700;
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;

              .red-bg {
                background: #c81623;
                color: #fff;
                padding: 3px;
              }

              .t-gray {
                font-size: 14px;
                color: #999;
              }
            }
          }
        }

        .support {
          border-bottom: 1px solid #ededed;
          padding-bottom: 5px;

          .supportArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;
              color: #999;
            }
          }
        }

        .choose {
          .chooseArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            dl {
              overflow: hidden;
              margin: 13px 0;

              dt {
                margin-right: 15px;
                float: left;
              }

              dd {
                float: left;
                margin-right: 5px;
                color: #666;
                line-height: 24px;
                padding: 2px 14px;
                border-top: 1px solid #eee;
                border-right: 1px solid #bbb;
                border-bottom: 1px solid #bbb;
                border-left: 1px solid #eee;
              }
              .active {
                color: green;
                border: 1px solid green;
              }
            }
          }

          .cartWrap {
            .controls {
              width: 48px;
              position: relative;
              float: left;
              margin-right: 15px;

              .itxt {
                width: 38px;
                height: 37px;
                border: 1px solid #ddd;
                color: #555;
                float: left;
                border-right: 0;
                text-align: center;
              }

              .plus,
              .mins {
                width: 15px;
                text-align: center;
                height: 17px;
                line-height: 17px;
                background: #f1f1f1;
                color: #666;
                position: absolute;
                right: -8px;
                border: 1px solid #ccc;
              }

              .mins {
                right: -8px;
                top: 19px;
                border-top: 0;
              }

              .plus {
                right: -8px;
              }
            }

            .add {
              float: left;
              button {
                background-color: #e1251b;
                padding: 0 25px;
                font-size: 16px;
                color: #fff;
                height: 36px;
                line-height: 36px;
                display: block;
              }
            }
          }
        }
      }
    }
  }
}
</style>
