<template>
  <div id="app" class="app">
    <router-view />
    <div class="__dialog" v-if="shareData.todayRemind">
      <div class="__dialog-content">
        <div class="__dialog-time">
          <span>{{ shareData.studyDays }}</span>
          天
        </div>
        <span>如果您觉得还不错</span>
        <p>请将学习宝分享给</p>
        <p>更多的孩子和家长吧</p>
        <div class="__dialog-btn" @click="clickShare">分享给好友吧</div>
      </div>
      <i class="__dialog-close" @click="shareData.todayRemind = false"></i>
    </div>
    <Share v-if="showShare" :type="shareType"></Share>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import Share from "@/components/Share";
export default {
  components: {
    Share
  },
  data() {
    return {
      shareData: {}
    };
  },
  computed: {
    ...mapState(["showShare", "shareType"])
  },
  methods: {
    ...mapMutations([
      "CHANGE_SHOW_SHARE",
      "CHANGE_SHARE_TYPE",
      "UPDATE_SHARE_INFO"
    ]),
    clickShare() {
      this.shareData.todayRemind = false;
      this.CHANGE_SHARE_TYPE(0);
      this.CHANGE_SHOW_SHARE();
    },
    remindToShare() {
      this.$api.useroperate.remindToShare().then(({ data }) => {
        this.shareData = data.resultData;
      });
    },
    getUserInfo() {
      this.$api.user.getUserBaseInfo().then(({ data }) => {
        this.$store.commit("UPDATE_USER_INFO", data.resultData);
      });
    },
    userRegister() {
      this.$api.com.userRegister({
        sid: this.$socket.id
      });
    }
  },
  sockets: {
    connect: function() {
      setTimeout(() => {
        this.userRegister();
      }, 2000);
    }
  },
  created() {
    setTimeout(() => {
      this.remindToShare();
      this.$store.dispatch("getCreditMsg");
    }, 2000);
  }
};
</script>
<style lang="scss">
@import url("./assets/style/common.scss");
.app {
  height: 100vh;
}
.__dialog {
  @include flex-column-center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba($color: #000000, $alpha: 0.7);
  &-time {
    @include flex-center;
    align-items: flex-end;
    position: absolute;
    box-sizing: border-box;
    left: 24px;
    top: 81px;
    padding-bottom: 12px;
    width: 68px;
    height: 56px;
    color: #fff;
    font-size: 8px;
    background: url("./assets/image/share/day.png") no-repeat;
    background-size: 100%;
    span {
      font-size: 26px;
      line-height: 21px;
      margin-bottom: 0 !important;
    }
  }
  &-content {
    @include flex-column-center;
    position: relative;
    justify-content: flex-start;
    box-sizing: border-box;
    padding-top: 168px;
    background: url("./assets/image/share-dialog/background.png") no-repeat;
    background-size: 100%;
    width: 279px;
    height: 336px;
    border-radius: 6px;

    span {
      display: block;
      margin-bottom: 4px;
    }
    p {
      font-size: 18px;
      line-height: 25px;
      color: #353637;
      font-weight: bold;
    }
  }
  &-btn {
    @include flex-column-center;
    margin-top: 24px;
    width: 160px;
    height: 40px;
    color: #fff;
    background: rgba(36, 181, 146, 1);
    border-radius: 23px;
  }
  &-close {
    display: block;
    margin-top: 11px;
    width: 26px;
    height: 26px;
    background: url("./assets/image/dialog/close.png") no-repeat;
    background-size: 100%;
  }
  &.qrcode {
    .__dialog-content {
      position: relative;
      align-items: flex-start;
      padding-top: 48px;
      width: 269px;
      height: 331px;
      background-image: url("./assets/image/share/weixin-dialog.png");
    }
    .__dialog-btn {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 32px;
      font-size: 12px;
      color: #98a3a5;
      background-color: #f6f6f6;
      border-radius: 0 0 6px 6px;
    }
    .__dialog-qrcode {
      @include flex-column-center;
      align-self: center;
      margin-top: 54px;
      img {
        margin-bottom: 4px;
        width: 87px;
        height: 87px;
      }
      p {
        font-size: 12px;
        font-weight: normal;
        color: #353637;
      }
    }
    .__dialog-aq {
      @include flex-center;
      margin-bottom: 12px;
      font-size: 10px;
      color: #3bc9a7;
      span {
        margin-bottom: 0;
      }
      .aq-icon {
        display: block;
        margin-right: 4px;
        width: 10px;
        height: 12px;
        background: url("./assets/image/share/gz-icon-safe.png") no-repeat;
        background-size: 100%;
      }
    }
    .__dialog-info {
      display: flex;
      align-items: center;
      margin-left: 24px;
      img {
        margin-right: 6px;
        width: 32px;
        height: 32px;
        border-radius: 4px;
      }
      &-text {
        font-size: 10px;
        color: #fff;
        p {
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }
}
.empty {
  @include flex-column-center;
  padding-top: 77px;
  line-height: 20px;
  &-btn {
    @include flex-center;
    margin-top: 16px;
    width: 113px;
    height: 36px;
    font-size: 13px;
    color: #353637;
    border-radius: 6px;
    border: 1px solid rgba(216, 220, 221, 1);
  }
  img {
    width: 180px;
    height: 180px;
  }
  span {
    font-size: 12px;
    color: #98a3a5;
  }
  p {
    font-size: 13px;
    color: #f99e54;
  }
}
</style>
