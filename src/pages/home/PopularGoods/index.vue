<template>
  <div class="xtx_goods_popular xtx_panel">
    <div class="wrapper">
      <!-- 面板头部 -->
      <div class="xtx_panel_header">
        <h3>
          人气推荐
          <small>人气爆款 不容错过</small>
        </h3>
      </div>
      <!-- 商品列表 -->
      <div class="xtx_panel_goods_1">
        <a href="javascript:;">
          <img src="./images/popular_1.jpg" />
          <span class="title">特惠推荐</span>
          <span class="alt">我猜得到 你的需要</span>
        </a>
        <a href="javascript:;">
          <img src="./images/popular_2.jpg" />
          <span class="title">爆款推荐</span>
          <span class="alt">人气好物推荐</span>
        </a>
        <a href="javascript:;">
          <img src="./images/popular_3.jpg" />
          <span class="title">场景使用一站买全</span>
          <span class="alt">编辑精心整理推荐</span>
        </a>
        <a href="javascript:;">
          <img src="./images/popular_4.jpg" />
          <span class="title">领券中心</span>
          <span class="alt">发现更多超值优惠券</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopularGoods',
};
</script>

<style lang="less" scoped>
.xtx_goods_popular {
  padding-bottom: 42px;
  .xtx_panel_goods_1 {
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
    .title {
      display: inline-block;
      width: 100%;
      line-height: 1;
      margin: 20px 0 16px;
      font-size: 22px;
    }
    .alt {
      font-size: 18px;
      color: #999;
    }
  }
}
</style>
