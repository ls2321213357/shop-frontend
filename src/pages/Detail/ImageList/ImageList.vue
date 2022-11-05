<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(imgUrl, index) in skuPicList"
        :key="index"
        @click="getIndex(index)"
      >
        <img :src="imgUrl.picUrl" :class="{ active: index === currentIndex }" />
      </div>
    </div>
    <div class="swiper-button-next">></div>
    <div class="swiper-button-prev"><</div>
  </div>
</template>

<script>
import Swiper from 'swiper';
export default {
  name: 'ImageList',
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: ['skuPicList'],
  methods: {
    getIndex(index) {
      this.currentIndex = index;
      this.$bus.$emit('getIndex', index);
    },
  },
  watch: {
    skuPicList: {
      immediate: true, //立即监视
      handler() {
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          const mySwiper = new Swiper(this.$refs.cur, {
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            //显示几个图片设置
            slidesPerView: 3,
            //一下子切换几个图片
            slidesPerGroup: 3,
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 400px;
  box-sizing: border-box;
  padding: 0 12px;
  .swiper-slide {
    height: 56px;
    margin-left: 20px;
    img {
      width: 100%;
      height: 100%;
      width: 50px;
      height: 50px;
      display: block;
      object-fit: cover;
      &:hover {
        border: 1px solid #f60;
      }
    }
    .active {
      border: 2px solid #f60;
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    line-height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
