<template>
  <div class="p-exchangeSuccess">
    <div class="p-exchangeSuccess-header">
      <img class="-img" src="../assets/image/duihuan/success.png" />
      <div class="-text">您已成功兑换</div>
      <div class="-time">{{ dataDetail.gmtCreate | timeFormat }}</div>
    </div>
    <div class="p-exchangeSuccess-commodity">
      <div class="-commodity-img">
        <img :src="dataDetail.coverImg" />
      </div>
      <div class="-commodity-text">
        <div>
          <div class="-title">{{ dataDetail.name }}</div>
          <div class="-prize">原价：{{ dataDetail.price }}元</div>
        </div>
        <div class="-num">
          <img class="-icon" src="../assets/image/fuli/coin.png" />
          <div class="-text">{{ dataDetail.credit }}学分</div>
        </div>
      </div>
    </div>
    <div class="p-exchangeSuccess-footer">
      <div class="-footer-title">
        <img class="-img" src="../assets/image/duihuan/warm.png" />
        <div class="-text">请根据下列提示进行操作领取奖品</div>
      </div>
      <div class="-footer-content">
        <img class="-img" src="../assets/image/duihuan/tittle-one.png" />
        <div class="-text-one">在当前页面，手机截屏</div>
        <img class="-img" src="../assets/image/duihuan/tittle-two.png" />
        <div class="-text-two">请长按二维码识别，加客服微信</div>
        <div class="-text-img">
          <img
            class="-qr-img"
            src="https://pub.file.k12.vip/2019/05/08/1125967635272822785.jpg"
          />
        </div>
        <div class="-text-three">
          <img
            class="-safe-img"
            src="../assets/image/duihuan/gz-icon-safe.png"
          />
          安全认证
        </div>
        <img class="-img" src="../assets/image/duihuan/tittle-three.png" />
        <div class="-text-four">
          将“第1步”手机截屏的图片发送给客服 客服将为您发放奖品
        </div>
      </div>
      <div class="-footer-btn" @click="toBack">
        返回首页
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "exchangeRecords",
  data() {
    return {
      dataDetail: ""
    };
  },
  filters: {
    timeFormat: function(data) {
      return dayjs(+data).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$api.prize
        .getOrderDetails({
          id: this.$route.query.id
        })
        .then(({ data }) => {
          this.dataDetail = data.resultData;
        });
    },
    toBack() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.p-exchangeSuccess {
  &-header {
    text-align: center;

    .-img {
      margin: 32px auto 16px;
      width: 64px;
      height: 64px;
    }

    .-text {
      font-size: 20px;
      font-weight: 500;
      color: #353637;
      line-height: 28px;
    }

    .-time {
      padding-bottom: 24px;
      font-size: 12x;
      color: #98a3a5;
      line-height: 28px;
    }
  }

  &-commodity {
    display: flex;
    background: rgba(246, 246, 246, 1);
    padding: 16px;

    .-commodity-img {
      @include flex-y-center;

      margin-right: 16px;
      min-width: 148px;
      width: 148px;
      height: 148px;
      background: rgba(255, 255, 255, 1);
      border-radius: 6px;
      border: 1px solid rgba(216, 220, 221, 1);

      img {
        width: 100%;
      }
    }

    .-commodity-text {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .-title {
        font-size: 16px;
        font-weight: 500;
        color: rgba(53, 54, 55, 1);
        line-height: 22px;
      }

      .-prize {
        margin: 8px 0 0;
        font-size: 11px;
        font-weight: 400;
        color: rgba(53, 54, 55, 0.6);
        text-decoration: line-through;
      }

      .-num {
        @include flex-y-center;

        .-icon {
          margin-right: 8px;
          width: 28px;
          height: 28px;
        }

        .-text {
          font-size: 16px;
          font-weight: 400;
          color: rgba(53, 54, 55, 1);
          line-height: 22px;
        }
      }
    }
  }

  &-footer {
    padding-bottom: 24px;
    .-footer-title {
      text-align: center;
      padding: 32px 0 16px;
      border-bottom: 1px solid #d8dcdd;

      .-img {
        margin-bottom: 10px;
        width: 32px;
        height: 32px;
      }
      .-text {
        margin: 0 auto;
        width: 220px;
        height: 56px;
        font-size: 20px;
        font-weight: 500;
        color: rgba(247, 104, 104, 1);
        line-height: 28px;
      }
    }

    .-footer-content {
      text-align: center;
      padding: 24px 0;
      border-bottom: 1px solid #d8dcdd;

      .-img {
        width: 96px;
        height: 32px;
        margin: 0 auto;
      }

      .-text-one {
        margin: 8px 0 24px;
        height: 22px;
        font-size: 16px;
        font-weight: 500;
        color: rgba(249, 158, 84, 1);
        line-height: 22px;
      }

      .-text-two {
        margin: 8px 0 16px;
        height: 22px;
        font-size: 16px;
        font-weight: 500;
        color: rgba(249, 158, 84, 1);
        line-height: 22px;
      }

      .-text-img {
        margin: 0 auto;
        width: 194px;
        height: 194px;
        border-radius: 12px;
        border: 1px solid rgba(249, 158, 84, 1);

        .-qr-img {
          padding: 10px;
          width: 174px;
          height: 174px;
        }
      }

      .-text-three {
        margin: 8px 0 24px;
        height: 14px;
        font-size: 10px;
        font-weight: 400;
        color: rgba(59, 201, 167, 1);
        line-height: 14px;

        .-safe-img {
          margin-right: 4px;
          width: 10px;
          height: 11px;
        }
      }

      .-text-four {
        margin: 8px auto 0;
        width: 266px;
        height: 47px;
        font-size: 16px;
        font-weight: 500;
        color: rgba(249, 158, 84, 1);
        line-height: 22px;
      }
    }

    .-footer-btn {
      text-align: center;
      margin: 31px auto 0;
      width: 327px;
      height: 48px;
      border-radius: 6px;
      border: 1px solid rgba(216, 220, 221, 1);
      font-size: 17px;
      font-weight: 400;
      color: rgba(53, 54, 55, 1);
      line-height: 48px;
    }
  }
}
</style>
