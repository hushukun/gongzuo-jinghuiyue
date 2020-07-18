<!-- 校企合作页面 -->
<template>
  <div class="cooperation">
    <Header />
    <div class="co-main">
      <div class="co-img">
        <img :src="cooperationImg" alt />
      </div>
      <div class="co-title">
        <div class="title-l">
          <h1>产品中心</h1>
          <span>Product Center</span>
        </div>
        <div class="title-r">产品中心</div>
      </div>
      <div class="co-nav">
        <div class="active">校企合作</div>
        <div>实训基地</div>
        <div>教育装备</div>
        <div>师资培训</div>
        <div>专业建设</div>
        <div>实训室建设</div>
      </div>
      <div
        class="co-text"
      >根据工业机器人行业关键岗位及职业行动领域分析，以培养企业应用型人才为目标，新松教育融合理、虚、实一体化教学模式，为本科、职业院校提供人才培养方案、课程体系建设、师资培训、教材植入、实训基地搭建、资质认证、教学实践与实习等全套教学资源，并按照“智能化引领示范”、“产学研协同发展”的理念，致力于为智能制造行业提供高端应用型人才培养，为企业、院校、政府等机构提供多元解决方案。</div>
      <div class="co-f-img">
        <img :src="footerImg" alt />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import Header from "../components/header";
import Footer from "../components/footer";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Header,
    Footer
  },
  data() {
    //这里存放数据
    return {
      cooperationImg: require("../assets/images/cooperation.jpg"),
      footerImg: require("../assets/images/cooperation-footer.jpg")
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {}
};
</script>
<style lang='less'>
.co-main {
  .co-img {
    img {
      width: 100%;
    }
  }
  .co-title {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #bfbfbf;
    margin-top: 20px;
    .title-l {
      display: flex;
      align-items: baseline;
      span {
        color: #888;
        margin-left: 20px;
      }
    }
  }
  .co-nav {
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    div {
      width: 120px;
      height: 40px;
      background-color: #fff;
      border-radius: 5px;
      font-size: 14px;
      color: #7c7c7c;
      text-align: center;
      line-height: 40px;
      border: 1px solid #bfbfbf;
      margin-right: 50px;
      cursor: pointer;
    }
    div.active {
      background-color: #648ad2;
      color: #fff;
    }
  }
  .co-text {
    width: 1200px;
    margin: 60px auto 25px;
    font-size: 14px;
    line-height: 20px;
    color: #313131;
  }
  .co-f-img {
    width: 1200px;
    margin: 0 auto 100px;
    img {
      width: 100%;
    }
  }
}
</style>
