<template>
  <div class="xtx_topnav">
    <div class="wrapper">
      <!-- 顶部导航部分 -->
      <ul class="xtx_navs">
        <li>
          <router-link to="/login" v-show="!userInfo.username">
            请登录
            <i class="el-icon-s-custom"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/order">
            我的订单
            <i class="el-icon-s-order"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/shopcart">
            购物车
            <i class="el-icon-shopping-cart-1"></i>
          </router-link>
        </li>
        <li>
          <a>
            帮助中心
            <i class="el-icon-s-custom"></i>
          </a>
        </li>
        <li>
          <a href="javascript:;" @click="goChat">
            在线客服
            <i class="el-icon-phone"></i>
          </a>
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
      <div class="userheader" @click="changeUserShow">
        <img
          v-if="userInfo.avatar"
          :src="userInfo.avatar"
        />
        <img v-else src="@/assets/images/header.png" @click="goLogin" />
        <ul v-show="isUserShow">
          <li>
            <router-link href="javascript:;" to="/center">个人中心</router-link>
          </li>
          <li>
            <router-link to="/shopcart" class="xtx_search_cart sprites">
              <i>{{ shopCartNum }}</i>
            </router-link>
          </li>
          <li @click="logout"><a href="javascript:;">退出登录</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { mapState } from 'vuex';
import {getRefToken} from '../../util/token'
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
      shopCartNum: (state) => state.shopCart.shopCartNum,
      userCode: (state) => state.home.userCode,
    }),
  },
  mounted() {
    if(getRefToken()){
      //获取用户头像等信息
      this.$store.dispatch('getUserInfo');
      //获取用户购物车信息
      // this.$store.dispatch('getUserShopCartNum');
    }else{
      this.$message({
        type:'success',
        showClose: true,
        message:'登陆后即可享受更多权益😊'
      })
    }

  },
  methods: {
    //前往客服
    goChat(){
      this.$router.push({name:'chat',query:{sendId:3}})
    },
    //前往商城主页
    goLogin() {
      if(getRefToken()){
        console.log('用户已登录')
      }else{
        this.$router.push('/login');
      }

    },
    changeUserShow() {
      this.isUserShow = !this.isUserShow;
    },
    //退出登录
    async logout() {
      try {
        await this.$store.dispatch('userLogout');
        if (this.userCode == 200) {
          this.$message({
            type: 'success',
            message: '退出登录成功~',
          });
        } else {
          Message({
            type: 'error',
            message: '退出登录失败',
          });
        }
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
