<template>
  <div class="index">
    <router-view class="index-page"></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search" dot>标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o" info="5">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o" info="20" to="/welfareCentre">福利中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1
    };
  }
};
</script>

<style lang="scss">
.index {
  &-page {
    height: calc(100vh - 50px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
