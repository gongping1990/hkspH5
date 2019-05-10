<template>
  <div
    class="item"
    :class="{ 'van-hairline--bottom': showAction }"
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
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Item",
  props: {
    data: {
      type: Object,
      required: true
    },
    showAction: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      collected: false
    };
  },
  methods: {
    ...mapMutations(["CHANGE_SHOW_SHARE"]),
    clickItem() {
      this.articleClick(1);
      this.$emit("click", this.data);
    },
    clickCollection() {
      this.articleClick(2);
    },
    clickShare() {
      this.articleClick(3);
      this.$emit("share");
      this.CHANGE_SHOW_SHARE();
    },
    articleClick(type) {
      this.$api.article
        .articleClick({
          articleId: this.data.id,
          clickType: type
        })
        .then(() => {
          if (type == 2) {
            this.collected = !this.collected;
          }
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
    margin-left: 31px;
    width: 72px;
    height: 72px;
    border-radius: 6px;
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
  & &.active {
    background-color: #fafafa;
  }
}
</style>
