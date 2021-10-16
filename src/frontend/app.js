import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './public/css/index.css';
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
