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
            v-for="(item, index) of broadcastList"
            :key="index"
          >
            <img class="-swipe-item-headimg" :src="item.url" />
            <div class="-swipe-item-text">
              <p class="-name">{{ item.name }}</p>
              <p class="-text">{{ item.course }}</p>
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
          <div class="-time"><span class="-num">4</span>分钟</div>
        </div>
        <div class="-sign-width">
          <div class="-title">我的学分</div>
          <div class="-num">
            506
          </div>
        </div>
      </div>

      <div class="-sign-bottom">
        <div class="-sign-bottom-wrap">
          <div class="-one">+999</div>
          <div class="-text">3分钟</div>
        </div>
        <div class="-sign-bottom-line"></div>
        <div class="-sign-bottom-wrap -sign-bottom-wrap-two">
          <img class="-two" src="../assets/image/fuli/button-coin-pre.png" />
          <div class="-text -text-two">5分钟</div>
        </div>
        <div class="-sign-bottom-line"></div>
        <div class="-sign-bottom-wrap">
          <img class="-three" src="../assets/image/fuli/button-coin-def.png" />
          <div class="-text">10分钟</div>
        </div>
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
          <div
            class="-item-head"
            :class="{
              '-first': index == 0,
              '-second': index == 1,
              '-third': index == 2
            }"
          >
            <img :src="item.url" />
          </div>
          <div class="-item-name">{{ item.name }}</div>
          <div class="-item-num">
            <img src="../assets/image/fuli/coin.png" />
            <div>{{ item.price }}</div>
            分
          </div>
        </div>
      </div>
      <div class="p-welfareCentre-rank-down">
        <div class="-ellipsis">...</div>
        <div class="-item-down-wrap">
          <div class="-item-down" v-for="(item, index) of 6" :key="index">
            <img
              src="https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epxBOwIsH1se324kFtXjDgaj6DzpsF162VlbsWrq01HOGSia5Qpe3toQroxwdwTHxv3DXKqxTVSrmA/132"
            />
          </div>
        </div>
        <div class="-ellipsis">...</div>
      </div>
      <div class="p-welfareCentre-rank-num">
        <div class="-num-text">
          已经有<span>52,437,689位</span>家长加入赚取学分
        </div>
        <div class="-num-btn" @click="toRank">查看全部 ></div>
      </div>
      <div class="p-welfareCentre-rank-user">
        <div class="-user-wrap">
          <div class="-user-num">113</div>
          <div class="-user-img">
            <img
              src="https://pub.file.k12.vip/2019/05/07/1125600364255899649.png"
            />
          </div>
          <div class="-user-text">我</div>
        </div>
        <div class="-user-wrap">
          <img class="-user-icon" src="../assets/image/fuli/coin.png" />
          <div class="-user-num-two">1238</div>
          分
        </div>
      </div>
    </div>

    <div class="p-welfareCentre-prize">
      <div class="p-welfareCentre-prize-img">
        学分排行榜
      </div>
      <div class="p-welfareCentre-prize-wrap">
        <div class="-prize-item" v-for="(item, index) of 10" :key="index">
          <div class="-img" @click="toInfo">
            <img
              src="https://pub.file.k12.vip/2019/05/07/1125702765063303170.png"
            />
          </div>
          <div class="-img-out" v-if="index == 2">已抢光</div>
          <div class="-title">腾讯视频季度会员（尊享版）</div>
          <div class="-price">原价：98元</div>
          <div
            class="-btn"
            :class="{ '-btn-out': index == 2 }"
            @click="toExchange"
          >
            7500积分兑换
          </div>
        </div>
      </div>

      <div class="p-welfareCentre-prize-btn">
        加载更多
        <img src="../assets/image/fuli/button-select2.png" />
      </div>
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
      <div class="p-welfareCentre-popupOne-num">+1000</div>
      <div class="p-welfareCentre-popupOne-btn">邀请好友一起学</div>
    </van-popup>

    <van-popup
      v-model="isShowPrizeSure"
      :close-on-click-overlay="false"
      class="p-welfareCentre-popupTwo"
    >
      <div class="p-welfareCentre-popupTwo-sure">
        <p class="-title">您正在兑换</p>
        <p class="-content">腾讯视频季度会员 （尊享版）</p>
        <div class="-btn" @click="toConfirm">确定</div>
        <div class="-text" @click="closePopup">取消</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "welfareCentre",
  data() {
    return {
      broadcastList: [
        {
          url:
            "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epxBOwIsH1se324kFtXjDgaj6DzpsF162VlbsWrq01HOGSia5Qpe3toQroxwdwTHxv3DXKqxTVSrmA/132",
          name: "我是一只猪",
          course: "用5学分兑换《钢铁是怎么样连城的》"
        },
        {
          url: "https://pub.file.k12.vip/2019/05/07/1125600364255899649.png",
          name: "风锅锅i",
          course: "用55学分兑换《小学会找妈妈》"
        },
        {
          url: "https://pub.file.k12.vip/2019/05/07/1125600476969431042.jpg",
          name: "狼城美景",
          course: "用155学分兑换《今天你吃了嘛》"
        }
      ],
      rankList: [
        {
          url:
            "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epxBOwIsH1se324kFtXjDgaj6DzpsF162VlbsWrq01HOGSia5Qpe3toQroxwdwTHxv3DXKqxTVSrmA/132",
          name: "我是一只猪",
          price: "99991"
        },
        {
          url: "https://pub.file.k12.vip/2019/05/07/1125600364255899649.png",
          name: "风锅锅i",
          price: "458"
        },
        {
          url: "https://pub.file.k12.vip/2019/05/07/1125600476969431042.jpg",
          name: "狼城美景",
          price: "69"
        }
      ],
      isSign: false,
      isShowPopup: false,
      isShowPrizeSure: false
    };
  },
  methods: {
    toJump() {
      this.$router.push({
        path: "/exchangeRecords"
      });
    },
    toInfo() {
      this.$router.push({
        path: "/prizeInfo"
      });
    },
    toRank() {
      this.$router.push({
        path: "/fractionRank"
      });
    },
    toSign() {
      this.isShowPopup = true;
      this.isSign = !this.isSign;
    },
    toExchange() {
      this.isShowPrizeSure = true;
    },
    toConfirm() {
      this.$router.push({
        path: "/exchangeSuccess"
      });
      this.closePopup();
    },
    closePopup() {
      this.isShowPrizeSure = false;
      this.isShowPopup = false;
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
      margin: 25px 20px 0;
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
        margin: 0 4px;
        border: 1px dashed #e0d3b3;
      }

      &-wrap-two {
        position: relative;
        top: -4px;
      }

      &-wrap {
        /*width: calc(335px / 3);*/
        text-align: center;

        .-text {
          margin-top: 8px;
          font-size: 11px;
          font-weight: 400;
          color: rgba(53, 54, 55, 1);
        }

        .-text-two {
          margin: 0;
        }

        .-one {
          @include flex-center;

          margin: 0 auto;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          background: rgba(0, 0, 0, 0.03);
          font-size: 12px;
          font-weight: 500;
          color: rgba(253, 88, 88, 1);
        }

        .-two {
          width: 54px;
          height: 54px;
        }

        .-three {
          width: 36px;
          height: 36px;
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
          border-radius: 50%;
          width: 48px;
          height: 48px;
          img {
            width: 100%;
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
          width: 40px;
          height: 40px;
          border-radius: 50%;
          width: 100%;
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
    padding-bottom: 24px;
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
}
</style>
