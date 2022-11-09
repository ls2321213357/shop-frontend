<template>
  <div id="app">
    <Header v-if="$route.meta.isShowHeader"></Header>
    <keep-alive include="detail">
      <router-view></router-view>
    </keep-alive>
    <Footer v-if="$route.meta.isShowFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue';
import Footer from './components/Footer/index.vue';
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  watch: {
    $route() {
      this.$store.dispatch('getUserShopCartNum');
    },
  },
};
</script>

<style lang="less">
#app {
  cursor: pointer;
}
.el-scrollbar__wrap {
  height: 200px;
}
.dialog {
  height: 350px;
  position: relative;
  .el-dialog__footer {
    position: absolute;
    bottom: 0px;
    left: 190px;
  }
  .detailInfo {
    .el-input {
      width: 300px;
      position: absolute;
      bottom: 80px;
      left: 30px;
    }
  }
  .el-cascader {
    position: absolute;
    top: 175px;
    left: 30px;
    width: 300px;
  }
}
</style>
