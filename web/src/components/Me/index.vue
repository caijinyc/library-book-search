<template>
  <div class="me-container">
    <i class="iconfont icon-Forma"></i>
    <p>登录图书馆账号后查看借阅情况</p>
    <button @click="controlShowAlert">前往绑定</button>
    <Alert
    class="alert-container"
    text="暂不支持「 因为没有图书馆的权限 」"
    v-show="showAlert"
    />
  </div>
</template>

<script>
import Alert from '../../base/Alert';

export default {
  components: {
    Alert
  },
  data () {
    return {
      showAlert: false
    };
  },
  methods: {
    controlShowAlert () {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../../common/scss/variable.scss";
  
  .me-container {
    text-align: center;
    padding-top: 25vh;

    i {
      color: $color-theme-gray;
      font-size: 60px;
    }

    p {
      margin: 15px 0 20px;
      color: $color-text;
      font-size: 14px;
    }

    button {
      padding: 6px 8px 8px 8px;
      border-radius: 5px;
      border: none;
      background: $color-theme;
      color: #fff;
      outline: none;
    }

    .alert-container {
      position: fixed;
      top: 55vh;
      left: 50%;
      width: 250px;
      transform: translateX(-50%);
    }
  }
</style>
