<template>
  <div>
    <van-pull-refresh v-model="topLoading" @refresh="onRefresh">
      <van-tabs  class="home" v-model="activeTab" @click="tabClick">
        <van-tab v-for="item in tabs" :key="item.id" :name="item.id" :title="item.name">
          <van-swipe class="swipe" indicator-color="white">
            <van-swipe-item class="swipe-item" v-for="item in imgs" :key="item">
              <img class="swipe-img" v-lazy="item" />
            </van-swipe-item>
          </van-swipe>
          <div class="circle-flex">
            <div v-for="item in circles" :key="item.name" class="flex-item">
              <img v-lazy="item.url" />
              <p>{{item.name}}</p>
            </div>
          </div>
          <p v-if="loading" class="loading">
            <van-loading size="24px">加载中...</van-loading>
          </p>
          <ul>
            <li
              v-for="item in albumList"
              :key="item.trackId"
              @click="$router.push({path:'/musicList',query:{albumId:item.albumId}})"
            >
              <img v-lazy="Host+item.albumCoverPath" alt />
              <div>
                <h3>{{item.albumTitle}}</h3>
                <p>{{item.albumUserNickName}}</p>
                <p class="playCount">播放量：{{item.albumPlayCount|filterPlayCount}}</p>
              </div>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
      <p v-if="!loading && !topLoading" class="nomore">
        <span>没有更多内容啦~</span>
      </p>
    </van-pull-refresh>
  </div>
</template>

<script>
import { AlbumTypeMap, Host } from "../../config";
export default {
  props: {},
  data() {
    let tabs = Object.keys(AlbumTypeMap).map(i => {
      return {
        id: i,
        name: AlbumTypeMap[i]
      };
    });
    let { query = {} } = this.$route;
    return {
      Host,
      topLoading: false,
      loading: false,
      activeTab: query.id || "yinyue",
      tabs,
      imgs: [
        `${Host}b1443e1819fd4de650ca32fb0a229548.jpg`,
        `${Host}425ae5f5648df2d52eb8413b6ce05231.jpg`,
        `${Host}b3db99e496e15abe590adea77c8d3499.png`
      ],
      circles: [
        {
          name: "排行榜",
          url: `${Host}33076a217dd9c8b3fb080a2a800c587e.png`
        },
        { name: "听单", url: `${Host}687d0705d1e526ca91983aefa8b9223e.png` },
        {
          name: "易烊千玺",
          url: `${Host}5f3dc680bd1f947e35f9f9f261b837c1.png`
        },
        { name: "直播", url: `${Host}23297b3b5187ebc2226890ae27d79a38.png` },
        { name: "分类", url: `${Host}e5511b595bdc56c94fd8910a62586358.png` }
      ],
      albumList: []
    };
  },
  mounted() {
    this.getList();
  },
  filters: {
    filterPlayCount(v) {
      return v > 10000 ? (Number(v) / 10000).toFixed(2) + "万" : v;
    }
  },
  methods: {
    tabClick(o) {
      this.$router.push({ path: "/home", query: { id: o } });
      this.albumList = [];
      this.getList();
    },
    onRefresh() {
      setTimeout(() => {
        this.topLoading = false;
        this.getList();
      }, 500);
    },
    async getList() {
      this.loading = this.albumList.length == 0 ? true : false;
      let res = await this.axios.get("/album", {
        params: { type: this.activeTab }
      });
      this.loading = false;
      if (res && res.status == 200) {
        this.albumList = res.data;
      }
    }
  }
};
</script>

<style lang='less' scoped>
.home {
  background: #fff;
  border-radius: 4px;
}
.swipe {
  margin-top: 15px;
  &-img {
    width: 80%;
    height: 100px;
    margin: auto;
    display: block;
    border-radius: 6px;
  }
}
.circle-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 10px;
  .flex-item {
    flex: 1;
    display: inline-block;
    text-align: center;
    img {
      width: 35px;
      border-radius: 50%;
    }
    p {
      font-size: 12px;
      color: #666;
      margin: 0;
    }
  }
}
ul {
  padding: 10px 15px;
  min-height: 100px;
  li {
    display: flex;
    margin-bottom: 15px;
    overflow: hidden;
    img {
      flex: 1;
      border-radius: 4px;
      height: 90px;
      width: 90px;
    }
    div {
      flex: 2;
      width: 65%;
      margin-left: 10px;
      height: 80px;
      h3,
      p {
        margin: 0;
        font-weight: normal;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      h3 {
        font-size: 16px;
        margin-bottom: 5px;
      }
      p {
        font-size: 14px;
        color: #999;
      }
      .playCount {
        font-size: 12px;
        color: #999;
        margin-top: 20px;
        float: right;
        width: 122px;
      }
    }
  }
}
.loading {
  text-align: center;
  height: 160px;
  line-height: 160px;
}
.nomore {
  color: #949393;
  font-size: 12px;
  text-align: center;
  margin: 10px 0 30px;
}
</style>
