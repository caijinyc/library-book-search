<template>
  <div class="alert-container">
    <p>{{ text }}</p>
    <div class="background"></div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    text: {
      type: String,
      default: 'adsifj'
    }
  }
};
</script>

<style lang="scss" scoped>
  .alert-container {
    position: relative;
    display: inline-block;
    padding: 10px 15px 12px 15px;
    text-align: center;
    font-size: 14px;
    border-radius: 8px;
    background: rgba(77, 77, 77, 0.781);
    color: #fff;
    z-index: 999;
 }
</style>


