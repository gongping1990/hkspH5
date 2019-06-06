<template>
  <div class="p-welfareCentre">
    <div class="p-welfareCentre-tip">
      <div class="-text" @click="toJump">兑换记录 ></div>
    </div>

    <div class="p-welfareCentre-swipe">
      <div class="-swipe-item">
        <van-swipe
          class="-swipe-item-wrap"
          :show-indicators="false"
          :autoplay="3000"
          vertical
        >
          <van-swipe-item
            class="-swiper-flex"
            v-for="(item, index) of dataDetail.convertMsgs"
            :key="index"
          >
            <img class="-swipe-item-headimg" :src="item.headimgurl" />
            <div class="-swipe-item-text">
              <p class="-name">{{ item.name }}</p>
              <p class="-text">{{ item.content }}</p>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div class="p-welfareCentre-sign">
      <div class="-sign-img">
        <img
          v-if="!isSign"
          @click="toSign"
          class="-btn-img-center"
          src="../assets/image/fuli/button-sign.png"
        />
        <img
          v-if="isSign"
          @click="toSign"
          class="-btn-img-center"
          src="../assets/image/fuli/button-sign in.png"
        />
      </div>

      <div class="-sign-top">
        <div class="-sign-width">
          <div class="-title">今日学习</div>
          <div class="-time">
            <span class="-num">{{ learnTime }}</span
            >分钟
          </div>
        </div>
        <div class="-sign-width">
          <div class="-title">我的学分</div>
          <div class="-num">
            {{ dataDetail.myCredit.credit }}
          </div>
        </div>
        <div class="deshi"></div>
      </div>

      <div class="-sign-bottom">
        <div
          class="-sign-bottom-wrap"
          :class="{ '-sign-bottom-wrap-two': isTimeToCollectThree }"
        >
          <div
            class="-wrap-with"
            v-if="
              dataDetail.myCredit.getCreditLearnThree && !isTimeToCollectThree
            "
          >
            <div class="-one">+20</div>
          </div>

          <img
            class="-wrap-with -animation"
            v-if="
              isTimeToCollectThree && !dataDetail.myCredit.getCreditLearnThree
            "
            src="../assets/image/fuli/button-coin-pre.png"
            @click="toGetCredit(3, 20)"
          />
          <div
            class="-wrap-with"
            v-if="
              !dataDetail.myCredit.getCreditLearnThree && !isTimeToCollectThree
            "
            @click="showTip(3)"
          >
            <img
              class="-three"
              src="../assets/image/fuli/button-coin-def.png"
            />
          </div>
          <div class="-text">3分钟</div>
          <div class="-tips -tips-rotate" v-if="isActive == '3'">
            <p>每日学习3分钟可领取20个学分</p>
          </div>
        </div>
        <div class="-sign-bottom-line"></div>
        <div
          class="-sign-bottom-wrap"
          :class="{ '-sign-bottom-wrap-two': isTimeToCollectFive }"
        >
          <div
            class="-wrap-with"
            v-if="
              dataDetail.myCredit.getCreditLearnFive && !isTimeToCollectFive
            "
          >
            <img
              class="-center-img"
              src="../assets/image/fuli/backgroud-3.png"
            />
            <div class="-one -center-num">+30</div>
          </div>

          <img
            class="-wrap-with -animation"
            v-if="
              isTimeToCollectFive && !dataDetail.myCredit.getCreditLearnFive
            "
            src="../assets/image/fuli/button-coin-pre.png"
            @click="toGetCredit(5, 30)"
          />
          <div
            class="-wrap-with"
            v-if="
              !dataDetail.myCredit.getCreditLearnFive && !isTimeToCollectFive
            "
            @click="showTip(5)"
          >
            <img
              class="-three"
              src="../assets/image/fuli/button-coin-def.png"
            />
          </div>
          <div class="-text">5分钟</div>
          <div class="-tips" v-if="isActive == '5'">
            <p>每日学习5分钟可领取30个学分</p>
          </div>
        </div>
        <div class="-sign-bottom-line"></div>
        <div
          class="-sign-bottom-wrap"
          :class="{ '-sign-bottom-wrap-two': isTimeToCollectTen }"
        >
          <div
            class="-wrap-with"
            v-if="dataDetail.myCredit.getCreditLearnTen && !isTimeToCollectTen"
          >
            <div class="-one">+50</div>
          </div>
          <img
            class="-wrap-with -animation"
            v-if="isTimeToCollectTen && !dataDetail.myCredit.getCreditLearnTen"
            src="../assets/image/fuli/button-coin-pre.png"
            @click="toGetCredit(10, 50)"
          />
          <div
            class="-wrap-with"
            v-if="!dataDetail.myCredit.getCreditLearnTen && !isTimeToCollectTen"
            @click="showTip(10)"
          >
            <img
              class="-three"
              src="../assets/image/fuli/button-coin-def.png"
            />
          </div>
          <div class="-text">
            10分钟
          </div>
          <div class="-tips" v-if="isActive == '10'">
            <p>每日学习10分钟可领取50个学分</p>
          </div>
        </div>

        <div
          class="-sign-bottom-solid"
          v-if="learnTime > 3"
          :style="{ width: widthData }"
        ></div>
      </div>
    </div>

    <div class="p-welfareCentre-rank">
      <div class="p-welfareCentre-rank-img">
        学分排行榜
      </div>
      <div class="p-welfareCentre-rank-top">
        <div class="-item-wrap" v-for="(item, index) of rankList" :key="index">
          <img
            v-if="index == 0"
            class="-item-icon"
            src="../assets/image/fuli/first.png"
          />
          <img
            v-if="index == 1"
            class="-item-icon"
            src="../assets/image/fuli/secend.png"
          />
          <img
            v-if="index == 2"
            class="-item-icon"
            src="../assets/image/fuli/third.png"
          />
          <div class="-item-head">
            <img
              :src="item.headimgurl"
              :class="{
                '-first': index == 0,
                '-second': index == 1,
                '-third': index == 2
              }"
            />
          </div>
          <div class="-item-name">{{ item.nickName }}</div>
          <div class="-item-num">
            <img src="../assets/image/fuli/coin.png" />
            <div>{{ item.creditAmount }}</div>
            分
          </div>
        </div>
      </div>
      <div class="p-welfareCentre-rank-down">
        <div class="-ellipsis" v-if="rankImgList.length > 5">...</div>
        <div class="-item-down-wrap">
          <div
            class="-item-down"
            v-for="(item, index) of rankImgList"
            :key="index"
          >
            <img :src="item.headimgurl" />
          </div>
        </div>
        <div class="-ellipsis" v-if="rankImgList.length > 5">...</div>
      </div>
      <div class="p-welfareCentre-rank-num">
        <div class="-num-text">
          已经有<span>{{ tab.total }}位</span>家长加入赚取学分
        </div>
        <div class="-num-btn" @click="toRank">查看全部 ></div>
      </div>
      <div class="p-welfareCentre-rank-user">
        <div class="-user-wrap">
          <div class="-user-num">{{ myInfo.rank }}</div>
          <div class="-user-img"><img :src="myInfo.headimgurl" /></div>
          <div class="-user-text">我</div>
        </div>
        <div class="-user-wrap">
          <img class="-user-icon" src="../assets/image/fuli/coin.png" />
          <div class="-user-num-two">{{ myInfo.creditAmount }}</div>
          分
        </div>
      </div>
    </div>

    <div class="p-welfareCentre-prize">
      <div class="p-welfareCentre-prize-img">
        学分换奖品
      </div>
      <div class="p-welfareCentre-prize-wrap">
        <div
          class="-prize-item"
          v-for="(item, index) of prizeList"
          :key="index"
        >
          <div class="-img" @click="toInfo(item)">
            <img :src="item.coverImg" />
          </div>
          <div class="-img-out" v-if="item.total == 0">已抢光</div>
          <div class="-title">{{ item.name }}</div>
          <div class="-price">原价：{{ item.price }}元</div>
          <div
            class="-btn"
            :class="{ '-btn-out': item.total == 0 }"
            @click="toExchange(item)"
          >
            {{ item.credit }}学分兑换
          </div>
        </div>
      </div>
    </div>

    <div class="p-welfareCentre-service">
      <img src="../assets/image/fuli/service.png" @click="openService" />
    </div>

    <van-popup
      v-model="isShowPopup"
      @click-overlay="closePopup"
      class="p-welfareCentre-popupOne"
    >
      <div class="p-welfareCentre-popupOne-img">
        <img class="-img" src="../assets/image/fuli/icon-coin-bigger.png" />
      </div>
      <div class="p-welfareCentre-popupOne-text">恭喜你，获得学分</div>
      <div class="p-welfareCentre-popupOne-num">+{{ dataItem.credit }}</div>
      <div class="p-welfareCentre-popupOne-btn" @click="openShare">
        邀请好友一起学
      </div>
    </van-popup>

    <van-popup
      v-model="isShowPrizeSure"
      :close-on-click-overlay="false"
      class="p-welfareCentre-popupTwo"
    >
      <div class="p-welfareCentre-popupTwo-sure">
        <p class="-title">您正在兑换</p>
        <p class="-content">{{ dataItem.name }}</p>
        <div class="-btn" @click="toConfirm">确定</div>
        <div class="-text" @click="closePopup">取消</div>
      </div>
    </van-popup>

    <van-popup
      v-model="isShowService"
      :close-on-click-overlay="false"
      class="p-welfareCentre-popupService"
    >
      <div class="-body">
        <div class="-title">
          <p class="-p-one">问题咨询请加客服</p>
          <p class="-p-two">长按二维码识别</p>
        </div>
        <p class="-content">
          <img src="../assets/image/fuli/qrcode.jpg" />
        </p>
        <div class="-tip">
          <img
            class="-safe-img"
            src="../assets/image/duihuan/gz-icon-safe.png"
          />安全认证
        </div>
      </div>

      <i class="-close" @click="closePopup"></i>
    </van-popup>

    <van-tabbar v-model="tabActive" active-color="#24B592">
      <van-tabbar-item to="/">
        <span>语文</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.chinesePre : icon.chineseDef"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/?type=2">
        <span>数学</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.mathPre : icon.mathDef"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/?type=3">
        <span>英语</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.englishPre : icon.englishDef"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/study">
        <span>学习天地</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.fieldPre : icon.fieldDef"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/welfareCentre">
        <span>福利中心</span>
        <img
          v-if="isShowTabBarTips"
          class="g-tabbar-tips"
          src="../assets/image/fuli/tips-tab.png"
        />
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.wekfarePre : icon.wekfareDef"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import chineseDef from "../assets/image/tab/tabbar-button-chinese-def.png";
import chinesePre from "../assets/image/tab/tabbar-button-chinese-pre.png";
import mathDef from "../assets/image/tab/tabbar-button-math-def.png";
import mathPre from "../assets/image/tab/tabbar-button-math-pre.png";
import englishDef from "../assets/image/tab/tabbar-button-english-def.png";
import englishPre from "../assets/image/tab/tabbar-button-english-pre.png";
import fieldDef from "../assets/image/tab/tabbar-button-field-def.png";
import fieldPre from "../assets/image/tab/tabbar-button-field-pre.png";
import wekfareDef from "../assets/image/tab/tabbar-button-welfare-def.png";
import wekfarePre from "../assets/image/tab/tabbar-button-welfare-pre.png";

export default {
  name: "welfareCentre",

  data() {
    return {
      tab: {
        page: 1,
        pageSize: 1000,
        total: ""
      },
      icon: {
        chineseDef,
        chinesePre,
        mathDef,
        mathPre,
        englishDef,
        englishPre,
        fieldDef,
        fieldPre,
        wekfareDef,
        wekfarePre
      },
      tabActive: 4,
      active: 1,
      broadcastList: [],
      rankList: [],
      rankImgList: [],
      prizeList: [],
      dataDetail: {
        myCredit: ""
      },
      dataItem: {},
      myInfo: "",
      learnTime: "",
      isActive: "",
      widthData: "",
      isSign: false,
      isShowPopup: false,
      isShowPrizeSure: false,
      isShowService: false,
      isShowTabBarTips: false,
      isTimeToCollectThree: false,
      isTimeToCollectFive: false,
      isTimeToCollectTen: false
    };
  },
  watch: {
    "$store.state.isShowTabBarTips"(_n) {
      this.isShowTabBarTips = _n;
    }
  },
  mounted() {
    this.getPrizeList();
    this.getCreditList();
    this.welfareDetail();
    this.isShowTabBarTips = this.$store.state.isShowTabBarTips;
  },
  methods: {
    ...mapMutations(["CHANGE_SHOW_SHARE"]),
    showTip(data) {
      if (data != this.isActive) {
        this.isActive = data;
        setTimeout(() => {
          this.isActive = "";
        }, 3000);
      }
    },
    openService() {
      this.isShowService = !this.isShowService;
    },
    openShare() {
      this.isShowPopup = false;
      this.CHANGE_SHOW_SHARE();
    },
    toJump() {
      this.$router.push({
        path: "/exchangeRecords"
      });
    },
    toInfo(data) {
      this.$router.push({
        path: "/prizeInfo",
        query: {
          id: data.id
        }
      });
    },
    toRank() {
      this.$router.push({
        path: "/fractionRank"
      });
    },
    toSign() {
      if (!this.dataDetail.myCredit.sign) {
        this.$api.credit.signin().then(({ data }) => {
          this.dataItem = data.resultData;
          this.isShowPopup = true;
          this.welfareDetail();
          this.getCreditList();
        });
      }
    },
    toGetCredit(a, b) {
      this.$api.useroperate
        .getCreditByUser({
          creditAmount: b,
          source: a
        })
        .then(() => {
          this.dataItem.credit = b;
          this.isShowPopup = true;
          this.welfareDetail();
        });
    },
    toExchange(data) {
      if (data.total != 0) {
        this.dataItem = data;
        this.isShowPrizeSure = true;
      }
    },
    toConfirm() {
      this.$api.prize
        .convertPrize({
          id: this.dataItem.id
        })
        .then(({ data }) => {
          this.$router.push({
            path: "/exchangeSuccess",
            query: {
              id: data.resultData
            }
          });
          this.closePopup();
        });
    },
    closePopup() {
      this.isShowPrizeSure = false;
      this.isShowPopup = false;
      this.isShowService = false;
    },
    getCreditList() {
      this.$api.credit
        .getCreditRank({
          current: this.tab.page,
          size: this.tab.pageSize,
          type: 0
        })
        .then(({ data }) => {
          let list = data.resultData.records;
          this.tab.total = data.resultData.total;
          this.myInfo = list[0];
          this.rankList = list.slice(1, 4);
          this.rankImgList = list.slice(1, 7);
        });
    },
    welfareDetail() {
      let threeTime = 3 * 60 * 1000;
      let FiveTime = 5 * 60 * 1000;
      let sevenTime = 7 * 60 * 1000;
      let TenTime = 10 * 60 * 1000;

      let nowTime = "";
      this.$api.welfare.welfareInfo().then(({ data }) => {
        this.dataDetail = data.resultData;
        this.learnTime = parseInt(this.dataDetail.myCredit.learnTime / 60000);
        this.isSign = this.dataDetail.myCredit.sign;
        nowTime = this.dataDetail.myCredit.learnTime;
        this.widthData = `${((nowTime > TenTime ? sevenTime : (nowTime - threeTime) ) / sevenTime) * 240}px`;

        if (
          nowTime >= threeTime &&
          !this.dataDetail.myCredit.getCreditLearnThree
        ) {
          this.isTimeToCollectThree = true;
        } else {
          this.isTimeToCollectThree = false;
        }

        if (
          nowTime >= FiveTime &&
          !this.dataDetail.myCredit.getCreditLearnFive
        ) {
          this.isTimeToCollectFive = true;
        } else {
          this.isTimeToCollectFive = false;
        }

        if (nowTime >= TenTime && !this.dataDetail.myCredit.getCreditLearnTen) {
          this.isTimeToCollectTen = true;
        } else {
          this.isTimeToCollectTen = false;
        }
        this.$store.dispatch("getCreditMsg");
      });
    },
    getPrizeList() {
      this.$api.prize
        .prizeList({
          current: this.tab.page,
          size: this.tab.pageSize
        })
        .then(({ data }) => {
          this.prizeList = data.resultData.records;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.p-welfareCentre {
  position: absolute;
  left: 0;
  right: 0;
  background: url("../assets/image/fuli/backgroud.png") no-repeat;
  background-size: 100%;
  background-color: #e5f6b3;
  height: auto;
  /*margin-bottom: 50px;*/

  &-tip {
    display: flex;
    justify-content: flex-end;

    .-text {
      margin-top: 12px;
      text-align: center;
      width: 85px;
      height: 26px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 100px 0px 0px 100px;
      font-size: 13px;
      font-weight: 400;
      color: rgba(53, 54, 55, 1);
      line-height: 26px;
    }
  }

  &-swipe {
    @include flex-y-center;
    margin: 74px auto 136px;
    width: 224px;
    height: 28px;
    background: rgba(255, 81, 75, 1);
    border-radius: 14px;

    .-swipe-item {
      @include flex-y-center;
      width: 100%;
      height: 100%;

      &-wrap {
        width: 100%;
        height: 100%;

        .-swiper-flex {
          @include flex-y-center;
        }
      }

      &-headimg {
        margin: 2px;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        border: 1px solid rgba(255, 255, 255, 1);
      }

      &-text {
        @include text-overflow(179px);
        @include flex-y-center;

        font-size: 12px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);

        .-name {
          margin: 0 8px 0 6px;
        }

        .-text {
          @include text-overflow(179px);
        }
      }
    }
  }

  &-sign {
    position: relative;
    margin: 0 auto;
    width: 375px;
    height: 269px;
    background: url("../assets/image/fuli/sign-backgroud.png") no-repeat;
    background-size: 100%;

    .-sign-img {
      @include flex-center;

      .-btn-img-center {
        position: absolute;
        top: -17px;
        margin: 0 auto;
        width: 270px;
        height: 84px;
      }
    }

    .-sign-top {
      @include flex-center;
      padding-top: 25px;
      margin: 0 20px;
      height: 128px;

      .-sign-width {
        width: 50%;
        text-align: center;

        .-title {
          margin-top: 16px;
          height: 17px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 241, 204, 0.75);
          line-height: 17px;
        }

        .-time {
          margin-top: 4px;
          font-size: 16px;
          color: #fff1cc;
        }

        .-num {
          margin-top: 4px;
          height: 36px;
          font-size: 30px;
          font-weight: 500;
          color: rgba(255, 241, 204, 1);
          line-height: 36px;
        }
      }
    }

    .-sign-bottom {
      position: relative;
      height: 92px;
      margin: 0 20px;
      @include flex-center;

      &-line {
        position: relative;
        top: -10px;
        width: 72px;
        border: 1px dashed #e0d3b3;
      }

      &-solid {
        position: absolute;
        top: 34px;
        left: 58px;
        /*width: 214px;*/
        border: 2px solid #fd5858;
        z-index: 2;
      }

      &-wrap-two {
        position: relative;
        top: -4px;

        .-animation {
          animation: my 3s infinite ease-in-out;
          animation-fill-mode: both;
        }

        @keyframes my {
          0% {
            transform: translate3d(0, 0, 0);
          }
          10% {
            transform: translate3d(0, -5px, 0);
          }
          20% {
            transform: translate3d(0, 0, 0);
          }
          30% {
            transform: translate3d(0, -10px, 0);
          }
          40% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -12px, 0);
          }
          60% {
            transform: translate3d(0, 0, 0);
          }
          70% {
            transform: translate3d(0, -10px, 0);
          }
          80% {
            transform: translate3d(0, 0, 0);
          }
          90% {
            transform: translate3d(0, -5px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
      }

      &-wrap {
        position: relative;
        top: -4px;
        z-index: 3;
        text-align: center;

        .-wrap-with {
          @include flex-center;

          position: relative;
          width: 54px;
          height: 54px;

          .-center-img {
            width: 36px;
            height: 36px;
          }

          .-center-num {
            position: absolute;
          }
        }

        .-text {
          font-size: 11px;
          font-weight: 400;
          color: rgba(53, 54, 55, 1);
        }

        .-one {
          @include flex-center;

          background: url("../assets/image/fuli/backgroud-3.png") no-repeat;
          background-size: 100%;
          z-index: 3;
          margin: 0 auto;
          /*border-radius: 50%;*/
          width: 36px;
          height: 36px;
          /*background: rgba(0, 0, 0, 0.03);*/
          font-size: 12px;
          font-weight: 500;
          color: rgba(253, 88, 88, 1);
        }

        .-three {
          width: 36px;
          height: 36px;
        }

        .-tips {
          @include flex-center;

          position: absolute;
          top: 42px;
          left: -56px;
          width: 112px;
          height: 65px;
          background: url("../assets/image/fuli/tips.png");
          background-size: 100%;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 17px;

          p {
            margin-top: 4px;
            width: 90px;
          }
        }

        .-tips-rotate {
          left: -3px;
          transform: rotateY(180deg);

          p {
            transform: rotateY(180deg);
          }
        }
      }
    }
  }

  &-rank {
    position: relative;
    margin: 15px auto 0;
    padding-bottom: 12px;
    width: 335px;
    background: rgba(255, 252, 240, 1);
    box-shadow: 0px 2px 6px 0px rgba(255, 71, 37, 0.12);
    border-radius: 6px;

    &-img {
      position: absolute;
      top: -16px;
      left: calc(148px / 2);
      text-align: center;
      width: 189px;
      height: 30px;
      font-size: 17px;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 30px;
      background: url("../assets/image/fuli/tittle-backgroud.png");
      background-size: 100%;
    }

    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
      border-bottom: 2px solid #e9e6db;

      .-item-wrap {
        margin-top: 38px;
        text-align: center;

        .-item-icon {
          width: 26px;
          height: 26px;

          img {
            width: 100%;
          }
        }

        .-item-head {
          overflow: hidden;
          margin: 12px auto 0;

          img {
            border-radius: 50%;
            width: 48px;
            height: 48px;
          }
        }

        .-first {
          border: 2px solid #f76868;
        }

        .-second {
          border: 2px solid #ff8e21;
        }

        .-third {
          border: 2px solid #febd44;
        }

        .-item-name {
          @include text-overflow(95px);

          margin-top: 4px;
          height: 17px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(53, 54, 55, 1);
          line-height: 17px;
        }

        .-item-num {
          @include flex-center;

          margin: 4px 0 16px;
          color: #222222;
          font-size: 12px;

          img {
            margin-right: 4px;
            width: 22px;
            height: 22px;
          }

          div {
            font-weight: 500;
            font-size: 18px;
          }
        }
      }
    }

    &-down {
      @include flex-center;

      margin-top: 23px;
      width: 100%;
      text-align: center;

      .-ellipsis {
        font-size: 16px;
        font-weight: 400;
        color: rgba(152, 163, 165, 1);
      }

      .-item-down-wrap {
        position: relative;
        left: 20px;
        @include flex-center;
      }

      .-item-down {
        overflow: hidden;

        img {
          border: 2px solid rgba(255, 252, 240, 1);
          border-radius: 50%;
          width: 24px;
          height: 24px;
        }
      }

      .-item-down:nth-child(2) {
        transform: translateX(-8px);
      }
      .-item-down:nth-child(3) {
        transform: translateX(-16px);
      }
      .-item-down:nth-child(4) {
        transform: translateX(-24px);
      }
      .-item-down:nth-child(5) {
        transform: translateX(-32px);
      }
      .-item-down:nth-child(6) {
        transform: translateX(-40px);
      }
    }

    &-num {
      margin-top: 8px;

      .-num-text {
        text-align: center;
        line-height: 17px;
        font-size: 12px;
        color: #353637;

        span {
          font-size: 20px;
          color: #f76868;
        }
      }

      .-num-btn {
        margin: 12px auto 16px;
        text-align: center;
        width: 78px;
        height: 24px;
        border-radius: 6px;
        border: 1px solid rgba(215, 210, 191, 1);
        font-size: 12px;
        font-weight: 400;
        color: rgba(53, 54, 55, 1);
        line-height: 24px;
      }
    }

    &-user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 12px 12px 0;
      padding: 8px 16px;
      height: 56px;
      background: rgba(249, 246, 234, 1);
      border-radius: 6px;

      .-user-wrap {
        display: flex;
        align-items: center;
      }

      .-user-num {
        margin-right: 17px;
        font-size: 18px;
        font-weight: bold;
        color: rgba(36, 181, 146, 1);
        line-height: 21px;
      }

      .-user-img {
        margin-right: 8px;

        img {
          overflow: hidden;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }

      .-user-text {
        height: 22px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(53, 54, 55, 1);
        line-height: 22px;
      }

      .-user-icon {
        margin-right: 2px;
        width: 32px;
        height: 32px;
      }

      .-user-num-two {
        height: 28px;
        font-size: 20px;
        font-weight: 500;
        color: rgba(53, 54, 55, 1);
        line-height: 28px;
      }
    }
  }

  &-prize {
    position: relative;
    margin: 40px auto 42px;
    width: 335px;
    background: rgba(255, 252, 240, 1);
    box-shadow: 0px 2px 6px 0px rgba(255, 71, 37, 0.12);
    border-radius: 6px;

    &-img {
      position: absolute;
      top: -16px;
      left: calc(148px / 2);
      text-align: center;
      width: 189px;
      height: 30px;
      font-size: 17px;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 30px;
      background: url("../assets/image/fuli/tittle-backgroud.png");
      background-size: 100%;
    }

    &-wrap {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 0 12px;
      padding-top: 43px;

      .-prize-item {
        position: relative;
        margin-bottom: 32px;

        .-img {
          @include flex-y-center;
          width: 148px;
          height: 148px;
          background: rgba(255, 255, 255, 1);
          border-radius: 6px;
          border: 1px solid rgba(215, 210, 191, 1);
          overflow: hidden;

          img {
            width: 100%;
          }
        }

        .-img-out {
          @include flex-center;
          position: absolute;
          top: 0;
          width: 150px;
          height: 150px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 6px;
          font-size: 18px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }

        .-title {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-top: 4px;
          width: 148px;
          height: 40px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(53, 54, 55, 1);
          line-height: 20px;
        }

        .-price {
          margin: 8px 0;
          height: 16px;
          font-size: 11px;
          font-weight: 400;
          color: rgba(53, 54, 55, 0.6);
          line-height: 16px;
          text-decoration: line-through;
        }

        .-btn {
          text-align: center;
          width: 92px;
          height: 26px;
          border-radius: 6px;
          border: 1px solid rgba(253, 88, 88, 1);
          font-size: 12px;
          font-weight: 400;
          color: rgba(253, 88, 88, 1);
          line-height: 26px;
        }

        .-btn-out {
          color: #98a3a5;
          background-color: #d8dcdd;
          border: 1px solid #d8dcdd;
        }
      }

      /*.-prize-item:nth-of-type(odd) {*/
      /*margin-right: 16px;*/
      /*}*/
    }

    &-btn {
      text-align: center;
      margin: 0 auto;
      width: 78px;
      height: 24px;
      border-radius: 6px;
      border: 1px solid rgba(215, 210, 191, 1);
      font-size: 12px;
      font-weight: 400;
      color: rgba(53, 54, 55, 1);
      line-height: 24px;

      img {
        width: 10px;
        height: 6px;
        margin-left: 4px;
      }
    }
  }

  &-service {
    @include flex-center;

    z-index: 99999;
    position: fixed;
    right: 0;
    bottom: 126px;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: #ffffff;

    img {
      width: 32px;
      height: 32px;
    }
  }

  &-popupOne {
    margin: 0 auto;
    width: 100%;
    background: none;
    text-align: center;

    &-img {
      @include flex-center;

      margin: 0 auto;
      background: url("../assets/image/fuli/light.png") no-repeat;
      background-size: 100%;
      width: 130px;
      height: 127px;

      .-img {
        width: 84%;
      }
    }

    &-text {
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
    }

    &-num {
      height: 50px;
      font-size: 36px;
      font-weight: 500;
      color: rgba(249, 158, 84, 1);
      line-height: 50px;
    }

    &-btn {
      text-align: center;
      margin: 72px auto 0;
      width: 197px;
      height: 48px;
      background: rgba(247, 104, 104, 1);
      border-radius: 6px;
      line-height: 50px;
      font-size: 17px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 50px;
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

  &-popupService {
    background: none;
    height: 350px;

    .-body {
      width: 254px;
      height: 298px;
      background: rgba(255, 255, 255, 1);
      border-radius: 6px;
    }

    .-title {
      padding: 20px 0 12px;
      text-align: center;
      margin: 0 auto;
      width: 112px;
      height: 38px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(34, 34, 34, 1);
      line-height: 20px;

      .-p-two {
        line-height: 20px;
        font-size: 12px;
        color: #98a3a5;
      }
    }

    .-content {
      @include flex-center;

      overflow: hidden;
      margin: 0 auto;
      width: 194px;
      height: 194px;
      border-radius: 12px;
      border: 1px solid rgba(249, 158, 84, 1);

      img {
        width: 100%;
      }
    }

    .-tip {
      text-align: center;
      margin-top: 4px;
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

    .-close {
      display: block;
      margin: 11px auto 0;
      width: 26px;
      height: 26px;
      background: url("../assets/image/share-dialog/icon-cancel.png") no-repeat;
      background-size: 100%;
    }
  }
}
</style>