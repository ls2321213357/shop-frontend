import { reqUserRegister, reqUserCode, reqUserLogin } from '../api';
//引入token操作
import {
  setAssToken,
  setRefToken,
  getRefToken,
  getAssToken,
} from '@/util/token';

const state = {
  errorMsg: '', //返回的信息
  reqCode: '', //状态码
  refToken: getRefToken(), //长时间token
  assToken: getAssToken(), //临时token
};

const mutations = {
  //错误信息
  GETCODEMSG(state, errorMsg) {
    state.errorMsg = errorMsg;
  },
  // 状态码
  GETREQCODE(state, reqCode) {
    state.reqCode = reqCode;
  },
};
const actions = {
  //用户注册
  // eslint-disable-next-line no-unused-vars
  async getUserRegister({ commit }, params) {
    let result = await reqUserRegister(params);
    if (result.code == 200) {
      commit('GETREQCODE', result.code);
      commit('GETCODEMSG', result.msg);
      return 'ok';
    } else {
      commit('GETREQCODE', result.code);
      commit('GETCODEMSG', result.msg);
    }
  },
  //获取验证码
  async getUserCode({ commit }, phone) {
    let result = await reqUserCode(phone);
    if (result.code == 200) {
      commit('GETREQCODE', result.code);
      commit('GETCODEMSG', result.msg);
    } else {
      commit('GETREQCODE', result.code);
      commit('GETCODEMSG', result.msg);
    }
  },
  //用户登录
  async getUserLogin({ commit }, params) {
    let result = await reqUserLogin(params);
    if (result.code == 200) {
      commit('GETREQCODE', result.code);
      commit('GETCODEMSG', result.msg);
      setAssToken(result.data.accessToken);
      setRefToken(result.data.refreshToken);
      return 'ok';
    } else {
      commit('GETREQCODE', result.code);
      commit('GETCODEMSG', result.msg);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
