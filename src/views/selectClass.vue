<template>
  <div class="select">
    <div v-if="!isNewUser">
      <img
        v-if="step == 1"
        class="step"
        src="../assets/image/yingdao/step1.png"
      />
      <img
        v-else-if="step == 2"
        class="step"
        src="../assets/image/yingdao/step2.png"
      />
      <img v-else class="step" src="../assets/image/yingdao/step3.png" />
    </div>
    <div v-if="isNewUser == 1">
      <img
        v-if="step == 1"
        class="step"
        src="../assets/image/yingdao/step5.png"
      />
      <img
        v-else-if="step == 2"
        class="step"
        src="../assets/image/yingdao/step4.png"
      />
    </div>
    <div class="select-content" v-if="step == 1">
      <div class="select-header">
        <p class="select-title">请选择年级</p>
      </div>
      <div class="select-list">
        <div
          class="select-item"
          :class="{ active: i + 1 == grade }"
          v-for="(item, i) in gradeList"
          :key="i"
          @click="selectGrade(i + 1)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="select-content step-2" v-if="step == 2">
      <div class="select-header">
        <p class="select-title">请选择学期</p>
        <div class="back" @click="step -= 1">
          <span>重选年级</span>
          <van-icon name="arrow" color="#24B592" />
        </div>
      </div>
      <div class="select-list btn">
        <div
          class="select-item"
          :class="{ active: term == 1 }"
          @click="selectTerm(1)"
        >
          上册
        </div>
        <div
          class="select-item"
          :class="{ active: term == 2 }"
          @click="selectTerm(2)"
        >
          下册
        </div>
      </div>
      <div class="select-header">
        <p class="select-title">请选择版本教材</p>
      </div>
      <div class="textbook-list">
        <div
          class="textbook-item"
          :class="{ active: edition == item.id }"
          v-for="item in editionList"
          :key="item.id"
          @click="selectEdition(item)"
        >
          <div class="textbook-item-img">
            <img :src="item.item" />
            <div class="textbook-item-mask" v-if="edition == item.id">
              <van-icon name="checked" size="28px" color="#24B592" />
            </div>
          </div>

          <span class="textbook-item-text">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="select-content step-3" v-if="step == 3">
      <div class="select-header">
        <p class="select-title">绑定手机</p>
        <h2 @click="step -= 1">
          {{ gradeList[grade - 1] }}（{{ termList[term - 1] }}）{{
            editionName
          }}
          <van-icon name="arrow" color="#24B592" />
        </h2>
      </div>
      <div class="phone">
        <span
          >为保障您对产品功能的正常使用，请您绑定手机号，
          感谢您的理解与支持！</span
        >
        <div class="input-wrap">
          <input
            :class="{ error: error }"
            v-model="form.phone"
            :placeholder="placeholder"
            class="input"
            type="tel"
            @focus="bindFocus"
          />
        </div>
        <div class="input-wrap">
          <input
            v-model="form.code"
            :placeholder="codepPlaceholder"
            class="input"
            :class="{ error: codeError }"
            type="text"
            @focus="bindFocus"
          />
          <div class="input-code" @click="sendCode">
            {{ codeTime ? `已发送（${codeTime}）` : "获取验证码" }}
          </div>
        </div>
        <div class="phone-btn" @click="bindPhone">开始学习</div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkPhone } from "../utils";
export default {
  data() {
    return {
      step: 1,
      gradeList: ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"],
      termList: ["上册", "下册"],
      editionList: [],
      grade: 0,
      term: 1,
      edition: 0,
      editionName: "",
      form: {
        phone: "",
        code: ""
      },
      codeTime: 0,
      categoryData: {},
      error: false,
      codeError: false,
      placeholder: "请填写手机号",
      codepPlaceholder: "请填写验证码"
    };
  },
  computed: {
    subject() {
      return this.$route.query.type;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    isNewUser() {
      let { categoryData } = this;
      if (!categoryData && !this.userInfo.phone) {
        return 0;
      } else if (!this.userInfo.phone) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.step = 3;
        return 2;
      } else {
        return 1;
      }
    },
    gradeData() {
      return this.$store.state.gradeData;
    }
  },
  methods: {
    bindFocus() {
      this.placeholder = "请填写手机号";
      this.codepPlaceholder = "请填写验证码";
      this.error = false;
      this.codeError = false;
    },
    //选择年级
    selectGrade(index) {
      this.grade = index;
      if (index == 1) {
        this.getTeachEdition();
      }
      this.step += 1;
    },
    //选择学期
    selectTerm(index) {
      this.term = index;
      this.edition = 0;
      this.getTeachEdition();
    },
    //选择教材版本
    async selectEdition(params) {
      let { grade, term, subject, isNewUser } = this;
      this.edition = params.id;
      this.editionName = params.name;
      this.$store.commit("UPDATE_GRADE_DATA", {
        grade,
        term,
        subject,
        teachEdition: params.id
      });
      if (!isNewUser) {
        this.step += 1;
      } else {
        await this.getArticleList({
          grade,
          term,
          subject,
          teachEdition: params.id,
          type: 1
        });
        this.$router.go(-1);
      }
    },
    // 获取学习列表
    getArticleList(params) {
      return this.$api.article.getArticleList(params).then(({ data }) => {
        this.articleList = data.resultData;
      });
    },
    // 获取教材版本
    getTeachEdition() {
      let { grade, subject, term } = this;
      this.$api.article
        .getTeachEdition({
          grade,
          subject,
          term
        })
        .then(({ data }) => {
          this.editionList = data.resultData;
        });
    },
    // 获取用户选择的年级等信息
    getUserCategory() {
      let { subject } = this;
      this.$api.article
        .getUserCategory({
          subject
        })
        .then(({ data }) => {
          let { grade, term, teachEdition } = data.resultData;
          this.categoryData = data.resultData;
          this.grade = grade;
          this.term = term;
          this.edition = teachEdition;
        });
    },
    // 验证码发送倒计时
    downTime() {
      let { codeTime } = this;
      if (codeTime) {
        this.codeTime -= 1;
        setTimeout(() => {
          this.downTime();
        }, 1000);
      }
    },
    // 发送验证码
    sendCode() {
      let { phone } = this.form;
      if (this.codeTime) return;
      if (!checkPhone(phone)) {
        this.error = true;
        this.form.phone = "";
        this.placeholder =
          phone == "" ? "手机号不能为空" : "请填写正确的手机号";
        return;
      }
      // eslint-disable-next-line no-unreachable
      this.$api.com
        .sendCode({
          phone
        })
        .then(() => {
          this.$toast("验证码发送成功");
          this.codeTime = 60;
          this.downTime();
        });
    },
    // 绑定手机号
    bindPhone() {
      let { form } = this;
      let { phone, code } = this.form;
      if (!checkPhone(phone)) {
        this.error = true;
        this.form.phone = "";
        this.placeholder =
          phone == "" ? "手机号不能为空" : "请填写正确的手机号";
        return;
      }
      if (code == "") {
        this.codeError = true;
        this.codepPlaceholder = "验证码不能为空";
        return;
      }
      this.$api.user.bindPhone(form).then(async () => {
        let params = this.gradeData;
        params.type = 1;
        await this.getArticleList(params);
        this.$router.push("/");
      });
    }
  },
  created() {
    if (this.$route.query.type) {
      this.getUserCategory();
    }
  }
};
</script>

<style lang="scss" scoped>
.select {
  @include flex-column-center;
  justify-content: flex-start;
  padding-top: 24px;
  .step {
    width: 295px;
  }
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
      &.error::-webkit-input-placeholder {
        color: #f76868;
      }
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
    margin-bottom: 24px;
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
    margin-bottom: 32px;
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
      font-size: 16px;
      color: #24b592;
    }
  }
  &-title {
    font-size: 28px;
    font-weight: 500;
  }
  &-content {
    box-sizing: border-box;
    padding: 16px 24px;
    margin-top: 8px;
    margin-bottom: 45px;
    width: 343px;
    min-height: 424px;
    background: rgba(255, 255, 255, 1);
  }
}
</style>
