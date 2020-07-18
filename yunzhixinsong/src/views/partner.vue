<!-- 合作伙伴页面 -->
<template>
  <div class="partner">
    <Header />
    <div class="pa-main">
      <div class="pa-img">
        <img :src="partnerImg" alt />
      </div>
      <div class="pa-title">
        <div class="title-l">
          <h1>合作伙伴</h1>
          <span>Cooperative partner</span>
        </div>
        <div class="title-r">合作伙伴</div>
      </div>
      <div class="pa-content" v-for="item in 3" :key="item">
        <div>
          <img :src="contentImg" alt />
        </div>
        <div>
          <div>
            <h3>博众精工科技股份有限公司</h3>
            <span>官网：https://www.bozhon.com</span>
          </div>
          <div>
            <p>博众精工科技股份有限公司是一家集销售、研发、生产和服务于一体的 系统集成商。公司成立于2001年，总部位于江苏苏州，在美国以及上海、深圳、北京、重庆等国家和地区设有分公司。</p>
            <p>博众致力于从方案设计、精密加工、组装调试、现场实施以及售后支持 等方面为客户提供优质产品和全方位的服务。公司目前主要有工装夹（治） 具、单机自动化设备、自动化流水线，以及智慧工厂整体改造。针对不同行业的需求， 整合运动控制、影像处理、镭射量测、机械手及精密贴装、精密压 合等技术，配合软件开发，为客户提供客制化的自动化设备和整体解决方案。</p>
          </div>
          <div>
            <h5>服务项目</h5>
            <ul>
              <li>2018年11月，因思拜尔承接“蔚来汽⻋换电站”项目并按时完成交付了自动换电站47座。</li>
              <li>2019年4月，因思拜尔承接“某手机非标自动化产线”5条。</li>
            </ul>
          </div>
          <div>
            <h5>服务进程</h5>
            <ul>
              <li>公司使用技术人员80余名，顺利交付项目， 总产值280 余万元</li>
              <li>公司使用技术人员80余名，顺利交付项目， 总产值280 余万元</li>
            </ul>
          </div>
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
      partnerImg: require("../assets/images/cooperation.jpg"),
      contentImg: require("../assets/images/partner.png")
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
.pa-main {
  .pa-img {
    img {
      width: 100%;
    }
  }
  .pa-title {
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
  .pa-content {
    width: 1200px;
    margin: 60px auto 0;
    display: flex;
    & > div:first-child {
      width: 450px;
      height: 400px;
      margin: 0 36px 60px 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    & > div:last-child {
      flex: 1;
      div:nth-child(1) {
        display: flex;
        justify-content: space-between;
      }
      div:nth-child(2) {
        margin-top: 30px;
        p {
          font-size: 14px;
          color: #313131;
        }
      }
      div:nth-child(3),
      div:nth-child(4) {
        margin-top: 24px;
        h5 {
          font-size: 14px;
          color: #153c6e;
          margin-bottom: 10px;
        }
        ul {
          list-style-type: disc;
          list-style-position: inside;
          li {
            list-style-type: disc;
            list-style-position: inside;
            font-size: 14px;
            color: #313131;
          }
        }
      }
    }
  }
}
</style>
