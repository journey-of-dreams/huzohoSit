<template>
  <div id="productList">
    <!-- <div class="pp"></div> -->
    <main-nav />
    <div class="soft" v-if="productData.type == '软件'">
      <div class="top-Container">
        <img src="@/assets/img/xiazai.png" alt="" />
      </div>
      <div class="nav-container">
        <h2>{{ productData.pname }}</h2>
        <ul>
          <li @click="arrivePossion(1)">产品概述</li>
          <li @click="arrivePossion(2)">功能展示</li>
          <div v-show="isDownloadData" class="download-show">
            <li>
              <router-link to="/download">软件下载</router-link>
            </li>
            <li @click="arrivePossion(3)">更新说明</li>
          </div>
        </ul>
      </div>
      <div class="summary" id="1">
        <p class="title">产品概览</p>
        <p class="pcontent">
          {{ productData.pcontent }}
        </p>
        <div class="img-container">

            <div v-if="productData.pname === '交互式电力杆塔建模软件'">
            <video controls width="50%">
                <source src="@/assets/img/sp1.mp4" type="video/mp4">
            </video>
            </div>

            <div v-if="productData.pname != '交互式电力杆塔建模软件'">
               <img src="@/assets/img/productDetail.png" alt="" />
            </div>
        </div>
      </div>
      <div class="funtion-display" id="2">
        <p class="title">功能展示</p>
        <div class="img-container">
          <div
            class="img-detail"
            v-for="(item, index) in productData.imginfo"
            :key="index"
          >
            <img :src="configCommon.filesIpPath+item.pic" alt="" />
            <span>{{ item.img_info }}</span>
          </div>
        </div>
      </div>
      <div class="update" id="3" v-show="isDownloadData">
        <p class="title">更新说明</p>
        <el-timeline>
          <el-timeline-item :timestamp="timestamp" placement="top">
            <el-card>
              <h2>更新模板</h2>
              <h2>Bug修复</h2>
              <ul class="list-content">
                <li>修复日常使用的问题；</li>
              </ul>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <div class="equipment" v-else>
      <div class="top-Container">
        <img src="@/assets/img/xiazai.png" alt="" />
      </div>
      <div class="nav-container">
        <h2>{{ productData.pname }}</h2>
        <ul>
          <li @click="arrivePossion(1)">设备信息</li>
          <li @click="arrivePossion(2)">设备参数</li>
          <li>
            <router-link to="/productList">教学视频</router-link>
          </li>
        </ul>
      </div>
      <div class="summary" id="1">
        <p class="title">设备信息</p>
        <p class="pcontent">
          {{ productData.content }}
        </p>
        <div class="img-container" v-if="productData.Coverimginfo">
          <img :src="configCommon.filesIpPath+productData.Coverimginfo[0].pic" alt="" />
        </div>
        <div v-if="productData.Contentimginfo" class="img-container" id="2">
          <p class="title funtion-display">设备参数</p>
          <img :src="configCommon.filesIpPath+productData.Contentimginfo[0].pic" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

 <script>
import MainNav from "@/components/common/MainNav.vue";
//导入全局配置
import configCommon from "@/utils/configCommon";

import { getRequest } from "@/utils/api";
export default {
  name: "ProductList",
  components: { MainNav },
  data() {
    return {
      topImg: [],
      productData: {},
      downloadData: {},
    };
  },
  created() {
    this.getProductData();
    this.getTestData();
  },
  mounted() {
    // console.log(window.location.hash);
  },
  // updated(){
  //   if (this.$route.path !== '/productList') {
  //     // this.$router.push('/productList')
  //   }
  //   console.log(this.$route.matched[0].path);
  //   console.log('个人天赋共和国');
  //   // location.reload()
  // },
  methods: {
    getTestData() {
      getRequest(configCommon.prefixBack+"/webTest").then((data) => {
        let pp = document.querySelector(".pp");
        console.log(pp);
        pp.innerHTML = data.data[0].info;
        console.log(data.data[0]);
      });
    },
    getProductData() {
      if (this.$store.state.nowProductType == "软件") {
        getRequest(configCommon.prefixBack+"/productSoftwareContent").then((data) => {
          data.data.forEach((item, index) => {
            if (item.pid == this.$store.state.nowProductId) {
              this.productData = data.data[index];
              getRequest(configCommon.prefixBack+"/downloadListContent").then((data) => {
                data.forEach((item3) => {
                  if (item3.pid == this.productData.pid) {
                    this.downloadData = item3;
                  }
                });
              });
            }
          });
        });
      } else {
        getRequest(configCommon.prefixBack+"/productEquipmentContent").then((data) => {
          data.data.forEach((item) => {
            item.Data.forEach((item2) => {
              if (item2.pid == this.$store.state.nowProductId) {
                this.productData = item2;
              }
            });
          });
        });
      }
      console.log(JSON.parse(JSON.stringify(this.downloadData)));
    },
    arrivePossion(id) {
      if (id == 1) {
        let summary = document.querySelector(".summary");
        document.documentElement.scrollTop = summary.offsetTop - 70;
      } else if (id == 2) {
        let funtionDisplay = document.querySelector(".funtion-display");
        document.documentElement.scrollTop = funtionDisplay.offsetTop - 70;
      } else if (id == 3) {
        let update = document.querySelector(".update");
        document.documentElement.scrollTop = update.offsetTop - 70;
      }
    },
  },
  computed: {
    isDownloadData() {
      return (
        Object.getOwnPropertyNames(
          JSON.parse(JSON.stringify(this.downloadData))
        ).length !== 0
      );
    },
    timestamp() {
      return (
        "v5.0 - " +
        this.$moment(this.downloadData.createTime).format("YYYY/MM/DD")
      );
    },
  },
};
</script>
<style lang='less' scoped>
  /deep/#nav[data-v-4332dd22] {
    background: #000 !important;
    // width: 100% !important;
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
#productList {
  img {
    width: 100%;
  }

  .top-Container {
    width: 100%;
    height: 450px;
    margin: 120px 0 60px 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .nav-container {
    background: #f5f5f5;
    width: 63%;
    margin: 0 auto;
    height: 80px;
    font-weight: 600;
    padding: 0 17%;
    position: sticky;
    top: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ul {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: -15px;
      .download-show {
        display: flex;
      }
      li {
        cursor: pointer;
        color: #183b50;
        padding-left: 20px;
        font-size: 20px;
      }
    }
  }
  .summary {
    // padding: 0 350px;
    .title {
      font-size: 42px;
      text-align: center;
      font-weight: 600;
      margin: 80px 0;
    }
    .pcontent {
      color: #707070;
      width: 80%;
      margin: 0 auto;
      font-size: 22px;
      line-height: 40px;
    }
    .img-container {
      margin: 60px auto;
      text-align: center;

      img {
        width: 50%;
      }
    }
  }
  .funtion-display {
    background: #f2f2f2;
    // padding: 0 20%;
    .title {
      font-size: 42px;
      text-align: center;
      font-weight: 600;
      height: 200px;
      line-height: 200px;
    }
    .img-container {
      justify-content: center;
      display: flex;
      max-height: 400px;
      min-height: 220px;
      width: 60%;
      overflow: hidden;
      margin: 0 auto;
      flex-wrap: wrap;
      .img-detail {
        color: #707070;
        font-size: 20px;
        line-height: 30px;
        width: 200px;
        height: 150px;
        text-align: center;
        margin: 0px 50px 50px 50px;
        img {
          width: 190px;
          height: 100px;
        }
      }
    }
  }
  .update {
    width: 80%;
    padding: 0% 10%;
    .title {
      font-size: 42px;
      text-align: center;
      font-weight: 600;
      height: 200px;
      line-height: 200px;
    }
    h2 {
      line-height: 35px;
    }
    .list-content {
      li {
        list-style: circle;
        margin-left: 20px;
        font-size: 20px;
        line-height: 35px;
      }
    }
  }
}
/deep/.el-timeline-item__timestamp {
  font-size: 30px !important;
}
</style>
