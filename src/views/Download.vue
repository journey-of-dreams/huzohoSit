<template>
  <el-card id="download">
    <main-nav></main-nav>
    <div class="down" style="background: #f5f5f5">
      <h2>下载中心</h2>
    </div>
    <div class="allbox">
      <el-card class="box-card">
        <div class="head">
          <div class="body">
            <img class="download" src="@/assets/img/down.jpg" /><br />
            <span class="font" @click="isPc" v-if="changeTitle"
              >{{ softData.pname }} V5.0</span
            >
            <span class="font" @click="isPc" v-else>当前软件暂未提供下载</span>
          </div>
        </div>
      </el-card>

      <div class="qr" v-show="isShowQr">
        <vue-qr :text="link" :margin="0" ref="Qrcode"></vue-qr>
        <p>微信扫码下载</p>
      </div>

      <el-card class="box-card">
        <div class="head">
          <div class="body">
            <img class="download" src="@/assets/img/book.jpg" /><br />
            <!-- <div class="a-container">
              <span>常见问题</span>
            </div> -->
          </div>
          <!-- <p class="font">使用手册</p> -->
        </div>
      </el-card>
    </div>
    <div class="update-record">
      <div class="bug">
        <p class="title"></p>
      </div>
      <div class="edition"></div>
    </div>
  </el-card>
</template>

<script>
import MainNav from "@/components/common/MainNav.vue";
//导入全局配置
import configCommon from "@/utils/configCommon";

import { getRequest } from "@/utils/api";
import VueQr from "vue-qr";
export default {
  name: "Download",
  components: { MainNav,  VueQr },
  data() {
    return {
      softData: [],
      downloadData: {},
      link: window.location.href,
      isShowQr: false,
      isPhone: false,
    };
  },
  mounted() {
    // console.log(this.downloadData);
  },
  created() {
    this.getSoftData();
  },
  methods: {
    getSoftData() {
      getRequest(configCommon.prefixBack+"/productSoftwareContent").then((data) => {
        data.data.forEach((item, index) => {
          if (item.pid == this.$store.state.nowProductId) {
            this.softData = data.data[index];
            getRequest(configCommon.prefixBack+"/downloadListContent").then((data) => {
              data.forEach((item3) => {
                if (item3.pid == this.softData.pid) {
                  this.downloadData = item3;
                  this.link = configCommon.filesIpPath + item3.dfile;
                  if (item3.type == "phone") {
                    this.isPhone = true;
                  } else {
                    this.isPhone = false;
                  }
                }
              });
            });
          }
        });
      });
    },
    //判断是否是PC设备，true是，false不是
    isPc() {
      if (this.isPhone) {
        this.$nextTick(() => {
          this.isShowQr = true;
        });
      } else {
        this.isShowQr = false;
        window.location.href = this.link;
      }
    },
  },
  computed: {
    changeTitle() {
      console.log();
      return Object.keys(JSON.parse(JSON.stringify(this.downloadData)))
        .length !== 0
        ? true
        : false;
    },
  },
};
</script>
<style lang='less' scoped>
  /deep/#nav[data-v-4332dd22] {
    background: #000 !important;
    .nav-container {
      li {
        &:nth-child(2) {
          a {
            color: yellowgreen;
          }
        }
      }
    }
  }
#download {
  .down {
    height: 80px;
    margin-top: 70px;
    padding: 0 200px;
    h2 {
      line-height: 80px;
    }
  }
  .allbox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    .qr {
      width: 100px;
      height: 100px;
      text-align: center;
      font-size: 13px #666;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .box-card {
      .head {
        display: flex;
        align-items: center;
        .body {
          text-align: center;
          .font {
            color: #416db6;
            font-size: 18px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .a-container {
    a {
      display: block;
      margin: 10px 0;
    }
  }
}
</style>

