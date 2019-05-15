<template>
  <div class="share" v-if="shareInfo">
    <div class="share-header">
      <img class="share-header-avatar" :src="shareInfo.wxMpInfo.wxMpImg" />
      <p class="share-header-title">{{ shareInfo.wxMpInfo.name }}</p>
      <span class="share-header-text">{{ shareInfo.wxMpInfo.desc }}</span>
      <a class="share-header-btn" @click="showPopup = true">立即订阅</a>
    </div>
    <div class="share-body">
      <div class="share-info">
        <img class="share-info-avatar" :src="shareInfo.shareUserInfo.headImg" />
        <p>{{ shareInfo.shareUserInfo.nickname }} 向你推荐了</p>
      </div>
      <div class="share-content" @click="onClick">
        <div class="share-banner">
          <img class="share-banner-img" :src="shareInfo.article.img" />
        </div>
        <p class="share-content-text">{{ shareInfo.article.title }}</p>
      </div>
      <div class="share-back-btn">
        <a
          class="share-header-btn"
          @click="$router.push('/?type=' + $route.query.type)"
          >查看全部
          <van-icon
            size="20px"
            color="#90919E"
            class="arrow-down"
            name="arrow-down"
        /></a>
      </div>
    </div>
    <popup v-model="showPopup" :image="shareInfo.wxMpInfo.subImg"></popup>
  </div>
</template>

<script>
import popup from "../components/popup";
export default {
  components: {
    popup
  },
  data() {
    return {
      showPopup: false,
      shareInfo: null
    };
  },
  created() {
    this.getShareInfo();
  },
  methods: {
    getShareInfo() {
      let { id } = this.$route.params;
      this.$api.article
        .getShareInfo({
          id
        })
        .then(({ data }) => {
          this.shareInfo = data.resultData;
        });
    },
    onClick() {
      window.location = this.shareInfo.article.link;
    }
  }
};
</script>

<style lang="scss" scoped>
.share {
  background-color: #f8f8f8;
  &-header {
    @include flex-column-center;
    height: 257px;
    margin-bottom: 8px;
    background-color: #fff;
    &-avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      margin-bottom: 12px;
    }
    &-title {
      margin-bottom: 6px;
      font-size: 18px;
      font-size: bold;
      color: #221e1e;
    }
    &-text {
      font-size: 14px;
      color: #90919e;
    }
    &-btn {
      @include flex-center;
      margin-top: 24px;
      width: 118px;
      height: 36px;
      font-size: 15px;
      color: #63b4fb;
      border-radius: 8px;
      border: 1px solid rgba(99, 180, 251, 1);
    }
  }
  &-body {
    height: calc(100vh - 257px);
    background-color: #fff;
  }
  &-info {
    padding: 16px;
    @include flex-y-center;
    &-avatar {
      margin-right: 12px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    p {
      font-size: 18px;
      color: #221e1e;
      font-weight: 600;
    }
  }
  &-content {
    display: flex;
    padding: 16px;
    align-items: flex-start;
    background-color: #f8f8f8;
    &-text {
      line-height: 20px;
      flex: 1;
      font-size: 16px;
      color: #221e1e;
      margin-top: 8px;
    }
  }
  &-banner {
    margin-right: 16px;
    width: 96px;
    height: 96px;
    border-radius: 8px;
    overflow: hidden;
    &-img {
      width: 100%;
      height: 96px;
      border-radius: 8px;
    }
  }
  .share-back-btn {
    .share-header-btn {
      width: 300px;
      margin: 20px auto;
      color: #90919e;
      border: none;
    }
    .arrow-down {
      margin-left: 4px;
    }
  }
}
</style>
