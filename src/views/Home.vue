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
    <div class="header scroll-header" :class="{ isSticky: isSticky }">
      <div class="select-class" @click="clickSelect">
        {{ !categoryData ? "选择年级" : categoryData.name }}
        <van-icon name="arrow" color="#98A3A5" />
      </div>
      <div
        class="collection"
        @click="$router.push('/collection?subject=' + subject)"
      >
        <span>我的收藏</span>
        <van-icon
          class="collection-icon"
          size="18px"
          color="#F76868"
          name="like"
        />
      </div>
    </div>
    <div class="home-sticky">
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
            <div class="banner">
              <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="item in bannerList" :key="item.id">
                  <a @click="clickBanner(item.href)">
                    <img class="banner-img" :src="item.url" />
                  </a>
                </van-swipe-item>
              </van-swipe>
            </div>
            <div class="message-banner">
              <van-swipe :autoplay="3000" :show-indicators="false">
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
            <div class="capsule" @click="clickCapsule">
              <img src="../assets/image/capsule.png" />
              <div class="capsule-btn"></div>
            </div>
          </div>
          <div class="home-scroll">
            <cube-sticky-ele ref="stickyEle">
              <div class="sticky-wrap" ref="sticky">
                <div class="tab">
                  <div class="tab-item" @click="changeTab(1)">
                    <span :class="{ active: tabActive == 1 }">同步预习</span>
                  </div>
                  <div class="tab-item" @click="changeTab(2)">
                    <span :class="{ active: tabActive == 2 }">精品复习</span>
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
                    :subject="subject"
                    :data="item"
                    :isLast="item.point"
                  ></Item>
                </div>
              </div>
            </div>
          </div>
        </cube-scroll>
      </cube-sticky>
    </div>
    <div class="last-study" v-if="lastStudyId" @click="clickLastStudy">
      <van-icon color="#F99E54" name="arrow-up" />
      <span>回到上次学习</span>
    </div>
    <!-- <div class="__dialog qrcode" v-if="recommendData.todayRecommend">
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
      <i class="__dialog-close" @click="recommendData.todayRecommend = false"></i>
    </div> -->
    <div class="__dialog qrcode" v-if="dialog1">
      <div @click="clickDialog(1)" class="__dialog-content dialog1">
        <div class="__dialog-btn">立即领取</div>
      </div>
      <i class="__dialog-close" @click="dialog1 = false"></i>
    </div>
    <div class="__dialog qrcode" v-if="dialog2">
      <div @click="clickDialog(0)" class="__dialog-content dialog2">
        <div class="__dialog-btn">立即领取</div>
      </div>
      <i class="__dialog-close" @click="dialog2 = false"></i>
    </div>
    <van-tabbar v-model="active" active-color="#24B592">
      <van-tabbar-item to="/">
        <span>语文</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.chinesePre : icon.chineseDef"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/?type=2">
        <span>数学</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.mathPre : icon.mathDef"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/?type=3">
        <span>英语</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.englishPre : icon.englishDef"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/study">
        <span>学习天地</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.fieldPre : icon.fieldDef"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/welfareCentre">
        <span>福利中心</span>
        <img
          v-if="isShowTabBarTips"
          class="g-tabbar-tips"
          src="../assets/image/fuli/tips-tab.png"
        />
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.wekfarePre : icon.wekfareDef"
        />
      </van-tabbar-item>
    </van-tabbar>
    <div class="mask-tag tag1" @click="dialog1 = true" v-show="showTag1">
      <div class="mask-tag-btn"></div>
    </div>
    <div class="mask-tag" @click="dialog2 = true" v-show="showTag2">
      <div class="mask-tag-btn"></div>
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item";
import chineseDef from "../assets/image/tab/tabbar-button-chinese-def.png";
import chinesePre from "../assets/image/tab/tabbar-button-chinese-pre.png";
import mathDef from "../assets/image/tab/tabbar-button-math-def.png";
import mathPre from "../assets/image/tab/tabbar-button-math-pre.png";
import englishDef from "../assets/image/tab/tabbar-button-english-def.png";
import englishPre from "../assets/image/tab/tabbar-button-english-pre.png";
import fieldDef from "../assets/image/tab/tabbar-button-field-def.png";
import fieldPre from "../assets/image/tab/tabbar-button-field-pre.png";
import wekfareDef from "../assets/image/tab/tabbar-button-welfare-def.png";
import wekfarePre from "../assets/image/tab/tabbar-button-welfare-pre.png";
export default {
  name: "home",
  components: {
    Item
  },
  data() {
    return {
      showTag2: false,
      showTag1: false,
      options: {},
      scrollY: 0,
      dialog1: false,
      dialog2: false,
      isSticky: false,
      isShowTabBarTips: false,
      categoryData: {},
      bannerList: [],
      broadList: [],
      articleList: [],
      tabActive: 1,
      subject: 1,
      guideStep: 1,
      active: 0,
      isEmpty: false,
      recommendData: {},
      lastStudyId: 0,
      startTime: "",
      endTime: "",
      icon: {
        chineseDef,
        chinesePre,
        mathDef,
        mathPre,
        englishDef,
        englishPre,
        fieldDef,
        fieldPre,
        wekfareDef,
        wekfarePre
      }
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    gradeData() {
      return this.$store.state.gradeData;
    }
  },
  watch: {
    $route(n) {
      let { type } = n.query;
      window.sessionStorage.setItem("tabActive", 1);
      this.tabActive = 1;
      this.guideStep = 1;
      this.subject = type ? type : 1;
      this.articleList = [];
      this.scrollY = 0;
      this.$refs.scroll.scrollTo(0, 0, 0);
      this.init();
      this.initTab();
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
  mounted() {
    this.$store.dispatch("getCreditMsg");
    this.isShowTabBarTips = this.$store.state.isShowTabBarTips;
  },
  methods: {
    clickCapsule() {
      window.location = "http://market.k12.vip/transfer";
    },
    clickDialog(type) {
      if (type) {
        window.location = "http://market.k12.vip/composition?pageKey=sp2comp";
      } else {
        window.location = "http://market.k12.vip/poem?pageKey=sp2poem";
      }
    },
    initDialog() {
      let dialogIndex = window.sessionStorage.getItem("dialogIndex");
      let num = window.localStorage.getItem("dialogNum");
      let random = parseInt(Math.random() * 2 + 1);
      if (num) {
        if (dialogIndex) {
          this[`showTag${num}`] = true;
        } else {
          this[`showTag${num == 1 ? 2 : 1}`] = true;
        }
      } else {
        this[`showTag${random}`] = true;
      }
      if (dialogIndex) return;
      window.sessionStorage.setItem("dialogIndex", 1);
      if (num) {
        this[`dialog${num == 1 ? 2 : 1}`] = true;
      } else {
        this[`dialog${random}`] = true;
        window.localStorage.setItem("dialogNum", random);
        return;
      }
      window.localStorage.setItem("dialogNum", num == 1 ? 2 : 1);

      // if (dialogIndex) {
      //   if (dialogIndex == 1) {
      //     this.dialog2 = true;
      //   } else {
      //     this.dialog1 = true;
      //   }
      // } else {
      //   window.localStorage.setItem("dialogIndex", random);
      //   this[`dialog${random}`] = true;
      // }
    },
    initTab() {
      let route = this.$route;
      if (route.name == "home") {
        let { type } = route.query;
        if (type == 2) {
          this.active = 1;
        } else if (type == 3) {
          this.active = 2;
        } else {
          this.active = 0;
        }
      } else if (route.name == "study") {
        this.active = 3;
      } else {
        this.active = 4;
      }
    },
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
    clickBanner(url) {
      if (this.subject == 1) {
        this.listWordByBook(url);
      } else {
        window.location = url;
      }
    },
    clickLastStudy() {
      let { lastStudyId } = this;
      this.scrollTop(this.$refs["item" + lastStudyId][0]);
    },
    clickSelect() {
      let { type } = this.$route.query;
      this.$router.push(`/select?type=${type ? type : 1}`);
    },
    changeTab(index) {
      this.tabActive = index;
      window.sessionStorage.setItem("tabActive", index);
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
    async init() {
      this.first = window.localStorage.getItem("first");
      this.getBanner();
      this.getRecommendBySubject();
      await this.getUserCategory();
    },
    listWordByBook(href) {
      let { subject, categoryData } = this;
      this.$api.com
        .listWordByBook({
          courseId: subject,
          edition: categoryData.teachEdition,
          grade: categoryData.grade,
          semester: categoryData.term
        })
        .then(({ data }) => {
          if (data.resultData) {
            window.location = href;
          } else {
            this.$router.push("/error");
          }
        });
    },
    // 获取banner
    getBanner() {
      this.$api.banner
        .bannerList({
          subjectId: this.subject
        })
        .then(({ data }) => {
          this.bannerList = data.resultData;
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
        this.articleList = data.resultData;
        let item = this.articleList.find(e => {
          return e.point;
        });
        this.$toast.clear();

        this.isEmpty = !this.articleList.length;

        item ? (this.lastStudyId = item.id) : (this.lastStudyId = 0);
      });
    },
    // 获取用户选择的年级等信息
    getUserCategory() {
      let { subject } = this;
      return this.$api.article
        .getUserCategory({
          subject
        })
        .then(({ data }) => {
          this.categoryData = data.resultData;
          if (this.categoryData) {
            this.first = 1;
            window.localStorage.setItem("first", 1);
            this.initDialog();
            if (!this.userInfo.phone) {
              let { type } = this.$route.query;
              this.$router.push(`/select?type=${type ? type : 1}`);
            }
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
            if (this.first) {
              this.guideStep = 3;
            }
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
    // let nowDate = new Date();
    // let end_time = window.localStorage.getItem("endTime");
    let { type } = this.$route.query;
    let tabActive = window.sessionStorage.getItem("tabActive");
    // let formateDate = dayjs(nowDate).format("YYYY/MM/DD") + " 23:59:59";
    // let endDate = new Date(formateDate).getTime();

    // if (nowDate.getTime() > end_time) {
    //   window.localStorage.removeItem("dialogIndex");
    //   window.localStorage.removeItem("dialogNum");
    // }
    // window.localStorage.setItem("endTime", endDate);

    this.subject = type ? type : 1;
    if (tabActive) {
      this.tabActive = tabActive;
    }
    this.init();
    this.initTab();
    this.listByBroadcast();
  }
};
</script>
<style lang="scss" scoped>
.home {
  .capsule {
    @include flex-center;
    position: relative;
    margin: 0 auto;
    padding: 19px 0;
    width: 100%;
    background-color: #fff;
    img {
      width: 343px;
    }
    &-btn {
      position: absolute;
      top: 28px;
      right: 27px;
      width: 60px;
      height: 65px;
      background: url("../assets/image/btn.png") no-repeat;
      background-size: 100%;
      animation: scale_1 0.6s infinite;
    }
  }
  .mask-tag,
  .tag1 {
    position: fixed;
    right: 16px;
    bottom: 170px;
    width: 72px;
    height: 72px;
    background: url("../assets/image/dialog/tag.png") no-repeat;
    background-size: 100%;
    z-index: 40;

    &-btn {
      @include flex-center;
      position: absolute;
      top: 46px;
      left: 50%;
      margin-left: -31px;
      width: 62px;
      height: 26px;
      background: url("../assets/image/dialog/btn.png") no-repeat;
      background-size: 100%;
      animation: scale_1 0.6s infinite;
    }
    &.tag1 {
      width: 72px;
      height: 64px;
      background-image: url("../assets/image/dialog/tag1.png");
      .mask-tag-btn {
        top: 51px;
      }
    }
  }
  .__dialog {
    &-content.dialog1,
    &-content.dialog2 {
      padding-top: 0;
      width: 277px;
      height: 357px;
      background-image: url("../assets/image/dialog/dialog1.png");

      p {
        position: absolute;
        left: 50%;
        top: 304px;
        color: #f86822;
        font-size: 10px;
        transform: translateX(-47%);
      }
    }
    &-content.dialog2 {
      background-image: url("../assets/image/dialog/dialog.png");
    }
    &-close {
      position: absolute;
      width: 36px;
      height: 36px;
      right: 16px;
      top: 16px;
    }
    &-btn {
      position: absolute;
      margin-top: 0;
      top: 305px;
      left: 50%;
      width: 152px;
      height: 33px;
      color: #a01f12;
      font-size: 15px;
      font-weight: 500;
      background: linear-gradient(
        360deg,
        rgba(253, 164, 21, 1) 0%,
        rgba(255, 236, 23, 1) 100%
      );
      border-radius: 17px;
      transform: translateX(-50%);
      animation: scale 0.6s infinite;
    }
  }
  &-wrap {
    padding-bottom: 1px;
  }
  &-sticky {
    height: calc(100vh - 90px);
  }
  .last-study {
    @include flex-center;
    position: absolute;
    right: 0;
    bottom: 120px;
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
    position: fixed;
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
      top: 208px;
      left: 32px;
    }
    &-two {
      top: 208px;
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
      margin-top: 6px;
      margin-left: 16px;
      h3 {
        font-size: 16px;
        color: #353637;
        line-height: 22px;
        margin-bottom: 3px;
      }
      p {
        @include line-clamp(4);
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
      &.isSticky {
        background: #fafafa;
      }
    }
    &-list {
      min-height: calc(100vh - 136px);
    }
  }
}

@keyframes scale {
  0% {
    transform: translateX(-50%) scale(1);
  }
  100% {
    transform: translateX(-50%) scale(1.1);
  }
}

@keyframes scale_1 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
