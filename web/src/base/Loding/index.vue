<template>
  <div class="loding-container">
    <div class="bouncing-loader">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <p>{{ text }}</p>
  </div>
</template>

<script>
  export default {
    name: 'Loding',
    props: {
      text: {
        type: String,
        default: '查询中'
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/variable.scss";

  @keyframes bouncing-loader {
    to {
      opacity: 0.1;
      transform: translate3d(0, -5px, 0);
    }
  }
  
  .bouncing-loader {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .bouncing-loader > div {
    width: 9px;
    height: 9px;
    margin: 30px 3px 20px 0;
    background: $color-theme;
    border-radius: 50%;
    animation: bouncing-loader 0.6s infinite alternate;
  }
  .bouncing-loader > div:nth-child(2) {
    animation-delay: 0.2s;
  }
  .bouncing-loader > div:nth-child(3) {
    animation-delay: 0.4s;
  }

  .loding-container {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background: $color-border-divide;

    p {
      font-size: 14px;
      color: $color-darkgray;
      text-align: center;
    }
  }
</style>
