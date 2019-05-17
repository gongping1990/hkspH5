<template>
  <div class="error">
    <img class="icon" src="../assets/image/duihuan/warm.png" />
    <h2>此功能仅支持语文部编版教材</h2>
    <h3>且仅支持以下年级使用</h3>
    <div class="list">
      <div class="item" v-for="(item, index) in listData" :key="index">
        {{ item }}
      </div>
    </div>
    <router-link to="/study" class="btn">返回学习园地</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: []
    };
  },
  methods: {
    listOnlineBook() {
      this.$api.com.listOnlineBook().then(({ data }) => {
        this.listData = data.resultData;
      });
    }
  },
  created() {
    this.listOnlineBook();
  }
};
</script>

<style lang="scss" scoped>
.error {
  @include flex-column-center;
  justify-content: flex-start;
  position: relative;
  box-sizing: border-box;
  padding-top: 24px;
  height: 100vh;
  .icon {
    width: 32px;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 20px;
    line-height: 28px;
    color: #f76868;
  }
  h3 {
    font-weight: normal;
    font-size: 16px;
    line-height: 28px;
    color: #f76868;
  }
  .list {
    width: 100%;
    margin-top: 16px;
    border-top: 1px solid #d8dcdd;
  }
  .item {
    @include flex-center;
    margin-top: 23px;
    display: inline-flex;
    font-size: 16px;
    color: #f99e54;
    width: 50%;
  }
  .btn {
    @include flex-center;
    position: absolute;
    left: 24px;
    bottom: 24px;
    width: 327px;
    height: 48px;
    font-size: 17px;
    border-radius: 6px;
    border: 1px solid rgba(216, 220, 221, 1);
  }
}
</style>
