import {
  reqOrderList,
  reqGoodsAddress,
  reqChangeAddress,
  reqUpdateAddress,
  reqUserAddress,
  reqDeleteAddress,
  reqSubmitOrder,
} from '@/api';
const state = {
  //订单购物车数据
  tradeListInfo: [],
  //地址列表
  addressList: [],
  //用户地址列表
  userList: [],
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
  //获取用户所有地址
  GTEUSERADDRESSINFO(state, userList) {
    state.userList = userList;
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
    console.log(userChangeInfo);
    let result = await reqUpdateAddress(userChangeInfo);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('修改失败'));
    }
  },
  //查看用户的所有收货地址
  async getUserAddressInfo({ commit }) {
    let result = await reqUserAddress();
    if (result.code == 200) {
      commit('GTEUSERADDRESSINFO', result.data);
    } else {
      return Promise.reject(new Error('获取失败'));
    }
  },
  //删除收货地址
  // eslint-disable-next-line no-unused-vars
  async getDeleteAddress({ commit }, id) {
    let result = await reqDeleteAddress(id);
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('删除失败'));
    }
  },
  //预提交订单
  async getSubmitOrder({ commit }, orderInfo) {
    console.log(111);
    console.log(orderInfo);
    let result = await reqSubmitOrder(orderInfo);
    if (result.code == 200) {
      localStorage.removeItem('orderDate');
      return 'ok';
    } else {
      return Promise.reject(new Error('提交失败'));
    }
  },
};
export default {
  state,
  mutations,
  actions,
};
