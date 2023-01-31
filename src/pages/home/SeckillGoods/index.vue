<template>
  <div class="xtx_goods_seckill xtx_panel">
    <div class="wrapper clearfix">
      <!-- 面板头部 -->
      <div class="xtx_panel_header">
        <h3>
          秒杀专区
          <small>每日精品 限量秒杀</small>
        </h3>
      </div>
      <!-- 倒计时 -->
      <div class="countdown">
        <p class="next">下一场 20:00开始</p>
        <p class="title">超级秒杀</p>
        <p class="tips">
          18:00
          <small>点场 倒计时</small>
        </p>
        <p class="clock">
          <span>{{ seckillsHours }}</span>
          <i>:</i>
          <span>{{ seckillsMinutes }}</span>
          <i>:</i>
          <span>{{ seckillsSeconds }}</span>
        </p>
      </div>
      <!-- 商品列表 -->
      <ul class="xtx_goods">
        <li
          v-for="(skill, index) in seckillData"
          :key="index"
          @click="goGoodsDetail(skill.id)"
        >
          <a href="javascript:;">
            <div class="img-box">
              <img :src="skill.defaultPicUrl" />
            </div>
            <p class="name">{{ skill.name }}</p>
            <p class="percent">
              <span class="inner" style="width: 30%"></span>
            </p>
            <p class="price">
              <span>
                <small>￥</small>
                {{ skill.defaultPrice }}
              </span>
            </p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'SeckillGoods',
  data() {
    return {
      timer: null,
    };
  },
  props: ['seckillData'],
  mounted() {
    this.$store.dispatch('getSkillTime');
    this.timer = setInterval(() => {
      this.$store.commit('REDUCESECKILLSTIME');
    }, 1000);
    // this.$store.dispatch('getSeckillList');
  },
  methods: {
    goGoodsDetail(skuid) {
      this.$router.push({
        name: 'skilldetail',
        params: {
          skuid,
        },
      });
    },
    goSearch() {
      this.$router.push({
        name: 'search',
        query: {
          productCategoryId: 14,
        },
      });
    },
  },
  computed: {
    // ...mapState({
    //   skillist: (state) => state.skill.skillist,
    // }),
    // skillList() {
    //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //   return this.skillist.splice(1, 4);
    // },
    ...mapGetters(['seckillsHours', 'seckillsMinutes', 'seckillsSeconds']),
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
.xtx_goods_seckill {
  background-color: #f5f5f5;
  padding: 7px 0 55px;
  .countdown {
    width: 240px;
    height: 305px;
    text-align: center;
    line-height: 1;
    color: #fff;
    background-image: url(./images/seckill.jpg);
    background-size: 240px;
    float: left;
    .next {
      font-size: 16px;
      margin: 25px 0 14px;
    }
    .title {
      font-size: 33px;
    }
    .tips {
      margin-top: 112px;
      font-size: 23px;
    }
    small {
      font-size: 17px;
    }
    .clock {
      width: 142px;
      margin: 18px auto 0;
      overflow: hidden;
      span {
        width: 34px;
        height: 34px;
        border-radius: 2px;
        background-color: #303430;
      }
      i {
        width: 20px;
        font-style: normal;
      }
    }
  }
  .xtx_goods {
    margin-left: 240px;
    a {
      display: block;
    }
    li {
      width: 240px;
      height: 305px;
      padding-top: 20px;
      margin-left: 10px;
      text-align: center;
      background-color: #fff;
      float: left;
    }
    .img-box {
      width: 240px;
      height: 174px;
      padding: 0 33px;
      text-align: center;
      margin: 0 auto;
      display: table-cell;
      vertical-align: middle;
    }
    .name {
      width: 220px;
      height: 70px;
      line-height: 22px;
      font-size: 18px;
    }
    .percent {
      width: 165px;
      height: 6px;
      margin: 0 auto 0px;
      border-radius: 6px;
      background-color: #e2e2e2;
    }
    .inner {
      display: block;
      height: 100%;
      border-radius: 6px;
      background-color: #d54847;
    }
    .price {
      text-align: center;
      font-size: 20px;
      span {
        &:first-child {
          color: #9a2e1f;
        }
        &:last-child {
          color: #999;
          font-size: 16px;
        }
      }
    }
  }
}
.xtx_goods_seckill .countdown .clock span,
.xtx_goods_seckill .countdown .clock i {
  display: block;
  text-align: center;
  line-height: 34px;
  font-size: 23px;
  float: left;
}
</style>
