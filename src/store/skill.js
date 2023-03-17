import { reqSkillGoods } from '@/api';
const state = {
  deadline: {},//最后的时间
  skillist: {},
};
const mutations = {
  //设置秒杀事件
  SETSECKILLSTIME(state, deadline) {
    state.deadline = deadline;
  },
  //减少秒杀时间
  REDUCESECKILLSTIME(state) {
    state.deadline.seconds--;
    if (state.deadline.seconds === -1) {
      state.deadline.seconds = 59;
      state.deadline.minute--;
      if (state.deadline.minute === -1) {
        state.deadline.minute = 59;
        state.deadline.hour--;
      }
    }
  },
  //获取秒杀接口
  GETSECKILLLIST(state, skillist) {
    state.skillist = skillist;
  },
};
const actions = {
  getSkillTime({ commit }) {
    // const date = new Date();
    // const hours = date.getHours();
    // const minute = date.getMinutes();
    // const seconds = date.getSeconds();
    // 距离开始秒杀时间
    const deadline = {
      hours: 0,
      minute: 38,
      seconds: 36,
    };
    commit('SETSECKILLSTIME', deadline);
  },
  //获取秒杀商品
  async getSeckillList({ commit }) {
    let result = await reqSkillGoods();
    if (result.code == 200) {
      commit('GETSECKILLLIST', result.data);
    } else {
      return Promise.reject(new Error('获取失败'));
    }
  },
};
const getters = {
  seckillsHours(state) {
    return state.deadline.hours < 10
      ? '0' + state.deadline.hours
      : state.deadline.hours;
  },
  seckillsMinutes(state) {
    return state.deadline.minute < 10
      ? '0' + state.deadline.minute
      : state.deadline.minute;
  },
  seckillsSeconds(state) {
    return state.deadline.seconds < 10
      ? `0${state.deadline.seconds}`
      : state.deadline.seconds;
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
