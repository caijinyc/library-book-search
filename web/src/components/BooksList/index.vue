<template>
  <div class="books-list">
    <div class="search-container">
      <div class="back">
        <i class="iconfont icon-fanhui"></i>
        返回
      </div>
      <div class="get-search-name">
        <i class="iconfont icon-search"></i>
        <input type="text" class="search-name">
      </div>
      <button>搜索</button>
    </div>
    <div class="books-list-container">
      <div class="tip" v-if="searchedBooksInfo.length === 0">
        <p>没有找到需要的书</p>
      </div>
      <ul class="books-list" v-else>
        <li v-for="(item, index) in searchedBooksInfo" :key="index">
          <p class="title">{{ item.series }}</p>
          <p class="author">
            <span class="lil-title">
              作者: 
            </span>
            {{ parsePublisher(item.publisher)[0] }}
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
  props: {
    // 进行类型检查
    searchedBooksInfo: {
      type: Array
    }
  },
  data () {
    return {
    };
  },
  methods: {
    parsePublisher (val) {
      if (!val) {
        return [];
      }
      let arr = JSON.parse(val);
      return arr;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "../../common/scss/variable.scss";

  .search-container {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 50px;
    padding: 5px 10px;
    box-sizing: border-box;
    width: 100%;
    background: $color-theme;
    font-size: 15px;

    .back {
      display: inline-block;
      width: 50px;
      margin-right: 15px;
      color: #fff;
    }

    .get-search-name {
      flex: 1;
      position: relative;

      i {
        position: absolute;
        left: 0;
        color: $color-lightgray;
      }

      input {
        height: 24px;
        border-radius: 5px;
        width: 100%;
        outline: none;
        border: none;
      }
    }

    button {
      margin-left: 15px;
      color: #fff;
      font-size: 15px;
      outline: none;
      background: none;
      border: none;
    }
  }

  .books-list-container {
    margin-top: 50px;
    margin-bottom: 59px;
    list-style-type: none;
    text-align: left;
    
    li {
      padding: 10px 10px;
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
