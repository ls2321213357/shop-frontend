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
//获取商品详细信息
export const reqDetailInfo = (skuId) =>
  requests({ url: `/pms/product/detail/${skuId}`, method: 'get' });
//添加商品到购物车
export const reqAddGoodsShopCart = (data) =>
  requests({ url: '/oms/cart/add', method: 'post', data });

/////////////购物车页面操作/////////////
//获取购物车某产品数量
export const reqUserShopCartNum = () =>
  requests({ url: '/oms/cart/list/count', method: 'get' });
//获取用户购物车信息
export const reqUserShopCart = () =>
  requests({ url: '/oms/cart/list', method: 'get' });
//移除购物车某商品
export const reqDeleteGoods = (data) =>
  requests({ url: '/oms/cart/remove', method: 'delete', data });
//修改购物车中商品勾选状态
export const reqChangeShopCheck = (data) =>
  requests({ url: '/oms/cart/product/status', method: 'put', data });

/////////////我的地址部分操作/////////
//查看收货地址
export const reqUserAddress = () =>
  requests({ url: '/user/receiveraddress/my', method: 'get' });
//添加收货地址
export const reqChangeAddress = (data) =>
  requests({ url: '/user/receiveraddress/add', method: 'post', data });
//修改收货地址
export const reqUpdateAddress = (data) =>
  requests({ url: '/user/receiveraddress/update', method: 'put', data });
//删除收货地址
export const reqDeleteAddress = (id) =>
  requests({ url: `/user/receiveraddress/delete/${id}`, method: 'delete' });
//省市区列表
export const reqGoodsAddress = () =>
  requests({ url: '/user/receiveraddress/list', method: 'get' });

//////////////订单部分////////////////////
//订单预支付信息
export const reqOrderList = (data) =>
  requests({ url: '/oms/order/presubmit', method: 'post', data });

//查新订单详情
export const reqOrderInfo = (orderNo) =>
  requests({ url: `/oms/order/detail/${orderNo}`, method: 'get' });
//订单点击提交
