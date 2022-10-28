<template>
  <div class="xtx_topnav">
    <div class="wrapper">
      <!-- 顶部导航 -->
      <ul class="xtx_navs">
        <li>
          <router-link to="/login" v-show="!userInfo.username">
            请登录
          </router-link>
        </li>
        <li>
          <a href="javascript:;">我的订单</a>
        </li>
        <li>
          <router-link to="/shopcart" href="javascript:;">购物车</router-link>
        </li>
        <li>
          <a href="javascript:;">帮助中心</a>
        </li>
        <li>
          <a href="javascript:;">在线客服</a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="mobile sprites"></i>
            手机版
          </a>
        </li>
        <li class="username">
          <a href="">{{ userInfo.username }}</a>
        </li>
      </ul>
      <div class="userheader">
        <img
          v-if="userInfo.avatar"
          :src="userInfo.avatar"
          @click="changeUserShow"
        />
        <img v-else src="@/assets/images/header.png" alt="" />
        <ul v-show="isUserShow">
          <li>
            <router-link href="javascript:;" to="/center">个人中心</router-link>
          </li>
          <li>
            <router-link to="/shopcart" class="xtx_search_cart sprites">
              <i>{{ this.userInfo.cartNum }}</i>
            </router-link>
          </li>
          <li @click="logout"><a href="javascript:;">退出登录</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  data() {
    return {
      isUserShow: false, //显示/隐藏个人操作
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.home.userInfo,
    }),
  },
  mounted() {
    //获取用户购物车头像等信息
    this.$store.dispatch('getUserInfo');
  },
  methods: {
    changeUserShow() {
      this.isUserShow = !this.isUserShow;
    },
    async logout() {
      try {
        await this.$store.dispatch('userLogout');
        this.$router.push('/login');
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.xtx_topnav {
  width: 100%;
  height: 50px;
  background-color: #333;
  position: relative;
  .xtx_navs {
    position: absolute;
    right: 240px;
    height: 53px;
    line-height: 53px;
    li {
      a {
        text-decoration: none;
        font-weight: 600;
      }
      display: inline-block;
      font-size: 14px;
      &:last-child {
        a {
          border-right: none;
        }
      }
    }
    .mobile {
      display: inline-block;
      width: 20px;
      height: 16px;
      position: relative;
      top: 3px;
      background-position: -160px -70px;
    }
    a {
      display: inline-block;
      line-height: 1;
      padding: 0 15px;
      border-right: 2px solid #666;
      color: #dcdcdc;
      &:hover {
        color: #5eb69c;
      }
    }
  }
  .userheader {
    position: absolute;
    right: 145px;
    width: 100px;
    z-index: 999;
    img {
      height: 48px;
      width: 48px;
      margin-top: 2px;
      margin-left: 10px;
      border: 1px solid #fff;
      border-radius: 50% 50%;
    }
    ul {
      margin-top: 2px;
      li {
        width: 90px;
        height: 35px;
        text-align: center;
        line-height: 30px;
        border: 1px solid #333;
        font-size: 13px;
        font-weight: 700;
      }
      .xtx_search_cart {
        display: block;
        width: 22px;
        height: 22px;
        position: relative;
        margin: 8px 35px 0 12px;
        float: right;
        background-position: -120px -70px;
        i {
          position: absolute;
          top: -5px;
          left: 16px;
          line-height: 1;
          padding: 1px 6px;
          font-style: normal;
          font-size: 13px;
          background-color: #ea745e;
          border-radius: 15px;
          color: #fff;
        }
      }
    }
  }
  ul {
    list-style: none;
  }
}
</style>
