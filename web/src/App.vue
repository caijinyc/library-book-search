<template>
  <div id="app">
    <!-- keep-alive Vue 内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer';

export default {
  name: 'app',
  components: {
    Footer
  },
  data () {
    return {
      searchBooksList: null
    };
  },
  methods: {
  }
};
</script>

<style lang="scss">
@import "./common/scss/reset.scss";

html, body {
  height: 100%;
}

body {
  font-family: -apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,"PingFang SC","Hiragino Sans GB",STHeiti,"Microsoft YaHei","Microsoft JhengHei","Source Han Sans SC","Noto Sans CJK SC","Source Han Sans CN","Noto Sans SC","Source Han Sans TC","Noto Sans CJK TC","WenQuanYi Micro Hei",SimSun,sans-serif;
}

#app {
  height: 100%;
}
</style>
