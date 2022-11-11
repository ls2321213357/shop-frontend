import { reqUserOrderList, reqOrderDetailInfo, reqDeleteOrder } from '@/api';
const state = {
  orderList: [],
  orderDetai: [],
};
const mutations = {
  //获取订单列表
  GETUSERORDERLIST(state, orderList) {
    state.orderList = orderList;
  },
  //订单详细信息
  GETORDERDETAILINFO(state, orderDetai) {
    state.orderDetai = orderDetai;
  },
};
const actions = {
  //获取订单列表
  async getUserOrderList({ commit }) {
    let result = await reqUserOrderList();
    if (result.code == 200) {
      commit('GETUSERORDERLIST', result.data);
    } else {
      return Promise.reject(new Error('获取失败'));
    }
  },
  //订单详细信息
  async getOrderDetailInfo({ commit }, num) {
    let result = await reqOrderDetailInfo(num);
    if (result.code == 200) {
      commit('GETORDERDETAILINFO', result.data);
    } else {
      return Promise.reject(new Error('获取失败'));
    }
  },
  //删除某个订单
  // eslint-disable-next-line no-unused-vars
  async getDeleteOrder({ commit }, num) {
    let result = await reqDeleteOrder(num);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('获取失败'));
    }
  },
};
export default {
  state,
  mutations,
  actions,
};
