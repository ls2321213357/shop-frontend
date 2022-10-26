//vee插件  表单验证区域
import Vue from 'vue';
import VeeValidate from 'vee-validate';
//中文的提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`, //修改内置规则的message,让确认密码与密码相同
  },
  attributes: {
    //给校验的field属性名映射中文名称
    loginPhone: '手机号',
    code: '验证码',
    loginPassword: '密码',
    phone: '手机号',
    password: '密码',
    newPhone: '新的手机号',
    newEmail: '新的邮箱',
    newUsername: '新的名字',
  },
});
//自定义校验规则
VeeValidate.Validator.extend('agree', {
  validate: (value) => {
    return value;
  },
});
