<template>
  <div style="width:calc(100% - 20px);padding:10px;">
    <h3>新增歌曲</h3>
    <van-field
      maxlength="15"
      show-word-limit
      required
      v-model="name"
      clearable
      label="歌曲名称"
      placeholder="请输入歌曲名称"
    />
    <van-field
      readonly
      clickable
      label="类型"
      :value="type"
      placeholder="选择歌单类型"
      @click="showType = true"
    />
    <van-field
      readonly
      clickable
      label="类型"
      :value="album"
      placeholder="选择歌单类型"
      @click="showAlbum = true"
    />
    <!-- 上传歌曲图片 -->
    <div>
      <van-button
        style="margin-top:10px"
        type="info"
        size="large"
        @click="()=>uploadBtn('inputImg')"
      >上传歌曲封面</van-button>
      <input
        accept=".jpg, .png, .jpeg"
        ref="inputImg"
        type="file"
        style="display:none"
        @change="(e)=>uploadInput(e,'img')"
      />
      <img :src="img" alt />
      <a :href="Host+img">{{Host+img}}</a>
      <van-button v-if="img" size="small" @click="copy('img')">复制</van-button>
    </div>
    <!-- 上传歌曲 -->
    <div>
      <van-button
        style="margin-top:10px"
        type="info"
        size="large"
        @click="()=>uploadBtn('inputMusic')"
      >上传歌曲</van-button>
      <input
        accept=".mp3, .m4a"
        ref="inputMusic"
        type="file"
        style="display:none"
        @change="(e)=>uploadInput(e,'music')"
      />
      <a :href="Host+music">{{Host+music}}</a>
      <van-button v-if="img" size="small" @click="copy('music')">复制</van-button>
    </div>
    <van-button class="commitBtn" type="primary" size="large" @click="commit">创建</van-button>
    <van-popup v-model="showType" position="bottom">
      <van-picker
        show-toolbar
        :columns="typeColumns"
        @cancel="showType = false"
        @confirm="onConfirmType"
      />
    </van-popup>
    <van-popup v-model="showAlbum" position="bottom">
      <van-picker
        show-toolbar
        :columns="albumColumns"
        @cancel="showAlbum = false"
        @confirm="onConfirmAlbum"
      />
    </van-popup>
  </div>
</template>

<script>
import { copyValue } from "../../utils";
import { AlbumTypeMap,Host } from "../../config";
export default {
  data() {
    return {
      Host,
      showType: false,
      showAlbum: false,
      typeColumns: Object.keys(AlbumTypeMap),
      albumColumns: [],
      name: "",
      type: "",
      album: "",
      img: "",
      music: "",
      duration: 0
    };
  },
  methods: {
    async commit() {
      if (
        !this.name ||
        !this.album ||
        !this.img ||
        !this.music ||
        !this.duration
      ) {
        this.$toast("请输入必填项");
        return;
      }
      let res = await this.axios.post("/music", {
        trackName: this.name,
        trackCoverPath: this.img,
        albumId: this.album,
        src: this.music,
        duration: this.duration
      });
      if (res && res.data && res.data.code == 0) {
        this.$toast("创建成功");
        this.$router.push({ path: "/home", query: { id: this.type } });
      } else {
        this.$toast("创建失败");
      }
    },
    onConfirmType(v) {
      this.type = v;
      this.getAlbumList(v);
      this.showType = false;
    },
    onConfirmAlbum(v) {
      this.album = v;
      this.showAlbum = false;
    },
    async getAlbumList(v) {
      let res = await this.axios.get("/album", {
        params: { type: v }
      });
      if (res && res.status == 200) {
        this.albumColumns = res.data.map(i => i.albumId);
      }
    },
    copy(type) {
      copyValue(Host+this[type]);
    },
    uploadBtn(type) {
      this.$refs[type].click();
    },
    async uploadInput(e, type) {
      let file = e.target.files[0];
      let url = URL.createObjectURL(file);
      let audioElement = new Audio(url);
      audioElement.addEventListener("loadedmetadata", () => {
        this.duration = audioElement.duration;
      });
      let fd = new FormData();
      fd.append("file", file);
      let res = await this.axios.post("/file", fd);
      this.$refs.inputImg.value = "";
      this.$refs.inputMusic.value = "";
      if (res && res.data && res.data.code == 0) {
        this.$toast("上传成功");
        this[type] = res.data.data;
      } else {
        this.$toast("上传失败");
      }
    }
  }
};
</script>

<style lang="less" scoped>
img {
  width: 40%;
  margin-top: 10px;
  border-radius: 4px;
}
a {
  color: #1989fa;
  line-height: 30px;
  margin: 10px 10px 10px 0;
  word-break: break-all;
}
.commitBtn {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>