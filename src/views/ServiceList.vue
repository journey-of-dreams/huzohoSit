<template>
  <div id="serviceList">
    <main-nav />
    <el-empty description="待更新"></el-empty>
  </div>
</template>

<script>
import MainNav from "@/components/common/MainNav.vue";
//导入全局配置
import configCommon from "@/utils/configCommon";

import { getRequest } from "@/utils/api";
export default {
  name: "ServiceList",
  components: { MainNav },
  data() {
    return {
      topImg: [],
      serviceData: {
        title: "好吃的憨包",
        imgDetail: [],
      },
    };
  },
  created() {
    this.getServiceData();
  },
  methods: {
    getServiceData() {
      if (this.$store.state.nowServicetType == "设备") {
        getRequest(configCommon.prefixBack+"/productEquipmentContent").then((data) => {
          data.data.forEach((item) => {
            item.Data.forEach((item2) => {
              if (item2.pid == this.$store.state.nowServiceId) {
                this.serviceData = item2;
              }
            });
          });
        });
      } else {
        getRequest(configCommon.prefixBack+"/productEquipmentContent").then((data) => {
          data.data.forEach((item) => {
            item.Data.forEach((item2) => {
              if (item2.pid == this.$store.state.nowProductId) {
                this.serviceData = item2;
              }
            });
          });
        });
      }
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
        &:nth-child(3) {
          a {
            color: yellowgreen;
          }
        }
      }
    }
  }
#serviceList {
  .el-empty {
    width: 100%;
    height: 800px;
    /deep/.el-empty__description{
      p{
        font-size: 45px !important;
      }
    }
  }
}
</style>
