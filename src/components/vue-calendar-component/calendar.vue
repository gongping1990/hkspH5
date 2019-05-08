<style scoped>
@media screen and (min-width: 460px) {
  .wh_item_date:hover {
    background: #71c7a5;
    cursor: pointer;
  }
}
* {
  margin: 0;
  padding: 0;
}

.wh_container {
  max-width: 410px;
  margin: auto;
  box-shadow: 0px 1px 1px 0px rgba(237, 237, 237, 1);
}

li {
  list-style-type: none;
}
.wh_top_changge {
  display: flex;
  justify-content: center;
}

.wh_top_changge li {
  cursor: pointer;
  display: flex;
  color: #221e1e;
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  height: 47px;
}

.pre-btn,
.next-btn {
  width: 50px;
}

.wh_top_changge .wh_content_li {
  cursor: auto;
}
.wh_content_all {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  background-color: #fff;
  width: 100%;
  overflow: hidden;
  padding-bottom: 8px;
}

.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3% 0 3%;
  width: 100%;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 16px;
}

.wh_content_item,
wh_content_item_tag {
  font-size: 15px;
  width: 13.4%;
  text-align: center;
  color: #221e1e;
  position: relative;
}
.wh_content_item {
  margin: 2px 0;
  position: relative;
  height: 40px;
}

.wh_top_tag {
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #90919e;
}

.wh_item_date {
  width: 42px;
  height: 42px;
  line-height: 30px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_item_date:active {
  background: rgba(99, 180, 251, 0.2);
  border-radius: 8px;
}

.wh_jiantou1,
.wh_jiantou2 {
  width: 8px;
  height: 14px;
  background: url("/static/image/index-icon-sel1.png") no-repeat;
  background-size: 100%;
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}

.wh_jiantou2 {
  transform: rotate(180deg);
}
.wh_content_item > .wh_isMark::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 2px;
  margin-left: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #24b592;
}
.wh_content_item .wh_other_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_want_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_isToday {
  color: #24b592;
}
.wh_chose_day {
  background: #24b592;
  border-radius: 50%;
  color: #fff !important;
}
/* .wh_content_item .wh_chose_day {
  background:rgba(99,180 ,251,0.2);
  border-radius:8px;
} */
</style>
<template>
  <section class="wh_container">
    <div class="wh_content_all">
      <div class="wh_top_changge van-hairline--bottom" v-show="showHeader">
        <li class="pre-btn" @click="PreMonth(myDate, false)">
          <div class="wh_jiantou1"></div>
        </li>
        <li class="wh_content_li">{{ dateTop }}</li>
        <li class="next-btn" @click="NextMonth(myDate, false)">
          <div class="wh_jiantou2"></div>
        </li>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="tag in textTop" :key="tag">
          <div class="wh_top_tag">
            {{ tag }}
          </div>
        </div>
      </div>
      <div class="wh_content">
        <div
          class="wh_content_item"
          v-for="(item, index) in list"
          :key="index"
          @click="clickDay(item, index)"
        >
          <div
            class="wh_item_date"
            v-bind:class="[
              { wh_isMark: item.isMark },
              { wh_other_dayhide: item.otherMonth !== 'nowMonth' },
              { wh_want_dayhide: item.dayHide },
              { wh_isToday: item.isToday },
              { wh_chose_day: item.chooseDay },
              setClass(item)
            ]"
          >
            {{ item.id }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import timeUtil from "./calendar";
export default {
  data() {
    return {
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: ""
    };
  },
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    textTop: {
      type: Array,
      default: () => ["日", "一", "二", "三", "四", "五", "六"]
    },
    sundayStart: {
      type: Boolean,
      default: () => false
    },
    agoDayHide: { type: String, default: `0` },
    futureDayHide: { type: String, default: `2554387200` }
  },
  created() {
    this.intStart();
    this.myDate = new Date();
  },
  methods: {
    intStart() {
      timeUtil.sundayStart = this.sundayStart;
    },
    setClass(data) {
      let obj = {};
      obj[data.markClassName] = data.markClassName;
      return obj;
    },
    // eslint-disable-next-line no-unused-vars
    clickDay: function(item, index) {
      if (item.otherMonth === "nowMonth" && !item.dayHide) {
        this.getList(this.myDate, item.date);
      }
      if (item.otherMonth !== "nowMonth") {
        item.otherMonth === "preMonth"
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date);
      }
    },
    ChoseMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = new Date(date);
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    PreMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, "preMonth");
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    NextMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, "nextMonth");
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    forMatArgs: function() {
      let markDate = this.markDate;
      let markDateMore = this.markDateMore;
      markDate = markDate.map(k => {
        return timeUtil.dateFormat(k);
      });
      markDateMore = markDateMore.map(k => {
        k.date = timeUtil.dateFormat(k.date);
        return k;
      });
      return [markDate, markDateMore];
    },
    // eslint-disable-next-line no-unused-vars
    getList: function(date, chooseDay, isChosedDay = true) {
      const [markDate, markDateMore] = this.forMatArgs();
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      let arr = timeUtil.getMonthList(this.myDate);
      for (let i = 0; i < arr.length; i++) {
        let markClassName = "";
        let k = arr[i];
        k.chooseDay = false;
        const nowTime = k.date;
        const t = new Date(nowTime).getTime() / 1000;
        //看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || "";
          }
        }
        //标记选中某些天 设置class
        k.markClassName = markClassName;
        k.isMark = markDate.indexOf(nowTime) > -1;
        //无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
        if (k.isToday) {
          this.$emit("isToday", nowTime);
        }
        let flag = !k.dayHide && k.otherMonth === "nowMonth";
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit("choseDay", nowTime);
          this.historyChose.push(nowTime);
          k.chooseDay = true;
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime &&
          !chooseDay &&
          flag
        ) {
          k.chooseDay = true;
        }
      }
      this.list = arr;
    }
  },
  mounted() {
    this.getList(this.myDate);
  },
  watch: {
    markDate: {
      // eslint-disable-next-line no-unused-vars
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    markDateMore: {
      // eslint-disable-next-line no-unused-vars
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    agoDayHide: {
      // eslint-disable-next-line no-unused-vars
      handler(val, oldVal) {
        this.agoDayHide = parseInt(val);
        this.getList(this.myDate);
      },
      deep: true
    },
    futureDayHide: {
      // eslint-disable-next-line no-unused-vars
      handler(val, oldVal) {
        this.futureDayHide = parseInt(val);
        this.getList(this.myDate);
      },
      deep: true
    },
    sundayStart: {
      // eslint-disable-next-line no-unused-vars
      handler(val, oldVal) {
        this.intStart();
        this.getList(this.myDate);
      },
      deep: true
    }
  }
};
</script>
