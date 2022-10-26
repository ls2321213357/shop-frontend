//封装一个存储两个token的方法
export const setRefToken = (refToken) => {
  localStorage.setItem('refToken', refToken);
};
export const setAssToken = (assToken) => {
  localStorage.setItem('assToken', assToken);
};
//存储用户id
export const setUserId = (userId) => {
  localStorage.setItem('userId', userId);
};

//获取本地token
export const getRefToken = () => {
  return localStorage.getItem('refToken');
};
export const getAssToken = () => {
  return localStorage.getItem('assToken');
};
//获取用户id
export const getUserId = () => {
  return localStorage.getItem('userId');
};
//清除本地token 和 userId
export const removeRToken = () => {
  localStorage.removeItem('refToken');
};
export const removeAToken = () => {
  localStorage.removeItem('assToken');
};
export const removeUserId = () => {
  localStorage.removeItem('userId');
};
