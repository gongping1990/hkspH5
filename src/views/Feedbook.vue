<template>
  <div class="feedbook">
    <div class="empty" v-if="isEmpty">
      <img src="../assets/image/noData/no-3.png" />
      <span>抱歉，你还没有对我们进行评价~ </span>
      <p>说说你的想法吧</p>
      <router-link to="/feedbook-content" class="empty-btn"
        >建议和反馈</router-link
      >
    </div>
    <div v-else>
      <van-cell-group>
        <van-cell
          :to="`/feedbook-detail?id=${item.id}`"
          is-link
          v-for="item in feedbookList"
          :key="item.id"
        >
          <template slot="title">
            <div class="feedbook-title">
              <i class="feedbook-badge" v-if="item.replyed"></i>
              <p class="feedbook-text">{{ item.content }}</p>
            </div>
          </template>
          <template slot="label">
            <div class="feedbook-label">
              <div class="feedbook-label-left">
                <i
                  class="feedbook-icon"
                  :class="{ dhf: !item.replyed, yhf: item.replyed }"
                ></i>
                <span>{{ item.replyed ? "已回复" : "待回复" }}</span>
              </div>
              <div class="feedbook-time">
                {{ item.createTime | formatTime }}
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
      <div class="feedbook-footer">
        <router-link to="/feedbook-content" class="feedbook-btn">
          我要反馈
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      isEmpty: false,
      current: 1,
      size: 100,
      feedbookList: []
    };
  },
  filters: {
    formatTime(v) {
      console.log(v);
      return dayjs(v).format("YYYY-MM-DD");
    }
  },
  methods: {
    getListByCurrentUser() {
      let { current, size } = this;
      this.$api.feedback
        .listByCurrentUser({
          current,
          size
        })
        .then(({ data }) => {
          this.feedbookList = data.resultData.records;
          this.isEmpty = !this.feedbookList.length;
        });
    }
  },
  created() {
    this.getListByCurrentUser();
  }
};
</script>

<style lang="scss" scoped>
.feedbook {
  box-sizing: border-box;
  padding-bottom: 90px;
  height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  &-footer {
    @include flex-center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 11px;
    padding-bottom: 31px;
    background-color: #fff;
  }
  &-btn {
    @include flex-center;
    width: 343px;
    height: 48px;
    font-size: 18px;
    color: #353637;
    border-radius: 10px;
    border: 1px solid rgba(216, 220, 221, 1);
  }
  &-label {
    display: flex;
    align-items: center;
    &-left {
      display: flex;
      align-items: center;
      margin-right: 24px;
      color: #98a3a5;
    }
  }
  &-time {
    color: #d8dcdd;
    font-size: 11px;
  }
  &-icon {
    @include bg("/feedbook/yjfk-icon-feedback.png");
    margin-right: 8px;
    display: block;
    width: 19px;
    height: 15px;
    &.yhf {
      background-image: url("../assets/image/feedbook/yjfk-icon-reply.png");
    }
  }
  &-title {
    display: flex;
    align-items: center;
  }
  &-text {
    @include text-overflow;
    width: 300px;
  }
  &-badge {
    display: block;
    margin-right: 6px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(249, 158, 84, 1);
  }
}
</style>
