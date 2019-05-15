<template>
  <div class="popup" v-show="value">
    <div class="popup-content">
      <div class="popup-text">
        <p>{{ title }}</p>
        <span>{{ desc }}</span>
      </div>
      <img class="ewm" :src="image" />
    </div>
    <i class="popup-close-icon" @click="handleClose"></i>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: "获取更多学习资料"
    },
    desc: {
      type: String,
      default: "请长按二维码识别并关注公众号"
    }
  },
  methods: {
    handleClose() {
      this.$emit("input", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.popup {
  @include flex-center;
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  &-content {
    position: relative;
    width: 254px;
    height: 270px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    overflow: hidden;
  }
  &-text {
    box-sizing: border-box;
    padding-top: 32px;
    width: 254px;
    height: 140px;
    text-align: center;
    color: #fff;
    background: rgba(99, 180, 251, 1);
    p {
      font-size: 17px;
      margin-bottom: 10px;
    }
  }
  .ewm {
    width: 150px;
    height: 150px;
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
  }
  &-close-icon {
    display: block;
    margin-top: 24px;
    width: 24px;
    height: 24px;
    background: url("../assets/image/share-dialog/icon-cancel.png") no-repeat;
    background-size: 100%;
  }
}
</style>
