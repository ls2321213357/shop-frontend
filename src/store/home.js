import {
  reqUserInfo,
  reqBannerImg,
  reqUserLogout,
  reqDetailNav,
} from '@/api';
import { removeRToken, removeAToken, removeUserId } from '@/util/token';
const state = {
  userInfo: {},
  bannerList: [],
  detailNavList: {},

  userCode: '', //记录用户登录的状态码
};
const mutations = {
  //获取个人信息
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  //获取主页轮播图
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  //退出登录操作
  CLEARUSERINFO(state, userCode) {
    state.userCode = userCode;
    state.userInfo = {};
    removeRToken();
    removeAToken();
    removeUserId();
  },
  // 状态码
  GETREQCODE(state, userCode) {
    state.userCode = '';
    state.userCode = userCode;
  },
  //获取商品分类标签
  GETDETAILNAV(state, detailNavList) {
    state.detailNavList = detailNavList;
  },
 
};
const actions = {
  //发送用户id和token获取用户信息
  async getUserInfo({ commit, dispatch }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit('GETUSERINFO', result.data);
    } else if (result.code == 1026) {
      dispatch('getUserInfo');
    }
  },
  //退出登录操作
  async userLogout({ commit }) {
    let result = await reqUserLogout();
    if (result.code == 200) {
      commit('CLEARUSERINFO', result.code);
      return 'ok';
    } else {
      return Promise.reject(new Error('退出登录失败'));
    }
  },
  //利用mock模拟轮播图数据
  async getBannerList({ commit }) {
    let result = await reqBannerImg();
    if (result.code == 200) {
      commit('GETBANNERLIST', result.data);
    } else {
      return Promise.reject(new Error('获取失败'));
    }
  },
  //获取商品分类标签
  async getDetailNav({ commit }) {
    let result = await reqDetailNav();
    if (result.code == 200) {
      commit('GETDETAILNAV', result.data);
    }
  },

};
export default {
  state,
  mutations,
  actions,
};
