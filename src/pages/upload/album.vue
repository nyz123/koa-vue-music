<template>
  <div style="width:calc(100% - 20px);padding:10px;">
    <h3>新增歌单</h3>
    <van-cell-group>
      <van-field
        v-model="title"
        maxlength="12"
        show-word-limit
        required
        clearable
        label="名称"
        placeholder="请输入歌单名称"
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
        maxlength="30"
        show-word-limit
        required
        v-model="nickName"
        clearable
        label="作者"
        placeholder="请输入作者"
      />
    </van-cell-group>
    <van-button style="margin-top:10px" type="info" size="large" @click="uploadBtn">上传歌单封面</van-button>
    <input
      accept=".jpg, .png, .jpeg"
      ref="input"
      type="file"
      style="display:none"
      @change="uploadInput"
    />
    <img :src="img" alt />
    <a :href="img">{{img}}</a>
    <van-button v-if="img" size="small" @click="copy">复制</van-button>
    <van-button class="commitBtn" type="primary" size="large" @click="commit">创建</van-button>
    <van-popup v-model="showType" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showType = false"
        @confirm="onConfirm"
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
      showType: false,
      columns: Object.keys(AlbumTypeMap),
      title: "",
      type: "",
      nickName: "",
      img: ""
    };
  },
  methods: {
    async commit() {
      if (!this.title || !this.type || !this.nickName || !this.img) {
        this.$toast("请输入必填项");
        return;
      }
      // trackName, trackCoverPath, albumId, src,duration
      let res = await this.axios.post("/album", {
        type: this.type,
        albumCoverPath: this.img,
        albumTitle: this.title,
        albumUserNickName: this.nickName
      });
      if (res && res.data && res.data.code == 0) {
        this.$toast("创建成功");
        this.$router.push({ path: "/home", query: { id: this.type } });
      } else {
        this.$toast("创建失败");
      }
    },
    onConfirm(v) {
      this.type = v;
      this.showType = false;
    },
    copy() {
      copyValue(Host+this.img);
    },
    uploadBtn() {
      this.$refs.input.click();
    },
    async uploadInput(e) {
      let file = e.target.files[0];
      let fd = new FormData();
      fd.append("file", file);
      let res = await this.axios.post("/file", fd);
      this.$refs.input.value = "";
      if (res && res.data && res.data.code == 0) {
        this.$toast("上传成功");
        this.img = Host + res.data.data;
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