<template>
  <div class="item">
    <div class="item-left">
      <p class="item-title">第二课《难忘的回忆》</p>
      <span class="item-subtitle">127,257人已学完</span>
      <div class="item-icon-wrap">
        <div class="item-share">
          <van-icon name="share" size="18px" /><span>分享</span>
        </div>
        <div class="item-collection">
          <van-icon name="like-o" size="18px" /><span>收藏</span>
        </div>
      </div>
    </div>
    <div class="item-right">
      <img src="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.item {
  @include flex-center;
  justify-content: space-between;
  padding: 16px;
  background-color: #fff;
  border-bottom: 1px solid #fafafa;
  &-left {
    flex: 1;
  }
  &-title {
    @include line-clamp(2);
    font-size: 16px;
    font-weight: 400;
    color: #222222;
    line-height: 22px;
  }
  &-subtitle {
    display: block;
    margin-top: 4px;
    margin-bottom: 13px;
    font-size: 11px;
    color: #d8dcdd;
  }
  &-right {
    margin-left: 31px;
    width: 72px;
    height: 72px;
    background: #ccc;
    border-radius: 6px;
  }
  &-icon-wrap {
    display: flex;
    align-items: center;
    & > div {
      @include flex-center;
      margin-right: 27px;
      font-size: 12px;
      span {
        margin-left: 2px;
      }
    }
  }
  & &.active {
    background-color: #fafafa;
  }
}
</style>
