<!-- 关于我们页面 -->
<template>
  <div class="about-us">
    <Header />
    <div class="au-main">
      <div class="au-img">
        <img :src="aboutUsImg" alt />
      </div>
      <div class="au-title">
        <div class="title-l">
          <h1>关于我们</h1>
          <span>About us</span>
        </div>
        <div class="title-r">关于我们</div>
      </div>
      <div class="au-text">
        <p>公司从成立至今一直致力于智能制造领域内产业配套的技术服务工作。公司现有基地2座,江苏基地(因斯拜尔---项目执行),河南基地(郑州微码信息技术有限公司---软件开发),公司下设苏州因思拜尔企 业管理咨询有限公司（项目合作）、苏州因思拜尔教育科技有限公司 （公司员工内训，带薪培训0基础员工）以及苏州科曼智能科技有限公司 （智能设备制造）三家子公司，下属博众项目部、天准项目部、世宗项 目部、赛腾项目部、科瑞恩项目部、博阳项目部等多个技术服务项目 部。公司在职正式员工462名，为博众（智能设备）、天准（智能设 备）、世宗（智能设备）、博阳科技（光伏生产设备）、 三菱（汽 车）、蔚来（汽车）等各品牌技术服务项目支撑。 公司主营业务：智能 制造领域内产业配套的技术服务工作（生产线、智能机器手臂产品的安 装、调试、维护维修工作等），业务遍布全国10多个城市</p>
        <p>公司2020年以来同时开展了项目6个，技术外包、生产配套技术服务项目5个；共计产值突破1000万，合作企业13家。</p>
        <p>
          公司2020年以来同时开展了项目6个，技术外包、生产配套技术服务项目5个；共计产值突破1000万，合作企业13家。
          2018年9月以来，公司更重视内部员工的学习与培养，同时为了适应快速发展，联手数家自动化上市企业联手打造智能制造人才培养的实训基 地“因思拜尔学院---江苏基地”“微码学院---河南基地”为公司及企业提供源源不断的技术人才，学院共有专业老师：23名，建有专业实训教 室21间，实训设备总值约2059万元，是目前地区最具有专业实力智能制造 专业人才培养基地。 截止到2019年9月，联合办学的中高职院校共计5所， 在册学生900多名，短期培训学员在校300多名，培训结业并在公司上岗316名，为公司发展提供有力的人才支撑。
        </p>
      </div>
      <div class="au-f-img">
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
      aboutUsImg: require("../assets/images/about.jpg"),
      footerImg: require("../assets/images/au-footer.jpg")
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
.au-main {
  .au-img {
    img {
      width: 100%;
    }
  }
  .au-title {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #bfbfbf;
    .title-l {
      display: flex;
      align-items: baseline;
      span {
        color: #888;
        margin-left: 20px;
      }
    }
  }
  .au-text {
    width: 1200px;
    margin: 60px auto 40px;
    p {
      font-size: 14px;
      color: #313131;
    }
  }
  .au-f-img {
    width: 1200px;
    margin: 0 auto 100px;
    img {
      width: 100%;
    }
  }
}
</style>
