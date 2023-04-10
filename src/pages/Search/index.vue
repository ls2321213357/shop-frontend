<template>
  <div>
    <TypeNav />
    <div class="btn">
      <el-button type="primary" @click="goHome">
        <i class="el-icon-arrow-left"></i>
        继续去逛逛啦
      </el-button>
    </div>
    <div class="main">
      <div class="py-container">
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 搜索关键字的面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeSearchword">×</i>
            </li>
            <!-- 主要配方的面包屑 -->
            <li class="with-x" v-for="(attrVal, index) in props" :key="index">
              {{ attrVal.split(':')[1] }}
              <i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector :detailList="detailList" @attrInfo="attrInfo" />
        <!--details-->
        <div v-if="totalPage !== 0" class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: changeSort }" @click="isSort">
                  <a>综合</a>
                </li>
                <li :class="{ active: !changeSort }" @click="isSales">
                  <a>销量</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="detail in detailData"
                :key="detail.id"
                @click="checkDetailInfo(detail)"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <a>
                      <img v-lazy="detail.defaultPicUrl" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ detail.defaultPrice }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >
                      {{ detail.name }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>{{ detail.sale }}</span>
                      人购买
                    </i>
                  </div>
                  <div class="operate">
                    <a class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <el-pagination
              background
              layout="prev, pager, next,sizes,total"
              @prev-click="prePage"
              @next-click="nextPage"
              @size-change="changeSize"
              :current-page="Number(searchParams.pageNo)"
              @current-change="reqDetailInfo"
              :total="totalPage"
              :page-size="Number(searchParams.pageSize)"
              :page-sizes="[2, 3, 4]"
            ></el-pagination>
          </div>
        </div>
        <div v-else class="missDetail">
          <h1>对不起您搜索的商品暂未找到,请重新选择</h1>
          <img src="./images/shopping.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import SearchSelector from './SearchSelector/SearchSelector';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Search',
  components: {
    SearchSelector,
  },
  data() {
    return {
      //定义商品选项分类
      props: [],
      //定义需要的参数
      searchParams: {
        //一级分类id
        brandId: '',
        //搜索关键字
        keyword: '',
        //页码
        pageNo: '1',
        //页长
        pageSize: '4',
        //平台售卖属性操作带的参数
        productAttributeIds: [],
        //二级分类id
        productCategoryId: '',
        //排序类型
        sort: '1',
      },
      changeSort: true,
    };
  },
  mounted() {
    if (!this.$route.params.keyword && !this.$route.query.productCategoryId) {
      this.searchParams = {};
      this.getDetailList();
    } else {
      //发请求之前需要将searchParams里面的参数进行修改带给服务器
      Object.assign(this.searchParams, this.$route.params, this.$route.query);
      this.getData();
      this.getDetailList();
    }
  },
  computed: {
    ...mapState({
      detailList: (state) => state.search.detailList,
    }),
    //商品详细属性    total数据
    ...mapGetters(['detailData', 'totalPage']),
  },
  methods: {
    //前往主页
    goHome() {
      this.$route.query.productCategoryId = undefined;
      this.$router.push('/');
    },
    //获取商品种类的标签
    async getData() {
      if(!this.searchParams.brandId===''){
        try {
          await this.$store.dispatch(
              'getDetailList',
              this.searchParams.productCategoryId,
          );
        } catch (error) {
          console.log(error.message);
        }
      }
    },
    //获取商品详情列表
    getDetailList() {
      this.$store.dispatch('getDetailInfo', this.searchParams);
    },
    //清除keyword关键字
    removeSearchword() {
      this.searchParams.keyword = undefined;
      this.getData();
      if (this.$route.query) {
        //如果带有params参数,清除路径的时候不应该进行清除
        this.$router.push({ name: 'search', query: this.$route.query });
      }
    },
    //清除商品类型(params)
    removeProps(index) {
      //删除数组中元素
      this.props.splice(index, 1);
      this.searchParams.productAttributeIds.splice(index, 1);
      this.getData();
      this.getDetailList();
    },
    //收集商品类型数据
    attrInfo(item, itemAttr) {
      let props = `${item.keyID}:${itemAttr.valueName}`;
      let productAttributeIds = Number(itemAttr.valueID);
      //数组去重 商品标签的属性
      if (this.props.indexOf(props) == -1) {
        this.props.push(props);
      }
      //传给后端的商品属性
      if (
        this.searchParams.productAttributeIds.indexOf(productAttributeIds) == -1
      ) {
        this.searchParams.productAttributeIds.push(productAttributeIds);
      }
      this.getData();
      this.getDetailList();
    },
    //点击上一页
    prePage() {
      this.searchParams.pageNo = JSON.stringify(
        Number(this.searchParams.pageNo) - 1,
      );
    },
    //点击下一页
    nextPage() {
      this.searchParams.pageNo = JSON.stringify(
        Number(this.searchParams.pageNo) + 1,
      );
    },
    //更改排序方式
    // 默认
    isSort() {
      this.changeSort = true;
      this.searchParams.sort = '1';
      this.getDetailList();
    },
    //销量
    isSales() {
      this.changeSort = false;
      this.searchParams.sort = '2';
      this.getDetailList();
    },
    //请求商品信息
    reqDetailInfo(val) {
      this.searchParams.pageNo = JSON.stringify(val);
      this.getDetailList();
    },
    //更改显示几条数据
    changeSize(val) {
      this.searchParams.pageSize = JSON.stringify(val);
      this.getDetailList();
    },
    //查看商品详情
    checkDetailInfo(detail) {
      this.$router.push({
        name: 'detail',
        params: {
          skuid: detail.id,
        },
      });
    },
  },
  //要时刻监听请求数据变化,采用watch进行数据监听
  watch: {
    $route() {
      //再次发请求之前整理带给服务器参数
      //Object.assign:es6新增语法,合并对象
      Object.assign(this.searchParams, this.$route.params, this.$route.query);
      //整理完毕后发送请求
      this.getData();
      this.getDetailList();
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  position: absolute;
  top: 52px;
  left: 200px;
}
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .missDetail {
      height: 400px;
      text-align: center;
      color: rgb(235, 44, 56);
      img {
        width: 450px;
        height: 350px;
      }
    }
    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #11689e;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #7267da;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
