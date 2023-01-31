<template>
  <div class="msg">
    <h1>恭喜你支付成功! {{ num }}s内自动返回商城</h1>
  </div>
</template>
<script>
import { Message } from 'element-ui';
import { removeRToken, removeAToken } from '@/util/token';
export default {
  name: 'paySuccess',
  data() {
    return {
      num: 5,
    };
  },
  created() {
    removeRToken();
    removeAToken();
  },
  mounted() {
    this.getPayInfo();
  },
  methods: {
    async getPayInfo() {
      try {
        await this.$store.dispatch('getPaySuccess');
        setInterval(() => {
          this.num--;
        }, 1000);
        if (this.num <= 0) {
          this.$router.push('/');
        }
      } catch (error) {
        Message({ type: 'warning', message: '服务器繁忙，自动回到主页🫥' });
        this.$router.push('/');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.msg {
  position: relative;
  h1 {
    margin-top: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
