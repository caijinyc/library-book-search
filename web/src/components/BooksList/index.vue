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
          <input type="text" class="search-name">
        </div>
        <button>搜索</button>
      </div>

      <!-- 查找书籍结果展示 -->
      <div class="books-list-container">
        <div class="tip" v-if="searchedBooksInfo.length === 0">
          <p>没有找到需要的书</p>
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
                作者: 
              </span>
              {{ parseAuthor(item.publisher) }}
            </p>
            <p class="book-concern">
              <span class="lil-title">
                出版: 
              </span>
              {{ item.bookman }}
            </p>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BooksList',
  data () {
    return {
    };
  },
  computed: {
    // 获取 vuex 中的检索结果
    searchedBooksInfo () {
      return this.$store.state.booksList;
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
      const url = `http://192.168.0.123:3000/booknum?num=${num}`;
      axios.get(url).then((res) => {
        // console.log('res', res);
        this.$store.commit('SET_BOOK_DETAIL', res.data[0]);
        this.$router.push('/bookdetail');
      }).catch(() => {
        // TODO：发出错误提示
        // console.log('err');
      });
    }
  }
};
</script>

<style scoped lang="scss">
  @import "../../common/scss/variable.scss";

  .books-list-container {
    position: absolute;
    top: 20px;
    left: 0px;
    width: 100%;
    background: #fff;
    // 使用 z-index 覆盖 Footer
    z-index: 1;
  }

  .search-container {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 45px;
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
        top: 6px;
        left: 8px;
        font-size: 17px;
        color: $color-lightgray;
      }

      input {
        height: 28px;
        box-sizing: border-box;
        padding: 0 15px 0 30px;
        border-radius: 8px;
        width: 100%;
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
        font-weight: bold;
        color: $color-text;
      }

      .author, .book-concern {
        font-size: 14px;
        color: $color-text;
      }
    }
  }
</style>
