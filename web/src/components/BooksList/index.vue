<template>
  <div class="books-list">
    <div class="search-container">
      <input type="text" v-model="searchName">
      <button @click="getBookInfo">搜索</button>
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
  name: 'BooksList',
  data () {
    return {
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
