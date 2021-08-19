<template>
  <div id="contact">
    <main-nav></main-nav>
    <div class="topImg">
      <img v-lazy="topImg" alt="" />
    </div>
    <div class="topImg2">
      <baidu-map
        v-bind:style="mapStyle"
        class="bm-view"
        ak="zQzUdsMc75fLSwbCTZXq7Z3QvaRetdq7"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        @click="getClickInfo"
        @moving="syncCenterAndZoom"
        @moveend="syncCenterAndZoom"
        @zoomend="syncCenterAndZoom"
      >
        <bm-view class="view"></bm-view>
        <bm-marker
          :position="{ lng: center.lng, lat: center.lat }"
          :dragging="true"
          animation="BMAP_ANIMATION_BOUNCE"
        >
        </bm-marker>
        <bm-control :offset="{ width: '10px', height: '10px' }">
          <bm-auto-complete v-model="keyword" :sugStyle="{ zIndex: 999999 }">
            <input
              type="text"
              placeholder="请输入搜索关键字"
              class="serachinput"
            />
          </bm-auto-complete>
        </bm-control>
        <bm-local-search
          :keyword="keyword"
          :auto-viewport="true"
          style="width: 0px; height: 0px; overflow: hidden"
        ></bm-local-search>
      </baidu-map>
    </div>
      <h1>联系方式</h1>
    <div class="main-card">
      <div class="contact-way" v-for="(item, index) in contactData" :key="index">
        <img v-lazy="configCommon.filesIpPath+item.imgSrc" alt="" />
        <p class="imgTitle">{{ item.imgTitle }}</p>
        <p class="imgDetail">{{ item.imgDetail }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "@/components/common/MainNav.vue";
//导入全局配置
import configCommon from "@/utils/configCommon";

import {
  BaiduMap,
  BmControl,
  BmView,
  BmAutoComplete,
  BmLocalSearch,
  BmMarker,
} from "vue-baidu-map";
export default {
  name: "Contact",
  components: {
    MainNav,
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker,
  },
  data() {
    return {
        configCommon:configCommon,
      topImg:require('@/assets/img/contact.jpg'),
      showMapComponent: this.value,
      keyword: "",
      mapStyle: {
        width: "100%",
        height: this.mapHeight + "px",            
      },
      center: { lng: 114.32168, lat: 30.37559 },
      zoom: 15,
      contactData: [
        {
          imgSrc: require("@/assets/img/地址.svg"),
          imgTitle: "地址",
          imgDetail:
            "武汉市东湖新技术开发区茅店山中路武汉东湖网谷园区A栋2楼A10房",
        },
        {
          imgSrc: require("@/assets/img/邮箱.svg"),
          imgTitle: "邮箱",
          imgDetail: "service@gzjunbo.net",
        },
        {
          imgSrc: require("@/assets/img/电话.svg"),
          imgTitle: "电话",
          imgDetail: "027-81611314",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    getClickInfo(e) {
      this.center.lng = e.point.lng;
      this.center.lat = e.point.lat;
    },
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      this.zoom = e.target.getZoom();
    },
  },
  watch: {
    value: function (currentValue) {
      this.showMapComponent = currentValue;
      if (currentValue) {
        this.keyword = "";
      }
    },
  },
};
</script>
<style lang='less' scoped>
   /deep/#nav[data-v-4332dd22] {
     width: 100% !important;
    background: #000 !important;
    .nav-container {
      li {
        &:nth-child(5) {
          a {
            color: yellowgreen;
          }
        }
      }
    }
  }
#contact {
  .topImg2 {
    width: 80%;
    height: 400px;
    display: flex;
    justify-content: center;
    padding: 0 10%;
    // margin-top: 400px;
    .bm-view{
      padding: 40px 0;
      width: 100%;
      // margin: 0 auto;
      height: 100%;
    }
    .view{
      width: 100%;
      height: 100%;
    }

  }
h1{
  padding: 80px 0 0px 100px;
}
  .topImg {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    img {
      width: 100%;
      display: block;
    }
  }
  .main-card {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 100px;
    .contact-way{
      width: 300px;
      height: 300px;
      box-shadow: 0 0 10px #eee;
      padding: 16px;
      margin: 15px 15px;
      img {
        height: 50%;
        width: 100%;
        display: block;
      }
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
        font-size: 20px;
      }
    }
  }
  .serachinput {
    width: 100%;
    box-sizing: border-box;
    padding: 9px;
    border: 1px solid #dddee1;
    line-height: 20px;
    font-size: 16px;
    height: 38px;
    color: #333;
    position: relative;
    border-radius: 4px;
    -webkit-box-shadow: #666 0px 0px 10px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 10px;
  }
  /deep/.anchorBL {
    display: none;
  }
}
</style>

