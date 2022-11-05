import {
  reqOrderList,
  reqGoodsAddress,
  reqChangeAddress,
  reqUpdateAddress,
} from '@/api';
const state = {
  //订单购物车数据
  tradeListInfo: [],
  //地址列表
  addressList: [],
};
const mutations = {
  //获取订单购物车数据
  GETTEADELISTINFO(state, tradeListInfo) {
    state.tradeListInfo = tradeListInfo;
  },
  //获取所有地址
  GETGOODSADDRESS(state, addressList) {
    state.addressList = addressList;
  },
};
const actions = {
  //获取订单购物车数据
  async getTradeListInfo({ commit }, data) {
    let result = await reqOrderList(data);
    if (result.code == 200) {
      commit('GETTEADELISTINFO', result.data);
    } else {
      return Promise.reject(new Error('获取失败'));
    }
  },
  //获取所有地址
  async getGoodsAddress({ commit }) {
    let result = await reqGoodsAddress();
    if (result.code == 200) {
      commit('GETGOODSADDRESS', result.data);
    }
  },
  //添加用户收货地址
  // eslint-disable-next-line no-unused-vars
  async getAddAddress({ commit }, userAddressInfo) {
    let result = await reqChangeAddress(userAddressInfo);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('添加失败'));
    }
  },
  //修改用户收货地址
  // eslint-disable-next-line no-unused-vars
  async getChangeAddress({ commit }, userChangeInfo) {
    let result = await reqUpdateAddress(userChangeInfo);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('修改失败'));
    }
  },
};
export default {
  state,
  mutations,
  actions,
};
