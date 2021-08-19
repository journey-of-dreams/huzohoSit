<template>
  <div id="equipment">
    <main-nav></main-nav>
    <div class="top-title">
      <h3 v-if="equipmentData[0]">{{ equipmentData[0].type }}</h3>
      <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>行内应用</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="main-container">
      <div
        class="main-content"
        v-for="(item, index) in equipmentData"
        :key="index"
      >
        <el-card class="img-container">
          <img :src="configCommon.filesIpPath+item.Coverimginfo[0].pic" alt="" srcset="" />
        </el-card>
        <el-card class="display-container">
          <h3>{{ item.type }}|{{ item.pname }}</h3>
          <p>{{ item.content }}</p>
          <!-- <el-button @click="productDetail(item.pid, item.type)"
            >查看更多</el-button
          > -->
        </el-card>
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
  name: "Equipment",
  components: { MainNav },
  data() {
    return {
      equipmentData: [],
    };
  },
  created() {
    this.getEquipmentData();
  },
  methods: {
    getEquipmentData() {
      getRequest(configCommon.prefixBack+"/productEquipmentContent").then((data) => {
        data.data.forEach((item) => {
          item.Data.forEach((item) => {
            this.equipmentData.push(item);
          });
        });
      });
    },
    productDetail(pid, type) {
      console.log(pid, type);
      this.$store.commit("nowProductId", pid);
      this.$store.commit("nowProductType", type);
      this.$router.push("productList");
    },
  },
};
</script>
<style lang='less' scoped>
  /deep/#nav[data-v-4332dd22] {
    background: #000 !important;
    .nav-container {
      li {
        &:nth-child(3) {
          span {
            color: yellowgreen;
          }
        }
      }
    }
  }
#equipment {
  width: 100%;
  .top-title {
    width: 70%;
    height: 80px;
    background: #f5f5f5;
    margin-top: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15%;
    .bread {
      margin: 0 25px;
    }
    h3 {
      margin: 0 25px;
    }
  }
  .main-container {
    width: 70%;
    display: flex;
    margin: 15px auto;
    justify-content: space-around;
    flex-wrap: wrap;
    .main-content {
      width: 100%;
      margin: 15px auto;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .img-container {
      width: 385px;
      height: 210px;
      margin-right: 20px;
      img {
        width: 365px;
        height: 200px;
        display: block;
        margin: auto;
      }
    }
    .display-container {
      height: 210px;
      width: 920px;
      p {
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        line-height: 30px;
      }
      .el-button {
        margin-top: 10px;
        background: #e8e8e8;
        color: #8d8d8d;
        border: none;
      }
    }
  }
}
</style>
