<template>
  <div class="xtx_header clearfix">
    <div class="wrapper">
      <!-- 网站Logo -->
      <div class="xtx_logo"></div>
      <!-- 主导航 -->
      <div class="xtx_navs">
        <ul class="clearfix">
          <li>
            <a href="javascript:;">首页</a>
          </li>
          <li>
            <a href="javascript:;">生鲜</a>
          </li>
          <li>
            <a href="javascript:;">美食</a>
          </li>
          <li>
            <a href="javascript:;">餐厨</a>
          </li>
          <li>
            <a href="javascript:;">电器</a>
          </li>
          <li>
            <a href="javascript:;">居家</a>
          </li>
          <li>
            <a href="javascript:;">洗护</a>
          </li>
          <li>
            <a href="javascript:;">孕婴</a>
          </li>
          <li>
            <a href="javascript:;">服装</a>
          </li>
        </ul>
      </div>
      <!-- 站内搜索 -->
      <div class="xtx_search">
        <!-- 搜索框 -->
        <el-input
          class="search"
          v-model="keyWord"
          type="text"
          placeholder="回车进行搜索"
          prefix-icon="el-icon-search"
          clearable
          @keyup.enter.native="searchGoods"
        ></el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  data() {
    return {
      keyWord: '',
    };
  },
  methods: {
    searchGoods() {
      if (this.$route.query) {
        let location = {
          name: 'search',
          params: {
            keyword: this.keyWord || undefined,
          },
        };
        location.query = this.$route.query;
        this.$router.push(location);
        this.keyWord = '';
      }
    },
  },
};
</script>

<style lang="less" scoped>
.xtx_header {
  position: relative;
  ul {
    list-style: none;
  }
  .xtx_logo {
    width: 200px;
    height: 160px;
    background: url(./images/login-shop2.png);
    background-size: cover;
    float: left;
  }
  .xtx_navs {
    padding-top: 75px;
    margin-left: 88px;
    float: left;
    li {
      line-height: 1;
      font-size: 16px;
      margin-right: 50px;
      position: relative;
      float: left;
      &:after {
        content: '';
        display: none;
        width: 30px;
        height: 2px;
        background-color: #5eb69c;
        position: absolute;
        left: 1px;
        bottom: -7px;
      }
    }
  }
  .xtx_search {
    position: absolute;
    bottom: 10px;
    right: 150px;
    width: 250px;
    height: 38px;
  }
  .xtx_search_wrapper {
    width: 250px;
    height: 40px;
    padding-left: 50px;
    position: relative;
    float: right;
    .search {
      width: 100%;
      height: 90%;
      font-size: 15px;
      &::-webkit-input-placeholder {
        color: #ccc;
      }
    }
  }
}
/** 主导航及Logo **/
.xtx_header .xtx_navs li:hover a,
.xtx_header .xtx_navs li.active a {
  color: #5eb69c;
}
.xtx_header .xtx_navs li:hover:after,
.xtx_header .xtx_navs li.active:after {
  display: block;
}
</style>
