<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';

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

#app {
  height: 100%;
}
</style>
