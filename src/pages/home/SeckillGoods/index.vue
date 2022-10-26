<template>
  <div class="xtx_goods_seckill xtx_panel">
    <div class="wrapper clearfix">
      <!-- 面板头部 -->
      <div class="xtx_panel_header">
        <h3>
          秒杀专区
          <small>每日精品 限量秒杀</small>
        </h3>
        <a href="javascript:;" class="more">
          查看全部
          <i class="sprites"></i>
        </a>
      </div>
      <!-- 倒计时 -->
      <div class="countdown">
        <p class="next">下一场 8:00开始</p>
        <p class="title">超级秒杀</p>
        <p class="tips">
          18:00
          <small>点场 倒计时</small>
        </p>
        <p class="clock">
          <span>00</span>
          <i>:</i>
          <span>25</span>
          <i>:</i>
          <span>20</span>
        </p>
      </div>
      <!-- 商品列表 -->
      <ul class="xtx_goods">
        <li>
          <a href="javascript:;">
            <div class="img-box">
              <img src="./images/seckill_goods_1.jpg" />
            </div>
            <p class="name">华为 降噪 真无线耳机</p>
            <p class="percent">
              <span class="inner" style="width: 30%"></span>
            </p>
            <p class="price">
              <span>
                <small>￥</small>
                99
              </span>
              <span>
                <small>￥</small>
                199
              </span>
            </p>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <div class="img-box">
              <img src="./images/seckill_goods_2.jpg" />
            </div>
            <p class="name">双星男鞋 直筒工装裤</p>
            <p class="percent">
              <span class="inner" style="width: 36%"></span>
            </p>
            <p class="price">
              <span>
                <small>￥</small>
                99
              </span>
              <span>
                <small>￥</small>
                199
              </span>
            </p>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <div class="img-box">
              <img src="./images/seckill_goods_3.jpg" />
            </div>
            <p class="name">妮维雅女士 止汗露走珠</p>
            <p class="percent">
              <span class="inner" style="width: 28%"></span>
            </p>
            <p class="price">
              <span>
                <small>￥</small>
                99
              </span>
              <span>
                <small>￥</small>
                199
              </span>
            </p>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <div class="img-box">
              <img src="./images/seckill_goods_4.jpg" />
            </div>
            <p class="name">肖勒超薄防水手表</p>
            <p class="percent">
              <span class="inner" style="width: 40%"></span>
            </p>
            <p class="price">
              <span>
                <small>￥</small>
                99
              </span>
              <span>
                <small>￥</small>
                199
              </span>
            </p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SeckillGoods',
};
</script>

<style>
.xtx_goods_seckill {
  background-color: #f5f5f5;
  padding: 7px 0 55px;
}

.xtx_goods_seckill .countdown {
  width: 240px;
  height: 305px;
  text-align: center;
  line-height: 1;
  color: #fff;
  background-image: url(./images/seckill.jpg);
  background-size: 240px;
  float: left;
}

.xtx_goods_seckill .countdown .next {
  font-size: 16px;
  margin: 25px 0 14px;
}

.xtx_goods_seckill .countdown .title {
  font-size: 33px;
}

.xtx_goods_seckill .countdown .tips {
  margin-top: 112px;
  font-size: 23px;
}

.xtx_goods_seckill .countdown small {
  font-size: 17px;
}

.xtx_goods_seckill .countdown .clock {
  width: 142px;
  margin: 18px auto 0;
  overflow: hidden;
}

.xtx_goods_seckill .countdown .clock span,
.xtx_goods_seckill .countdown .clock i {
  display: block;
  text-align: center;
  line-height: 34px;
  font-size: 23px;
  float: left;
}

.xtx_goods_seckill .countdown .clock span {
  width: 34px;
  height: 34px;
  border-radius: 2px;
  background-color: #303430;
}

.xtx_goods_seckill .countdown .clock i {
  width: 20px;
  font-style: normal;
}

.xtx_goods_seckill .xtx_goods {
  margin-left: 240px;
}

.xtx_goods_seckill .xtx_goods a {
  display: block;
}

.xtx_goods_seckill .xtx_goods li {
  width: 240px;
  height: 305px;
  padding-top: 20px;
  margin-left: 10px;
  text-align: center;
  background-color: #fff;
  float: left;
}

.xtx_goods_seckill .xtx_goods .img-box {
  width: 240px;
  height: 174px;
  padding: 0 33px;
  text-align: center;
  margin: 0 auto;
  display: table-cell;
  vertical-align: middle;
}

.xtx_goods_seckill .xtx_goods .name {
  line-height: 1;
  margin: 20px 0 12px;
  font-size: 18px;
}

.xtx_goods_seckill .xtx_goods .percent {
  width: 165px;
  height: 6px;
  margin: 0 auto 12px;
  border-radius: 6px;
  background-color: #e2e2e2;
}

.xtx_goods_seckill .xtx_goods .inner {
  display: block;
  height: 100%;
  border-radius: 6px;
  background-color: #d54847;
}

.xtx_goods_seckill .xtx_goods .price {
  text-align: center;
  font-size: 20px;
}

.xtx_goods_seckill .xtx_goods .price span:first-child {
  color: #9a2e1f;
}

.xtx_goods_seckill .xtx_goods .price span:last-child {
  color: #999;
  font-size: 16px;
}
</style>
