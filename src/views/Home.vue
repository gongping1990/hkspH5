<template>
  <div class="home" ref="page">
    <div class="guide" v-if="!categoryData" @click="changeGuideStep">
      <img
        v-if="guideStep == 1"
        class="guide-one"
        src="../assets/image/yingdao/yd1.png"
      />
      <img
        v-if="guideStep == 2"
        class="guide-two"
        src="../assets/image/yingdao/yd2.png"
      />
      <img
        v-if="guideStep == 3"
        class="guide-three"
        src="../assets/image/yingdao/yd3.png"
      />
    </div>
    <cube-sticky
      ref="stickyWrap"
      @change="changeHandler"
      @diff-change="diffChange"
      :pos="scrollY"
    >
      <cube-scroll
        ref="scroll"
        :scroll-events="['scroll']"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
        :data="articleList"
      >
        <div class="home-wrap" ref="wrap">
          <div class="header">
            <div class="select-class" @click="clickSelect">
              {{ !categoryData ? "选择年级" : categoryData.name }}
              <van-icon name="arrow-down" color="#98A3A5" />
            </div>
            <div class="user">
              <span>{{ userInfo.nickname }}</span
              ><img class="user-avatar" :src="userInfo.headimgurl" />
            </div>
          </div>
          <div class="banner">
            <van-swipe :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="item in bannerList" :key="item.id">
                <img class="banner-img" :src="item.url" />
              </van-swipe-item>
            </van-swipe>
          </div>
          <div class="message-banner">
            <van-swipe :autoplay="30000" indicator-color="#24B592">
              <van-swipe-item v-for="(item, i) in broadList" :key="i">
                <div class="message-banner-item">
                  <div class="message-banner-left">
                    <p>{{ item.content }}</p>
                  </div>
                  <div class="message-banner-right">
                    <img :src="item.imgurl" />
                  </div>
                </div>
              </van-swipe-item>
            </van-swipe>
          </div>
        </div>
        <div class="home-scroll">
          <cube-sticky-ele ref="stickyEle">
            <div class="sticky-wrap" ref="sticky">
              <div class="header scroll-header" v-if="isSticky">
                <div class="select-class">
                  三年级/部编版（下）
                  <van-icon name="arrow-down" color="#98A3A5" />
                </div>
                <div
                  class="collection"
                  @click="$router.push('/collection?subject=' + subject)"
                >
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
                <div class="tab-item" @click="changeTab(1)">
                  <span :class="{ active: tabActive == 1 }">同步学习</span>
                </div>
                <div class="tab-item" @click="changeTab(2)">
                  <span :class="{ active: tabActive == 2 }">精品学习</span>
                </div>
              </div>
            </div>
          </cube-sticky-ele>

          <div class="scroll" ref="scrollList">
            <div class="empty" v-if="isEmpty">
              <img src="../assets/image/noData/no-1.png" />
              <span>抱歉，暂时没有文章~</span>
            </div>
            <div class="scroll-list" v-else>
              <div
                :ref="'item' + item.id"
                v-for="item in articleList"
                :key="item.id"
              >
                <Item
                  :data="item"
                  @click="clickItem"
                  :isLast="item.point"
                ></Item>
              </div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </cube-sticky>
    <div class="last-study" v-if="lastStudyId" @click="clickLastStudy">
      <van-icon color="#F99E54" name="arrow-up" />
      <span>回到上次学习</span>
    </div>
    <div class="__dialog qrcode" v-if="recommendData.todayRecommend">
      <div class="__dialog-content">
        <div class="__dialog-info">
          <img :src="recommendData.icon" />
          <div class="__dialog-info-text">
            <p>{{ recommendData.name }}</p>
            <span>{{ recommendData.digest }}</span>
          </div>
        </div>
        <div class="__dialog-qrcode">
          <img :src="recommendData.qrcode" />
          <div class="__dialog-aq">
            <i class="aq-icon"></i>
            <span>安全认证</span>
          </div>
          <p>长按二维码识别并关注公众号</p>
        </div>
        <div class="__dialog-btn" @click="recommendData.todayRecommend = false">
          我已关注，别再推荐
        </div>
      </div>
      <i class="__dialog-close"></i>
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item";
export default {
  name: "home",
  components: {
    Item
  },
  data() {
    return {
      options: {},
      scrollY: 0,
      isSticky: false,
      categoryData: {},
      bannerList: [],
      broadList: [],
      articleList: [],
      tabActive: 1,
      subject: 1,
      guideStep: 1,
      isEmpty: false,
      recommendData: {}
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    gradeData() {
      return this.$store.state.gradeData;
    },
    lastStudyId() {
      let id = 0;
      let item = this.articleList.find(e => {
        return e.point;
      });
      item && (id = item.id);
      return id;
    }
  },
  watch: {
    $route(n) {
      let { type } = n.query;
      this.subject = type ? type : 1;
      this.articleList = [];
      this.init();
    },
    isScrollBottom(n) {
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
      page.addEventListener("scroll", () => {
        let pageScrollTop = page.scrollTop;
        this.isScrollBottom = pageScrollTop == wrapHeight;
      });
    },
    clickLastStudy() {
      let { lastStudyId } = this;
      this.scrollTop(this.$refs["item" + lastStudyId][0]);
    },
    clickSelect() {
      let { type } = this.$route.query;
      this.$router.push(`/select?type=${type ? type : 1}`);
    },
    clickItem(item) {
      window.location.href = item.link;
    },
    changeTab(index) {
      this.tabActive = index;
      this.scrollTop();
      this.getArticleList();
    },
    scrollTop(el) {
      let { scroll, scrollList, sticky, stickyEle, stickyWrap } = this.$refs;
      let $el = el ? el : scrollList;
      this.isSticky = true;
      this.$nextTick(() => {
        stickyEle.$el.setAttribute("style", `height: ${sticky.offsetHeight}px`);
        stickyWrap.refresh();
        scroll.refresh();
        scroll.scroll.scrollToElement($el, 0, 0, -sticky.offsetHeight);
        this.scrollY = -scroll.scroll.y;
      });
    },
    onPullingUp() {
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
    },
    //切换引导步骤
    changeGuideStep() {
      let { type } = this.$route.query;
      if (this.guideStep == 3) {
        this.$router.push(`/select?type=${type ? type : 1}`);
        window.localStorage.setItem("first", 1);
      }
      this.guideStep += 1;
    },
    init() {
      this.first = window.localStorage.getItem("first");
      this.getBanner();
      this.getUserCategory();
      this.getRecommendBySubject();
    },
    // 获取banner
    getBanner() {
      this.$api.banner
        .bannerList({
          subjectId: this.subject
        })
        .then(({ data }) => {
          this.bannerList = data.resultData.records;
        });
    },
    // 获取最新播报
    listByBroadcast() {
      this.$api.useroperate.listByBroadcast().then(({ data }) => {
        this.broadList = data.resultData;
      });
    },
    // 获取学习列表
    getArticleList() {
      this.$toast.loading();
      let { gradeData } = this;
      if (!gradeData.grade) {
        return;
      }
      gradeData.type = this.tabActive;
      this.$api.article.getArticleList(gradeData).then(({ data }) => {
        this.$toast.clear();
        this.articleList = data.resultData;
        this.isEmpty = !this.articleList.length;
      });
    },
    // 获取用户选择的年级等信息
    getUserCategory() {
      let { subject } = this;
      this.$api.article
        .getUserCategory({
          subject
        })
        .then(({ data }) => {
          this.categoryData = data.resultData;
          if (this.categoryData) {
            let { grade, teachEdition, term } = this.categoryData;
            this.$store.commit("UPDATE_GRADE_DATA", {
              grade,
              term,
              subject,
              teachEdition
            });
            this.getArticleList();
          } else {
            this.isEmpty = true;
          }
          if (this.first) {
            this.guideStep = 3;
          }
        });
    },
    getRecommendBySubject() {
      this.$api.useroperate
        .getRecommendBySubject({
          subjectId: this.subject
        })
        .then(({ data }) => {
          this.recommendData = data.resultData;
        });
    }
  },
  created() {
    let { type } = this.$route.query;
    this.subject = type ? type : 1;
    this.init();
    this.listByBroadcast();
  }
};
</script>
<style lang="scss" scoped>
.home {
  &-wrap {
    padding-bottom: 1px;
  }
  .last-study {
    @include flex-center;
    position: absolute;
    right: 0;
    bottom: 240px;
    width: 118px;
    height: 26px;
    font-size: 13px;
    color: #f99e54;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12);
    border-radius: 100px 0px 0px 100px;
    z-index: 99;
    span {
      margin-left: 4px;
    }
  }
  .guide {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
    img {
      position: absolute;
      width: 240px;
    }
    &-one {
      top: 229px;
      left: 32px;
    }
    &-two {
      top: 229px;
      right: 32px;
    }
    &-three {
      top: 7px;
      left: 11px;
      width: 332px !important;
    }
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
      flex: 1;
      margin-left: 16px;
      h3 {
        font-size: 16px;
        color: #353637;
        line-height: 22px;
        margin-bottom: 3px;
      }
      p {
        font-size: 14px;
        color: #353637;
        line-height: 18px;
        margin-bottom: 3px;
      }
    }
    &-right {
      @include flex-center;
      margin-left: 17px;
      width: 78px;
      height: 78px;
      background: rgba(255, 255, 255, 1);
      border-radius: 0px 6px 6px 0px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
  .banner {
    margin: 0 auto;
    width: 343px;
    height: 120px;
    border-radius: 6px;
    &-img {
      width: 343px;
      height: 120px;
      border-radius: 6px;
    }
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
