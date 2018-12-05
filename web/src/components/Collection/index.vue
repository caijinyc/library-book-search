// 收藏夹页面 router: /collection

<template>
  <div class="collection-container">
    <!-- 顶部功能栏（返回主页、查找其他书籍） -->
    <div class="search-container">
      <div class="get-search-name">
      </div>
    </div>
    <div class="no-collection-note" v-if="collection.length === 0">
      <i class="iconfont icon-collection"></i>
      <p>您的收藏夹还是空的</p>
      <p>查找书籍时时点击爱心即可收藏</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Collection',
    data () {
      return {
        collection: []
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/variable.scss";

  .no-collection-note {
    margin-top: 30vh;
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
</style>
