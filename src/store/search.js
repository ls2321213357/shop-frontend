import { reqDetailList, reqSearchDetailInfo } from '@/api';
import router from '@/router';
const state = {
  //商品选项列表
  detailList: [],
  //获取商品信息列表
  detailInfoList: {},
  //获取秒杀商品
  seckillInfoList: {},
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
  //获取秒杀商品信息列表
  GETSECKILLINFO(state, seckillInfoList) {
    state.seckillInfoList = seckillInfoList;
  },
};
const actions = {
  //获取商品分类信息列表
  async getDetailList({ commit }, id) {
    let result = await reqDetailList(id);
    if (result.code) {
      commit('GETDETAILLIST', result.data);
    } else {
      return Promise.reject(new Error('获取商品列表失败'));
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
      return Promise.reject(new Error('获取商品列表失败'));
    }
  },
  //获取秒杀信息列表
  async getSeckillInfo({ commit, dispatch }, data) {
    let result = await reqSearchDetailInfo(data);
    if (result.code == 200) {
      commit('GETSECKILLINFO', result.data);
    } else if (result.code == 1026) {
      dispatch('getSeckillInfo');
    } else if (result.code == 1029) {
      alert(result.msg);
      router.push('/');
    } else {
      return Promise.reject(new Error('获取商品列表失败'));
    }
  },
};
const getters = {
  //商品详细信息
  detailData(state) {
    return state.detailInfoList.data || [];
  },
  //秒杀商品信息
  seckillData(state) {
    return state.seckillInfoList.data || [];
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
