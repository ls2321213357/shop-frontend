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
};
</script>

<style></style>
