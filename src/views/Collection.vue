<template>
  <div class="collection">
    <cube-sticky :pos="scrollY" ref="sticky">
      <cube-scroll
        ref="scroll"
        :scroll-events="['scroll']"
        :options="options"
        @scroll="scrollHandler"
        @pulling-up="onPullingUp"
      >
        <div class="header" ref="header">
          <div class="header-action">
            <div class="back-btn">
              <van-icon name="arrow-left" />
              <span>返回</span>
            </div>
            <div class="feedbook">
              <span>建议和反馈</span>
              <i class="feedbook-icon"></i>
            </div>
          </div>
          <div class="user">
            <img class="user-avatar" src="" />
            <span>飞向企鹅的猪</span>
          </div>
        </div>
        <cube-sticky-ele>
          <div class="sticky-wrap" ref="stickyEle">
            <div class="tab van-hairline--bottom">
              <div class="tab-item active">我的收藏 (8)</div>
              <div class="tab-item">学习记录 (32)</div>
            </div>
            <div v-if="false" class="search-wrap van-hairline--bottom">
              <div class="search">
                <i class="search-icon"></i>
                <span>搜索收藏的内容</span>
              </div>
            </div>
            <div class="calendar">
              <Calendar
                v-if="showCalendar"
                ref="Calendar"
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

        <div class="list">
          <Item v-for="i in 20" :key="i"></Item>
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
            more: "加载更多",
            noMore: "没有更多数据了"
          }
        }
      },
      readDate: ["2019/05/08"],
      weekTitle: ["一", "二", "三", "四", "五", "六", "七"],
      scrollY: 0,
      activeDate: "2019/05/07",
      month: "",
      showCalendar: false
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
    changeCalendar() {
      let { sticky, scroll, header } = this.$refs;
      this.showCalendar = !this.showCalendar;
      sticky.refresh();
      scroll.refresh();
      setTimeout(() => {
        scroll.scrollTo(0, -header.offsetHeight);
      }, 100);
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
  }
};
</script>

<style lang="scss" scoped>
.collection {
  height: 100vh;
  .calendar {
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
