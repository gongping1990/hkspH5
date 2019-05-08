<template>
  <div class="home" ref="page">
    <cube-sticky
      @change="changeHandler"
      @diff-change="diffChange"
      :pos="scrollY"
      :offset="50"
    >
      <cube-scroll
        ref="scroll"
        :scroll-events="['scroll']"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
      >
        <div class="home-wrap" ref="wrap">
          <div class="header">
            <div class="select-class">
              三年级/部编版（下）
              <van-icon name="arrow-down" color="#98A3A5" />
            </div>
            <div class="user">
              <span>飞向企鹅的猪</span><img class="user-avatar" src="" />
            </div>
          </div>
          <div class="banner">
            <img class="banner-img" src="" />
          </div>
          <div class="message-banner">
            <van-swipe :autoplay="3000" indicator-color="white">
              <van-swipe-item>
                <div class="message-banner-item">
                  <div class="message-banner-left">
                    <h3>欢迎来到学习宝</h3>
                    <p>一起与<span>57689位</span>家长辅导孩子学习</p>
                  </div>
                  <div class="message-banner-right"></div>
                </div>
              </van-swipe-item>
            </van-swipe>
          </div>
        </div>
        <div class="home-scroll">
          <cube-sticky-ele ele-key="11">
            <div class="sticky-wrap">
              <div class="header scroll-header" v-if="isSticky">
                <div class="select-class">
                  三年级/部编版（下）
                  <van-icon name="arrow-down" color="#98A3A5" />
                </div>
                <div class="collection">
                  <span>我的收藏</span
                  ><van-icon
                    class="collection-icon"
                    size="18px"
                    color="#F76868"
                    name="like"
                  />
                </div>
              </div>
              <div class="tab">
                <div class="tab-item">
                  <span class="active">同步学习</span>
                </div>
                <div class="tab-item" @click="scrollTop">
                  <span>精品学习</span>
                </div>
              </div>
            </div>
          </cube-sticky-ele>

          <div class="scroll" ref="scrollList">
            <div class="scroll-list">
              <Item v-for="item in 10" :key="item"></Item>
            </div>
          </div>
        </div>
      </cube-scroll>
    </cube-sticky>
    <Share v-if="false"></Share>
  </div>
</template>

<script>
import Share from "@/components/Share";
import Item from "@/components/Item";
export default {
  name: "home",
  components: {
    Item,
    Share
  },
  data() {
    return {
      options: {
        pullUpLoad: {
          txt: {
            more: "加载更多",
            noMore: "没有更多数据了"
          }
        }
      },
      scrollY: 0,
      isSticky: false
    };
  },
  watch: {
    isScrollBottom(n) {
      console.log(11);
      let { scroll } = this.$refs;
      if (n) {
        scroll.enable();
      } else {
        scroll.disable();
      }
    }
  },
  methods: {
    initScroll() {
      let { page, wrap, scroll } = this.$refs;
      let wrapHeight = wrap.offsetHeight;

      setTimeout(() => {
        scroll.disable();
      }, 500);
      console.log(scroll);
      page.addEventListener("scroll", () => {
        let pageScrollTop = page.scrollTop;
        this.isScrollBottom = pageScrollTop == wrapHeight;
      });
    },
    scrollTop() {
      let { scroll, scrollList } = this.$refs;
      scroll.scroll.scrollToElement(scrollList, 0, 0, -90);
    },
    onPullingUp() {
      console.log(111);
      setTimeout(() => {
        this.$refs.scroll.forceUpdate();
      }, 1000);
    },
    diffChange(diff) {
      let { scroll } = this.$refs;
      if (diff == 0) {
        this.y = scroll.scroll.y;
      }
    },
    changeHandler(current, index) {
      this.isSticky = index != -1;
    },
    scrollHandler(params) {
      this.scrollY = -params.y;
    }
  },
  mounted() {
    // this.initScroll();
    // console.log(this.$refs.wrap.offsetHeight);
  }
};
</script>
<style lang="scss" scoped>
.home {
  &-wrap {
    padding-bottom: 1px;
  }
  .sticky-wrap {
    background-color: #fff;
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.05);
  }
  .tab {
    @include flex-center;
    position: relative;
    height: 46px;
    background-color: #fff;
    &::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -4px;
      width: 1px;
      height: 8px;
      background-color: #98a3a5;
    }
    &-item {
      @include flex-center;
      flex: 1;
      font-size: 16px;
      span {
        @include flex-center;
        width: 92px;
        height: 30px;
        border-radius: 18px;
      }
      .active {
        color: #24b592;
        background: rgba(36, 181, 146, 0.1);
      }
    }
  }
  .message-banner {
    margin: 12px auto;
    width: 343px;
    height: 78px;
    border-radius: 6px;
    border: 1px solid rgba(216, 220, 221, 1);
    &-item {
      @include flex-center;
      justify-content: space-between;
      width: 343px;
      height: 78px;
    }
    &-left {
      margin-left: 16px;
      h3 {
        font-size: 16px;
        color: #353637;
        line-height: 22px;
        margin-bottom: 3px;
      }
      p {
        font-size: 12px;
        span {
          color: #f76868;
        }
      }
    }
    &-right {
      margin-right: 21px;
      width: 89px;
      height: 40px;
    }
  }
  .banner {
    margin: 0 auto;
    width: 343px;
    height: 120px;
    border-radius: 6px;
    background-color: #98a3a5;
  }
  .header {
    @include flex-center;
    justify-content: space-between;
    padding: 12px 16px;
    margin-bottom: 4px;
    .select-class {
      display: flex;
      align-items: center;
      color: #222222;
      font-weight: 500;
      font-size: 16px;
    }
    .user {
      @include flex-center;
      color: #353637;
      &-avatar {
        margin-left: 8px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }
  }
  .scroll {
    &-header {
      height: 40px;
      padding: 0 16px;
      background: rgba(250, 250, 250, 1);
      box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.05);
      .select-class {
        font-size: 14px;
      }
      .collection {
        @include flex-center;
        font-size: 12px;
        &-icon {
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
