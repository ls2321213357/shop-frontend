import Vue from 'vue';
import App from './App.vue';
//引入仓库
import store from './store';
//引入路由
import router from '@/router';
//引入swiper样式
import './assets/css/swiper.min.css';
//引入表单验证
import '@/plugins/vee-validate';
//引入图片懒加载
import VueLazyload from 'vue-lazyload';
//引入懒加载图片
const loadimg = require('@/assets/images/th.gif');
//使用图片懒加载
Vue.use(VueLazyload, {
  loading: loadimg,
});
//引入mock配置模块
import './mock/mockServer';
//引入公共样式
import '@/assets/css/public.css';
import '@/assets/css/base.css';
import '@/assets/css/normalize.css';
//引入图片滑动验证
import SlideVerify from 'vue-monoplasty-slide-verify';

Vue.use(SlideVerify);
//引入全局组件
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Carousel from '@/components/Carousel';
import TypeNav from '@/components/TypeNav';
//按需引入element
//引入elementUI
import {
  MessageBox,
  Card,
  Button,
  Input,
  Container,
  Aside,
  Main,
  Popover,
  Upload,
  Dialog,
  Tooltip,
  Pagination,
  Checkbox,
  Cascader,
  Collapse,
  CollapseItem,
  Empty,
  Loading,
  Message,
} from 'element-ui';
//使用elementUI
Vue.use(Card);
Vue.use(Button);
Vue.use(Input);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Popover);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Tooltip);
Vue.use(Pagination);
Vue.use(Checkbox);
Vue.use(Cascader);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Empty);
Vue.use(Loading);
//使用全局组件
Vue.component(Header.name, Header);
Vue.component(Footer.name, Footer);
Vue.component(Carousel.name, Carousel);
Vue.component(TypeNav.name, TypeNav);
Vue.config.productionTip = false;
//element遮罩层
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
//引入时间处理
import dayjs from 'dayjs';

Vue.prototype.dayjs = dayjs;
//引入聊天客服功能相应组件
import Vant from 'vant';
import 'vant/lib/index.css';
import MetaInfo from 'vue-meta-info';
import preview from 'vue-photo-preview';
import 'vue-photo-preview/dist/skin.css';

let options = {
  fullscreenEl: false,
};
Vue.use(preview, options);
Vue.use(preview);
Vue.use(Vant);
Vue.use(MetaInfo);
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    //全局事件总线
    Vue.prototype.$bus = this;
  },
  store,
  router,
}).$mount('#app');
