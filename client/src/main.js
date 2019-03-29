import Vue from 'vue';
import VueClazyLoad from 'vue-clazy-load';
import api from './helpers/api';
import App from './App.vue';
import router from './router';
import store from './store';

import ImageLazyLoad from './components/ImageLazyLoad.vue';

import WithSidebar from './components/layout/WithSidebar.vue';
import WithoutSidebar from './components/layout/WithoutSidebar.vue';

Vue.use(VueClazyLoad);

Vue.component('ImageLazyLoad', ImageLazyLoad);


Vue.component('WithSidebar', WithSidebar);
Vue.component('WithoutSidebar', WithoutSidebar);

Vue.prototype.$api = api;

if (localStorage.xs) {
  Vue.prototype.$api.defaults.headers.common.Authorization = `Bearer ${localStorage.xs}`;
}

Vue.config.productionTip = false;
document.title = 'Ecommerce';
Vue.prototype.webname = 'Ecommerce';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
