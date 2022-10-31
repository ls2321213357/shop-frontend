import { reqNewUser, reqPersonInfo } from '@/api';
const state = {
  personInfo: {}, //个人信息页面数据
  reqCode: '', //状态码
};
const mutations = {
  //获取个人信息
  GETPERSONINFO(state, personInfo) {
    state.personInfo = personInfo;
  },
  //更新个人信息
  GETNEWUSER(state, personInfo) {
    state.personInfo = personInfo;
  },
  // 状态码
  GETREQCODE(state, reqCode) {
    state.reqCode = reqCode;
  },
};
const actions = {
  //个人信息页面
  async getPersonInfo({ commit, dispatch }) {
    let result = await reqPersonInfo();
    if (result.code == 200) {
      commit('GETPERSONINFO', result.data);
    } else if (result.code == 1026) {
      dispatch('getPersonInfo');
    } else {
      return Promise.reject(new Error('failure'));
    }
  },
  //更新个人信息
  // eslint-disable-next-line no-unused-vars
  async getNewUser({ commit, dispatch }, reqInfo) {
    let result = await reqNewUser(reqInfo);
    if (result.code == 200) {
      commit('GETREQCODE', result.code);
      dispatch('getPersonInfo');
      return 'ok';
    } else if (result.code == 1026) {
      dispatch('getNewUser', reqInfo);
    } else {
      commit('GETREQCODE', result.code);
      return Promise.reject(new Error('更新失败'));
    }
  },
};
export default {
  state,
  mutations,
  actions,
};
