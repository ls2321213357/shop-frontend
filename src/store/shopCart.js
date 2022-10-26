import { reqChangeShopCartNum, reqUserShopCart, reqDeleteGoods } from '@/api';
const state = {
  shopCartInfo: [],
};
const mutations = {
  //获取用户购物车
  GETUSERSHOPCARTINFO(state, shopCartInfo) {
    state.shopCartInfo = shopCartInfo;
  },
};
const actions = {
  //更改购物车某商品数量
  async changeShopCartNum({ commit }, numInfo) {
    console.log(numInfo);
    let result = await reqChangeShopCartNum(numInfo);
    if (result.code == 200) {
      return 'ok';
    } else {
      alert(Promise.reject(new Error('更改购物车数量失败')));
    }
  },
  //获取用户购物车
  async getUserShopCartInfo({ commit }) {
    let result = await reqUserShopCart();
    if (result.code == 200) {
      commit('GETUSERSHOPCARTINFO', result.data);
    } else {
      console.log(Promise.reject(new Error('获取购物车信息失败')));
    }
  },
  //移除购物车某商品
  async deleteGoods({ commit }, skuId) {
    let result = await reqDeleteGoods(skuId);
    if (result.code == 200) {
      return 'ok';
    } else {
      console.log(Promise.reject(new Error('删除失败')));
    }
  },
  //删除所有勾选的商品
  async deleteAllShopCart({ dispatch }) {
    dispatch('deleteGoods');
  },
};
export default {
  state,
  mutations,
  actions,
};
