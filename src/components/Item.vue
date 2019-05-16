<template>
  <div
    class="item"
    :class="{ 'van-hairline--bottom': showAction, isLast: isLast }"
    @click="clickItem"
  >
    <div class="item-left" :class="{ 'van-hairline--bottom': !showAction }">
      <p class="item-title">{{ data.title }}</p>
      <span class="item-subtitle">{{ data.studyNum }}人已学完</span>
      <div class="item-icon-wrap" v-if="showAction">
        <div class="item-share" @click.stop="clickShare">
          <i class="share-icon"></i>
          <span>分享</span>
        </div>
        <div class="item-collection" @click.stop="clickCollection">
          <i :class="collected ? 'like-icon' : 'unlike-icon'"></i>
          <span>{{ collected ? "已收藏" : "收藏" }}</span>
        </div>
      </div>
    </div>
    <div class="item-right">
      <img :src="data.img" />
      <div class="last-mask" v-if="isLast">
        <div>上次学到</div>
      </div>
    </div>
  </div>
</template>

<script>
import { registerWx } from "../utils";
import { mapMutations } from "vuex";
export default {
  name: "Item",
  props: {
    data: {
      type: Object,
      required: true
    },
    subject: {
      type: [Number, String],
      default: 1
    },
    showAction: {
      type: Boolean,
      default: true
    },
    isLast: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      collected: false
    };
  },
  computed: {
    shareInfo() {
      return this.$store.state.shareInfo;
    }
  },
  methods: {
    ...mapMutations(["CHANGE_SHOW_SHARE", "CHANGE_SHARE_TYPE"]),
    clickItem() {
      this.articleClick(1);
      this.$emit("click", this.data);
    },
    clickCollection() {
      this.articleClick(2);
    },
    clickShare() {
      let { title, img } = this.data;
      let { shareInfo, subject } = this;
      console.log(shareInfo, subject);
      this.articleClick(3, res => {
        console.log(res);
        registerWx({
          title,
          desc:
            shareInfo.topTitle +
            "为更多孩子的" +
            shareInfo.name +
            "学习助力加油",
          url: window.location.origin + "/share/" + res + "?type=" + subject,
          imgUrl: img
        });
      });
      this.$emit("share");
      this.CHANGE_SHARE_TYPE(1);
      this.CHANGE_SHOW_SHARE();
    },
    articleClick(type, fn) {
      this.$api.article
        .articleClick({
          articleId: this.data.id,
          clickType: type
        })
        .then(res => {
          if (type == 2) {
            this.collected = !this.collected;
          }
          fn && fn(res.data.resultData);
        });
    }
  },
  created() {
    this.collected = this.data.collected;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.item {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: #fff;
  .last-mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.7);
    & > div {
      @include flex-center;
      width: 72px;
      height: 17px;
      font-size: 10px;
      color: #fff;
      background: rgba(249, 158, 84, 1);
      border-radius: 6px 6px 0px 0px;
    }
  }
  .share-icon,
  .like-icon,
  .unlike-icon {
    @include bg("/yuwen/icon-share.png");
    margin-right: 6px;
    display: block;
    width: 16px;
    height: 16px;
  }
  .unlike-icon {
    @include bg("/yuwen/icon-unlike.png");
    height: 14px;
  }
  .like-icon {
    @include bg("/yuwen/icon-like.png");
    height: 14px;
  }
  &-left {
    flex: 1;
  }
  &-title {
    @include line-clamp(2);
    font-size: 16px;
    font-weight: 400;
    color: #222222;
    line-height: 22px;
  }
  &-subtitle {
    display: block;
    margin-top: 4px;
    margin-bottom: 13px;
    font-size: 11px;
    color: #d8dcdd;
  }
  &-right {
    position: relative;
    margin-left: 31px;
    width: 72px;
    height: 72px;
    border-radius: 6px;
    overflow: hidden;
    img {
      width: 72px;
      height: 72px;
      background: #ccc;
      border-radius: 6px;
    }
  }
  &-icon-wrap {
    display: flex;
    align-items: center;
    & > div {
      @include flex-center;
      margin-right: 27px;
      font-size: 12px;
      span {
        margin-left: 2px;
      }
    }
  }
  &.isLast {
    background-color: #fafafa;
    .item-title {
      color: #98a3a5;
    }
  }
}
</style>
