import {
  reqUserShopCart,
  reqDeleteGoods,
  reqAddGoodsShopCart,
  reqChangeShopCheck,
  reqUserShopCartNum,
} from '@/api';
const state = {
  shopCartInfo: [], //购物车列表
  shopCartNum: '', //购物车产品数量
  reqCode: '', //状态码
  reqMsg: '', //响应信息
};
const mutations = {
  //获取用户购物车
  GETUSERSHOPCARTINFO(state, shopCartInfo) {
    state.shopCartInfo = shopCartInfo;
  },
  //获取用户购物车数量
  GETUSERSHOPCARTNUM(state, shopCartNum) {
    state.shopCartNum = shopCartNum;
  },
  //状态码
  CHANGEREQCODE(state, reqCode) {
    state.reqCode = reqCode;
  },
  //错误信息
  CHANGEREQMSG(state, reqMsg) {
    state.reqMsg = reqMsg;
  },
};
const actions = {
  //更改购物车某商品数量
  // eslint-disable-next-line no-unused-vars
  async changeShopCartNum({ commit }, numInfo) {
    let result = await reqAddGoodsShopCart(numInfo);
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
  async reqDeleteGoods({ commit }, goodsInfo) {
    console.log(goodsInfo);
    let result = await reqDeleteGoods(goodsInfo);
    if (result.code == 200) {
      commit('CHANGEREQCODE', result.code);
      commit('CHANGEREQMSG', result.data);
      return 'ok';
    } else {
      commit('CHANGEREQCODE', result.code);
      commit('CHANGEREQMSG', result.data);
      console.log(Promise.reject(new Error('删除失败')));
    }
  },
  //删除所有勾选的商品
  async deleteAllShopCart({ dispatch, getters }) {
    let promiseAll = []; //用来记录成功返回值
    await getters.shopCartInfo.forEach((item) => {
      let promise =
        item.selected == 1
          ? dispatch('reqDeleteGoods', {
              skuID: item.skuID,
              specification: item.productSkuSpecification,
            })
          : '';
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
  //更改购物车商品的勾选状态
  async getChangeShopCheck({ commit }, stateInfo) {
    let result = await reqChangeShopCheck(stateInfo);
    if (result.code == 200) {
      commit('CHANGEREQCODE', result.code);
      commit('CHANGEREQMSG', result.data);
      return 'ok';
    } else {
      commit('CHANGEREQCODE', result.code);
      commit('CHANGEREQMSG', result.data);
      console.log(Promise.reject(new Error('修改状态失败')));
    }
  },
  //获取用户购物车商品数量
  async getUserShopCartNum({ commit }) {
    let result = await reqUserShopCartNum();
    if (result.code == 200) {
      commit('GETUSERSHOPCARTNUM', result.data);
    } else {
      console.log(Promise.reject(new Error('获取购物车数量失败')));
    }
  },
};
const getters = {
  shopCartInfo(state) {
    return state.shopCartInfo || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
