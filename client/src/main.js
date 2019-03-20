import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';

/**
 * fontawesome
 */
const baseURL = 'http://localhost:3000';

let headers = {};

if (localStorage.xs) {
  headers = {
    headers: {
      authorization: `Bearer ${localStorage.xs}`,
    },
  };
}

Vue.prototype.$baseURL = baseURL;

Vue.prototype.$api = axios.create({
  baseURL: `${baseURL}`,
  timeout: 3000,
  ...headers,
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
