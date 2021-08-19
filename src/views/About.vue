<template>
  <div id="about">
    <main-nav></main-nav>
    <div class="header">
      <img class="topImg" src="@/assets/img/about.jpg" alt="" />

      <el-card class="cdivider" v-for="(item, index) in aboutData" :key="index">
        <el-divider
          ><div class="el-divider_textc">
            {{ item.type }}
          </div></el-divider
        >
        <p class="intuductc">
          {{ item.content }}
        </p>
        <div class="img"><img class="cImg" :src="configCommon.filesIpPath+item.pic" alt="" /></div>
      </el-card>
      
    </div>
  </div>
</template>

<script>
import MainNav from "@/components/common/MainNav.vue";
//导入全局配置
import configCommon from "@/utils/configCommon";

import { getRequest } from "@/utils/api";
export default {
  name: "About",
  components: { MainNav },
  data() {
    return {
      aboutData: [{}],
    };
  },
  created() {
    this.getaboutData();
  },

  methods: {
    getaboutData() {
      getRequest(configCommon.prefixBack+"/aboutInfo").then((data) => {
        this.aboutData = data.data;
        console.log(data.data);
      });
    },

  },
};
</script>
<style lang='less' scoped>
  /deep/#nav[data-v-4332dd22] {
    background: #000 !important;
    .nav-container {
      li {
        &:nth-child(4) {
          a {
            color: yellowgreen;
          }
        }
      }
    }
  }
#about {
  width: 100%;
  .header {
    margin-top: 70px;
    width: 100%;
    height: auto;

    .topImg {
      width: 100%;
      height: auto;
    }

    .cdivider {
      width: 70%;
      margin: 30px auto;
      .el-divider {
        margin-bottom: 50px;
        .el-divider_textc {
          font-size: 30px;
        }
      }

      .intuductc {
        font-size: 22px;
        padding: 0 20px;
        line-height: 35px;
      }
      .img {
        width: 100%;
        text-align: center;
        .cImg {
          width: 600px;
          margin: 40px 0;
        }
      }
      &:nth-child(4) {
        .img {
          .cImg {
            min-width: 80%;
            max-width: 90%;
            text-align: center;
          }
        }
      }
    }
  }
}
.el-divider {
  text-align: center;
}
</style>

