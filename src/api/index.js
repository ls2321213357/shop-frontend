import requests from './request';
import mockRequest from './mockReuqest';

////////////////////用户登录注册注销部分/////////////////
//用户注册
export const reqUserRegister = (params) =>
  requests({
    url: '/user/signup',
    method: 'post',
    data: params,
  });
//获取验证码
export const reqUserCode = (phone) =>
  requests({ url: `/user/phone?phone=${phone}`, method: 'get' });
//用户登录
export const reqUserLogin = (params) =>
  requests({ url: '/user/login', method: 'post', data: params });
//退出登录
export const reqUserLogout = () =>
  requests({ url: '/user/exit', method: 'delete' });

//////////////跳转到home页后操作部分///////////////
//获取用户头像用户名购物车
export const reqUserInfo = () =>
  requests({ url: '/user/someinfo', method: 'get' });
//商品相关分类
export const reqDetailNav = () =>
  requests({ url: '/pms/product/category/list', method: 'get' });

///////////search页面操作//////////////
//获取分类后的结果
export const reqDetailList = (id) =>
  requests({ url: `/pms/product/attribute/bycategory/${id}`, method: 'get' });
//搜索商品详细信息
export const reqSearchDetailInfo = (data) =>
  requests({ url: '/pms/product/search', method: 'post', data });

///////////////////个人中心部分/////////////////
//获取个人信息
export const reqPersonInfo = () =>
  requests({ url: '/user/infos', method: 'get' });
//更新用户信息
export const reqNewUser = (reqInfo) =>
  requests({ url: '/user/infos/update', method: 'put', data: reqInfo });

/////////mock模拟数据///////
//获取轮播图
export const reqBannerImg = () =>
  mockRequest({ url: '/banner', method: 'get' });

////////////商品详情页面操作/////////
export const reqDetailInfo = (skuId) =>
  requests({ url: `/pms/product/detail/${skuId}`, method: 'get' });
