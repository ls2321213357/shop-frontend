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
//引入mock配置模块
import './mock/mockServer';
//引入公共样式
import '@/assets/css/public.css';
import '@/assets/css/base.css';
import '@/assets/css/normalize.css';
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
//使用全局组件
Vue.component(Header.name, Header);
Vue.component(Footer.name, Footer);
Vue.component(Carousel.name, Carousel);
Vue.component(TypeNav.name, TypeNav);
Vue.config.productionTip = false;
//element遮罩层
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    //全局事件总线
    Vue.prototype.$bus = this;
  },
  store,
  router,
}).$mount('#app');
