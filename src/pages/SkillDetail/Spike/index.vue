<template>
  <div class="spike">
    <el-button :type="btnType" @click="handleClick" :disabled="disabled">
      {{ btnText }}
    </el-button>
    <span>{{ tip }}</span>
  </div>
</template>
<script>
import moment from 'moment';
import { Message } from 'element-ui';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Spike',
  props: {
    startTime: {
      required: true,
      validator: (val) => {
        return moment.isMoment(val);
      },
    },
    endTime: {
      required: true,
      validator: (val) => {
        return moment.isMoment(val);
      },
    },
  },
  data() {
    return {
      start: false,
      end: false,
      done: false,
      tip: '',
      timeGap: 0,
      btnText: '',
      btnType: 'danger',
    };
  },
  computed: {
    disabled() {
      //当三个异号的时候disable返回真，不可点击，
      // 初始化通过this.updateState确定disable的状态
      return !(this.start && !this.end && !this.done);
    },
  },
  async created() {
    const serverTime = await this.getServerTime();
    this.timeGap = Date.now() - serverTime; //当前时间和服务器时间差
    this.updateState();
    this.timeInterval = setInterval(() => {
      this.updateState();
    }, 1000);
  },
  updated() {
    if (this.end || this.done) {
      clearInterval(this.timeInterval);
    }
  },
  methods: {
    handleClick() {
      Message({
        type: 'success',
        message: '恭喜您成功的抢到了该商品',
      });
      this.done = true;
      this.btnText = '已参加过活动';
    },
    getServerTime() {
      //模拟服务器时间
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          //当前时间慢10秒就是服务器时间
          resolve(new Date(Date.now() - 10 * 1000).getTime()); //跟本地时间差
        }, 0);
      });
    },
    updateState() {
      const now = moment(new Date(Date.now() - this.timeGap)); //当前服务器时间
      const diffStart = this.startTime.diff(now); //开始时间和服务器时间之差
      const diffEnd = this.endTime.diff(now); //结束时间和服务器时间之差
      if (diffStart < 0) {
        this.btnType = 'danger';
        this.start = true;
        this.tip = '秒杀已开始';
        this.btnText = '开始秒杀！';
      } else {
        this.tip = `距离秒杀开始还剩${Math.ceil(diffStart / 1000)}秒`;
        this.btnText = '活动未开始';
      }
      if (diffEnd <= 0) {
        this.end = true;
        if (!this.btnText === '已参加过活动' || this.btnText === '开始秒杀！') {
          this.btnType = 'info';
          this.tip = '秒杀已结束';
          this.btnText = '活动已结束';
        }
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
};
</script>
<style scoped>
button[disabled] {
  cursor: not-allowed;
}
.spike span {
  font-size: 20px;
  color: red;
  font-weight: 700;
  margin-left: 100px;
}
</style>
