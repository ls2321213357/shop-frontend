<template>
  <div>
    <HomeHeader></HomeHeader>
    <!-- 标签和轮播图 -->
    <Main></Main>
    <!-- 新鲜好物 -->
    <NewGoods :detailData="detailData"></NewGoods>
    <!-- 人气推荐 -->
    <PopularGoods></PopularGoods>
    <!-- 秒杀专区 -->
    <SeckillGoods></SeckillGoods>
    <!-- 分类商品 -->
    <CategoryGoods></CategoryGoods>
    <!-- 最新主题 -->
    <TopicGoods></TopicGoods>
    <!-- 大家都在说 -->
    <DiscussGoods></DiscussGoods>
  </div>
</template>

<script>
import CategoryGoods from './CategoryGoods';
import Main from './Main';
import NewGoods from './NewGoods';
import PopularGoods from './PopularGoods';
import SeckillGoods from './SeckillGoods';
import TopicGoods from './TopicGoods';
import DiscussGoods from './DiscussGoods';
import HomeHeader from './HomeHeader';
import { mapGetters } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    CategoryGoods,
    Main,
    NewGoods,
    PopularGoods,
    SeckillGoods,
    TopicGoods,
    DiscussGoods,
    HomeHeader,
  },
  mounted() {
    this.$store.dispatch('getDetailInfo', {
      sort: '1',
      pageNo: '1',
      pageSize: '4',
    });
  },
  computed: {
    ...mapGetters(['detailData']),
  },
};
</script>
