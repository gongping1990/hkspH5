<template>
  <div class="composition">
    <div class="header">
      <div class="back-btn">
        <van-icon color="#98A3A5" name="arrow-left" />
        <span>返回</span>
      </div>
      <router-link to="/search" class="search">
        <span>搜索想找的内容</span>
      </router-link>
    </div>
    <div class="sticky">
      <cube-sticky ref="stickyWrap" :pos="scrollY">
        <cube-scroll
          ref="scroll"
          :data="articleList"
          :options="options"
          :scroll-events="['scroll']"
          @scroll="scrollHandler"
          @pulling-up="onPullingUp"
        >
          <div class="scroll-wrap">
            <div class="banner"></div>
            <cube-sticky-ele ref="stickyEle" ele-key="22">
              <div class="tab" ref="tab">
                <div class="tab-header">
                  <span
                    class="tab-header-item"
                    :class="{ active: columnId == item.id }"
                    v-for="(item, i) in columnList"
                    :key="item.id"
                    @click="changeTab(i, item)"
                  >
                    {{ item.title }}
                  </span>
                </div>

                <div class="tab-content" v-if="activeList.length">
                  <div
                    class="tab-content-item"
                    :class="{ active: item.id == categoryId }"
                    v-for="item in activeList"
                    :key="item.id"
                    @click="changeCategory(item)"
                  >
                    {{ item.title }}
                  </div>
                </div>
              </div>
            </cube-sticky-ele>
            <div class="empty" v-if="isEmpty">
              <img src="../assets/image/noData/no-1.png" />
              <span>抱歉，暂时没有内容~</span>
            </div>
            <div class="list" ref="scrollList" v-else>
              <Item
                v-for="item in articleList"
                :key="item.id"
                :data="item"
              ></Item>
            </div>
          </div>
        </cube-scroll>
      </cube-sticky>
    </div>
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
      options: {
        pullUpLoad: {
          txt: { more: "", noMore: "没有更多内容了" }
        }
      },
      scrollY: 0,
      columnList: [],
      columnId: 0,
      categoryId: 0,
      activeList: [],
      articleList: [],
      size: 10,
      current: 1,
      total: 0,
      isEmpty: false
    };
  },
  methods: {
    onPullingUp() {
      let { total } = this;
      let { scroll } = this.$refs;
      console.log(this.articleList.length, total);
      if (this.articleList.length >= total) {
        scroll.forceUpdate();
      } else {
        this.current += 1;
        this.getArticleList();
      }
    },
    changeCategory(item) {
      this.categoryId = item.id;
      this.current = 1;
      this.articleList = [];
      this.total = 0;
      this.isEmpty = false;
      this.scrollTop();
      this.getArticleList();
    },
    changeTab(index, item) {
      this.current = 1;
      this.articleList = [];
      this.total = 0;
      this.isEmpty = false;
      this.columnId = item.id;
      this.activeList = this.columnList[index].children;
      this.categoryId = this.columnList[index].children[0].id;
      this.scrollTop();
      this.getArticleList();
    },
    scrollTop() {
      let { scroll, tab, stickyEle, stickyWrap } = this.$refs;
      this.$nextTick(() => {
        stickyEle.$el.setAttribute("style", `height: ${tab.offsetHeight}px`);
        stickyWrap.refresh();
        scroll.refresh();
        scroll.scroll.scrollToElement(tab, 0, 0, 0);
      });
    },
    scrollHandler({ y }) {
      this.scrollY = -y;
    },
    getColumnList() {
      let { subject, id } = this.$route.query;
      this.$api.category
        .columnList({
          id,
          subject
        })
        .then(({ data }) => {
          this.columnList = data.resultData;
          this.columnId = this.columnList[0].id;
          this.activeList = this.columnList[0].children;
          this.categoryId = this.columnList[0].children[0].id;
          this.$refs.scroll.refresh();
          this.$refs.stickyWrap.refresh();
          this.getArticleList();
        });
    },
    getArticleList() {
      let { categoryId, current, size, subject } = this;

      this.$api.article
        .articleList({
          categoryId,
          current,
          size,
          subject
        })
        .then(({ data }) => {
          this.articleList = [...this.articleList, ...data.resultData.records];
          this.total = data.resultData.total;
          if (!data.resultData.records.length) {
            this.options.pullUpLoad = false;
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
            this.options.pullUpLoad = {
              txt: { more: "", noMore: "没有更多内容了" }
            };
          }
        });
    }
  },
  created() {
    let { subject } = this.$route.query;
    this.subject = subject;
    this.getColumnList();
  }
};
</script>

<style lang="scss" scoped>
.composition {
  .sticky {
    height: calc(100vh - 62px);
  }
  .scroll-wrap {
    min-height: 100vh;
  }
  .empty {
    padding-top: 0;
    height: calc(100vh - 62px - 140px);
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
        &.active {
          background: #24b592;
          color: #fff;
        }
      }
    }
  }
}
</style>
