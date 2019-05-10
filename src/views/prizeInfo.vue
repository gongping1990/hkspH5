<template>
  <div class="p-prizeInfo">
    <div class="p-prizeInfo-header">
      <div class="-header-back" @click="toBack">
        <van-icon color="#FFFFFF" name="arrow-left"/>
        <span>返回</span>
      </div>
      <div class="-header-name">
        iPhone X🅂 Max
      </div>
    </div>
    <div class="p-prizeInfo-swipe">
      <van-swipe :autoplay="3000" indicator-color="#24B592">
        <van-swipe-item v-for="(item,index) of bannerList" :key="index" class="-swipe-item">
          <img class="-swipe-item-img" :src="item.url">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="p-prizeInfo-content">
      <div class="-content-title">
        苹果最新款iPhone X🅂 Max in6.5-512G 原厂原装手机
      </div>
      <div class="-content-prize">
        原价：12,299元
      </div>
      <div class="-content-explain" v-html="explain"></div>
      <div class="-content-detail">
        <div class="-content-detail-title">— 商品详情 —</div>
        <div></div>
      </div>
    </div>
    <div class="p-prizeInfo-footer">
      <img class="-icon" src="../assets/image/fuli/coin.png"/>
      <div class="-text">1238学分兑换</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "prizeInfo",
    data() {
      return {
        bannerList: [
          {
            url: 'https://pub.file.k12.vip/2019/04/25/1121293295378092034.jpg'
          },
          {
            url: 'https://pub.file.k12.vip/2019/04/25/1121320305816043522.png'
          },
          {
            url: 'https://pub.file.k12.vip/2019/03/04/1102391104851939329.png'
          }
        ],
        explain: "<p><span style='color: rgb(249, 150, 59);'>说明： 1.全…; &nbsp; &nbsp; &nbsp; 4.款式随机发货，暂不支持自选</span></p>', text: '说明： 1.全国大陆地区普通快递包邮&nbsp; &nbsp; &nbsp; &nbsp; &nbs…nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 4.款式随机发货，暂不支持自选"
      }
    },
    methods: {
      toBack () {
        this.$router.push({
          path: "/welfareCentre"
        });
      }
    }
  }
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
        color: #AFAFAF;
        line-height: 20px;
      }
    }

    &-swipe {
      margin-top: 16px;
      border-bottom: 1px solid #D8DCDD;

      .-swipe-item {
        @include flex-y-center;

        width: 100%;
        height: 241px!important;

        &-img {
          width: 100%;
        }
      }
    }

    &-content {

      .-content-title {
        border-bottom: 1px solid #D8DCDD;
        padding: 16px;
        font-size:18px;
        font-weight:500;
        color:rgba(53,54,55,1);
        line-height:25px;
      }

      .-content-prize {
        border-bottom: 1px solid #D8DCDD;
        padding: 16px;
        font-size:14px;
        font-weight:400;
        color:rgba(53,54,55,0.6);
        line-height:20px;
        text-decoration: line-through;
      }

      .-content-explain {
        padding: 16px;
      }

      .-content-detail {
        &-title {
          text-align: center;
          width:100%;
          height:52px;
          background:rgba(246,246,246,1);
          font-size:14px;
          font-weight:500;
          color:rgba(53,54,55,1);
          line-height:52px;
        }
      }
    }

    &-footer {
      @include flex-center;

      position: fixed;
      bottom: 0;
      width:100%;
      height:48px;
      background:rgba(247,104,104,1);

      .-icon {
        width: 24px;
        height: 24px;
      }

      .-text {
        margin-left: 4px;
        height:24px;
        font-size:17px;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:24px;
      }
    }
  }
</style>