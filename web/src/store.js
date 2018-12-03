import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookDetail: null,
    booksList: null
  },
  // mutation 修改 state
  mutations: {
    SET_BOOK_DETAIL (state, payload) {
      state.bookDetail = payload;
    },
    SET_BOOKS_LIST (state, payload) {
      state.booksList = payload;
    }
  }
});