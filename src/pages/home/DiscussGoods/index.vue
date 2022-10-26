<template>
  <div class="xtx_goods_discuss xtx_panel">
    <div class="wrapper">
      <div class="xtx_panel_header">
        <h3>大家都在说</h3>
        <a href="javascript:;" class="more">
          查看全部
          <i class="sprites"></i>
        </a>
      </div>
      <div class="xtx_discuss">
        <ul class="clearfix">
          <li>
            <a href="javascript:;">
              <img src="./images/discuss_goods_1.jpg" />
            </a>
            <div class="meta">
              <div class="title">
                日本制造 红木柜茶几
                <small>小花 2020-05-09 13:33</small>
              </div>
              <span class="price">
                <small>￥</small>
                1199起
              </span>
            </div>
            <p class="message">
              从小我就看我奶奶把用完的超市塑料袋整整齐齐叠放好，等以后需要再拿出来用。现在奶奶已经不在了，塑料袋也要收费了。
              奶奶不紧不慢，把袋子认真折好的场景，一直在脑海里挥之不去。
            </p>
          </li>
          <li>
            <a href="javascript:;">
              <img src="./images/discuss_goods_2.jpg" />
            </a>
            <div class="meta">
              <div class="title">
                日本制造 红木柜茶几
                <small>小花 2020-05-09 13:33</small>
              </div>
              <span class="price">
                <small>￥</small>
                1199起
              </span>
            </div>
            <p class="message">
              从小我就看我奶奶把用完的超市塑料袋整整齐齐叠放好，等以后需要再拿出来用。现在奶奶已经不在了，塑料袋也要收费了。
              奶奶不紧不慢，把袋子认真折好的场景，一直在脑海里挥之不去。
            </p>
          </li>
          <li>
            <a href="javascript:;">
              <img src="./images/discuss_goods_3.jpg" />
            </a>
            <div class="meta">
              <div class="title">
                日本制造 红木柜茶几
                <small>小花 2020-05-09 13:33</small>
              </div>
              <span class="price">
                <small>￥</small>
                1199起
              </span>
            </div>
            <p class="message">
              从小我就看我奶奶把用完的超市塑料袋整整齐齐叠放好，等以后需要再拿出来用。现在奶奶已经不在了，塑料袋也要收费了。
              奶奶不紧不慢，把袋子认真折好的场景，一直在脑海里挥之不去。
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiscussGoods',
};
</script>

<style>
.xtx_goods_discuss {
  margin-bottom: 80px;
}

.xtx_goods_discuss li {
  width: 406px;
  margin-left: 11px;
  padding-bottom: 24px;
  transition: 0.5s;
  float: left;
}

.xtx_goods_discuss li:hover {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  transform: translate(0, -3px);
}

.xtx_goods_discuss li:first-child {
  margin-left: 0;
}

.xtx_goods_discuss .meta {
  height: 90px;
  padding: 20px 0 0;
  margin: 0 16px;
  font-size: 22px;
  position: relative;
  border-bottom: 1px solid #eee;
}

.xtx_goods_discuss .meta .title small {
  display: block;
  font-size: 16px;
  color: #999;
}

.xtx_goods_discuss .meta .price {
  font-size: 18px;
  color: #9a2e1f;
  position: absolute;
  top: 30px;
  right: 0;
}

.xtx_goods_discuss .meta .price small {
  font-size: 13px;
}

.xtx_goods_discuss .message {
  height: 90px;
  padding: 0 16px;
  margin-top: 10px;
  font-size: 17px;
  color: #666;
}
</style>
