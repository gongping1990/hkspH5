<template>
  <div class="p-exchangeRecords">
    <div class="p-exchangeRecords-header" v-if="dataList.length">
      <van-icon color="#98A3A5" name="arrow-left"/>
      <span @click="toBack">返回</span>
    </div>

    <cube-scroll
            v-if="dataList.length"
            class="p-exchangeRecords-item-wrap"
            ref="scroll"
            :data="dataList"
            :options="options"
            @pulling-up="onLoad"
    >
      <div
              class="p-exchangeRecords-item"
              v-for="(item, index) of dataList"
              :key="index"
      >
        <div class="-time">{{ item.gmtCreate | timeFormat }}</div>
        <div class="-content">
          <div class="-content-img">
            <img :src="item.coverImg"/>
          </div>
          <div class="-content-text">
            <div class="-title">{{ item.name }}</div>
            <div class="-prize">原价：{{ item.price }}元</div>
            <div class="-num">
              <img class="-icon" src="../assets/image/fuli/coin.png"/>
              <div class="-text">{{ item.credit }}分</div>
            </div>
          </div>
        </div>
      </div>
    </cube-scroll>

    <div class="p-exchangeRecords-noData" v-if="!dataList.length">
      <img class="-no-img" src="../assets/image/noData/no-1.png"/>
      <div class="-no-text">抱歉，暂时没有兑换记录~</div>
      <div class="-no-text-two">赶快去赚取学分</div>
      <div class="-no-btn" @click="toBack">我要赚学分</div>
    </div>
  </div>
</template>

<script>
  import dayjs from "dayjs";

  export default {
    name: "exchangeRecords",
    data() {
      return {
        tab: {
          page: 1,
          pageSize: 10,
          total: ""
        },
        finished: false,
        loading: false,
        dataList: [],
        options: {
          pullUpLoad: {
            txt: {
              more: "",
              noMore: ""
            }
          }
        }
      };
    },
    filters: {
      timeFormat: function (data) {
        return dayjs(+data).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      onLoad() {
        if (this.dataList.length >= this.tab.total) {
          this.$refs.scroll.forceUpdate();
        } else {
          this.tab.page++;
          this.getList();
        }
      },
      toBack() {
        this.$router.push({
          path: "/welfareCentre"
        });
      },
      getList() {
        this.$toast.loading();
        this.$api.prize
          .getConvertOrderRecord({
            current: this.tab.page,
            size: this.tab.pageSize
          })
          .then(({data}) => {
            this.$toast.clear();
            if (this.tab.page > 1) {
              this.dataList = this.dataList.concat(data.resultData.records);
            } else {
              this.dataList = data.resultData.records;
            }
            this.tab.total = data.resultData.total;
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
      }
    }
  };
</script>

<style lang="scss" scoped>
  .p-exchangeRecords {
    overflow: hidden;

    &-header {
      @include flex-y-center;
      padding: 22px 18px;
      border-bottom: 1px solid #d8dcdd;

      span {
        height: 20px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(53, 54, 55, 1);
        line-height: 20px;
        margin-left: 6px;
      }
    }

    &-item-wrap {
      height: calc(100vh - 65px);
      overflow-y: auto;
    }

    &-item {
      padding: 16px;
      border-bottom: 1px solid #d8dcdd;

      .-time {
        margin-bottom: 16px;
        font-size: 12px;
        font-weight: 500;
        color: rgba(152, 163, 165, 1);
        line-height: 17px;
      }

      .-content {
        display: flex;

        &-img {
          @include flex-y-center;

          margin-right: 16px;
          width: 110px;
          height: 110px;
          background: rgba(255, 255, 255, 1);
          border-radius: 6px;
          border: 1px solid rgba(216, 220, 221, 1);

          img {
            width: 100%;
          }
        }

        &-text {
          .-title {
            font-size: 16px;
            font-weight: 500;
            color: rgba(53, 54, 55, 1);
            line-height: 22px;
          }

          .-prize {
            margin: 8px 0 42px;
            font-size: 11px;
            font-weight: 400;
            color: rgba(53, 54, 55, 0.6);
            text-decoration: line-through;
          }

          .-num {
            @include flex-y-center;

            .-icon {
              margin-right: 3px;
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
    }

    &-noData {
      margin-top: 96px;
      text-align: center;

      .-no-img {
        width: 180px;
        height: 180px;
      }

      .-no-text {
        color: #98a3a5;
        font-size: 12px;
      }

      .-no-text-two {
        font-size: 13px;
        font-weight: 400;
        color: #f99e54;
        line-height: 17px;
      }

      .-no-btn {
        margin: 16px auto 0;
        text-align: center;
        width: 113px;
        height: 36px;
        border-radius: 6px;
        border: 1px solid rgba(216, 220, 221, 1);
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(53, 54, 55, 1);
        line-height: 36px;
      }
    }
  }
</style>
