<template>
  <div class="collection">
    <cube-sticky @change="changeSticky" :pos="scrollY" ref="sticky">
      <cube-scroll
        ref="scroll"
        :scroll-events="['scroll']"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
      >
        <div class="header" ref="header">
          <div class="header-action">
            <div class="back-btn" @click="$router.go(-1)">
              <van-icon name="arrow-left" />
              <span>返回</span>
            </div>
            <router-link to="/feedbook" class="feedbook">
              <span>建议和反馈</span>
              <i class="feedbook-icon"></i>
            </router-link>
          </div>
          <div class="user">
            <img class="user-avatar" src="" />
            <span>飞向企鹅的猪</span>
          </div>
        </div>
        <cube-sticky-ele ref="stickyEle">
          <div class="sticky-wrap" ref="stickyWrap">
            <div class="tab van-hairline--bottom">
              <div
                class="tab-item"
                :class="{ active: !tabActive }"
                @click="changeTab(0)"
              >
                我的收藏 (8)
              </div>
              <div
                class="tab-item"
                :class="{ active: tabActive }"
                @click="changeTab(1)"
              >
                学习记录 (32)
              </div>
            </div>
            <div v-if="!tabActive" class="search-wrap van-hairline--bottom">
              <router-link to="/search" class="search">
                <i class="search-icon"></i>
                <span>搜索收藏的内容</span>
              </router-link>
            </div>
            <div class="calendar" v-else>
              <Calendar
                ref="Calendar"
                v-if="showCalendar"
                :showHeader="false"
                :sundayStart="true"
                :markDate="readDate"
                @changeMonth="changeMonth"
                @choseDay="choseDay"
              ></Calendar>
              <div v-else class="collection-week van-hairline--bottom">
                <div class="collection-week-title">
                  <span
                    class="collection-week-text"
                    v-for="item in weekTitle"
                    :key="item"
                    >{{ item }}</span
                  >
                </div>
                <div class="collection-week-time">
                  <div
                    class="collection-week-item"
                    :class="{ isDay: day.isDay, selected: day.selected }"
                    @click="clickWeekDay(day.formatTime)"
                    v-for="day in weekArr"
                    :key="day.time"
                  >
                    <span class="collection-week-item__text">{{
                      day.time
                    }}</span>
                    <i
                      class="collection-week-item__tag"
                      :class="{ isMark: day.isMark }"
                    ></i>
                  </div>
                </div>
              </div>

              <div class="calendar-btn" @click="changeCalendar">
                <span>{{ month }}</span>
                <van-icon name="arrow-down" color="#24B592" />
              </div>
            </div>
          </div>
        </cube-sticky-ele>
        <div class="list" v-if="!tabActive">
          <div class="empty" v-if="isEmpty">
            <img src="../assets/image/noData/no-4.png" />
            <span>抱歉，暂时没有收藏记录~</span>
          </div>
          <div v-else>
            <Item v-for="i in 20" :key="i"></Item>
          </div>
        </div>
        <div class="list" v-else>
          <div class="empty" v-if="isEmpty">
            <img src="../assets/image/noData/no-5.png" />
            <span>抱歉，暂时没有学习记录~</span>
          </div>
          <div v-else>
            <Item v-for="i in 20" :key="i" :showAction="false"></Item>
          </div>
        </div>
      </cube-scroll>
    </cube-sticky>
  </div>
</template>

<script>
import Calendar from "@/components/vue-calendar-component/index";
import Item from "@/components/Item";
export default {
  components: {
    Item,
    Calendar
  },
  data() {
    return {
      options: {
        pullUpLoad: {
          txt: {
            more: "",
            noMore: "没有更多数据了"
          }
        }
      },
      readDate: ["2019/05/08"],
      weekTitle: ["一", "二", "三", "四", "五", "六", "七"],
      scrollY: 0,
      activeDate: "2019/05/07",
      month: "",
      showCalendar: false,
      tabActive: 0,
      isEmpty: false
    };
  },
  computed: {
    weekArr() {
      let new_Date = new Date();
      let timesStamp = new_Date.getTime();
      let currenDay = new_Date.getDay();
      let currenWeekDay = new_Date.getDate();
      let dates = [];
      for (let i = 0; i < 7; i++) {
        let weekDay = new Date(
          timesStamp + 24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7))
        );
        let time = weekDay.getDate();
        let formatTime = this.$day(weekDay).format("YYYY/MM/DD");
        dates.push({
          time,
          formatTime,
          isDay: time == currenWeekDay,
          isMark: false,
          selected: formatTime == this.activeDate
        });
      }
      return dates;
    }
  },
  methods: {
    resetScroll() {
      let { sticky, scroll, header, stickyEle, stickyWrap } = this.$refs;
      this.$nextTick(() => {
        stickyEle.$el.setAttribute(
          "style",
          `height: ${stickyWrap.offsetHeight}px`
        );
        sticky.refresh();
        scroll.refresh();
        scroll.scrollTo(0, -header.offsetHeight);
      });
    },
    changeSticky() {
      // if (index == -1 && this.showCalendar) {
      //   this.showCalendar = false;
      // }
    },
    changeTab(index) {
      this.tabActive = index;
      this.resetScroll();
    },
    changeCalendar() {
      this.showCalendar = !this.showCalendar;
      this.resetScroll();
    },
    choseDay(time) {
      this.activeDate = time;
    },
    changeMonth(time) {
      this.month = this.$day(time).format("YYYY-MM");
    },
    clickWeekDay(time) {
      console.log(11);
      this.activeDate = time;
      this.$refs.Calendar.ChoseMonth(time);
    },
    onPullingUp() {
      console.log(111);
      setTimeout(() => {
        this.$refs.scroll.forceUpdate();
      }, 1000);
    },
    scrollHandler(params) {
      this.scrollY = -params.y;
    }
  },
  created() {
    this.month = this.$day(new Date()).format("YYYY-MM");
    this.options.pullUpLoad = false;
  }
};
</script>

<style lang="scss" scoped>
.collection {
  height: 100vh;
  .list {
    min-height: calc(100vh - 108px);
  }
  .calendar {
    position: relative;
    &-wrap {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      background-color: #fff;
      z-index: 99;
    }
    &-btn {
      @include flex-center;
      margin: 0 auto;
      width: 92px;
      height: 24px;
      color: #98a3a5;
      font-size: 12px;
      background: rgba(246, 246, 246, 1);
      border-radius: 0px 0px 6px 6px;
    }
  }
  &-week {
    padding: 0 16px;
    padding-top: 8px;
    padding-bottom: 3px;
    &-title,
    &-time {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    &-text {
      width: 50px;
      font-size: 12px;
      line-height: 17px;
      text-align: center;
      color: #d8dcdd;
    }
    &-item {
      @include flex-column-center;
      position: relative;
      margin-top: 4px;
      text-align: center;
      width: 42px;
      height: 42px;
      &__text {
        @include flex-center;
        width: 36px;
        height: 36px;
        font-size: 15px;
        line-height: 21px;
        color: #221e1e;
        font-weight: 400;
        border-radius: 50%;
        &.selected {
          color: #24b592;
        }
      }
      &__tag {
        position: absolute;
        left: 50%;
        bottom: 4px;
        margin-left: -3px;
        margin-top: 2px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        &.isMark {
          background-color: #24b592;
        }
      }
      &.isDay {
        span {
          color: #24b592;
        }
      }
      &.selected {
        .collection-week-item__text {
          background-color: #24b592;
          color: #fff;
        }
      }
    }
  }
  .sticky-wrap {
    background-color: #fff;
  }
  .search {
    @include flex-center;
    width: 343px;
    height: 30px;
    color: #98a3a5;
    background: rgba(246, 246, 246, 1);
    border-radius: 15px;
    &-wrap {
      @include flex-center;
      height: 54px;
    }
    &-icon {
      @include bg("/study/icon-search.png");
      display: block;
      margin-right: 8px;
      width: 13px;
      height: 13px;
    }
  }
  .tab {
    @include flex-center;
    justify-content: space-around;
    padding: 0 16px;
    height: 54px;
    &-item {
      @include flex-center;
      width: 120px;
      height: 30px;
      font-size: 16px;
      color: #353637;
      border-radius: 18px;
      &.active {
        color: #24b592;
        background-color: rgba($color: #24b592, $alpha: 0.1);
      }
    }
  }
  .header {
    @include bg("/shoucang/my-backgroud.png");
    @include flex-column-center;
    box-sizing: border-box;
    justify-content: flex-start;

    padding: 16px;
    height: 162px;
    &-action {
      @include flex-center;
      justify-content: space-between;
      margin-bottom: 11px;
      width: 100%;
    }
    .back-btn {
      @include flex-center;
    }
    .feedbook {
      @include flex-center;
      font-weight: 500;
      &-icon {
        @include bg("/shoucang/button-retroaction.png");
        display: block;
        margin-left: 4px;
        width: 16px;
        height: 16px;
      }
    }
    .user {
      @include flex-column-center;
      &-avatar {
        margin-bottom: 4px;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 1);
      }
      span {
        font-size: 15px;
        line-height: 21px;
        font-weight: 400;
        color: #222222;
      }
    }
  }
}
</style>
