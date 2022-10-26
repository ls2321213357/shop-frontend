<template>
  <div class="xtx_footer">
    <div class="wrapper">
      <!-- 联系我们 -->
      <div class="contact clearfix">
        <dl>
          <dt>客户服务</dt>
          <dd class="chat">在线客服</dd>
          <dd class="feedback">问题反馈</dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd class="weixin">公众号</dd>
          <dd class="weibo">微博</dd>
        </dl>
        <dl>
          <dt>下载APP</dt>
          <dd class="qrcode"></dd>
          <dd class="download">
            <span>扫描二维码</span>
            <span>立马下载APP</span>
            <a href="javascript:;">下载页面</a>
          </dd>
        </dl>
        <dl>
          <dt>服务热线</dt>
          <dd class="hotline">
            15530835782
            <small>周一至周日 8:00-18:00</small>
          </dd>
        </dl>
      </div>
    </div>
    <!-- 其它 -->
    <div class="extra">
      <div class="wrapper">
        <!-- 口号 -->
        <div class="slogan">
          <div class="price">价格亲民</div>
          <div class="express">物流快捷</div>
          <div class="quality">品质新鲜</div>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">
          <p>
            <a href="javascript:;">关于我们</a>
            <a href="javascript:;">帮助中心</a>
            <a href="javascript:;">售后服务</a>
            <a href="javascript:;">配送与验收</a>
            <a href="javascript:;">商务合作</a>
            <a href="javascript:;">搜索推荐</a>
            <a href="javascript:;">友情链接</a>
          </p>
          <p>Optimizing mall &copy; 优选商城</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Footer',
};
</script>

<style lang="less" scoped>
.xtx_footer {
  border-top: 1px solid #e4e4e4;
  .contact {
    padding: 15px 0 0px 0px;
    dl {
      height: 190px;
      text-align: center;
      padding: 0 72px;
      border-right: 1px solid #f2f2f2;
      color: #999;
      float: left;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        border-right: none;
        padding-right: 0;
      }
    }
    dt {
      line-height: 1;
      font-size: 18px;
    }
    dd {
      margin: 36px 12px 0 0;
      float: left;
      &:last-child {
        margin-right: 0;
      }
    }
    .chat {
      &:before {
        background-position: -245px -70px;
      }
      &:hover {
        &:before {
          background-position: -200px -70px;
        }
      }
    }
    .feedback {
      &:before {
        background-position: -345px -70px;
      }
      &:hover {
        &:before {
          background-position: -295px -70px;
        }
      }
    }
    .weixin {
      &:before {
        background-position: -247px -15px;
      }
      &:hover {
        &:before {
          background-position: -202px -15px;
        }
      }
    }
    .weibo {
      &:before {
        background-position: -347px -15px;
      }
      &:hover {
        &:before {
          background-position: -297px -15px;
        }
      }
    }
    .qrcode {
      width: 92px;
      height: 92px;
      padding: 7px;
      border: 1px solid #ededed;
      background: url(./images/1.png);
      background-size: cover;
      background-position: 0px -45px;
    }
    .download {
      padding-top: 5px;
      font-size: 14px;
      span {
        display: block;
      }
      a {
        display: block;
        line-height: 1;
        padding: 10px 25px;
        margin-top: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: #5eb69c;
      }
    }
    .hotline {
      padding-top: 20px;
      font-size: 22px;
      color: #666;
      small {
        display: block;
        font-size: 15px;
        color: #999;
      }
    }
  }
  .extra {
    background-color: #333;
  }
  .slogan {
    height: 125px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #434343;
    display: flex;
    justify-content: space-evenly;
    text-align: justify;
    div {
      width: 500px;
      height: 58px;
      margin-left: 70px;
      line-height: 58px;
      color: #fff;
      font-size: 28px;
      &:before {
        content: '';
        display: inline-block;
        width: 58px;
        height: 58px;
        margin-right: 10px;
        float: left;
        background-image: url(./images/sprites.png);
        background-size: 400px 400px;
      }
    }
    .price {
      &:before {
        background-position: 0 0;
      }
    }
    .express {
      &:before {
        background-position: -65px 0;
      }
    }
    .quality {
      &:before {
        background-position: -130px 0;
      }
    }
  }
  .copyright {
    height: 100px;
    padding-top: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;
    p {
      line-height: 1;
      margin-bottom: 20px;
    }
    a {
      color: #999;
      line-height: 1;
      padding: 0 10px 0 6px;
      border-right: 1px solid #999;
      &:last-child {
        border-right: none;
      }
    }
  }
}
.xtx_footer .contact .chat,
.xtx_footer .contact .feedback,
.xtx_footer .contact .weixin,
.xtx_footer .contact .weibo {
  width: 92px;
  height: 92px;
  padding-top: 20px;
  border: 1px solid #ededed;
}
.xtx_footer .contact .chat:before,
.xtx_footer .contact .feedback:before,
.xtx_footer .contact .weixin:before,
.xtx_footer .contact .weibo:before {
  content: '';
  display: block;
  width: 40px;
  height: 30px;
  margin: 0 auto 8px;
  background-image: url(./images/sprites.png);
  background-size: 400px 400px;
}
</style>
