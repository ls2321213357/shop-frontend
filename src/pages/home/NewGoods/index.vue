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
        <a href="javascript:;">
          <img src="./images/new_goods_1.jpg" alt="" />
          <span class="name">睿米无线吸尘器F8</span>
          <span class="price">
            <small>￥</small>
            899
          </span>
        </a>
        <a href="javascript:;">
          <img src="./images/new_goods_2.jpg" alt="" />
          <span class="name">智能环绕3D空调</span>
          <span class="price">
            <small>￥</small>
            1299
          </span>
        </a>
        <a href="javascript:;">
          <img src="./images/new_goods_3.jpg" alt="" />
          <span class="name">广东软软糯米煲仔饭</span>
          <span class="price">
            <small>￥</small>
            129
          </span>
        </a>
        <a href="javascript:;">
          <img src="./images/new_goods_4.jpg" alt="" />
          <span class="name">罗西机械智能手表</span>
          <span class="price">
            <small>￥</small>
            3399
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewGoods',
};
</script>

<style>
.xtx_goods_new .xtx_panel_goods_1 a {
  background-color: #f0f9f4;
  transition: 0.5s;
  position: relative;
  top: 0;
}

.xtx_goods_new .xtx_panel_goods_1 a:hover {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  top: -3px;
}

.xtx_goods_new .xtx_panel_goods_1 .name {
  display: inline-block;
  width: 100%;
  margin: 12px 0 10px;
  font-size: 22px;
}

.xtx_goods_new .xtx_panel_goods_1 .price {
  font-size: 23px;
  color: #9a2e1f;
}

.xtx_goods_new .xtx_panel_goods_1 small {
  font-size: 16px;
}
</style>
