<template>
  <div class="login-container" :class="{ mask: isSlide }">
    <!-- 登录 -->
    <div class="login-wrap">
      <!-- 左部分 -->
      <div class="login-left">
        <div class="right-title">
          <span>
            既方便又实惠的购物天地,满足你的一切购物需求,以服务每一位顾客为基本准则,用心购好物
          </span>
          <div class="login-img"></div>
        </div>
      </div>
      <!-- 右部分 -->
      <div class="login-right">
        <el-tooltip
          class="item"
          effect="dark"
          content="点击这里前往商城页面"
          placement="bottom"
        >
          <img
            src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f6cd-fe0f.svg
        "
            @click="goHome"
          />
        </el-tooltip>

        <div class="loginform">
          <div class="content">
            <el-card class="box-card">
              <!-- 登陆部分 -->
              <div class="text" v-show="isShow">
                <div class="text-title">
                  <h1>欢迎登录</h1>
                </div>
                <div class="text-img"></div>
                <form>
                  <div class="input-text">
                    <input
                      placeholder="请输入手机号"
                      name="loginPhone"
                      v-model="loginPhone"
                      v-validate="{
                        required: true,
                        regex:
                          /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
                      }"
                      data-vv-scope="login"
                      :class="{ invalid: errors.has('login.loginPhone') }"
                    />
                    <!--  -->
                    <!-- 校验错误提示 -->
                    <i class="error-msg hint">
                      {{ errors.first('login.loginPhone') }}
                    </i>
                  </div>
                  <div class="input-text">
                    <input
                      placeholder="请输入密码"
                      name="loginPassword"
                      v-model="loginPassword"
                      v-validate="{
                        required: true,
                        regex:
                          /^(?=.*\d)(?=.*[A-Za-z])(?=.*[!@$%^*?~])[\u4E00-\u9FA5A-Za-z0-9!@$%^*?~]{8,16}$/,
                      }"
                      data-vv-scope="login"
                      :class="{ invalid: errors.has('login.loginPassword') }"
                    />
                    <!-- 校验错误提示 -->
                    <i class="error-msg hint error-text">
                      {{ errors.first('login.loginPassword') }}
                    </i>
                  </div>
                  <div class="setting">
                    <div class="call">
                      <p type="button" class="register" @click="goRegister">
                        立即注册
                      </p>
                      <router-link class="forget" to="/register">
                        忘记密码
                      </router-link>
                    </div>
                  </div>
                  <el-button type="button" class="btn" @click="getLogin">
                    登&nbsp;&nbsp;录
                  </el-button>
                </form>
              </div>
              <!-- 注册部分 -->
              <div class="text1" v-show="!isShow">
                <div class="text-title1">
                  <h1>欢迎注册</h1>
                </div>
                <div class="text-img1"></div>
                <form>
                  <div class="input-text">
                    <input
                      placeholder="请输入手机号"
                      name="phone"
                      v-model="phone"
                      v-validate="{
                        required: true,
                        regex:
                          /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
                      }"
                      data-vv-scope="register"
                      :class="{ invalid: errors.has('register.phone') }"
                    />
                    <!-- 校验错误提示 -->
                    <i class="error-msg hint">
                      {{ errors.first('register.phone') }}
                    </i>
                  </div>
                  <div class="text-btn">
                    <el-button :plain="true" type="button" @click="getCode">
                      获取验证码
                    </el-button>
                  </div>
                  <div class="input-text">
                    <input
                      placeholder="请输入密码"
                      name="password"
                      v-model="password"
                      v-validate="{
                        required: true,
                        regex:
                          /^(?=.*\d)(?=.*[A-Za-z])(?=.*[!@$%^*?~])[\u4E00-\u9FA5A-Za-z0-9!@$%^*?~]{8,16}$/,
                      }"
                      data-vv-scope="register"
                      :class="{ invalid: errors.has('register.password') }"
                    />
                    <!-- 校验错误提示 -->
                    <i class="error-msg hint error-text">
                      {{ errors.first('register.password') }}
                    </i>
                  </div>
                  <div class="input-text">
                    <input
                      placeholder="请输入验证码"
                      v-model="code"
                      name="code"
                      v-validate="{
                        required: true,
                        regex: /^[0-9]{4}$/,
                      }"
                      data-vv-scope="register"
                      :class="{ invalid: errors.has('register.code') }"
                    />
                    <!-- 校验错误提示 -->
                    <i class="error-msg hint">
                      {{ errors.first('register.code') }}
                    </i>
                  </div>
                  <div class="setting">
                    <div class="call">
                      <a class="register" @click="goLogin">立即登录</a>
                      <router-link class="forget" to="/register">
                        忘记密码
                      </router-link>
                    </div>
                  </div>
                  <el-button type="button" class="btn" @click="getRegister">
                    注&nbsp;&nbsp;册
                  </el-button>
                </form>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
    <!-- 滑动验证 -->
    <div v-if="isSlide" class="slide">
      <slide-verify
        :l="42"
        :r="10"
        :w="310"
        :h="155"
        slider-text="向右滑动"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
      ></slide-verify>
      <div class="text">{{ msg }}</div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { mapState } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data() {
    return {
      msg: '', //滑动验证的内容
      isShow: true, //登录与注册的切换
      code: '', //验证码
      loginPhone: '', //登录手机号
      loginPassword: '', //登陆密码
      phone: '', //注册手机号
      password: '', //注册密码
      isSlide: false,
    };
  },
  methods: {
    //滑动窗口部分
    //成功后的回调
    onSuccess(times) {
      const { phone } = this;
      this.msg = '验证成功,用时' + (times / 1000).toFixed(1) + '秒';
      //表单验证
      phone && this.$store.dispatch('getUserCode', phone);
      setTimeout(() => {
        //成功提示框
        if (this.reqCode == 200) {
          Message({
            type: 'success',
            message: this.errorMsg,
          });
        } //警告提示框
        else if (this.reqCode == 500) {
          Message({
            type: 'warning',
            message: this.errorMsg,
          });
        } else {
          Message({
            type: 'error',
            message: this.errorMsg,
          });
        }
        this.msg = '';
        this.isSlide = false;
      }, 1500);
    },
    //失败后的回调
    onFail() {
      Message({
        type: 'warning',
        message: '验证失败,请重试',
      });
      this.msg = '';
    },
    //刷新后的回调
    onRefresh() {
      this.msg = '';
    },

    //切换用户登录和注册
    goLogin() {
      this.isShow = true;
      this.isSlide = false;
    },
    goRegister() {
      this.isShow = false;
    },
    //用户注册
    async getRegister() {
      const { phone, password, code } = this;
      //以上校验通过以后才能发送请求
      //采用了部分表单校验  以register开头的都会进行校验
      const success = await this.$validator.validateAll('register');
      if (success) {
        try {
          await this.$store.dispatch('getUserRegister', {
            code,
            phone,
            password,
          });
          if (this.reqCode == 200) {
            Message({
              type: 'success',
              message: this.errorMsg,
            });
            this.goLogin();
          } //警告提示框
          else if (this.reqCode == 500) {
            Message({
              type: 'warning',
              message: this.errorMsg,
            });
          } else {
            Message({
              type: 'error',
              message: this.errorMsg,
            });
          }
        } catch (error) {
          alert(error.messge);
        }
      }
    },
    //获取验证码
    async getCode() {
      this.isSlide = true;
    },
    //获取用户登录
    async getLogin() {
      const { loginPhone, loginPassword } = this;
      const success = await this.$validator.validateAll('login');
      if (success) {
        try {
          await this.$store.dispatch('getUserLogin', {
            phone: loginPhone,
            password: loginPassword,
          });
          if (this.reqCode == 200) {
            Message({
              type: 'success',
              message: this.errorMsg,
            });
            this.$router.push('/home');
          } //警告提示框
          else if (this.reqCode == 500) {
            Message({
              type: 'warning',
              message: this.errorMsg,
            });
          } else {
            Message({
              type: 'error',
              message: this.errorMsg,
            });
          }
        } catch (error) {
          alert(error.message);
        }
      }
    },
    //前往home主页
    goHome() {
      this.$router.push('/');
    },
  },
  computed: {
    ...mapState({
      errorMsg: (state) => state.userInfo.errorMsg,
      reqCode: (state) => state.userInfo.reqCode,
    }),
    //让error变成动态的
    getErrorMsg: {
      get() {
        return this.errorMsg;
      },
      set(val) {
        this.errorMsg = val;
      },
    },
  },
};
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 999;
  background: rgba(0, 0, 0, 0.3);
}
.login-container {
  height: 850px;
  overflow: hidden hidden;
  position: relative;

  .slide {
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: #fff;
    transform: translate(-50%, -50%);
    .text {
      height: 30px;
      font-size: 16px;
      text-align: center;
      line-height: 30px;
    }
  }
  a,
  p {
    cursor: pointer;
  }
  .login-wrap {
    height: 100%;
    display: flex;
    .login-left {
      background: rgb(49, 109, 249);
      width: 530px;
      height: 100%;
      background-position-x: 100%;
      background-size: auto 250px;
      padding: 0 20px;
      position: relative;
      .login-img {
        position: absolute;
        left: -235px;
        top: 150px;
        width: 600px;
        height: 550px;
        margin: 0px auto;
        background: url(./images/login.png);
        background-size: cover;
      }

      .right-title {
        position: absolute;
        left: 100px;
        top: 100px;
        color: #fff;
        width: 360px;
        font-size: 24px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: left;
        letter-spacing: 0.3em;
      }
    }
    .login-right {
      width: 70%;
      position: relative;
      img {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 10%;
        height: 10%;
      }
      .loginform {
        width: 520px;
        height: 480px;
        box-sizing: border-box;
        position: absolute;
        top: 80px;
        left: 200px;
        padding: 20px;
        position: relative;
        .content {
          width: 380px;
          height: 316px;
          box-sizing: border-box;
          border-top: none;
          padding: 18px;
          position: relative;
          .text {
            font-size: 14px;
            position: relative;
            .text-title {
              letter-spacing: 0.5em;
              position: absolute;
              top: 40px;
              left: 70px;
            }
            .text-img {
              position: absolute;
              top: 0px;
              left: 280px;
              width: 250px;
              height: 250px;
              margin: 0px auto;
              background: url(./images/login-shop2.png);
              background-size: cover;
            }
          }
          .text1 {
            font-size: 14px;
            position: relative;
            .text-title1 {
              letter-spacing: 0.5em;
              position: absolute;
              top: 40px;
              left: 70px;
              position: relative;
            }
            .text-btn button {
              text-align: center;
              position: absolute;
              top: 5px;
              left: 340px;
              width: 100px;
              height: 40px;
              background-color: rgb(49, 109, 249);
              border-radius: 5px;
              font-family: 微软雅黑;
              word-spacing: 4px;
              border: 1px solid rgb(49, 109, 249);
              color: #fff;
              border-radius: 5px;
              font-size: 12px;
            }
            .text-img1 {
              position: absolute;
              top: 0px;
              left: 280px;
              width: 250px;
              height: 250px;
              margin: 0px auto;
              background: url(./images/login-shop.png);
              background-size: cover;
            }
          }
          .box-card {
            width: 550px;
            height: 600px;
            border-radius: 5px;
          }
          form {
            position: absolute;
            left: 70px;
            top: 200px;
            margin: 15px 0 18px 0;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            .input-text {
              margin-bottom: 30px;
              position: relative;
              .error-text {
                position: absolute;
                top: 50px;
                left: -7px;
              }
              i {
                position: absolute;
                left: 0px;
                top: 50px;
                width: 90px;
                height: 20px;
                margin-top: 5px;
                line-height: 20px;
              }

              .hint {
                color: #e1251b;
              }
              input {
                width: 332px;
                height: 50px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                padding-top: 6px;
                padding-bottom: 6px;
                font-size: 14px;
                line-height: 22px;
                padding-right: 8px;
                padding-left: 8px;
                border-radius: 0 2px 2px 0;
                outline: none;
                border-radius: 5px;
              }
            }
            .setting {
              label {
                float: left;
              }
            }
            .btn {
              background-color: rgb(49, 109, 249);
              padding: 6px;
              font-size: 16px;
              font-family: 微软雅黑;
              word-spacing: 4px;
              border: 1px solid rgb(49, 109, 249);
              color: #fff;
              width: 100%;
              height: 36px;
              margin-top: 15px;
              outline: none;
              border-radius: 5px;
            }
          }
          .call {
            margin-top: 30px;
            font-size: 15px;
            line-height: 38px;
            .register {
              float: left;
              color: #666;
            }
            .forget {
              float: right;
            }
            .register:hover {
              color: #4cb9fc;
              text-decoration: none;
            }
            .forget:hover {
              color: #4cb9fc;
              text-decoration: none;
            }
          }
        }
      }
    }
  }
}
</style>
