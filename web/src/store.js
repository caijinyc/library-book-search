import Vue from 'vue';
import Vuex from 'vuex';
import Store from './common/js/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchName: '',
    bookDetail: Store.get('bookDetail', []),
    booksList: Store.get('booksList', []),
    collectionList: Store.get('collection', [])
  },
  getters: {
    collectionList (state) {
      return state.collectionList;
    }
  },
  // mutation 修改 state
  mutations: {
    SET_BOOK_DETAIL (state, payload) {
      state.bookDetail = payload;
    },
    SET_BOOKS_LIST (state, payload) {
      state.booksList = payload;
    },
    SET_SEARCH_NAME (state, payload) {
      state.searchName = payload;
    },
    SET_COLLECTION_LIST (state, payload) {
      state.collectionList = payload;
    }
  },
  actions: {
    saveCollectionList ({ commit }, val) {
      let books = Store.get('collection', []);
      const index = books.findIndex((el) => {
        return el.num === val.num;
      });
      if (index > -1) {
        books.splice(index, 1);
      } else {
        books.push(val);
      }
      Store.set('collection', books);
      commit('SET_COLLECTION_LIST', books);
    },
    deleteCollectionList ({ commit }, num) {
      let books = Store.get('collection', []);
      let index = books.findIndex((el) => {
        return num === el.num;
      });
      if (index > -1) {
        books.splice(index, 1);
      }
      Store.set('collection', books);
      commit('SET_COLLECTION_LIST', books);
    }
  }
});