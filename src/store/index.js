import Vue from 'vue';
import Vuex from 'vuex';
import userInfo from './userInfo';
import home from './home';
import center from './center';
import search from './search';
import detail from './detail';
import shopCart from './shopCart';
import trade from './trade';
import order from './order';
import pay from './pay';
import skill from './skill';
import chat from "./chat";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    userInfo,
    home,
    center,
    search,
    detail,
    shopCart,
    trade,
    order,
    pay,
    skill,
    chat
  },

});
