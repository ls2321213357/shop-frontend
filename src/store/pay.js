import { reqPayDetailInfo, reqPayCallBack } from '@/api';
const state = {
  payUrl: '',
};
const mutations = {
  GETPAYINFO(state, payUrl) {
    state.payUrl = payUrl;
  },
};
const actions = {
  //点击支付
  async getPayInfo({ commit }, data) {
    let result = await reqPayDetailInfo(data);
    commit('GETPAYINFO', result.data);
    localStorage.removeItem('orderInfo');
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('error'));
    }
  },
  //支付回调接口
  // eslint-disable-next-line no-unused-vars
  async getPaySuccess({ commit }) {
    let result = await reqPayCallBack();
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('error'));
    }
  },
};
export default {
  state,
  mutations,
  actions,
};
