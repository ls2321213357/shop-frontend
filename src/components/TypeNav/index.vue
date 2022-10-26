<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件的委派 委派给父盒子 -->
      <div @mouseenter="enterShow" @mouseleave="leaveShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 添加过度动画效果,添加name的话就相当于给他一个类 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in detailNavList"
                :key="c1.id"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-brandid="c1.id">
                    {{ c1.name }}
                  </a>
                  <i><img :src="c1.icon" /></i>
                </h3>
                <!-- 二级分类 -->
                <div
                  class="item-list"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div class="subitem">
                    <dl v-for="c2 in c1.secProductCategoryList" :key="c2.secID">
                      <dt>
                        <a :data-productcategoryid="c2.secID">
                          {{ c2.secName }}
                        </a>
                        <i><img :src="c2.secIcon" /></i>
                      </dt>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// 采用按需引入的方式引入节流 (默认暴露)
import throttle from 'lodash/throttle';
export default {
  name: 'TypeNav',
  data() {
    return {
      //避免与index发生冲突 记录每个标签的index
      currentIndex: -1,
      show: true,
    };
  },
  beforeMount() {
    if (this.$route.path != '/home') {
      this.show = false;
    }
  },
  mounted() {
    //获取商品标签列表
    this.$store.dispatch('getDetailNav');
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数,当执行计算属性时候,右侧函数就会执行
      detailNavList: (state) => state.home.detailNavList,
    }),
  },
  methods: {
    //此处为获取到不同标签index值  throttle为节流
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    //进行路由跳转并传递参数
    //标签进行传递参数最好的解决方案:编程式导航+事件的委派
    //需要解决如何确定获取的就是a标签(利用添加自定义属性可以解决)
    goSearch(event) {
      let element = event.target;
      //element.dataset可以获取到自定义属性
      const { brandid, productcategoryid } = element.dataset;
      //获取到了a标签
      if (productcategoryid) {
        //整理路由跳转的参数
        let loction = { name: 'search' };
        let query = {};
        if (productcategoryid) {
          query.brandId = brandid; //一级分类id
          query.productCategoryId = productcategoryid; //二级分类id
        }
        //如果存在params参数,也要加上
        if (this.$route.params) {
          loction.params = this.$route.params;
        }
        //整理完成参数,把query添加到loction上
        loction.query = query;
        this.$router.push(loction);
      }
    },
    //鼠标进入触发
    enterShow() {
      this.show = true;
    },
    //离开相应区域触发函数
    leaveShow() {
      this.currentIndex = -1;
      //如果不是home组件
      if (this.$route.path != '/home') {
        this.show = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  cursor: pointer;
  border-bottom: 2px solid skyblue;
  margin: 0 auto;
  display: flex;
  position: relative;
  .all {
    width: 190px;
    height: 45px;
    background-color: skyblue;
    line-height: 45px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }
  .sort {
    position: absolute;
    left: 0;
    top: 45px;
    width: 190px;
    height: 502px;
    position: absolute;
    transition: opacity 0.5s;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999;

    .all-sort-list2 {
      .item {
        border-bottom: #fff;
        h3 {
          line-height: 30px;
          font-weight: 400;
          overflow: hidden;
          padding: 0 20px;
          margin: 0;
          letter-spacing: 6px;
          text-align: center;
          font-family: serif;
          position: relative;
          a {
            display: block;
            color: #fff;
            font-size: 15px;
            line-height: 41px;
          }
          i {
            position: absolute;
            top: 0px;
            right: 0px;
            img {
              width: 35px;
              height: 35px;
            }
          }
        }
        .item-list {
          display: none;
          position: absolute;
          min-width: 334px;
          height: 450px;
          background: #f7f7f7;
          left: 190px;
          border: 2px solid #ddd;
          top: 0;
          z-index: 9999 !important;

          .subitem {
            float: left;
            width: 400px;
            padding: 0 4px 0 8px;

            dl {
              width: 97px;
              padding: 6px 0;
              overflow: hidden;
              zoom: 1;
              float: left;
              dt {
                line-height: 22px;
                text-align: right;
                padding: 3px 20px 0 0;
                font-weight: 700;
                a:hover {
                  color: skyblue;
                }
              }
            }
          }
        }
      }
      .cur {
        background-color: skyblue;
      }
    }
  }
  //过渡动画的样式
  //开始状态
  .sort-enter {
    height: 0;
  }
  //结束状态
  .sort-enter-to {
    height: 461px;
  }
  //定义动画时间、速率
  .sort-enter-active {
    transition: all 0.3s linear;
  }
}
</style>
