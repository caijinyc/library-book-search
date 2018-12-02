import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import Collection from './components/Collection';
import Homepage from './components/Homepage';

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  { path: '/', redirect: '/search' },
  { path: '/collection', component: Collection },
  { path: '/search', component: Homepage}
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
