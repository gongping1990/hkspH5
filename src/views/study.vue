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
              <a :href="scUrl" class="tool-item">
                <img src="../assets/image/study/xxsz.png" />
              </a>
              <a :href="ldUrl" class="tool-item">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
      recommendList: [],
      options: {},
      categoryData: {}
    };
  },
  computed: {
    scUrl() {
      let { categoryData } = this;
      return `${window.origin}/yuwen#/pages/wordList/index?courseId=1&edition=${
        categoryData.teachEdition
      }&grade=${categoryData.grade}&semester=${categoryData.term}`;
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
  methods: {
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
}
</style>
