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
      <div class="search" @click="$router.push('/search')">
        <i class="search-icon"></i>
        <span>搜索</span>
      </div>
    </div>
    <div class="scroll">
      <cube-scroll
        :data="recommendList"
        ref="scroll"
        :options="options"
        @pulling-up="onPullingUp"
      >
        <div class="scroll-content">
          <h2 class="scroll-title">实用学习工具</h2>
          <div class="tool" v-if="active == 1">
            <div class="tool-left">
              <router-link to="/composition?id=1125293952905711617&subject=1">
                <img src="../assets/image/study/zwbd.png" />
              </router-link>
            </div>
            <div class="tool-right">
              <a @click="clickScUrl" class="tool-item">
                <img src="../assets/image/study/xxsz.png" />
              </a>
              <a @click="clickLdUrl" class="tool-item">
                <img src="../assets/image/study/kwld.png" />
              </a>
            </div>
          </div>
          <div class="tool sx" v-if="active == 2">
            <div class="tool-left">
              <router-link to="/composition?id=1101730862963101697&subject=2">
                <img src="../assets/image/study/swdt.png" />
              </router-link>
            </div>
          </div>
          <div class="tool yy" v-if="active == 3">
            <div class="tool-left">
              <router-link to="/composition?id=1090575331872714753&subject=3">
                <img src="../assets/image/study/zrpd.png" />
              </router-link>
            </div>
            <div class="tool-left">
              <router-link to="/composition?id=1090575335780440066&subject=3">
                <img src="../assets/image/study/yfbd.png" />
              </router-link>
            </div>
          </div>
          <van-swipe
            :autoplay="3000"
            :show-indicators="false"
            v-if="investmanage.xxtdList.length"
          >
            <van-swipe-item
              v-for="item in investmanage.xxtdList"
              :key="item.id"
            >
              <div
                class="ad-banner"
                :style="{ 'background-image': 'url(' + item.imgUrl + ')' }"
                @click="clickBanner(item)"
              >
                <div class="ad-btn"></div>
              </div>
            </van-swipe-item>
          </van-swipe>
          <h2 class="scroll-title">精品内容推荐</h2>
          <div class="list">
            <div
              class="item"
              v-for="item in recommendList"
              :key="item.id"
              @click="clickItem(item)"
            >
              <img class="item-img" :src="item.img" />
              <div class="van-hairline--bottom">
                <p>{{ item.name }}</p>
                <span>{{ item.intro }}</span>
              </div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
    <van-tabbar v-model="tabActive" active-color="#24B592">
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
    <router-link to="/feedbook-content" class="feedback-float">
      <img src="../assets/image/fuli/icon-etroaction.png" />
      <span>建议和反馈</span>
    </router-link>
    <div class="__dialog qrcode" v-if="showPopup">
      <div class="__dialog-content study-popup">
        <p>建议功能</p>
        <textarea
          v-model="feedbackValue"
          placeholder="如果您需要更多的功能、内容，或是在使用过程中有什么疑问、不爽,都可以告诉我们，输入内容不要少于5个字哦!"
        ></textarea>
        <div class="study-popup-btn" @click="addContent">提交</div>
      </div>
      <i class="__dialog-close" @click="closePopup"></i>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
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
  data() {
    return {
      showPopup: false,
      isShowTabBarTips: false,
      feedbackValue: "",
      tabActive: 3,
      active: 1,
      recommendList: [],
      options: {},
      categoryData: {},
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
    investmanage() {
      return this.$store.state.investmanage;
    },
    scUrl() {
      let { categoryData } = this;
      return `${window.origin}/yuwen#/pages/wordList/index?courseId=1&edition=${categoryData.teachEdition}&grade=${categoryData.grade}&semester=${categoryData.term}`;
    },
    ldUrl() {
      return `${window.origin}/yuwen#/pages/teachersRead/index`;
    }
  },
  watch: {
    $route(n) {
      this.active = n.query.subject;
      this.$refs.scroll.scrollTo(0, 0, 0);
      this.getRecommendContent();
    }
  },
  mounted() {
    this.$store.dispatch("getCreditMsg");
    this.isShowTabBarTips = this.$store.state.isShowTabBarTips;
  },
  methods: {
    ...mapActions(["postIncrPVByAdvertise"]),
    clickBanner(item) {
      this.postIncrPVByAdvertise({
        type: 1,
        id: item.id
      });
      window.location = item.link;
    },
    closePopup() {
      this.feedbackValue = "";
      this.showPopup = false;
    },
    clickScUrl() {
      this.listWordByBook(this.scUrl);
    },
    clickLdUrl() {
      this.listWordByBook(this.ldUrl);
    },
    listWordByBook(href) {
      let { active, categoryData } = this;
      this.$api.com
        .listWordByBook({
          courseId: active,
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
    onPullingUp() {
      setTimeout(() => {
        this.$refs.scroll.forceUpdate();
      }, 1000);
    },
    clickItem(item) {
      this.$router.push(`/composition?id=${item.id}&subject=${this.active}`);
    },
    changeTab(index) {
      this.$router.push("/study?subject=" + index);
    },
    addContent() {
      let { feedbackValue } = this;
      if (feedbackValue == "") {
        this.$toast("反馈内容不能为空！");
        return;
      }
      if (feedbackValue.length < 6) {
        this.$toast("反馈内容不能小于6个字！");
        return;
      }
      this.$api.feedback
        .addContent({
          content: feedbackValue
        })
        .then(() => {
          this.feedbackValue = "";
          this.showPopup = false;
          this.$toast("反馈已提交！");
        });
    },
    getRecommendContent() {
      this.$toast.loading();
      this.$api.article
        .getRecommendContent({
          subject: this.active
        })
        .then(({ data }) => {
          this.$toast.clear();
          this.recommendList = data.resultData;
        });
    },
    getUserCategory() {
      this.$api.article
        .getUserCategory({
          subject: 1
        })
        .then(({ data }) => {
          if (data.resultData) {
            this.categoryData = data.resultData;
          }
        });
    }
  },
  created() {
    let { subject } = this.$route.query;
    this.active = subject ? subject : 1;
    this.getRecommendContent();
    this.getUserCategory();
  }
};
</script>

<style lang="scss" scoped>
.study {
  background-color: #fff;
  .ad {
    &-banner {
      position: relative;
      width: 343px;
      height: 100px;
      background-size: 100%;
      background-repeat: no-repeat;
    }
    &-btn {
      position: absolute;
      left: 136px;
      top: 66px;
      width: 119px;
      height: 37px;
      background: url("../assets/image/dialog/gg-btn.png") no-repeat;
      background-size: 100%;
      animation: scale_1 0.7s infinite;
    }
  }
  .feedback-float {
    @include flex-column-center;
    position: absolute;
    right: 8px;
    bottom: 120px;
    font-size: 11px;
    color: #f99e54;
    background-color: #fff;
    z-index: 99;
    img {
      display: block;
      width: 30px;
      margin-bottom: 5px;
    }
  }
  .study-popup {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    height: 269px;
    background-image: none !important;
    background: #fff;
    p {
      font-weight: 500;
    }
    textarea {
      margin-top: 12px;
      margin-bottom: 25px;
      box-sizing: border-box;
      padding: 12px;
      width: 214px;
      height: 136px;
      line-height: 18px;
      border-radius: 6px;
      border: 1px solid rgba(216, 220, 221, 1);
    }
    &-btn {
      @include flex-center;
      width: 214px;
      height: 40px;
      font-weight: 500;
      color: #fff;
      background: rgba(36, 181, 146, 1);
      border-radius: 20px;
    }
  }
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
        width: 240px;
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
    &.sx {
      .tool-left {
        margin-right: 0;
        width: 343px;
        img {
          width: 343px;
          height: 131px;
        }
      }
    }
    &.yy {
      justify-content: space-between;
      .tool-left {
        margin-right: 0;
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
  @keyframes scale_1 {
    0% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
