import Vue from 'vue';
import Vuex from 'vuex';
import userInfo from './userInfo';
import home from './home';
import center from './center';
import search from './search';
import detail from './detail';
import address from './address';
import shopCart from './shopCart';
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    userInfo,
    home,
    center,
    search,
    detail,
    address,
    shopCart,
  },
});
