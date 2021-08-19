<template>
  <div id="home">
    <main-nav></main-nav>
    <el-carousel
      :interval="4000"
      class="carousel"
      arrow="always"
      :height="bannerHeight + 'px'"
      loop
    >
      <el-carousel-item v-for="(item, index) in carouselImg" :key="index + '0'">
        <img :src="configCommon.filesIpPath + item" />
      </el-carousel-item>
    </el-carousel>
    <div class="product">
      <div class="header">
        <p class="big_title">公司产品</p>
        <p>Products</p>
      </div>
      <div class="main-content">
        <div class="display_product">
          <div class="small_title">
            <h3>软件</h3>
            <p>
              <router-link to="/soft">更多></router-link>
            </p>
          </div>
          <el-divider></el-divider>
          <div class="divTab slide-in">
            <el-card v-for="(item, index) in softData" :key="index + '2'">
              <img
                v-lazy="configCommon.filesIpPath + item.pic"
                @click="productDetail(item.pid, item.type)"
              />
              <div class="productName">
                <span>{{ item.p_name }}</span>
              </div>
            </el-card>
          </div>
        </div>
        <div class="display_product">
          <div class="small_title">
            <h3>设备</h3>
            <p>
              <router-link to="/equipment">更多></router-link>
            </p>
          </div>
          <el-divider></el-divider>
          <div class="divTab slide-in">
            <el-card v-for="(item, index) in equipmentData" :key="index + '3'">
              <img
                v-lazy="configCommon.filesIpPath + item.pic"
                @click="productDetail(item.pid, item.type)"
              />
              <div class="productName">
                <span>{{ item.p_name }}</span>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
    <div class="solution">
      <div class="header">
        <p class="big_title">解决方案</p>
        <p>Solution</p>
      </div>
      <div class="main-content">
        <div class="display_solution">
          <div class="small_title">
            <h3>测绘</h3>
            <p>
              <router-link to="/testDraw">更多></router-link>
            </p>
          </div>
          <el-divider></el-divider>
          <div class="divTab slide-in">
            <el-card v-for="(item, index) in testDrawData" :key="index + '00'">
              <img
                v-lazy="configCommon.filesIpPath + item.pic"
                @click="serviceDetail(item.bid, item.type)"
              />
              <div class="productName">
                <span>{{ item.bname }}</span>
              </div>
              <p class="productContent">
                {{ item.bcontent }}
              </p>
            </el-card>
          </div>
        </div>
        <div class="display_solution">
          <div class="small_title">
            <h3>电力</h3>
            <p>
              <router-link to="/power">更多></router-link>
            </p>
          </div>
          <el-divider></el-divider>
          <div class="divTab slide-in">
            <el-card v-for="(item, index) in powerData" :key="index + '01'">
              <img
                v-lazy="configCommon.filesIpPath + item.pic"
                @click="serviceDetail(item.bid, item.type)"
              />
              <div class="productName">
                <span>{{ item.bname }}</span>
              </div>
              <p class="productContent">
                {{ item.bcontent }}
              </p>
            </el-card>
          </div>
        </div>
      </div>
    </div>
    <div class="about">
      <h1>
        我们是设计师、工程师、梦想者<br />
        也是您的用户体验专家
      </h1>
      <p>
        武汉汇卓航科技研发主要人员均有本科以上学历的
        成员组成，其中包括武汉大学等高等院校的遥感信息专
        业的教授、博士、电子工程方面的专家以及其他有一定
        行业背景的资深人士等组成。本公司与武汉大学，武汉
        大学国家重点实验室有深入合作，是典型的“产学研” 落地公司。
      </p>
      <router-link to="/about">关于我们</router-link>
      <router-link to="/contact">联系我们</router-link>
    </div>
  </div>
</template> 

<script>
import MainNav from "@/components/common/MainNav.vue";
//导入全局配置
import configCommon from "@/utils/configCommon";

import { getRequest } from "@/utils/api";
import { handleSlide } from "@/utils/index";

export default {
  name: "Home",
  components: { MainNav },
  data() {
    return {
      bannerHeight: 800,
      screenWidth: 0,
      softData: [],
      equipmentData: [],
      testDrawData: [],
      powerData: [],
      carouselImg: [],
      testData: [],
    };
  },
  created() {
    this.getCarouselImg();
    this.getSoftData();
    this.getEquipmentData();
    this.getTestDrawData();
    this.getPowerData();
    // this.getTestData();
  },
  mounted() {
    this.screenWidth = window.innerWidth;
    this.setSize();
    window.addEventListener(
      "resize",
      () => {
        this.screenWidth = window.innerWidth;
        this.setSize();
      },
      false
    );

    handleSlide();
  },

  methods: {
    getCarouselImg() {
      getRequest(configCommon.prefixBack+"/carouselImg").then((data) => {
        data.forEach((item) => {
          this.carouselImg.push(item.pic);
        });
      });
    },
    // getTestData() {
    //   getRequest("/api/webTest").then((data) => {
    //     data.data.forEach((item) => {
    //       this.testData.push(item.info);
    //     });
    //   });
    // },
    getSoftData() {
      getRequest(configCommon.prefixBack+"/productSoftwareCover", { type: "产品封面" }).then(
        (data) => {
          this.softData = data.data.splice(0, 3);
        }
      );
    },
    getEquipmentData() {
      getRequest(configCommon.prefixBack+"/productEquipmentCover", { type: "产品封面" }).then(
        (data) => {
          this.equipmentData = data.data.splice(0, 3);
        }
      );
    },
    getTestDrawData() {
      getRequest(configCommon.prefixBack+"/businessSurveyCover", { type: "业务封面" }).then(
        (data) => {
          this.testDrawData = data.data.splice(0, 3);
        }
      );
    },
    getPowerData() {
      getRequest(configCommon.prefixBack+"/businessPowerCover", { type: "业务封面" }).then(
        (data) => {
          this.powerData = data.data.splice(0, 3);
        }
      );
    },
    setSize() {
      this.bannerHeight = (600 / 1550) * this.screenWidth;
    },
    productDetail(pid, type) {
      this.$store.commit("nowProductId", pid);
      this.$store.commit("nowProductType", type);
      this.$router.push("productList");
    },
    serviceDetail(bid, btype) {
      console.log(bid, btype);
      this.$store.commit("nowServiceId", bid);
      this.$store.commit("nowServicetType", btype);
      this.$router.push("serviceList");
    },
  },
};
</script>
<style lang='less' scoped>
/deep/#nav[data-v-4332dd22] {
  background: #000 !important;
  width: 100%;
  .nav-container {
    li {
      &:nth-child(1) {
        a {
          color: yellowgreen;
        }
      }
    }
  }
}
#home {
  margin-top: 70px;
  width: 100%;

  .el-carousel__item {
    img {
      width: 100%;
      height: 100%;
    }
    .carousel-image {
      max-width: 100%;
      max-height: 100%;
    }
    h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      line-height: 300px;
      margin: 0;
    }
  }

  .product,
  .solution {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  .header {
    text-align: center;
    margin: 30px 0;
    font-size: 18px;
    .big_title {
      display: inline-block;
      border-bottom: 5px solid #0094d0;
    }
    p {
      padding: 10px 0;
    }
  }
  .small_title {
    margin: 10px auto;
    padding: 0 20%;
    width: 60%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .product {
    background: #f2f2f2;
    .divTab {
      margin: 0 auto;
      width: 80%;
      padding: 0 10% 30px 10%;
      // height: 300px;
      // overflow: hidden;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .el-card {
        width: 385px;
        height: 285px;
        text-align: center;
        margin: 15px 25px;
        cursor: pointer;
        :hover {
          transition-duration: 0.3s;
          transform: scale(1.05);
        }
        .productName {
          margin: 8px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        img {
          width: 340px;
          height: 220px;
        }
      }
    }
  }
  .solution {
    .divTab {
      margin: 0 auto;
      // width: 80%;
      // height: 240px;
      padding: 0 10% 30px 10%;
      // padding-bottom: 30px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .el-card {
        width: 385px;
        line-height: 27px;
        height: 225px;
        overflow: hidden;
        text-align: center;
        margin: 15px 25px;
        cursor: pointer;
        :hover {
          transition-duration: 0.3s;
          transform: scale(1.05);
        }
        .productName {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin: 8px;
          font-weight: 600;
        }
        .productContent {
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          width: 100%;
          padding: 0 10px;
          height: 100px;
        }
        img {
          width: 80px;
          height: 80px;
        }
      }
    }
  }

  a:hover {
    color: #0094d0;
  }

  .about {
    background: url("http://www.niceui.cn/public/images/about_bg.jpg") no-repeat
      center top #163e59;
    background-attachment: fixed;
    width: 100%;
    height: 500px;
    background-size: cover;
    text-align: center;
    color: #fff;
    overflow: hidden;
    h1 {
      line-height: 38px;
      text-align: center;
      font-size: 28px;
      margin-top: 80px;
    }
    p {
      font-size: 17px;
      color: #e2e2e2;
      line-height: 28px;
      width: 80%;
      margin: 40px auto;
      text-align: left;
    }
    a {
      width: 150px;
      background: #24b727;
      border-radius: 2px;
      font-size: 16px;
      color: #fff;
      height: 46px;
      line-height: 46px;
      display: inline-block;
      margin: 0 8px;
      -moz-transition: all 0.3s ease-in-out;
      -webkit-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
    }
  }
  // .bottom-div{
  //   /deep/p{
  //     font-size: 50px !important;
  //   }
  // }
}
</style>
