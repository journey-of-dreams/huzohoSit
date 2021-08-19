<template>
  <div id="app">    
    <router-view></router-view>
    <Footer></Footer>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import Footer from "@/components/common/Footer.vue";
export default {
  name: "App",
  components: { Footer },
  data() {
    return {};
  },
  created() {},
};
</script>

<style lang='less' scoped>

</style>