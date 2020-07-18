<!-- 双元制教育页面 -->
<template>
  <div class="education">
    <Header />
    <div class="ed-main">
      <div class="ed-img">
        <img :src="educationImg" alt />
      </div>
      <div class="ed-title">
        <div class="title-l">
          <h1>双元制教育</h1>
          <span>Dual education</span>
        </div>
        <div class="title-r">双元制教育</div>
      </div>
      <div class="ed-nav">
        <div class="active">双元制教育</div>
        <div>德国职业教育教学教法</div>
        <div>德国跨企业培训中心专业实训</div>
        <div>物流管理专业师资进修培训</div>
        <div>职业学校管理层研修课程</div>
      </div>
      <div class="ed-text">
        <p>“双元制”是德国职业教育最重要的特色, 也是推行职业教育最成功的关键。双元制教育是由校企合作办学，职业学校一般设在企业里，直接与企业挂钩，校企联合制定教学目标和教学计划，学校负责理论教学，企业负责实习培训，学生边学习边上岗实习，两者同步进行。</p>
        <div>
          <img :src="education" alt />
        </div>
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
      educationImg: require("../assets/images/cooperation.jpg"),
      education: require("../assets/images/ed-content.jpg")
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
.ed-main {
  .ed-img {
    img {
      width: 100%;
    }
  }
  .ed-title {
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
  .ed-nav {
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    div {
      padding: 0 20px;
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
  .ed-text {
    width: 1200px;
    margin: 60px auto 0;
    p {
      font-size: 14px;
      color: #313131;
    }
    div {
      margin-top: 25px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
