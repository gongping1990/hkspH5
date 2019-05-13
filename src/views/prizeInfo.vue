<template>
  <div class="p-prizeInfo">
    <div class="p-prizeInfo-header">
      <div class="-header-back" @click="toBack">
        <van-icon color="#FFFFFF" name="arrow-left" />
        <span>返回</span>
      </div>
      <div class="-header-name">
        iPhone X🅂 Max
      </div>
    </div>
    <div class="p-prizeInfo-swipe">
      <van-swipe :autoplay="3000" indicator-color="#24B592">
        <van-swipe-item
          v-for="(item, index) of bannerList"
          :key="index"
          class="-swipe-item"
        >
          <img class="-swipe-item-img" :src="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="p-prizeInfo-content">
      <div class="-content-title">
        {{dataDetail.name}}
      </div>
      <div class="-content-prize">
        原价：{{dataDetail.price}}元
      </div>
      <div class="-content-explain" v-html="dataDetail.directions"></div>
      <div class="-content-detail">
        <div class="-content-detail-title">— 商品详情 —</div>
        <div>{{dataDetail.details}}</div>
      </div>
    </div>
    <div class="p-prizeInfo-footer" @click="openModal">
      <img class="-icon" src="../assets/image/fuli/coin.png" />
      <div class="-text">{{dataDetail.credit}}学分兑换</div>
    </div>

    <van-popup v-model="isShowPrizeSure" :close-on-click-overlay="false" class="p-prizeInfo-popupTwo">
      <div class="p-prizeInfo-popupTwo-sure">
        <p class="-title">您正在兑换</p>
        <p class="-content">{{dataDetail.name}}</p>
        <div class="-btn" @click="toConfirm">确定</div>
        <div class="-text" @click="openModal">取消</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "prizeInfo",
  data() {
    return {
      isShowPrizeSure: false,
      dataDetail: '',
      bannerList: []
    };
  },
  mounted() {
    this.getPrizeDetail()
  },
  methods: {
    toConfirm(){
      this.$api.prize.convertPrize({
        id: this.$route.query.id
      }).then(({ data }) => {
        this.$router.push({
          path: '/exchangeSuccess',
          query: {
            id: data.resultData
          }
        })
        this.openModal()
      });
    },
    openModal(){
      this.isShowPrizeSure = !this.isShowPrizeSure
    },
    toBack() {
      this.$router.push({
        path: "/welfareCentre"
      });
    },
    getPrizeDetail() {
      this.$api.prize.prizeDetails({
        id: this.$route.query.id
      }).then(({ data }) => {
        this.dataDetail = data.resultData;
        this.bannerList = JSON.parse(this.dataDetail.showImgs)
      });
    }
  }
};
</script>

<style scoped lang="scss">
.p-prizeInfo {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 20px 0 16px;

    .-header-back {
      @include flex-center;

      width: 52px;
      height: 28px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 14px;

      span {
        height: 20px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
      }
    }

    .-header-name {
      height: 20px;
      font-size: 14px;
      font-weight: 500;
      color: #afafaf;
      line-height: 20px;
    }
  }

  &-swipe {
    margin-top: 16px;
    border-bottom: 1px solid #d8dcdd;

    .-swipe-item {
      @include flex-y-center;

      width: 100%;
      height: 241px !important;

      &-img {
        height: 80%;
        width: 100%;
      }
    }
  }

  &-content {
    .-content-title {
      border-bottom: 1px solid #d8dcdd;
      padding: 16px;
      font-size: 18px;
      font-weight: 500;
      color: rgba(53, 54, 55, 1);
      line-height: 25px;
    }

    .-content-prize {
      border-bottom: 1px solid #d8dcdd;
      padding: 16px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(53, 54, 55, 0.6);
      line-height: 20px;
      text-decoration: line-through;
    }

    .-content-explain {
      padding: 16px;
    }

    .-content-detail {
      &-title {
        text-align: center;
        width: 100%;
        height: 52px;
        background: rgba(246, 246, 246, 1);
        font-size: 14px;
        font-weight: 500;
        color: rgba(53, 54, 55, 1);
        line-height: 52px;
      }
    }
  }

  &-footer {
    @include flex-center;

    position: fixed;
    bottom: 0;
    width: 100%;
    height: 48px;
    background: rgba(247, 104, 104, 1);

    .-icon {
      width: 24px;
      height: 24px;
    }

    .-text {
      margin-left: 4px;
      height: 24px;
      font-size: 17px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
    }
  }

  &-popupTwo {
    width: 254px;
    height: 208px;
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;

    &-sure {
      text-align: center;
      margin: 20px;

      .-title {
        font-size: 14px;
        font-weight: 500;
        color: rgba(53, 54, 55, 1);
        line-height: 20px;
      }

      .-content {
        margin-top: 12px;
        height: 42px;
        font-size: 16px;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        line-height: 22px;
      }

      .-btn {
        margin: 24px auto 10px;
        text-align: center;
        width: 160px;
        height: 40px;
        background: rgba(36, 181, 146, 1);
        border-radius: 20px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
      }

      .-text {
        font-size: 14px;
        font-weight: 400;
        color: rgba(152, 163, 165, 1);
        line-height: 20px;
      }
    }

  }
}
</style>
