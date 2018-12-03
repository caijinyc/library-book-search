import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import store from './store';

import Collection from './components/Collection';
import Homepage from './components/Homepage';
import BooksList from './components/BooksList';
import BookDetail from './components/BookDetail';

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  { path: '/', redirect: '/search' },
  { path: '/collection', component: Collection },
  { path: '/search', component: Homepage},
  { path: '/bookslist', component: BooksList},
  { path: '/bookdetail', component: BookDetail}
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
