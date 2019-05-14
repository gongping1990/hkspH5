<template>
  <div class="feedbook">
    <h2>反馈内容</h2>
    <textarea
      placeholder="请输入要反馈的内容"
      class="textarea"
      v-model="content"
    ></textarea>
    <div class="btn" @click="addContent">提交</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ""
    };
  },
  methods: {
    addContent() {
      let { content } = this;
      if (content == "") {
        this.$toast("反馈内容不能为空！");
        return;
      }
      if (content.length < 6) {
        this.$toast("反馈内容不能小于6个字！");
        return;
      }
      this.$api.feedback
        .addContent({
          content: this.content
        })
        .then(() => {
          this.content = "";
          this.$toast("反馈已提交！");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.feedbook {
  padding: 16px;
  h2 {
    font-size: 16px;
  }
  .textarea {
    box-sizing: border-box;
    margin-top: 16px;
    margin-bottom: 32px;
    padding: 12px 16px;
    width: 343px;
    height: 102px;
    line-height: 20px;
    color: #353637;
    background: rgba(246, 246, 246, 1);
    border-radius: 6px;
    border: 1px solid rgba(216, 220, 221, 1);
  }
  .btn {
    @include flex-center;
    width: 343px;
    height: 48px;
    font-size: 17px;
    color: #fff;
    background: rgba(36, 181, 146, 1);
    border-radius: 10px;
  }
}
</style>
