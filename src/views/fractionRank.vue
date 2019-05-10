<template>
  <div class="p-fractionRank">
    <div class="p-fractionRank-header">
      <van-icon color="#98A3A5" name="arrow-left" />
      <span @click="toBack">返回</span>
      <div class="-header-tab">
        <div
          class="-header-tab-btn"
          :class="{ '-active': tabIndex == '1' }"
          @click="changeTab"
        >
          总榜
        </div>
        <div
          class="-header-tab-btn"
          :class="{ '-active': tabIndex == '2' }"
          @click="changeTab"
        >
          周榜
        </div>
      </div>
    </div>
    <van-list
      class="p-fractionRank-content"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="p-fractionRank-body">
        <div class="-body-top">
          <div class="-body-top-one">
            <img
              class="-img"
              src="https://pub.file.k12.vip/2019/05/08/1126029495313874946.jpg"
            />
            <div class="-name">飞向企鹅的猪</div>
            <div class="-num">385分</div>
          </div>
          <div class="-body-top-two">
            <img
              class="-img"
              src="https://pub.file.k12.vip/2019/05/08/1126029350438039554.jpg"
            />
            <div class="-name">最美的期待</div>
            <div class="-num">585分</div>
          </div>
          <div class="-body-top-three">
            <img
              class="-img"
              src="https://pub.file.k12.vip/2019/05/08/1126029616962015234.jpg"
            />
            <div class="-name">最美的期待</div>
            <div class="-num">85分</div>
          </div>
        </div>
        <div class="-body-down">
          榜单根据累计获得学分数量进行排名，每10分钟更新1次
        </div>
      </div>
      <div class="p-fractionRank-footer">
        <div class="-footer-myself">
          <div class="-footer-myself-left">
            <div class="-myself-num">113</div>
            <div class="-myself-img">
              <img
                src="https://pub.file.k12.vip/2019/05/08/1126023000735739906.jpg"
              />
            </div>
            <div class="-myself-text">我</div>
          </div>
          <div class="-footer-myself-right">
            <img class="-myself-icon" src="../assets/image/fuli/coin.png" />
            <div class="-myself-num-two">1238</div>
            分
          </div>
        </div>
        <div
          class="-footer-item"
          v-for="(item, index) of dataList"
          :key="index"
        >
          <div class="-footer-item-left">
            <div class="-item-num" v-if="index > 2">{{ item.rank }}</div>
            <img
              class="-item-rank-img"
              src="../assets/image/fuli/first.png"
              v-if="index == 0"
            />
            <img
              class="-item-rank-img"
              src="../assets/image/fuli/secend.png"
              v-if="index == 1"
            />
            <img
              class="-item-rank-img"
              src="../assets/image/fuli/third.png"
              v-if="index == 2"
            />
            <div class="-item-img">
              <img :src="item.url" />
            </div>
            <div class="-item-text">{{ item.name }}</div>
          </div>
          <div class="-footer-item-right">
            <img class="-item-icon" src="../assets/image/fuli/coin.png" />
            <div class="-item-num-two">{{ item.num }}</div>
            分
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "fractionRank",
  data() {
    return {
      tabIndex: "1",
      loading: false,
      finished: false,
      dataList: [
        {
          url: "https://pub.file.k12.vip/2019/05/08/1126029350438039554.jpg",
          rank: "1",
          name: "Sunstra Maneerattana Fernán",
          num: "1912"
        },
        {
          url: "https://pub.file.k12.vip/2019/05/08/1126029495313874946.jpg",
          name: "中华小当家",
          num: "1112",
          rank: "2"
        },
        {
          url: "https://pub.file.k12.vip/2019/05/08/1126029616962015234.jpg",
          name: "风情若曦",
          num: "659",
          rank: "3"
        },
        {
          url: "https://pub.file.k12.vip/2019/05/08/1126029670313562113.jpg",
          name: "你是一头猪",
          num: "584",
          rank: "4"
        },
        {
          url: "https://pub.file.k12.vip/2019/05/08/1126029719759470593.jpg",
          name: "你若安好便是晴天",
          num: "369",
          rank: "5"
        },
        {
          url: "https://pub.file.k12.vip/2019/05/08/1126029811070210049.png",
          name: "Salomé Fernán",
          num: "23",
          rank: "6"
        },
        {
          url: "https://pub.file.k12.vip/2019/05/08/1126029670313562113.jpg",
          name: "你是一头猪",
          num: "584",
          rank: "17"
        },
        {
          url: "https://pub.file.k12.vip/2019/05/08/1126029719759470593.jpg",
          name: "你若安好便是晴天",
          num: "369",
          rank: "118"
        },
        {
          url: "https://pub.file.k12.vip/2019/05/08/1126029811070210049.png",
          name: "Salomé Fernán",
          num: "23",
          rank: "119"
        }
      ]
    };
  },
  methods: {
    toBack() {
      this.$router.push({
        path: "/welfareCentre"
      });
    },
    onLoad() {
      console.log(111);
    },
    changeTab() {
      this.tabIndex = this.tabIndex == "1" ? "2" : "1";
    }
  }
};
</script>

<style scoped lang="scss">
.p-fractionRank {
  overflow: hidden;
  height: 100vh;

  &-header {
    @include flex-y-center;
    padding: 17px 22px;

    span {
      height: 20px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(53, 54, 55, 1);
      line-height: 20px;
    }

    .-header-tab {
      @include flex-y-center;
      margin-left: 56px;

      &-btn {
        text-align: center;
        width: 64px;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        font-weight: 500;
        color: #353637;
        border-radius: 18px;
      }

      &-btn:last-child {
        margin-left: 10px;
      }

      .-active {
        color: rgba(36, 181, 146, 1);
        background: rgba(36, 181, 146, 0.1);
      }
    }
  }

  &-content {
    overflow: auto;
    height: calc(100vh - 59px);
  }

  &-body {
    .-body-top {
      display: flex;
      padding: 0 26px 0 30px;
      background: url("../assets/image/fuli/ranking list-backgroud.png")
        no-repeat;
      background-size: 100%;
      height: 277px;

      &-one {
        margin-top: 75px;
        text-align: center;
        width: 96px;

        .-img {
          border-radius: 50%;
          width: 48px;
          height: 48px;
          border: 2px solid rgba(255, 142, 33, 1);
        }

        .-name {
          @include text-overflow(100px);
          height: 17px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(53, 54, 55, 1);
          line-height: 17px;
          margin: 8px auto 2px;
        }

        .-num {
          height: 28px;
          font-size: 20px;
          font-weight: 500;
          color: rgba(255, 142, 33, 1);
          line-height: 28px;
        }
      }

      &-two {
        margin-top: 20px;
        text-align: center;
        width: 132px;

        .-img {
          border-radius: 50%;
          width: 64px;
          height: 64px;
          border: 2px solid #f76868;
        }

        .-name {
          @include text-overflow(100px);
          height: 20px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(53, 54, 55, 1);
          line-height: 20px;
          margin: 8px auto 2px;
        }

        .-num {
          height: 37px;
          font-size: 26px;
          font-weight: 500;
          color: #f76868;
          line-height: 37px;
        }
      }

      &-three {
        margin-top: 101px;
        text-align: center;
        width: 96px;

        .-img {
          border-radius: 50%;
          width: 42px;
          height: 42px;
          border: 2px solid #febd44;
        }

        .-name {
          @include text-overflow(100px);
          height: 16px;
          font-size: 11px;
          font-weight: 400;
          color: rgba(53, 54, 55, 1);
          line-height: 16px;
          margin: 8px auto 2px;
        }

        .-num {
          height: 24px;
          font-size: 17px;
          font-weight: 500;
          color: #febd44;
          line-height: 24px;
        }
      }
    }

    .-body-down {
      text-align: center;
      height: 32px;
      background: rgba(247, 104, 104, 1);
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 32px;
    }
  }

  &-footer {
    .-footer-myself {
      display: flex;
      justify-content: space-between;
      padding: 12px 16px;
      background: rgba(246, 246, 246, 1);

      &-left {
        @include flex-y-center;

        .-myself-num {
          margin-right: 17px;
          font-size: 18px;
          font-weight: bold;
          color: rgba(36, 181, 146, 1);
          line-height: 21px;
        }

        .-myself-img {
          overflow: hidden;
          margin-right: 8px;

          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }

        .-myself-text {
          height: 22px;
          font-size: 16px;
          font-weight: 400;
          color: rgba(53, 54, 55, 1);
          line-height: 22px;
        }
      }

      &-right {
        display: flex;
        align-items: center;

        .-myself-icon {
          margin-right: 8px;
          width: 32px;
          height: 32px;
        }

        .-myself-num-two {
          height: 28px;
          font-size: 20px;
          font-weight: 500;
          color: rgba(53, 54, 55, 1);
          line-height: 28px;
        }
      }
    }

    .-footer-item {
      display: flex;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid #d8dcdd;

      &-left {
        @include flex-y-center;

        .-item-rank-img {
          width: 26px;
          height: 26px;
        }

        .-item-num {
          text-align: center;
          min-width: 26px;
          font-size: 14px;
          font-weight: bold;
          color: #98a3a5;
          line-height: 16px;
        }

        .-item-img {
          margin-right: 12px;
          margin-left: 11px;
          overflow: hidden;

          img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
          }
        }

        .-item-text {
          @include text-overflow(140px);
          height: 22px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(53, 54, 55, 1);
          line-height: 22px;
        }
      }

      &-right {
        display: flex;
        align-items: center;
        font-size: 10px;

        .-item-icon {
          margin-right: 8px;
          width: 22px;
          height: 22px;
        }

        .-item-num-two {
          height: 22px;
          font-size: 16px;
          font-weight: 500;
          color: rgba(53, 54, 55, 1);
          line-height: 22px;
        }
      }
    }
  }
}
</style>
