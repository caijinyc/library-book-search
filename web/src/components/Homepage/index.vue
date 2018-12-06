<template>
  <div class="homepage">
    <div class="search-container" v-show="!showBooksList">
      <div class="logo">
        <i class="icon-books iconfont"></i>
      </div>
      <div class="input-container">
        <i class="icon-search iconfont"></i>
        <input
          type="text"
          v-model="searchName"
          :placeholder="placeholderSearchName"
          @keyup.enter="getBookInfo"
        >
        <button @click="getBookInfo">搜索</button>
      </div>
    </div>
    <div class="books-list" v-show="showBooksList" >
    </div>
    <Loding text="查询中" class="loding-container" v-show="showLoding"/>
    <Alert text="您还没有输入哦~" class="alert-container" v-show="showAlert" />
  </div>
</template>

<script>
import axios from 'axios';

import Loding from '../../base/Loding';
import Alert from '../../base/Alert';

const DEFAULT_PLACEHOLDER_SEARCH_NAME = '请输入书籍名称';

export default {
  name: 'Homepage',
  components: {
    Loding,
    Alert
  },
  data () {
    return {
      searhType: {
        bookName: 1,
        bookAuthor: 2
      },
      showLoding: false,
      showAlert: false,
      searchedBooksInfo: [],
      showBooksList: false,
      placeholderSearchName: DEFAULT_PLACEHOLDER_SEARCH_NAME
    };
  },
  computed: {
    searchName: {
      get () {
        return this.$store.state.searchName;
      },
      set (val) {
        this.$store.commit('SET_SEARCH_NAME', val);
      }
    }
  },
  methods: {
    getBookInfo () {
      if (!this.searchName) {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 1000);
        return;
      }
      this.showLoding = true;
      const url = `http://192.168.31.28:3000/searchname?bookname=${this.searchName}`;
      axios.get(url).then((res) => {
        // 拿到检索结果后显示 list 界面
        this.showLoding = false;
        this.$store.commit('SET_BOOKS_LIST', res.data);
        this.$router.push('/bookslist');
      });
    },
    hideBooksList () {
      this.showBooksList = false;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "../../common/scss/variable.scss";

  .homepage {
    text-align: center;
  }

  .search-container {
    padding-top: 24vh;

    .logo {
      margin-bottom: 40px;

      i {
        font-size: 60px;
        color: $color-theme;
      }
    }

    .input-container {
      display: inline-block;
      position: relative;

      i {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 25px;
        color: $color-lightgray;
      }

      input {
        box-sizing: border-box;
        padding: 0 70px 0 40px;
        width: 83vw;
        height: 45px;
        font-size: 15px;
        border: 1px solid $color-border-divide;
        border-radius: 13px;
        box-shadow: 0 0 5px 1px #f0f0f0;
        outline: none;
      }

      button {
        position: absolute;
        right: 0;
        height: 45px;
        width: 60px;
        font-size: 15px;
        color: #fff;
        background: $color-theme;
        border: none;
        border-radius: 0 13px 13px 0;
        outline: none;
      }
    }
 }

  .loding-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }

  .alert-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }
</style>
