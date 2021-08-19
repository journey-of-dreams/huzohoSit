<template>
  <div id="footer">
    <div class="contact">
      <ul class="left">
        <p><router-link to="/contact">联系方式</router-link></p>
        <li>邮箱：service@gzjunbo.net</li>
        <li>电话：020-38468075</li>
        <li>商务QQ：2058859887（方先生）</li>
        <li>人事QQ：631249820（王小姐）</li>
      </ul>
      <ul class="right">
        <p><router-link to="/contact">联系地址</router-link></p>
        <li>
          公司地址：武汉市东湖新技术开发区茅店山中路武汉东湖网谷园区A栋2楼A10房
        </li>
        <li>
          研发中心地址：武汉市东湖新技术开发区茅店山中路武汉东湖网谷园区A栋2楼A10房
        </li>
        <!-- <li>研发室地址：武汉大学信息学部发展研究院( 群楼 )313室</li> -->
      </ul>
    </div>

    <div class="copynote">
      Copyright &copy; 2012 WH huzoho. All Rights Reserved.
      <span>武汉汇卓航科技有限公司 版权所有</span>
      <a href="#">鄂ICP备42018502003430号</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  components: {},
  data() {
    return {};
  },
};
</script>
<style lang='less' scoped>
#footer {
  color: #999999;
  width: 100%;
font-size: 16px;
  .contact {
    padding: 20px 0;
    width: 100%;
    background: #222222;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    p{
      font-size: 18px;
      color: #fff;
      margin: 10px 5px;
    }
    li{
      margin: 5px;
    }
  }
  .copynote {
    min-height: 50px;
    max-height: 100px;
    line-height: 50px;
    background: #000;
    width: 100%;
    text-align: center;
    font-size: 11px;
    border-top: 1px solid #333;
  }
}
</style>
