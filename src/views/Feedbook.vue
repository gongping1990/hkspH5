<template>
  <div class="feedbook">
    <div class="empty" v-if="isEmpty">
      <img src="../assets/image/noData/no-3.png" />
      <span>抱歉，你还没有对我们进行评价~ </span>
      <p>说说你的想法吧</p>
      <div class="empty-btn">建议和反馈</div>
    </div>
    <div v-else>
      <van-cell-group>
        <van-cell to="/feedbook-detail" is-link v-for="i in 20" :key="i">
          <template slot="title">
            <div class="feedbook-title">
              <i class="feedbook-badge"></i>
              <p class="feedbook-text">小学语文改怎么写，小学数学该怎</p>
            </div>
          </template>
          <template slot="label">
            <div class="feedbook-label">
              <div class="feedbook-label-left">
                <i class="feedbook-icon dhf"></i>
                <span>待回复</span>
              </div>
              <div class="feedbook-time">2017-10-30</div>
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
export default {
  data() {
    return {
      isEmpty: false
    };
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
