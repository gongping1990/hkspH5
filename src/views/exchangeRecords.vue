<template>
  <div class="p-exchangeRecords">
    <div class="p-exchangeRecords-header">
      <van-icon color="#98A3A5" name="arrow-left" />
      <span @click="toBack">返回</span>
    </div>
    <div class="p-exchangeRecords-item" v-for="(item,index) of dataList" :key="index">
      <div class="-time">2019-04-23 16:53:24</div>
      <div class="-content">
        <div class="-content-img">
          <img src="https://pub.file.k12.vip/2019/05/07/1125702765063303170.png">
        </div>
        <div class="-content-text">
          <div class="-title">iPhone X🅂 Max in6.5-512G</div>
          <div class="-prize">原价：12,299元</div>
          <div class="-num">
            <img class="-icon" src="../assets/image/fuli/coin.png"/>
            <div class="-text">1238分</div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-exchangeRecords-noData" v-if="!dataList.length">
      <img class="-no-img" src="../assets/image/noData/no-1.png">
      <div class="-no-text">抱歉，暂时没有兑换记录~ </div>
      <div class="-no-text-two">赶快去赚取学分</div>
      <div class="-no-btn">我要赚学分</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'exchangeRecords',
  data() {
    return {
      dataList: []
    };
  },
  methods: {
    toBack () {
      this.$router.push({
        path: '/welfareCentre'
      })
    },
    onSearch() {}
  }
};
</script>

<style lang="scss" scoped>
.p-exchangeRecords {

  &-header {
    @include flex-y-center;
    padding: 22px 18px;
    border-bottom: 1px solid #D8DCDD;

    span {
      height:20px;
      font-size:14px;
      font-weight:500;
      color:rgba(53,54,55,1);
      line-height:20px;
      margin-left: 6px;
    }
  }

  &-item {
    padding: 16px;
    border-bottom: 1px solid #D8DCDD;

    .-time {
      margin-bottom: 16px;
      font-size:12px;
      font-weight:500;
      color:rgba(152,163,165,1);
      line-height:17px;
    }

    .-content {
      display: flex;

      &-img {
        @include flex-y-center;

        margin-right: 16px;
        width:110px;
        height:110px;
        background:rgba(255,255,255,1);
        border-radius:6px;
        border:1px solid rgba(216,220,221,1);

        img {
          width: 100%;
        }
      }

      &-text {

        .-title {
          font-size:16px;
          font-weight:500;
          color:rgba(53,54,55,1);
          line-height:22px;
        }

        .-prize {
          margin: 8px 0 42px;
          font-size:11px;
          font-weight:400;
          color:rgba(53,54,55,0.6);
          text-decoration: line-through
        }

        .-num {
          @include flex-y-center;

          .-icon {
            margin-right: 3px;
            width: 28px;
            height: 28px;
          }

          .-text {
            font-size:16px;
            font-weight:400;
            color:rgba(53,54,55,1);
            line-height:22px;
          }
        }
      }
    }
  }

  &-noData {
    margin-top: 96px;
    text-align: center;

    .-no-img {
      width: 180px;
      height: 180px;
    }

    .-no-text {
      color:#98A3A5;
      font-size: 12px;
    }

    .-no-text-two {
      font-size:13px;
      font-weight:400;
      color:#F99E54;
      line-height:17px;
    }

    .-no-btn {
      margin: 16px auto 0;
      text-align: center;
      width:113px;
      height:36px;
      border-radius:6px;
      border:1px solid rgba(216,220,221,1);
      font-size:13px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(53,54,55,1);
      line-height:36px;
    }
  }
}
</style>
