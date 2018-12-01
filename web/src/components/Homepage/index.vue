<template>
  <div class="homepage">
    <div class="search-container">
      <div class="logo">
        <i class="icon-books iconfont"></i>
      </div>
      <div class="input-container">
        <i class="icon-search iconfont"></i>
        <input type="text" v-model="searchName">
        <button @click="getBookInfo">搜索</button>
      </div>
    </div>
    <div class="footer">
      <!-- <button class="footer-btn-search"></button>
      <button class="footer-btn-search"></button>
      <button class="footer-btn-search"></button> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Homepage',
  data () {
    return {
      searchName: '',
      searhType: {
        bookName: 1,
        bookAuthor: 2
      }
    };
  },
  methods: {
    getBookInfo () {
      const url = `http://localhost:3000/searchname?bookname=${this.searchName}`;
      axios.get(url).then((res) => {
        console.log('res: ', res);
      });
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
    margin-top: 120px;

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
</style>
