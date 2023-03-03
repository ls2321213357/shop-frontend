<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="img in list" :key="img.id">
        <img :src="img.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器，就是用这个 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Carousel',
  props: ['list'],
  watch: {
    //采用对象写法,必须有handler
    list: {
      immediate: true,
      handler() {
        //当执行这个回调的时候,保证服务器数据已经回来了,v-for已经执行完毕,轮播图的dom节点已经完毕
        //轮播图采用watch+nextTick方式实现,让watch监听bannerList属性变化,handler代表组件实例身上这个属性已经有了相应的元素
        //nextTick:在下次DOM更新 循环结束之后 执行延迟回调 在修改数据之后 立即使用这个方法 获取更新后的DOM
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          const mySwiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            autoplay: {
              disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay
              delay: 3000, // 自动切换的时间间隔（单位ms）
            },
            notNextTick: true,
            direction: 'horizontal',
            initialSlide: 1, // 这里是重点。。
            onSlideChangeEnd: (swiper) => {
              console.log(swiper.realIndex);
            },
            onTap: (swiper) => {
              console.log(swiper.realIndex);
            },
            //如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });
        });
      },
    },
  },
};
</script>
<style lang="less" scoped>
.swiper-container {
  .swiper-wrapper {
    .swiper-slide {
      margin: 0px;
      padding: 0px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
