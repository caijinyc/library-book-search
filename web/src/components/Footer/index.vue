// 底部 Footer 导航栏

<template>
  <div class="footer-container">
      <router-link to="/search">
        <button class="search">
          <i class="iconfont icon-book"></i>
          <p>
            查书
          </p>
        </button>
      </router-link>
      <router-link to="/collection">
        <button class="collection">
          <i class="iconfont icon-shoucang"></i>
          <p>
            收藏
          </p>
        </button>
      </router-link>
      <router-link to="/collection">
        <button class="me">
          <i class="iconfont icon-wo"></i>
          <p>
            我
          </p>
        </button>
      </router-link>
  </div>
</template>

<script>

export default {
  name: 'Footer',
  data () {
    return {
    };
  }
};
</script>

<style scoped lang="scss">
@import "../../common/scss/variable.scss";

.footer-container {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 20px;
  height: 60px;
  width: 100%;
  background: #fff;
  border-top: 1px solid $color-border-divide;

  .router-link-active {
    i, p {
      color: $color-theme;
    }
  }

  button {
    position: relative;
    margin-top: 7px;
    height: 45px;
    width: 40px;
    outline: none;
    background: none;
    border: none;

    i {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      font-size: 24px;
      color: $color-theme-gray;
    }

    p {
      position: absolute;
      bottom: 0;
      width: 100%;
      font-size: 12px;
      color: $color-theme-gray;
    }
  }

}
</style>
