<template>
  <div class="xtx_goods_new xtx_panel">
    <div class="wrapper">
      <!-- 面板头部 -->
      <div class="xtx_panel_header">
        <h3>
          新鲜好物
          <small>新鲜出炉 品质靠谱</small>
        </h3>
        <a href="javascript:;" class="more">
          查看全部
          <i class="sprites"></i>
        </a>
      </div>
      <!-- 商品列表 -->
      <div class="xtx_panel_goods_1">
        <a
          v-for="(goods, index) in detailData"
          :key="index"
          @click="goGoodsDetail(goods.id)"
        >
          <img v-lazy="goods.defaultPicUrl" />
          <span class="name">{{ goods.name }}</span>
          <span class="price">
            <small>￥</small>
            {{ goods.defaultPrice }}
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewGoods',
  props: ['detailData'],
  methods: {
    goGoodsDetail(skuid) {
      this.$router.push({
        name: 'detail',
        params: {
          skuid,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.xtx_goods_new {
  .xtx_panel_goods_1 {
    position: relative;
    a {
      margin-right: 10px;
      background-color: #f0f9f4;
      transition: 0.5s;
      position: relative;
      font-weight: 700;
      top: 0;
      &:hover {
        box-shadow: 0 3px 8px rgba(66, 53, 53, 0.2);
        top: -3px;
      }
    }
    .name {
      display: inline-block;
      width: 90%;
      margin: 12px 15px 10px;
      font-size: 16px;
    }
    .price {
      position: absolute;
      left: 105px;
      bottom: 6px;
      font-size: 20px;
      color: #9a2e1f;
      font-weight: 700;
    }
    small {
      font-size: 16px;
    }
  }
}
</style>
