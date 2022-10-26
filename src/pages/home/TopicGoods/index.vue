<template>
  <div class="xtx_goods_topic xtx_panel">
    <div class="wrapper">
      <div class="xtx_panel_header">
        <h3>最新专题</h3>
        <a href="javascript:;" class="more">
          查看全部
          <i class="sprites"></i>
        </a>
      </div>
      <div class="xtx_topic">
        <ul class="clearfix">
          <li>
            <a href="javascript:;">
              <img src="./images/topic_goods_1.jpg" alt="" />
              <div class="meta">
                <p class="title">
                  吃这些美食才不算辜负自己
                  <small>餐厨起居洗护好物</small>
                </p>
                <span class="price">
                  <small>￥</small>
                  29.9起
                </span>
              </div>
            </a>
            <div class="social">
              <span class="like">
                <i class="sprites"></i>
                1220
              </span>
              <span class="view">
                <i class="sprites"></i>
                1800
              </span>

              <span class="reply">
                <i class="sprites"></i>
                1220
              </span>
            </div>
          </li>
          <li>
            <a href="javascript:;">
              <img src="./images/topic_goods_2.jpg" alt="" />
              <div class="meta">
                <p class="title">
                  吃这些美食才不算辜负自己
                  <small>餐厨起居洗护好物</small>
                </p>
                <span class="price">
                  <small>￥</small>
                  29.9起
                </span>
              </div>
            </a>
            <div class="social">
              <span class="liked">
                <i class="sprites"></i>
                1220
              </span>
              <span class="view">
                <i class="sprites"></i>
                1800
              </span>

              <span class="reply">
                <i class="sprites"></i>
                1220
              </span>
            </div>
          </li>
          <li>
            <a href="javascript:;">
              <img src="./images/topic_goods_3.jpg" alt="" />
              <div class="meta">
                <p class="title">
                  吃这些美食才不算辜负自己
                  <small>餐厨起居洗护好物</small>
                </p>
                <span class="price">
                  <small>￥</small>
                  29.9起
                </span>
              </div>
            </a>
            <div class="social">
              <span class="like">
                <i class="sprites"></i>
                1220
              </span>
              <span class="view">
                <i class="sprites"></i>
                1800
              </span>

              <span class="reply">
                <i class="sprites"></i>
                1220
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopicGoods',
};
</script>

<style>
.xtx_goods_topic li {
  width: 406px;
  margin-left: 11px;
  transition: 0.5s;
  float: left;
}

.xtx_goods_topic li:hover {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  transform: translate(0, -3px);
}

.xtx_goods_topic li:first-child {
  margin-left: 0;
}

.xtx_goods_topic li a {
  display: block;
  height: 287px;
  position: relative;
}

.xtx_goods_topic .meta {
  width: 100%;
  height: 100%;
  color: #fff;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8),
    transparent 50%
  );
  position: absolute;
  bottom: 0;
}
ul li {
  list-style: none;
}
.xtx_goods_topic .meta .title {
  height: 70px;
  padding-left: 16px;
  font-size: 22px;
  position: absolute;
  bottom: 0px;
}

.xtx_goods_topic .meta .title small {
  display: block;
  font-size: 19px;
  color: #999;
}

.xtx_goods_topic .meta .price {
  position: absolute;
  bottom: 25px;
  right: 16px;
  display: block;
  line-height: 1;
  padding: 4px 8px 4px 7px;
  color: #9a2e1f;
  font-size: 17px;
  background-color: #fff;
  border-radius: 2px;
}

.xtx_goods_topic .meta .price small {
  font-size: 15px;
}

.xtx_goods_topic .social {
  height: 70px;
  line-height: 70px;
  padding: 0 20px;
  font-size: 16px;
}

.xtx_goods_topic .social i {
  display: inline-block;
  width: 15px;
  height: 14px;
  margin-right: 5px;
  position: relative;
  top: 2px;
}

.xtx_goods_topic .social .like,
.xtx_goods_topic .social .liked,
.xtx_goods_topic .social .view {
  float: left;
  margin-right: 25px;
}

.xtx_goods_topic .social .reply {
  float: right;
}

.xtx_goods_topic .social .like i {
  background-position: -120px -110px;
}

.xtx_goods_topic .social .liked i {
  background-position: -240px -110px;
}

.xtx_goods_topic .social .view i {
  background-position: -160px -110px;
}

.xtx_goods_topic .social .reply i {
  width: 17px;
  height: 16px;
  top: 4px;
  background-position: -200px -110px;
}
</style>
