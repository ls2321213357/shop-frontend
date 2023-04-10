<template>
  <div style="background-color: rgba(247, 248, 250); height: 100vh">
    <div class="wrapper">
      <el-container>
        <el-aside width="200px">
          <!-- 头像区域 -->
          <div class="avator">
            <!-- 头像描述 -->
            <div class="title">
              <div class="ava">
                <img :src="userAvatar" class="avatar" />
              </div>
              <h3>{{ personInfo.username }}</h3>
              <el-popover placement="right" width="120px" trigger="click">
                <el-upload
                  action="http://47.93.10.154:9090/api/user/infos/update/avatar"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  list-type="picture-card"
                  :headers="{ Authorization: `Bearer ${sumToken}` }"
                >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-button size="small" slot="reference">更换头像</el-button>
              </el-popover>
            </div>
            <button class="btn">升级Plus会员</button>
          </div>
          <!-- 相关功能 -->
          <div class="action">
            <ul class="item">
              <li>
                <i class="el-icon-star-off"></i>
                收藏夹
              </li>
              <li>
                <i class="el-icon-collection"></i>
                个人喜好
                <i class="el-icon-share"></i>
              </li>
              <li>
                <i class="el-icon-notebook-2"></i>
                我的足迹
                <i class="el-icon-share"></i>
              </li>
              <li>
                <i class="el-icon-collection-tag"></i>
                拼单记录
                <i class="el-icon-share"></i>
              </li>
            </ul>
            <ul class="item">
              <li>
                <i class="el-icon-pie-chart"></i>
                商品分析
              </li>
              <li>
                <i class="el-icon-receiving"></i>
                额度管理
              </li>
            </ul>
            <ul class="item">
              <li>
                <i class="el-icon-coin"></i>
                积分
              </li>
              <li>
                <i class="el-icon-s-ticket"></i>
                优惠券
              </li>
              <li>
                <i class="el-icon-tickets"></i>
                订单
              </li>
            </ul>
            <ul class="item">
              <li>
                <i class="el-icon-document-remove"></i>
                商品资料
              </li>
              <li>
                <i class="el-icon-user"></i>
                账号安全
              </li>
              <li>
                <i class="el-icon-bell"></i>
                隐私与通知
              </li>
            </ul>
          </div>
        </el-aside>

        <el-main>
          <el-button type="primary" @click="goHome">
            <i class="el-icon-arrow-left"></i>
            去商城逛逛啦
          </el-button>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>账号信息</span>
              <el-button class="submit" type="success" @click="submitInfo">
                提交
              </el-button>
            </div>
            <div class="textitem">
              <div class="userinfo">
                <div class="userkey">用户名</div>
                <el-input
                  :placeholder="personInfo.username"
                  clearable
                  name="newUsername"
                  v-model="newUsername"
                  :disabled="isEditname"
                  v-validate="{
                    required: true,
                    regex:
                      /^([\u4e00-\u9fa5]{2,4})|([A-Za-z0-9_]{4,16})|([a-zA-Z0-9_\u4e00-\u9fa5]{3,16})$/,
                  }"
                  :class="{ invalid: errors.has('newUsername') }"
                ></el-input>
                <i class="error-msg hint">
                  {{ errors.first('newUsername') }}
                </i>
                <div class="popover">
                  <el-button @click="isEditname = false">编辑</el-button>
                </div>
              </div>
            </div>
            <div class="textitem">
              <div class="userinfo">
                <div class="userkey">电子邮箱</div>
                <el-input
                  :placeholder="email"
                  v-model="newEmail"
                  clearable
                  name="newEmail"
                  :disabled="isEditEmail"
                  v-validate="{
                    required: true,
                    regex: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                  }"
                  :class="{ invalid: errors.has('newEmail') }"
                ></el-input>
                <i class="error-msg hint">
                  {{ errors.first('newEmail') }}
                </i>
                <div class="popover">
                  <el-button @click="isEditEmail = false">编辑</el-button>
                </div>
              </div>
            </div>
            <div class="textitem">
              <div class="userinfo">
                <div class="userkey">手机号</div>
                <el-input
                  :placeholder="phone"
                  name="newPhone"
                  clearable
                  v-model="newPhone"
                  :disabled="isEditPhone"
                  v-validate="{
                    required: true,
                    regex:
                      /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
                  }"
                  :class="{ invalid: errors.has('newPhone') }"
                ></el-input>
                <i class="error-msg hint">
                  {{ errors.first('newPhone') }}
                </i>
                <div class="popover">
                  <el-button @click="isEditPhone = false">编辑</el-button>
                </div>
              </div>
            </div>
            <div class="textitem">
              <div class="userinfo">
                <div class="userkey">密码</div>
                <el-input
                  placeholder="***************"
                  clearable
                  :disabled="true"
                ></el-input>
                <div class="popover">
                  <el-button>编辑</el-button>
                </div>
              </div>
            </div>
            <div class="aside">
              <div class="us">
                <p>美国站账号登录</p>
                <el-button class="btn">同步并绑定数据</el-button>
              </div>
              <div class="china">
                <h2>关联第三方</h2>
              </div>
            </div>
          </el-card>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { getAssToken, getRefToken } from '@/util/token';
import { mapState } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Center',
  data() {
    return {
      isEditEmail: true, //是否修改电子邮箱
      isEditPhone: true, //是否修改手机号
      isEditname: true, //是否修改用户名
      newEmail: '',
      newPhone: '',
      newUsername: '',
      sumToken: getAssToken() + '&' + getRefToken(),
    };
  },
  methods: {
    //图片上传成功之后的回调
    handleAvatarSuccess(res) {
      console.log(res)
      if(res.code!=200){
        Message({
          showClose: true,
          type: 'error',
          message: res.msg,
        });
      }else{
        Message({
          showClose: true,
          type: 'success',
          message:'头像更换成功',
        });
      }
      setTimeout(() => {
        location.reload();
      }, 500);
    },
    //图片上传前的会回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        Message({
          type: 'error',
          message: '上传头像图片只能是 JPG 格式!',
        });
      }
      if (!isLt5M) {
        Message({
          type: 'error',
          message: '上传头像图片大小不能超过 5MB!',
        });
      }
      return isJPG && isLt5M;
    },
    //获取个人信息
    getPersonInfo() {
      this.$store.dispatch('getPersonInfo');
    },
    //更新个人信息
    submitInfo() {
      //定义传过去的参数
      let reqInfo = {
        phone: this.newPhone ? this.newPhone : this.phone, //手机号
        email: this.newEmail ? this.newEmail : this.email, //电子邮箱
        username: this.newUsername
          ? this.newUsername
          : this.personInfo.username, //用户名
      };
      try {
        this.$store.dispatch('getNewUser', reqInfo);
        this.isEditEmail = true;
        this.isEditPhone = true;
        this.isEditname = true;
      } catch (error) {
        Message({
          type: 'error',
          message: '服务器繁忙更新失败',
        });
      }
      setTimeout(() => {
        if (this.reqCode == 200) {
          Message({
            type: 'success',
            message: '更新成功',
          });
        } //警告提示框
        else if (this.reqCode == 500) {
          Message({
            type: 'warning',
            message: '服务器繁忙请重试',
          });
        }
      }, 1000);
    },
    //回到主页
    goHome() {
      this.$router.push('/');
    },
  },
  mounted() {
    this.getPersonInfo();
  },
  computed: {
    //个人信息
    ...mapState({
      personInfo: (state) => state.center.personInfo,
      phone: (state) => state.center.personInfo.phone,
      email: (state) => state.center.personInfo.email,
      userAvatar: (state) => state.center.personInfo.avatar,
      reqCode: (state) => state.center.reqCode,
    }),
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  padding-left: 130px;
  .box-card {
    margin-top: 100px;
  }
  .clearfix {
    position: relative;
    .submit {
      position: absolute;
      top: -10px;
      right: 15px;
    }
  }
  .avator {
    width: 200px;
    height: 200px;
    padding: 50px 50px 20px 0;
    position: relative;
    .ava {
      width: 50px;
      height: 50px;
      margin-bottom: 10px;
      margin-left: 50px;
      position: relative;
      img {
        position: absolute;
        top: -15px;
        transform: scale(2);
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
    .title {
      text-align: center;
      margin-bottom: 10px;
      .change-img {
        cursor: pointer;
        &:hover {
          color: aqua;
        }
      }
    }
    .btn {
      width: 100px;
      height: 20px;
      color: #fff;
      background-color: orange;
      font-size: 12px;
      border-radius: 10px;
      position: absolute;
      left: 22px;
      bottom: 10px;
    }
  }
  .action {
    .item {
      margin-left: 35px;
      border-top: solid 1px gray;
      li {
        margin: 7px 0;
      }
    }
  }
  .textitem {
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px gray;
    align-items: center;
    padding: 10px;
    position: relative;
    i {
      position: absolute;
      top: 20px;
      right: 270px;
      width: 110px;
      height: 30px;
      color: red;
    }
    .userinfo {
      display: flex;
      justify-content: space-between;
      text-align: center;

      .popover {
        position: absolute;
        right: 50px;
        top: 12px;
      }
      .userkey {
        line-height: 40px;
        margin-right: 100px;
        width: 100px;
        height: 40px;
      }
    }
    .btn {
      color: gray;

      &:hover {
        color: blue;
      }
    }
  }
  .aside {
    .us {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btn {
        border: none;
      }
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}
</style>
