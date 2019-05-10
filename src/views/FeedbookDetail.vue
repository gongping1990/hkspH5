<template>
  <div class="feedbook">
    <div class="header">
      <div class="back-btn" @click="$router.go(-1)">
        <van-icon name="arrow-left" color="#98A3A5" />返回
      </div>
      <div class="status">
        <div class="status-header">
          <i class="icon dhf"></i>
          <span class="dhf">已回复</span>
        </div>
        <span class="time">2017-08-23 23:00</span>
      </div>
    </div>
    <div class="content">
      <h2>反馈内容</h2>
      <p>
        小学语文作文怎么写,小学数学怎么学，小学英语怎么学，小学数学怎么学，小学英语怎么学
      </p>
    </div>
    <p class="reply-empty" v-if="empty">
      客服妹子正忙的不可开交，她会尽快回复你的留言～
    </p>
    <div class="reply" v-else>
      <h2>回复内容</h2>
      <p>
        你好！首先安歇您对我们产品的内容的信任，没有及时回复你，非常抱歉！
        我们产品会有所有优惠福利！打开微信搜索功能
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      empty: false
    };
  }
};
</script>

<style lang="scss" scoped>
.feedbook {
  padding: 16px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
  }
  .content {
    margin-bottom: 20px;
    h2 {
      margin-bottom: 11px;
      color: #98a3a5;
    }
    p {
      font-size: 13px;
      line-height: 18px;
      color: #353637;
    }
  }
  .reply {
    position: relative;
    padding: 12px;
    border-radius: 8px;
    background: #f6f6f6;
    &-empty {
      font-size: 12px;
      color: #d8dcdd;
    }
    &::before {
      content: "";
      position: absolute;
      left: 14px;
      top: -16px;
      border: 8px solid transparent;
      border-bottom-color: #f6f6f6;
    }
    h2 {
      margin-bottom: 11px;
      font-size: 12px;
      color: #98a3a5;
    }
    p {
      font-size: 13px;
      line-height: 18px;
      color: #353637;
    }
  }
  .back-btn {
    @include flex-center;
    padding-top: 3px;
  }
  .status {
    &-header {
      @include flex-center;
      font-size: 18px;
      line-height: 25px;
      color: #98a3a5;
      .dhf {
        color: #f99e54;
      }
    }
    .icon {
      @include bg("/huifu/yjfk-icon-reply.png");
      display: block;
      margin-right: 8px;
      width: 17px;
      height: 15px;
      &.dhf {
        background-image: url("../assets/image/huifu/yjfk-icon-feedback.png");
      }
    }
    .time {
      display: block;
      margin-top: 4px;
      color: #d8dcdd;
      font-size: 10px;
    }
  }
}
</style>
