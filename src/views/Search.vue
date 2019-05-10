<template>
  <div class="search">
    <div class="header van-hairline--bottom">
      <div class="back-btn" @click="$router.go(-1)">
        <van-icon color="#98A3A5" name="arrow-left" />
        <span>返回</span>
      </div>
      <div class="search">
        <van-search
          class="search-input"
          v-model="value"
          placeholder="请输入搜索关键词"
          shape="round"
          @search="onSearch"
        >
        </van-search>
      </div>
    </div>
    <div class="hot" v-if="false">
      <p>热门搜索</p>
      <div class="hot-list">
        <div class="hot-item" v-for="i in 10" :key="i">写人</div>
      </div>
    </div>
    <div class="empty" v-else-if="isEmpty">
      <img src="../assets/image/noData/no-2.png" />
      <span>抱歉，暂时没有找到你想要的内容~</span>
      <p>换个关键词试试吧！</p>
    </div>
    <div class="scroll" v-else>
      <cube-scroll ref="scroll">
        <div class="list">
          <Item v-for="i in 20" :key="i"></Item>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item";
export default {
  components: {
    Item
  },
  data() {
    return {
      value: "",
      isEmpty: true
    };
  },
  methods: {
    onSearch() {}
  }
};
</script>

<style lang="scss" scoped>
.search {
  .scroll {
    height: calc(100vh - 58px);
  }
  .hot {
    padding: 8px;
    p {
      font-size: 14px;
      font-weight: 500;
      padding: 0 16px;
    }
    &-list {
      display: flex;
      flex-wrap: wrap;
      padding: 0 8px;
    }
    &-item {
      @include flex-center;
      margin: 0 8px;
      margin-top: 12px;
      height: 26px;
      padding: 0 10px;
      font-size: 12px;
      color: #98a3a5;
      background: rgba(246, 246, 246, 1);
      border-radius: 13px;
    }
  }
  .header {
    @include flex-center;
    justify-content: space-between;
    padding: 12px 16px;
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.05);
    .back-btn {
      @include flex-center;
      font-size: 14px;
      color: #353637;
      font-weight: 500;
    }
    .search {
      @include flex-center;
      flex: 1;
      margin-left: 16px;
      &-input {
        padding: 0;
        width: 100%;
      }
    }
  }
}
</style>
