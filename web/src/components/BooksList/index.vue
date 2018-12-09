// 书籍检索结果页面 router: /bookslist

<template>
  <div class="books-list-container">
      <!-- 顶部功能栏（返回主页、查找其他书籍） -->
      <div class="search-container">
        <div class="back" @click="backHomepage">
          <i class="iconfont icon-home-copy"></i>
        </div>
        <div class="get-search-name">
          <i class="iconfont icon-search"></i>
          <input
            type="text"
            class="search-name"
            :placeholder="placeholderSearchName"
            v-model="searchName"
            @keyup.enter="getBookInfo"
          >
        </div>
        <button @click="getBookInfo">搜索</button>
      </div>

      <!-- 查找书籍结果展示 -->
      <div class="books-list-container">
        <div class="tip" v-if="searchedBooksInfo.length === 0">
          <i class="iconfont icon-baoqian"></i>
          <p>伤心，没有找到需要的书...</p>
        </div>
        <ul class="books-list" v-else>
          <li
            v-for="(item, index) in searchedBooksInfo"
            :key="index"
            @click="getBookInfoByNum(item.num)"
          >
            <p class="title">{{ item.series }}</p>
            <p class="author">
              <span class="lil-title">
                作者 {{ parseAuthor(item.publisher) }} / 出版 {{ item.bookman }}
              </span>
            </p>
          </li>
        </ul>
      </div>
      <Loding class="loding-container" text="请等待" v-show="showLoding"/>
      <Alert class="alert-container" text="您没有输入哦~" v-show="showAlert"/>
  </div>
</template>

<script>
import axios from 'axios';
import Store from '../../common/js/storage.js';

import Loding from '../../base/Loding';
import Alert from '../../base/Alert';

const DEFAULT_PLACEHOLDER_SEARCH_NAME = '请输入书籍名称';

export default {
  name: 'BooksList',
  components: {
    Loding,
    Alert
  },
  data () {
    return {
      placeholderSearchName: DEFAULT_PLACEHOLDER_SEARCH_NAME,
      showLoding: false,
      showAlert: false
    };
  },
  computed: {
    // 获取 vuex 中的检索结果
    searchedBooksInfo () {
      return this.$store.state.booksList;
    },
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
    // 解析 JSON 并判断作者个数转为字符串返回
    parseAuthor (authors) {
      if (!authors) return '无';
      let authorArr = JSON.parse(authors);
      if (authorArr.length > 1) {
        let authors = '';
        authorArr.forEach((item, index) => {
          if (index !== authorArr.length - 1) {
            authors += item + '、';
          } else {
            authors += item;
          }
        });
        return authors;
      }
      return authorArr[0];
    },
    backHomepage () {
      this.$router.go(-1);
    },
    getBookInfoByNum (num) {
      this.showLoding = true;
      const url = `http://192.168.31.28:3000/booknum?num=${num}`;
      axios.get(url).then((res) => {
        this.showLoding = false;
        this.$store.commit('SET_BOOK_DETAIL', res.data[0]);
        Store.set('bookDetail', res.data[0]);
        this.$router.push('/bookdetail');
      }).catch(() => {
        // TODO：发出错误提示
        // console.log('err');
      });
    },
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
        this.showLoding = false;
        // 拿到检索结果后显示 list 界面
        this.$store.commit('SET_BOOKS_LIST', res.data);
        Store.set('booksList', res.data);
      });
    }
  }
};
</script>

<style scoped lang="scss">
  @import "../../common/scss/variable.scss";

  .books-list-container {
    position: relative;
    padding-top: 25px;
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    background: #fff;
    // 使用 z-index 覆盖 Footer
    z-index: 1;

    .tip {
      margin-top: 150px;
      text-align: center;
      color: $color-theme-gray;

      i {
        font-size: 70px;
        opacity: 0.5;
      }

      p {
        margin-top: 23px;
        font-size: 16px;
      }
    }
  }

  .search-container {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 50px;
    padding: 5px 15px;
    box-sizing: border-box;
    width: 100%;
    background: $color-theme;
    font-size: 15px;
    z-index: 2;

    .back {
      display: inline-block;
      margin-right: 15px;
      color: #fff;

      i {
        // font-size 无法继承
        font-size: 20px;
      }
    }

    .get-search-name {
      flex: 1;
      position: relative;

      i {
        position: absolute;
        top: 9px;
        left: 10px;
        font-size: 16px;
        color: $color-lightgray;
      }

      input {
        padding: 0 15px 0 32px;
        width: 100%;
        height: 35px;
        font-size: 14px;
        line-height: 35px;
        box-sizing: border-box;
        border-radius: 8px;
        outline: none;
        border: none;
      }
    }

    button {
      margin-left: 13px;
      color: #fff;
      font-size: 15px;
      outline: none;
      background: none;
      border: none;
    }
  }

  .books-list-container {
    list-style-type: none;
    text-align: left;
    
    li {
      padding: 15px 10px;
      text-align: left;
      border-bottom: 1px solid $color-border-divide;
      
      .title {
        font-size: 24px;
        // font-weight: bold;
        color: $color-text;
      }

      .author, .book-concern {
        font-size: 14px;
        color: $color-text;
      }
    }
  }
  
  .alert-container, .loding-container {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    z-index: 999;
  }
</style>
