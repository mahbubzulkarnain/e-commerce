import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

function checkIsLogin(next) {
  if (localStorage.xs && localStorage.xi) {
    window.location.href = `${window.location.protocol}//${window.location.host}`;
  } else {
    next();
  }
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'not-found',
      component: () => import(/* webpackChunkName: "not-found" */ './views/NotFound'),
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/carts',
      name: 'cart',
      component: () => import(/* webpackChunkName: "login" */ './views/Cart.vue'),
    },
    {
      path: '/p',
      name: 'product',
      component: () => import(/* webpackChunkName: "product-index" */ './views/product/Index.vue'),
      children: [
        {
          path: 'create',
          name: 'product-create',
          component: () => import(/* webpackChunkName: "product-read" */ './views/product/Create.vue'),
        },
        {
          path: 'edit/:id',
          name: 'product-edit',
          component: () => import(/* webpackChunkName: "product-read" */ './views/product/Create.vue'),
        },
        {
          path: 'list',
          name: 'product-list',
          component: () => import(/* webpackChunkName: "product-read" */ './views/product/List.vue'),
        },
        {
          path: 'history',
          name: 'product-history',
          component: () => import(/* webpackChunkName: "product-read" */ './views/product/History.vue'),
        },
        {
          path: ':id',
          name: 'product-read-by-id',
          component: () => import(/* webpackChunkName: "product-read" */ './views/product/Read.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/auth/Login.vue'),
      beforeEnter: (to, from, next) => {
        checkIsLogin(next);
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/auth/Register.vue'),
      beforeEnter: (to, from, next) => {
        checkIsLogin(next);
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});


export default router;
