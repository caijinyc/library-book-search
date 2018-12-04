// 书籍详情页面 router: /bookdetail

<template>
  <div class="book-detail-container">
    <!-- 顶栏 -->
    <div class="header">
      <span class="back" @click="backPrePage">
        <i class="iconfont icon-back" />
      </span>
      书籍详情
    </div>
    <div class="book-name">
      <!-- <span>题名</span> -->
      <p>{{ bookDetail.series }}</p>
    </div>
    
    <!-- 基本信息 -->
    <ul class="book-other-info">
      <span>基本信息</span>
      <li v-if="this.author">作者：{{ this.parseAuthor }}</li>
      <li v-if="bookDetail.bookman">出版发行商：{{ bookDetail.bookman }}</li>
      <li v-if="bookDetail.pages">页数: {{ bookDetail.pages }}</li>
      <li v-if="bookDetail.class">分类：{{ bookDetail.class }}</li>
      <li v-if="bookDetail.isbn">ISBN及定价：{{ bookDetail.isbn }}</li>
    </ul>

    <!-- 内容简介 -->
    <div class="summary-container" v-if="bookDetail.summary">
      <p class="summary-container-title">内容简介</p>
      <p class="summary-detail">{{ bookDetail.summary }}</p>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'BookDetail',
  data () {
    return {
    };
  },
  computed: {
    // 返回 vuex 中的 state
    bookDetail () {
      return this.$store.state.bookDetail;
    },

    // 解析作者名，先解析 JSON
    // 1. 没有作者名直接返回：'无'
    // 2. 1 个作者直接返回：'作者名称'
    // 3. 多个作者返回：'作者1、作者2、作者3'
    parseAuthor () {
      if (!this.bookDetail.publisher) return '无';
      let authorArr = JSON.parse(this.bookDetail.publisher);
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
    }
  },
  methods: {
    // vue-router 返回上一页
    backPrePage () {
      this.$router.go(-1);
    }
  }
};
  
</script>

<style lang="scss" scoped>
  @import "../../common/scss/variable.scss";

  .header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45px;
    color: #fff;
    font-size: 16px;
    background: $color-theme;

    .back {
      position: absolute;
      left: 10px;
      font-size: 15px;
      color: #fff;
    }
  }

 .book-detail-container {
   position: fixed;
   top: 60px;
   left: 0;
   box-sizing: border-box;
   padding: 0 10px 60px 10px;
   width: 100%;
   height: 100%;
   background: #fff;
   text-align: left;
   z-index: 1;

   .book-name {
      span {
        display: inline-block;
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
        color: $color-darkgray;
      }

      p {
        margin-bottom: 15px;
        color: $color-theme;
        font-size: 36px;
        font-weight: bold;
      }
   }

  .book-other-info {
    margin-bottom: 15px;
    line-height: 24px;
    font-size: 14px;

    span {
      display: inline-block;
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: bold;
      color: $color-darkgray;
    }
  }

  .summary-container {
    .summary-container-title {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: bold;
      color: $color-darkgray;
    }

    .summary-detail {
      font-size: 14px;
      line-height: 22px;
    }
  }  
 }
</style>
