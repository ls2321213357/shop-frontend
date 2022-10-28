import { reqDetailInfo } from '@/api';
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
};
const getters = {
  skuPicList(state) {
    return state.goodsDetail.skuList[0].skuPicList || [];
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
