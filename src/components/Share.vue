<template>
  <div class="share" @click="close">
    <img class="share-img" :src="img" />
    <div class="share-dialog" v-if="active" @click.stop="() => {}">
      <h2>推荐朋友圈文案</h2>
      <p>
        小学学习库有丰富的小学同步预习、复习内容和实用的小学兴趣学习工具，目前已经有5298位家长和孩子在这里学习，快来跟我们一起学习吧
      </p>
      <div
        class="share-btn active"
        v-clipboard:copy="shareText"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >
        点击复制到朋友圈文案
      </div>
    </div>
    <div class="share-btn-wrap" v-if="!type">
      <div
        class="share-btn"
        :class="{ active: !active }"
        @click.stop="changeActive(0)"
      >
        <img src="../assets/image/share/share-wechart-pre.png" v-if="!active" />
        <img src="../assets/image/share/share-wechart.png" v-else />
        <span>分享给朋友</span>
      </div>
      <div
        class="share-btn"
        :class="{ active: active }"
        @click.stop="changeActive(1)"
      >
        <img src="../assets/image/share/share-firend-pre.png" v-if="active" />
        <img src="../assets/image/share/share-firend.png" v-else />
        <span>分享给朋友圈</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import firendImg from "../assets/image/share/firend-arrow.png";
import weixinImg from "../assets/image/share/weixin-arrow.png";
export default {
  props: {
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      active: 0,
      shareText:
        "小学学习库有丰富的小学同步预习、复习内容和实用的小学兴趣学习工具，目前已经有5298位家长和孩子在这里学习，快来跟我们一起学习吧"
    };
  },
  computed: {
    img() {
      return !this.active ? weixinImg : firendImg;
    }
  },
  methods: {
    ...mapMutations(["CHANGE_SHOW_SHARE", "CHANGE_SHARE_TYPE"]),
    close() {
      this.$emit("close");
      this.CHANGE_SHARE_TYPE(0);
      this.CHANGE_SHOW_SHARE();
    },
    changeActive(index) {
      this.active = index;
    },
    onCopy() {
      this.$toast("复制成功，快去朋友圈分享吧！");
    },
    onError() {
      alert("复制失败！");
    }
  }
};
</script>

<style lang="scss" scoped>
.share {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: 0.7);
  z-index: 99;
  &-dialog {
    @include flex-column-center;
    position: absolute;
    padding: 14px 12px;
    top: 184px;
    left: 50%;
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;
    transform: translateX(-50%);
    h2 {
      font-size: 16px;
    }
    p {
      margin: 8px 0;
      padding: 7px 4px;
      width: 256px;
      font-size: 10px;
      line-height: 16px;
      background: rgba(246, 246, 246, 1);
      border-radius: 6px;
    }
    .share-btn {
      width: 206px;
      height: 38px;
    }
  }
  &-img {
    position: absolute;
    top: 31px;
    right: 32px;
    width: 300px;
  }
  &-btn {
    @include flex-center;
    width: 150px;
    height: 48px;
    color: #98a3a5;
    background: rgba(246, 246, 246, 1);
    border-radius: 6px;
    &:first-child {
      margin-right: 27px;
    }
    &.active {
      color: #fff;
      background: #24b592;
    }
    img {
      margin-right: 8px;
      width: 24px;
      height: 24px;
    }
    &-wrap {
      @include flex-center;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 24px;
    }
  }
}
</style>
