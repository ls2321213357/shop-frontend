<template>
  <el-empty description="404 not defind">页面{{ n }}后自动跳转到主页</el-empty>
</template>

<script>
export default {
  name: 'MissPage',
  data() {
    return {
      n: 3,
    };
  },
  mounted() {
    setInterval(() => {
      this.n--;
    }, 1000);
    setTimeout(() => {
      this.$router.push('/');
    }, 3000);
  },
};
</script>

<style></style>
