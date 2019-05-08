<template>
  <div id="app" class="app">
    <router-view />
    <div class="__dialog" v-if="false">
      <div class="__dialog-content">
        <span>如果您觉得还不错</span>
        <p>请将学习宝分享给</p>
        <p>更多的孩子和家长吧</p>
        <div class="__dialog-btn">分享给好友吧</div>
      </div>
      <i class="__dialog-close"></i>
    </div>
  </div>
</template>

<style lang="scss">
@import url("./assets/style/common.scss");
.__dialog {
  @include flex-column-center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba($color: #000000, $alpha: 0.7);
  &-content {
    @include flex-column-center;
    justify-content: flex-start;
    box-sizing: border-box;
    padding-top: 168px;
    background: url("./assets/image/share-dialog/background.png") no-repeat;
    background-size: 100%;
    width: 279px;
    height: 336px;
    border-radius: 6px;

    span {
      display: block;
      margin-bottom: 4px;
    }
    p {
      font-size: 18px;
      line-height: 25px;
      color: #353637;
      font-weight: bold;
    }
  }
  &-btn {
    @include flex-column-center;
    margin-top: 24px;
    width: 160px;
    height: 40px;
    color: #fff;
    background: rgba(36, 181, 146, 1);
    border-radius: 23px;
  }
  &-close {
    display: block;
    margin-top: 11px;
    width: 26px;
    height: 26px;
    background: url("./assets/image/share-dialog/icon-cancel.png") no-repeat;
    background-size: 100%;
  }
}
</style>
