// 收藏夹页面 router: /collection

<template>
  <div class="collection-container">
    <!-- 顶部功能栏（返回主页、查找其他书籍） -->
    <div class="search-container">
      <div class="get-search-name">
      </div>
    </div>
    <div class="no-collection-note" v-if="collectionList.length === 0">
      <i class="iconfont icon-collection"></i>
      <p>您的收藏夹还是空的</p>
      <p>查找书籍时时点击爱心即可收藏</p>
    </div>
    <div class="books-list-container" v-else>
      <ul class="books-list" >
        <li
          v-for="(item, index) in collectionList"
          :key="index"
          @click="getBookInfoByNum(item.num)"
        >
          <i class="iconfont icon-del" @click.stop="controlShowAlert(item.num)" ></i>
          <p class="title">{{ index + 1 }}.{{ item.name }}</p>
          <p class="author">
            <span class="lil-title">
              作者 {{ item.author }} / 出版 {{ item.bookman }}
            </span>
          </p>
        </li>
      </ul>
    </div>
    <Loding class="collection-loding-container" text="请等待" v-show="showLoding"/>
    <div class="alert-container" v-show="showAlert">
      <div class="alert">
        <p>确定要取消收藏吗？</p>
        <div class="btn-container">
          <button @click="removeCollection">确定</button>
          <button @click="controlShowAlert">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  import Loding from '../../base/Loding';

  export default {
    name: 'Collection',
    components: {
      Loding
    },
    data () {
      return {
        showLoding: false,
        showAlert: false,
        deleteItemNum: null
      };
    },
    computed: {
      collectionList () {
        return this.$store.state.collectionList;
      },
    },
    methods: {
      getBookInfoByNum (num) {
        this.showLoding = true;
        const url = `http://192.168.31.28:3000/booknum?num=${num}`;
        axios.get(url).then((res) => {
          this.showLoding = false;
          this.$store.commit('SET_BOOK_DETAIL', res.data[0]);
          this.$router.push('/bookdetail');
        }).catch(() => {
          // TODO：发出错误提示
          // console.log('err');
        });
      },
      controlShowAlert (num) {
        if (Number(num)) {
          this.deleteItemNum = num;
        }
        this.showAlert = !this.showAlert;
      },
      removeCollection () {
        this.controlShowAlert();
        this.$store.dispatch('deleteCollectionList', this.deleteItemNum);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/variable.scss";

  .no-collection-note {
    padding-top: 30vh;
    width: 100%;
    text-align: center;

    i {
      display: inline-block;
      padding-bottom: 20px;
      font-size: 70px;
      color: $color-theme-gray;
    }

    p {
      line-height: 20px;
      font-size: 14px;
      color: $color-theme-gray;
    }
  }

  .books-list-container {
    list-style-type: none;
    text-align: left;
    padding-bottom: 59px;
    
    li {
      position: relative;
      padding: 15px 10px;
      text-align: left;
      border-bottom: 1px solid $color-border-divide;

      i {
        position: absolute;
        padding: 10px;
        font-size: 20px;
        right: 7px;
        top: 50%;
        transform: translate3d(0, -50%, 0);
      }

      p {
        padding-right: 40px;
      }
      
      .title {
        font-size: 16px;
        font-weight: bold;
        color: $color-text;
      }

      .author, .book-concern {
        font-size: 14px;
        color: $color-text;
      }
    }
  }

  .collection-loding-container {
    position: fixed;
    top: 35%;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    z-index: 999;
  }

  .alert-container {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
    color: $color-text;

    .alert {
      position: absolute;
      top: 35%;
      left: 50%;
      width: 200px;
      padding: 15px 20px 20px 18px;
      transform: translateX(-50%);
      background: rgba(77, 77, 77, 0.781);
      color: #fff;
      border-radius: 15px;

      p {
        margin: 10px 0 12px;
        font-size: 16px;
      }

      button {
        margin: 0 10px;
        width: 60px;
        height: 30px;
        color: #fff;
        font-size: 14px;

      }
    }

    p {
      font-size: 14px;
    }
  }
</style>
