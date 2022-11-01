import { reqDetailInfo, reqAddGoodsShopCart } from '@/api';
const state = {
  goodsDetail: {},
};
const mutations = {
  GETDETAILINFO(state, goodsDetail) {
    state.goodsDetail = goodsDetail;
  },
};
const actions = {
  //获取单个商品详细信息
  async getGoodsDetail({ commit }, skuId) {
    let result = await reqDetailInfo(skuId);
    if (result.code == 200) {
      commit('GETDETAILINFO', result.data);
    } else {
      alert(Promise.reject(new Error('获取商品列表失败')));
    }
  },
  //把商品加入到购物车
  // eslint-disable-next-line no-unused-vars
  async getAddGoodsShopCart({ commit }, goodsInfo) {
    let result = await reqAddGoodsShopCart(goodsInfo);
    if (result.code == 200) {
      return 'ok';
    }
  },
};
const getters = {
  skuPicList(state) {
    return state.goodsDetail.skuList[0].skuPicList;
  },
  categories(state) {
    return state.goodsDetail.categories || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
