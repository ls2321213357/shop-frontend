import { reqDetailList, reqSearchDetailInfo } from '@/api';
import router from '@/router';
const state = {
  //商品选项列表
  detailList: [],
  //获取商品信息列表
  detailInfoList: {},
};
const mutations = {
  //获取商品分类信息列表
  GETDETAILLIST(state, detailList) {
    state.detailList = detailList;
  },
  //获取商品信息列表
  GETDETAILINFO(state, detailInfoList) {
    state.detailInfoList = detailInfoList;
  },
};
const actions = {
  //获取商品分类信息列表
  async getDetailList({ commit }, id) {
    let result = await reqDetailList(id);
    if (result.code) {
      commit('GETDETAILLIST', result.data);
    } else {
      alert(Promise.reject(new Error('获取商品列表失败')));
    }
  },
  //获取商品信息列表
  async getDetailInfo({ commit, dispatch }, data) {
    let result = await reqSearchDetailInfo(data);
    if (result.code == 200) {
      commit('GETDETAILINFO', result.data);
    } else if (result.code == 1026) {
      dispatch('getDetailInfo');
    } else if (result.code == 1029) {
      alert(result.msg);
      router.push('/');
    } else {
      console.log(Promise.reject(new Error('获取商品列表失败')));
    }
  },
};
const getters = {
  //商品详细信息
  detailData(state) {
    return state.detailInfoList.data || [];
  },
  //总页
  totalPage(state) {
    return Number(state.detailInfoList.totalPage);
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
