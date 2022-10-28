<template>
  <div class="spec-preview" v-if="skuPicList">
    <img :src="imgObj.picUrl" />
    <div class="event" @mousemove="getMask"></div>
    <div class="big">
      <img :src="imgObj.picUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Zoom',
  data() {
    return {
      currenIndex: '0',
    };
  },
  props: ['skuPicList'],
  computed: {
    imgObj() {
      return this.skuPicList[this.currenIndex] || {};
    },
  },
  methods: {
    getMask(event) {
      let mask = this.$refs.mask;
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      //约束范围
      if (left < 0) left = 0;
      if (left > mask.offsetWidth) left = mask.offsetWidth;
      if (top < 0) top = 0;
      if (top > mask.offsetHeight) top = mask.offsetHeight;
      mask.style.left = left + 'px';
      mask.style.top = top + 'px';
      //大图部分
      let bigImg = this.$refs.bigImg;
      bigImg.style.left = -left * 2 + 'px';
      bigImg.style.top = -top * 2 + 'px';
    },
  },
  mounted() {
    //获取兄弟组件数据
    this.$bus.$on('getIndex', (index) => {
      this.currenIndex = index;
    });
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      max-height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
