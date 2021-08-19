<template>
  <div id="mainNav">
    <div class="btn-menu" @click="drawer = true">
      <img src="@/assets/img/09-收缩.svg" alt="" />
    </div>
    <Nav></Nav>
    <el-drawer
      title="我是标题"
      class="cl"
      :visible.sync="drawer"
      :direction="direction"
      :with-header="false"
    >
      <el-collapse>
        <div class="not-collapse">
          <router-link to="/">首页</router-link>
        </div>

        <el-collapse-item title="产品" name="2">
          <div>
            <router-link to="/soft">软件系列</router-link>
          </div>
          <div>
            <router-link to="/equipment">设备系列</router-link>
          </div>
        </el-collapse-item>
        <el-collapse-item title="行内应用" name="3">
          <div>
            <router-link to="/testDraw">测绘</router-link>
          </div>
          <div>
            <router-link to="/power">电力</router-link>
          </div>
        </el-collapse-item>
        <div class="not-collapse">
          <router-link to="/about">关于我们</router-link>
        </div>
      </el-collapse>
    </el-drawer>
  </div>
</template>

<script>
import Nav from "./Nav.vue";
export default {
  name: "MainNav",
  components: { Nav },
  data() {
    return { drawer: false, direction: "ltr", activeNames: ["0"] };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>
<style lang='less' scoped>
#mainNav {
  display: flex;
  width: 100%;

  .btn-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    position: fixed;
    z-index: 2000;
    cursor: pointer;
    left: -2000px;
    top: 0;
  }
  .not-collapse{
    border-bottom: 0.05882rem solid #EBEEF5;
    padding: 10px 0;
        font-size: 0.76471rem;
    font-weight: 500;
  }
  /deep/.el-drawer {
    width: 25% !important;
  }
}
</style>
