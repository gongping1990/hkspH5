<template>
  <div class="select">
    <div class="select-content" v-if="step == 1">
      <div class="select-header">
        <p class="select-title">请选择年级</p>
      </div>
      <div class="select-list">
        <div class="select-item active">一年级</div>
        <div class="select-item">二年级</div>
        <div class="select-item">三年级</div>
        <div class="select-item">四年级</div>
        <div class="select-item">五年级</div>
        <div class="select-item">六年级</div>
      </div>
    </div>
    <div class="select-content step-2" v-if="step == 2">
      <div class="select-header">
        <p class="select-title">请选择学期</p>
        <div class="back">
          <span>重选年级</span>
          <van-icon name="arrow" color="#24B592" />
        </div>
      </div>
      <div class="select-list btn">
        <div class="select-item active">上册</div>
        <div class="select-item">下册</div>
      </div>
      <div class="select-header">
        <p class="select-title">请选择版本教材</p>
      </div>
      <div class="textbook-list">
        <div class="textbook-item active">
          <div class="textbook-item-img">
            <img src="../assets/image/yingdao/fm.png" />
            <div class="textbook-item-mask">
              <van-icon name="checked" size="28px" color="#24B592" />
            </div>
          </div>
          <span class="textbook-item-text">部编版</span>
        </div>
        <div class="textbook-item">
          <div class="textbook-item-img">
            <img src="../assets/image/yingdao/fm.png" />
          </div>
          <span class="textbook-item-text">人教版</span>
        </div>
        <div class="textbook-item">
          <div class="textbook-item-img">
            <img src="../assets/image/yingdao/fm.png" />
          </div>
          <span class="textbook-item-text">北师大版</span>
        </div>
        <div class="textbook-item">
          <div class="textbook-item-img">
            <img src="../assets/image/yingdao/fm.png" />
          </div>
          <span class="textbook-item-text">部编版</span>
        </div>
        <div class="textbook-item">
          <div class="textbook-item-img">
            <img src="../assets/image/yingdao/fm.png" />
          </div>
          <span class="textbook-item-text">人教版</span>
        </div>
      </div>
    </div>
    <div class="select-content step-3" v-if="step == 3">
      <div class="select-header">
        <p class="select-title">请选择学期</p>
        <h2>一年级（上册）部编版<van-icon name="arrow" color="#24B592" /></h2>
      </div>
      <div class="phone">
        <p>我们请您完善手机号,</p>
        <span>一起防治不良信息传播，共建健康学习环境。</span>
        <div class="input-wrap">
          <input
            v-model="form.phone"
            placeholder="请输入手机号"
            class="input"
            type="tel"
          />
        </div>
        <div class="input-wrap">
          <input
            v-model="form.code"
            placeholder="请输入验证码"
            class="input"
            type="text"
          />
          <div class="input-code">获取验证码</div>
        </div>
        <div class="phone-btn">开始学习</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 3,
      form: {
        phone: "13699011543",
        code: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.select {
  @include bg("/yingdao/banner.png");
  display: flex;
  justify-content: center;
  .phone {
    @include flex-column-center;
    padding-top: 14px;
    &-btn {
      @include flex-center;
      margin-top: 54px;
      width: 295px;
      height: 48px;
      font-size: 17px;
      color: #fff;
      background: rgba(36, 181, 146, 1);
      border-radius: 6px;
    }
    p,
    span {
      font-size: 18px;
      line-height: 25px;
      color: #f99e54;
    }
    span {
      font-size: 12px;
    }
    .input {
      box-sizing: border-box;
      padding-left: 14px;
      width: 295px;
      height: 48px;
      font-size: 17px;
      background: rgba(246, 246, 246, 1);
      border-radius: 6px;
      &-code {
        @include flex-center;
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 16px;
        height: 48px;
        color: #24b592;
        z-index: 99;
      }
      &-wrap {
        position: relative;
        margin-top: 16px;
      }
    }
  }
  .textbook {
    &-list {
      display: flex;
      flex-wrap: wrap;
    }
    &-item {
      @include flex-column-center;
      margin-left: 24px;
      margin-bottom: 16px;
      &:nth-child(4n) {
        margin-left: 0;
      }
      &:first-child {
        margin-left: 0;
      }
      &-img {
        position: relative;
        margin-bottom: 8px;
        width: 82px;
        height: 110px;
        border-radius: 6px;
        overflow: hidden;
        img {
          width: 82px;
          height: 110px;
        }
      }
      &-mask {
        @include flex-center;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba($color: #fff, $alpha: 0.7);
      }
      &-text {
        font-size: 12px;
        color: #98a3a5;
      }
    }
  }
  &-item {
    @include flex-center;
    margin-bottom: 12px;
    width: 295px;
    height: 48px;
    font-size: 17px;
    color: #98a3a5;
    background: #f6f6f6;
    border-radius: 6px;
    &.active {
      background: #24b592;
      color: #fff;
    }
  }
  &-list {
    @include flex-column-center;
    justify-content: flex-start;
    &.btn {
      flex-direction: row;
      margin-bottom: 24px;
      .select-item {
        flex: 1;
        &:last-child {
          margin-left: 24px;
        }
      }
    }
  }
  &-header {
    @include flex-center;
    justify-content: space-between;
    margin-bottom: 16px;
    .back {
      @include flex-center;
      color: #3bc9a7;
      font-size: 12px;
    }
  }
  .step-3 &-header {
    flex-direction: column;
    align-items: flex-start;
    h2 {
      @include flex-center;
      margin-top: 6px;
      font-size: 18px;
      color: #24b592;
    }
  }
  &-title {
    font-weight: 500;
  }
  &-content {
    box-sizing: border-box;
    padding: 16px 24px;
    margin-top: 134px;
    margin-bottom: 45px;
    width: 343px;
    min-height: 424px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(42, 88, 77, 0.16);
    border-radius: 12px;
  }
}
</style>
