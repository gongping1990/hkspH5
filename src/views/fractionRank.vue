<template>
  <div class="p-fractionRank">
    <div class="p-fractionRank-header">
      <van-icon color="#98A3A5" name="arrow-left" />
      <span @click="toBack">返回</span>
      <div class="-header-tab">
        <div
          class="-header-tab-btn"
          :class="{ '-active': tabIndex == '0' }"
          @click="changeTab"
        >
          总榜
        </div>
        <div
          class="-header-tab-btn"
          :class="{ '-active': tabIndex == '1' }"
          @click="changeTab"
        >
          周榜
        </div>
      </div>
    </div>

    <cube-scroll
            class="p-fractionRank-content"
            ref="scroll"
            :data="dataList"
            :options="options"
            @pulling-up="onLoad"
    >
      <div class="p-fractionRank-body">
        <div class="-body-top">
          <div class="-body-top-one">
            <img
                    v-if="dataItemTwo"
                    class="-img"
                    :src="dataItemTwo.headimgurl"
            />
            <div class="-name">{{ dataItemTwo.nickName }}</div>
            <div class="-num" v-if="dataItemTwo">
              {{ dataItemTwo.creditAmount }}分
            </div>
          </div>
          <div class="-body-top-two">
            <img
                    v-if="dataItemOne"
                    class="-img"
                    :src="dataItemOne.headimgurl"
            />
            <div class="-name">{{ dataItemOne.nickName }}</div>
            <div class="-num" v-if="dataItemOne">
              {{ dataItemOne.creditAmount }}分
            </div>
          </div>
          <div class="-body-top-three">
            <img
                    v-if="dataItemThree"
                    class="-img"
                    :src="dataItemThree.headimgurl"
            />
            <div class="-name">{{ dataItemThree.nickName }}</div>
            <div class="-num" v-if="dataItemThree">
              {{ dataItemThree.creditAmount }}分
            </div>
          </div>
        </div>
        <div class="-body-down">
          榜单根据累计获得学分数量进行排名，每10分钟更新1次
        </div>
      </div>
      <div class="p-fractionRank-footer">
        <div class="-footer-myself">
          <div class="-footer-myself-left">
            <div class="-myself-num">{{ myInfo.rank }}</div>
            <div class="-myself-img">
              <img :src="myInfo.headimgurl" />
            </div>
            <div class="-myself-text">我</div>
          </div>
          <div class="-footer-myself-right">
            <img class="-myself-icon" src="../assets/image/fuli/coin.png" />
            <div class="-myself-num-two">{{ myInfo.creditAmount }}</div>
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
              <img :src="item.headimgurl" />
            </div>
            <div class="-item-text">{{ item.nickName }}</div>
          </div>
          <div class="-footer-item-right">
            <img class="-item-icon" src="../assets/image/fuli/coin.png" />
            <div class="-item-num-two">{{ item.creditAmount }}</div>
            分
          </div>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
export default {
  name: "fractionRank",
  data() {
    return {
      tab: {
        page: 1,
        pageSize: 10,
        total: ""
      },
      options: {
        pullUpLoad: {
          txt: {
            more: "",
            noMore: ""
          }
        }
      },
      tabIndex: "0",
      loading: false,
      finished: false,
      dataList: [],
      dataItemOne: "",
      dataItemTwo: "",
      dataItemThree: "",
      myInfo: ""
    };
  },
  mounted() {
    this.getCreditList();
  },
  methods: {
    getCreditList() {
      this.$api.credit
        .getCreditRank({
          current: this.tab.page,
          size: this.tab.pageSize,
          type: this.tabIndex
        })
        .then(({ data }) => {
          let list = data.resultData.records;
          this.tab.total = data.resultData.total;
          this.loading = false;
          if (this.tab.page > 1) {
            this.dataList = this.dataList.concat(list);
          } else {
            this.myInfo = list[0];
            this.dataList = list.slice(1);
            this.dataItemOne = this.dataList.length && this.dataList[0];
            this.dataItemTwo = this.dataList.length > 1 && this.dataList[1];
            this.dataItemThree = this.dataList.length > 2 && this.dataList[2];
          }
          if (this.tab.total < 10) {
            this.options.pullUpLoad = false;
          } else {
            this.options.pullUpLoad = {
              txt: {
                more: "",
                noMore: ""
              }
            };
          }
        });
    },
    toBack() {
      this.$router.push({
        path: "/welfareCentre"
      });
    },
    onLoad() {
      if (this.dataList.length >= this.tab.total) {
        this.$refs.scroll.forceUpdate();
      } else {
        this.tab.page++;
        this.getCreditList();
      }
    },
    changeTab() {
      this.tab.page = 1;
      this.tabIndex = this.tabIndex == "0" ? "1" : "0";
      this.getCreditList();
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
