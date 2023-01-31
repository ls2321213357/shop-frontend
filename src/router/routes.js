//采用了路由懒加载
export default [
  {
    path: '/paysuccess',
    component: () => import('@/components/paySuccess'),
    beforeEnter: (to, from, next) => {
      if (from.path == '/pay') {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: '/misspage',
    component: () => import('@/components/MissPage'),
  },
  {
    path: '/trade',
    component: () => import('@/pages/Trade'),
    meta: {
      isShowHeader: true,
    },
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: '/pay',
    component: () => import('@/pages/Pay'),
    meta: {
      isShowHeader: true,
    },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade' || from.path == '/order') {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: '/order',
    component: () => import('@/pages/Order'),
    meta: {
      isShowHeader: true,
    },
  },
  {
    path: '/skilldetail/:skuid?',
    name: 'skilldetail',
    component: () => import('@/pages/SkillDetail'),
    meta: {
      isShowHeader: true,
      isShowFooter: true,
    },
  },
  {
    path: '/search/:keyword?',
    component: () => import('@/pages/Search'),
    name: 'search',
    meta: {
      isShowHeader: true,
      isShowFooter: true,
    },
  },
  {
    path: '/detail/:skuid?',
    name: 'detail',
    component: () => import('@/pages/Detail'),
    meta: {
      isShowHeader: true,
      isShowFooter: true,
    },
  },
  {
    path: '/center',
    component: () => import('@/pages/Center'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('assToken')) {
        next();
      } else {
        next('/login');
      }
    },
  },
  {
    path: '/shopcart',
    component: () => import('@/pages/ShopCart'),
    meta: {
      isShowFooter: true,
      isShowHeader: true,
    },
  },
  {
    path: '/detail', //商品详情页
    component: () => import('@/pages/Detail'),
  },
  {
    path: '/home',
    component: () => import('@/pages/home'),
    name: 'home',
    meta: {
      isShowFooter: true, //用来控制是否显示footer组件
      isShowHeader: true, //用来控制是否显示Header组件
    },
  },
  {
    path: '/login',
    component: () => import('@/pages/Login'),
    meta: {
      isShowFooter: false,
      isShowHeader: false,
    },
  },
  {
    path: '*',
    redirect: '/home',
  },
];
