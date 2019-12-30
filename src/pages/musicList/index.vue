<template>
  <div>
    <ul>
      <li v-for="(item,i) in musicList" :key="i" @click="play(item)">
        <img v-lazy="Host+item.trackCoverPath" alt />
        <div>
          <h3>{{item.trackName}}</h3>
          <p>总时长：{{item.duration}}</p>
        </div>
      </li>
    </ul>
    <audio ref="audio" :src="curPlay"></audio>
  </div>
</template>

<script>
import { Host } from "../../config";
export default {
  props: {},
  data() {
    return {
      Host,
      musicList: [],
      curPlay: ""
    };
  },
  async mounted() {
    let res = await this.axios.get("/music", {
      params: {
        albumId: this.$route.query.albumId
      }
    });
    if (res) {
      this.musicList = res.data;
    }
  },
  methods: {
    play(item) {
      this.curPlay = Host + item.src;
      let ele = this.$refs.audio;
      ele.addEventListener("loadedmetadata", () => {
        this.duration = ele.duration;
        ele.play();
      });
    }
  }
};
</script>

<style lang='less' scope>
ul {
  padding: 10px 15px !important;
  min-height: 100px;
  li {
    display: flex;
    margin-bottom: 10px;
    overflow: hidden;
    background: #fff;
    padding: 8px 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-shadow: 0 0 4px 4px #eee;
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
    }
  }
}
</style>
