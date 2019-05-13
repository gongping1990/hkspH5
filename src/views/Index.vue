<template>
  <div class="index">
    <router-view class="index-page"></router-view>
    <van-tabbar v-model="active" active-color="#24B592">
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
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.wekfarePre : icon.wekfareDef"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
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
  data() {
    return {
      active: 0,
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
      }
    };
  }
};
</script>

<style lang="scss">
.index {
  &-page {
    height: calc(100vh - 50px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
