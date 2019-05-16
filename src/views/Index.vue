<template>
  <div class="index">
    <router-view class="index-page"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="scss">
.index {
  &-page {
    box-sizing: border-box;
    padding-bottom: 50px;
    height: 100vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
