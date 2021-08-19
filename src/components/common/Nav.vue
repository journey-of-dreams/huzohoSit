<template>
  <div id="nav" @mouseover="enterNav" @mouseout="outNav">
    <div class="nav-menu">
      <router-link to="/">
        <img src="@/assets/img/logo.png" alt="" />
      </router-link>
    </div>
    <ul class="nav-container">
      <li>
        <el-button> <router-link to="/">首页</router-link></el-button>
      </li>
      <li @mouseover="productList">
        <el-button> <router-link to="/product">产品</router-link></el-button>
        <div class="product-spread" @mouseout="productShift">
          <div class="soft">
            <p><router-link to="/soft">软件系列</router-link></p>
            <ul>
              <li
                v-for="(item, index) in softData"
                :key="index + '01'"
                @click="productDetail(item.pid, item.type)"
              >
                {{ item.p_name }}
              </li>
            </ul>
          </div>
          <div class="equipment">
            <p><router-link to="/equipment">设备系列</router-link></p>
            <ul>
              <li
                v-for="(item, index) in equipmentData"
                :key="index + '02'"
                @click="productDetail(item.pid, item.type)"
              >
                {{ item.p_name }}
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li>
        <el-popover
          @hide="popOut"
          @show="popIn"
          placement="bottom"
          :close-delay="0"
          trigger="hover"
        >
          <div class="item-dpread">
            <ul>
              <li>
                <router-link to="/testDraw">测绘</router-link>
              </li>
              <li><router-link to="/power">电力</router-link></li>
            </ul>
          </div>
          <el-button slot="reference">行内应用</el-button>
        </el-popover>
      </li>
      <li>
        <el-button> <router-link to="/about">关于我们</router-link></el-button>
      </li>
      <!-- <li>
        <el-button><router-link to="/contact">联系我们</router-link></el-button>
      </li> -->
    </ul>
  </div>
</template>

<script>
import { getRequest } from "@/utils/api";
//导入全局配置
import configCommon from "@/utils/configCommon";
export default {
  name: "Nav",
  components: {},
  data() {
    return {
      softData: [],
      equipmentData: [],
    };
  },
  created() {
    this.getSoftData();
    this.getEquipmentData();
  },
  mounted() {
    // let nav = document.querySelector("#nav");
    // window.addEventListener("scroll", () => {
    //   if (
    //     document.documentElement.scrollTop >
    //     document.documentElement.getBoundingClientRect().height * 0.05
    //   ) {
    //     nav.classList.add("activeNav");
    //   } else {
    //     nav.classList.remove("activeNav");
    //   }
    // });
  },
  // filters: {
  //   // 去除首部英文
  //   fotmateName(name) {
  //     return name.replace(/[a-zA-Z0-9-]*/gi,'');
  //   },
  // },

  methods: {
    getSoftData() {
      getRequest(configCommon.prefixBack+"/productSoftwareCover", { type: "产品封面" }).then((data) => {
        this.softData = data.data;
      });
    },
    getEquipmentData() {
      getRequest(configCommon.prefixBack+"/productEquipmentCover", { type: "产品封面" }).then(
        (data) => {
          this.equipmentData = data.data;
        }
      );
    },
    productDetail(pid, type) {
      this.$store.commit("nowProductId", pid);
      this.$store.commit("nowProductType", type);
      if (this.$route.path == "/productList") {
        window.location.reload();
      } else {
        this.$router.push("/productList");
      }
    },
    serviceDetail(bid, btype) {
      this.$store.commit("nowServiceId", bid);
      this.$store.commit("nowServicetType", btype);
      if (this.$route.path == "/serviceList") {
        window.location.reload();
      } else {
        this.$router.push("/serviceList");
      }
    },
    enterNav() {
      let nav = document.querySelector("#nav");
      if (!nav.classList.contains("activeNav")) {
        nav.classList.add("activeNav");
      }
    },
    outNav() {
      let nav = document.querySelector("#nav");
      if (
        document.querySelector("el-pop.ver") ||
        document.documentElement.scrollTop >
          document.documentElement.getBoundingClientRect().height * 0.04
      ) {
        nav.classList.add("activeNav");
      } else {
        nav.classList.remove("activeNav");
      }
    },
    popOut() {
      let nav = document.querySelector("#nav");
      if (
        document.documentElement.scrollTop <
          document.documentElement.getBoundingClientRect().height * 0.05 &&
        nav.classList.contains("activeNav")
      ) {
        nav.classList.remove("activeNav");
      }
    },
    popIn() {
      let nav = document.querySelector("#nav");
      let productSpread = document.querySelector(".product-spread");
      if (productSpread) {
        this.productShift();
      }
      if (!nav.classList.contains("activeNav")) {
        nav.classList.add("activeNav");
      }
    },
    productList() {
      let productSpread = document.querySelector(".product-spread");
      productSpread.style.left = "50%";
    },
    productShift() {
      let productSpread = document.querySelector(".product-spread");
      productSpread.style.left = "150%";
    },
  },
};
</script>
<style lang='less' scoped>
#nav {
  width: 100%;
  position: fixed;
  z-index: 999;
  left: 50%;
  top: 0%;
  transform: translateX(-50%);
  height: 70px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #333;
  background: #000;

  align-items: center;
  .nav-menu {
    img {
      width: 208px;
    }
  }
  .el-button {
    border: none;
    background: none;
    color: #fff;
    font-size: 17px;
  }

  .nav-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-right: -30px;
    li {
      display: inline;

      .el-popover {
        width: 200px;
      }
    }
  }
  .product-spread {
    position: absolute;
    top: 70px;
    background: #000;
    color: #fff;
    width: 100%;
    left: 150%;
    padding: 15px 0;
    transform: translateX(-50%);
    display: flex;
    font-size: 17px;
    justify-content: space-around;
    p {
      font-size: 20px;
    }
    ul {
      display: flex;
      flex-direction: column;
      li {
        margin: 7px 0;
        cursor: pointer;
      }
    }
  }
}
.activeNav {
  background: #000;
}
.item-dpread {
  li {
    padding: 5px 0;
    a {
      width: 100%;
      display: block;
    }
    &:hover {
      background: #fff;
      color: #000;
    }
    text-align: center;
  }
}
</style>
