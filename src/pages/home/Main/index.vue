<template>
  <div class="xtx_entry">
    <div class="wrapper">
      <TypeNav></TypeNav>
      <Carousel :list="bannerList"></Carousel>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel/index.vue';
import TypeNav from '@/components/TypeNav/index.vue';
import { mapState } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Main',
  components: { Carousel, TypeNav },
  mounted() {
    this.$store.dispatch('getBannerList');
  },
  computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList,
    }),
  },
};
</script>

<style lang="less" scoped>
.xtx_entry {
  height: 520px;
  position: relative;
}

.xtx_category_super {
  li {
    height: 42px;
    padding: 0 20px 0 40px;
    transition: background-color 0.25s;
    cursor: pointer;
  }
  a {
    color: #fff;
    font-size: 16px;
    line-height: 50px;
  }
  i {
    display: block;
    width: 12px;
    height: 12px;
    margin-top: 20px;
    background-position: -75px -110px;
    float: right;
  }
}
.xtx_category_super li:hover,
.xtx_category_super li.active {
  background-color: #5eb69c;
}
.xtx_category_subset {
  width: 990px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: none;
  position: absolute;
  top: 0;
  left: 250px;
}
.xtx_banner {
  width: 1240px;
  height: 500px;
  overflow: hidden;
  position: relative;
  &:hover {
    a {
      opacity: 1;
    }
  }
  & > a {
    display: block;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin-top: -22px;
    opacity: 0;
    transition: opacity 0.5s;
    background-color: rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 50%;
    &.prev {
      left: 270px;
      background-position: 14px -59px;
    }
    &.next {
      right: 20px;
      background-position: -24px -59px;
    }
  }
  .indicator {
    width: 990px;
    text-align: center;
    font-size: 0;
    position: absolute;
    left: 250px;
    bottom: 22px;
    span {
      display: inline-block;
      width: 9px;
      height: 9px;
      margin: 0 8px;
      cursor: pointer;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.43);
      &.active {
        background-color: #fff;
      }
    }
  }
}
</style>
