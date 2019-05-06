<template>
  <div class="composition">
    <div class="header">
      <div class="back-btn">
        <van-icon color="#98A3A5" name="arrow-left" />
        <span>返回</span>
      </div>
      <div class="search">
        <span>搜索想找的内容</span>
      </div>
    </div>
    <cube-sticky class="sticky" :pos="scrollY">
      <cube-scroll
        ref="scroll"
        :scroll-events="['scroll']"
        @scroll="scrollHandler"
      >
        <div class="banner"></div>
        <cube-sticky-ele ele-key="22">
          <div class="tab" ref="tab">
            <div class="tab-header">
              <span class="tab-header-item active">写作技巧</span>
              <span class="tab-header-item">优秀范文</span>
              <span class="tab-header-item">经典素材</span>
            </div>

            <div class="tab-content">
              <div
                @click="scrollTop"
                class="tab-content-item"
                v-for="item in 8"
                :key="item"
              >
                写人
              </div>
            </div>
          </div>
        </cube-sticky-ele>

        <div class="list" ref="list">
          <Item v-for="i in 10" :key="i"></Item>
        </div>
      </cube-scroll>
    </cube-sticky>
  </div>
</template>

<script>
import Item from "@/components/Item";
export default {
  components: {
    Item
  },
  data() {
    return {
      scrollY: 0
    };
  },
  methods: {
    scrollTop() {
      let { tab, scroll, list } = this.$refs;
      let tabHeight = tab.offsetHeight;
      console.log(tabHeight);
      scroll.scroll.scrollToElement(list, 0, 0, -tabHeight);
    },
    scrollHandler({ y }) {
      this.scrollY = -y;
    }
  }
};
</script>

<style lang="scss" scoped>
.composition {
  .sticky {
    height: calc(100vh - 62px);
  }
  .header {
    @include flex-center;
    justify-content: space-between;
    padding: 12px 16px;
    margin-bottom: 8px;
    .back-btn {
      @include flex-center;
      font-size: 14px;
      color: #353637;
      font-weight: 500;
    }
    .search {
      @include flex-center;
      width: 283px;
      height: 30px;
      color: #98a3a5;
      font-size: 12px;
      font-weight: 500;
      background: #f6f6f6;
      border-radius: 15px;
    }
  }
  .banner {
    margin: 0 auto;
    margin-bottom: 16px;
    width: 343px;
    height: 120px;
    background-color: #f6f6f6;
    border-radius: 6px;
  }
  .tab {
    padding-bottom: 12px;
    margin-bottom: 12px;
    background-color: #fff;
    &-header {
      @include flex-center;
      justify-content: space-between;
      margin: 0 16px;
      &-item {
        @include flex-center;
        width: 88px;
        height: 30px;
        color: #353637;
        font-size: 14px;
        font-weight: 500;
        border-radius: 6px 6px 0px 0px;
        &.active {
          color: #24b592;
          background-color: rgba($color: #24b592, $alpha: 0.1);
        }
      }
    }
    &-content {
      display: flex;
      flex-wrap: wrap;
      margin: 0 16px;
      padding: 6px 0;
      background-color: #fff;
      border-radius: 0px 6px 6px 6px;
      border: 1px solid rgba(36, 181, 146, 0.1);
      &-item {
        @include flex-center;
        height: 26px;
        padding: 0 10px;
        margin: 6px 8px;
        color: #98a3a5;
        font-size: 12px;
        background: rgba(246, 246, 246, 1);
        border-radius: 13px;
      }
    }
  }
}
</style>
