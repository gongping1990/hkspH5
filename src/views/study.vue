<template>
  <div class="study">
    <div class="header van-hairline--bottom">
      <div class="header-left">
        <span
          class="subject"
          :class="{ active: active == 1 }"
          @click="changeTab(1)"
          >语文</span
        >
        <span
          class="subject"
          :class="{ active: active == 2 }"
          @click="changeTab(2)"
          >数学</span
        >
        <span
          class="subject"
          :class="{ active: active == 3 }"
          @click="changeTab(3)"
          >英语</span
        >
      </div>
      <div class="search">
        <i class="search-icon"></i>
        <span>搜索</span>
      </div>
    </div>
    <div class="scroll">
      <cube-scroll ref="scroll" :options="options" @pulling-up="onPullingUp">
        <div class="scroll-content">
          <h2 class="scroll-title">实用学习工具</h2>
          <div class="tool" v-if="active == 1">
            <div class="tool-left">
              <router-link to="/composition?id=1125293952905711617&subject=1">
                <img src="../assets/image/study/zwbd.png" />
              </router-link>
            </div>
            <div class="tool-right">
              <div class="tool-item">
                <img src="../assets/image/study/xxsz.png" />
              </div>
              <div class="tool-item">
                <img src="../assets/image/study/kwld.png" />
              </div>
            </div>
          </div>
          <h2 class="scroll-title">精品内容推荐</h2>
          <div class="list">
            <div class="item" v-for="i in 20" :key="i">
              <img class="item-img" src="" />
              <div class="van-hairline--bottom">
                <p>汉字</p>
                <span>通过幽默诙谐的讲述方式来讲述故事。</span>
              </div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
      options: {
        pullUpLoad: {
          txt: {
            more: "加载更多",
            noMore: "没有更多数据了"
          }
        }
      }
    };
  },
  methods: {
    onPullingUp() {
      console.log(111);
      setTimeout(() => {
        this.$refs.scroll.forceUpdate();
      }, 1000);
    },
    changeTab(index) {
      this.active = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.study {
  .list {
    .item {
      display: flex;
      margin-bottom: 32px;
      &-img {
        margin-right: 16px;
        width: 80px;
        height: 80px;
        border-radius: 6px;
      }
      div {
        flex: 1;
      }
      p {
        @include text-overflow;
        margin-bottom: 2px;
        font-size: 16px;
        line-height: 18px;
        font-weight: 500;
        color: #222222;
      }
      span {
        @include line-clamp;
        font-size: 11px;
        line-height: 16px;
        color: #98a3a5;
      }
    }
  }
  .scroll {
    box-sizing: border-box;
    padding: 0 16px;
    height: calc(100vh - 104px);
    &-title {
      margin-top: 10px;
      margin-bottom: 12px;
      line-height: 20px;
      color: #353637;
      font-weight: 500;
    }
  }
  .tool {
    display: flex;
    justify-content: center;
    margin-bottom: 22px;
    &-left {
      margin-right: 12px;
      img {
        width: 166px;
        height: 166px;
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
        border-radius: 6px;
      }
    }
    &-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &-item {
      img {
        width: 166px;
        height: 77px;
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
        border-radius: 6px;
      }
    }
  }
  .header {
    @include flex-center;
    justify-content: space-between;
    padding: 0 16px;
    height: 54px;
    &-left {
      @include flex-center;
    }
    .subject {
      @include flex-center;
      margin-right: 8px;
      width: 64px;
      height: 30px;
      flex: 1;
      font-size: 16px;
      font-weight: 500;
      &.active {
        color: #24b592;
        border-radius: 18px;
        background-color: rgba($color: #24b592, $alpha: 0.1);
      }
    }
  }
  .search {
    @include flex-center;
    width: 111px;
    height: 30px;
    color: #98a3a5;
    font-size: 12px;
    background: rgba(246, 246, 246, 1);
    border-radius: 15px;
    &-icon {
      @include bg("/study/icon-search.png");
      display: block;
      margin-right: 6px;
      width: 13px;
      height: 13px;
    }
  }
}
</style>
