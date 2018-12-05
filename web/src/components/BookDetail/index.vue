// 书籍详情页面 router: /bookdetail

<template>
<transition name="slide">
  <div class="book-detail-container">
    <!-- 顶栏 -->
    <div class="header">
      <span class="back" @click="backPrePage">
        <i class="iconfont icon-back" />
      </span>
      书籍详情
      <span class="collect" @click="">
        <i class="iconfont icon-collect" />
      </span>
    </div>

    <div class="book-name">
      <!-- <span>题名</span> -->
      <!-- <i class="iconfont icon-shuming"></i> -->
      <p>
        {{ bookDetail.series }}
        </p>
    </div>
    
    <!-- 基本信息 -->
    <ul class="book-other-info">
      <p class="small-title">
        <i class="iconfont icon-jibenxinxi-copy"></i>
        基本信息
      </p>
      <li v-if="bookDetail.publisher">作者：{{ this.parseAuthor }}</li>
      <li v-if="bookDetail.bookman">出版发行商：{{ bookDetail.bookman }}</li>
      <li v-if="bookDetail.pages">页数: {{ bookDetail.pages }}</li>
      <li v-if="bookDetail.class">分类：{{ bookDetail.class }}</li>
      <li v-if="bookDetail.isbn">ISBN及定价：{{ bookDetail.isbn }}</li>
    </ul>

    <!-- 内容简介 -->
    <div class="summary-container" v-if="bookDetail.summary">
      <p class="small-title">
        <i class="iconfont icon-jibenxinxi"></i>
        内容简介
      </p>
      <p class="summary-detail">{{ bookDetail.summary }}</p>
    </div>

    <div class="book-status-container" v-if="bookDetail.status">
      <p class="small-title">
        <i class="iconfont icon-didian-copy"></i>
        借阅地点
      </p>
      <table class="book-status" v-for="(item, index) in bookStatus" :key="index">
        <tr>
          <td class="td-title">书籍编号</td>
          <td>{{ item.num }}</td>
        </tr>
        <tr >
          <td class="td-title">馆藏地址</td>
          <td>{{ item.address }}</td>
        </tr>
        <tr >
          <td class="td-title">索书号</td>
          <td>{{ item.index }}</td>
        </tr>
        <tr >
          <td class="td-title">书刊状态</td>
          <td>{{ item.status }}</td>
        </tr>
      </table>
    </div>
  </div>  
</transition>
</template>

<script>
export default {
  name: 'BookDetail',
  data () {
    return {
    };
  },
  updated () {
    window.scroll(0, 0);
  },
  computed: {
    // 返回 vuex 中的 state
    bookDetail () {
      return this.$store.state.bookDetail;
    },
    
    bookStatus () {
      return JSON.parse(this.bookDetail.status);
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

  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s
  }
  .slide-enter, .slide-leave-to {
    // transform: translate3d(100%, 0, 0);
    opacity: 0;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    color: $color-text;
    font-size: 16px;
    background: #fff;
    border-bottom: 1px solid $color-lightgray;
    z-index: 999;

    .back {
      position: absolute;
      left: 10px;
      font-size: 15px;
    }

    .collect {
      position: absolute;
      right: 13px;

      i {
        font-size: 20px;
      }
    }
  }

 .book-detail-container {
   position: relative;
   box-sizing: border-box;
   
   padding: 70px 10px 0 10px;
   width: 100%;
   min-height: 100vh;
   overflow: hidden;
   background: #fff;
   filter:(10px);
   text-align: left;
   z-index: 2;

   .book-name {
      color: $color-darkgray;

      i {
        position: relative;
        left: -2px;
        font-size: 30px;
        color: $color-theme;
      }

      p {
        margin-bottom: 15px;
        font-size: 30px;
      }
   }

  .book-other-info {
    margin-bottom: 15px;
    line-height: 24px;
    font-size: 14px;
    color: $color-darkgray;

    span {
      display: inline-block;
      margin-bottom: 10px;
      font-size: 20px;
    }
  }

  .summary-container {
    margin-bottom: 15px;
    color: $color-darkgray;

    .summary-detail {
      font-size: 14px;
      line-height: 22px;
    }
  }  
 }

  .small-title {
    position: relative;
    padding-left: 20px;
    margin-bottom: 10px;
    font-size: 18px;

    i {
      position: absolute;
      left: 0;
      color: $color-theme;
    }

    .icon-jibenxinxi-copy {
      top: -1px;
    }

    .icon-jibenxinxi {
      top: 4px;
      font-size: 17px;
    }
    
    .icon-didian-copy {
      top: 3px;
      font-size: 17px;
    }
  }

 .book-status-container {
    font-size: 14px;
    color: $color-darkgray;

    .book-status {
      line-height: 20px;
      margin-bottom: 10px;
    }
   
    table {
      width: 100%;
      border-collapse: collapse;
    }

    .td-title {
      width: 58px;
    }

    td {
      padding: 0 5px;
    }

    table, th, td {
      border: 1px solid $color-lightgray;
      line-height: 22px;
    }
 }
</style>
