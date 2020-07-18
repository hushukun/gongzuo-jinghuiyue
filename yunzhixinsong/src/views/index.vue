<!-- 云志新松首页 -->
<template>
  <div class="index">
    <Header />
    <div class="main">
      <div class="banner">
        <img :src="bannerpath" alt />
      </div>
      <div class="extension">
        <div class="ex-title">
          <div class="ex-title-l">
            <h1>1+X</h1>
            <span>One+x</span>
          </div>
          <div class="ex-title-r">更多></div>
        </div>
        <div class="ex-list">
          <div class="ex-list-item">
            <p>工业机器人装调职业技能等级证书试点事项说明。</p>
            <div>工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明</div>
            <div></div>
            <div>
              <h3>2020-5-25</h3>
              <span>查看更多</span>
            </div>
          </div>
          <div class="ex-list-item">
            <p>工业机器人装调职业技能等级证书试点事项说明。</p>
            <div>工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明</div>
            <div></div>
            <div>
              <h3>2020-5-25</h3>
              <span>查看更多</span>
            </div>
          </div>
          <div class="ex-list-item">
            <p>工业机器人装调职业技能等级证书试点事项说明。</p>
            <div>工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明工业机器人装调职业技能等级证书试点事项说明</div>
            <div></div>
            <div>
              <h3>2020-5-25</h3>
              <span>查看更多</span>
            </div>
          </div>
        </div>
        <div class="ex-advert">
          <ul>
            <li
              v-for="(item,index) in 4"
              :key="item"
              @mousemove="exmoveFn(index)"
              :class="activeNumber==index?'active':''"
            >
              <div>
                <h3>产品中心</h3>
                <p>Product Center</p>
              </div>
              <div>
                <p>协作机器人</p>
                <p>工作机器人</p>
                <p>服务机器人</p>
                <p>移动机器人</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="about">
        <div class="a-box">
          <div class="a-box-left"></div>
          <div class="a-box-right">
            <div>
              <h3>关于我们</h3>
              <span>About us</span>
            </div>
            <div>
              公司从成立至今一直致力于智能制造领域内产业配套的技术服务工作。公司现有基地2座,江苏基地(因斯拜尔---项目执行),河南基地(郑州微码信息技术有限公司---软件开发),公司下设苏州因思拜尔企 业管理咨询有限公司（项目合作）、苏州因思拜尔教育科技有限公司 （公司员工内训，带薪培训0基础员工）以及苏州科曼智能科技有限公司 （智能设备制造）三家子公司，下属博众项目部、天准项目部、世宗项 目部、赛腾项目部、科瑞恩项目部、博阳项目部等多个技术服务项目 部。公司在职正式员工462名，为博众（智能设备）、天准（智能设 备）、世宗（智能设备）、博阳科技（光伏生产设备）、 三菱（汽 车）、蔚来（汽车）等各品牌技术服务项目支撑。 公司主营业务：智能 制造领域内产业配套的技术服务工作（生产线、智能机器手臂产品的安 装、调试、维护维修工作等），业务遍布全国10多个城市
              公司2020年以来同时开展了项目6个，技术外包、生产配套技术服务项目5个；共计产值突破1000万，合作企业13家
            </div>
            <div>查看更多</div>
          </div>
        </div>
      </div>
      <div class="cooperation">
        <div class="co-wrap">
          <div class="co-title-l">
            <h2>合作伙伴</h2>
            <span>Binary system</span>
          </div>
          <div class="co-title-r">更多></div>
        </div>
        <div class="co-imgList">
          <div v-for="item in cooperationimg" :key="item.id">
            <img :src="item.imagepath" alt />
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
      bannerpath: require("../assets/images/banner1.jpg"),
      activeNumber: 0,
      cooperationimg: [
        //合作伙伴图片
        {
          id: 1,
          imagepath: require("../assets/images/15.jpg")
        },
        {
          id: 2,
          imagepath: require("../assets/images/16.jpg")
        },
        {
          id: 3,
          imagepath: require("../assets/images/17.jpg")
        },
        {
          id: 4,
          imagepath: require("../assets/images/18.jpg")
        }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    exmoveFn(item) {
      //移入事件，改变li的宽度
      this.activeNumber = item;
    }
  }
};
</script>
<style lang='less'>
.main {
  .banner {
    img {
      width: 100%;
    }
  }
  .extension {
    width: 1200px;
    margin: 40px auto;
    .ex-title {
      display: flex;
      height: 80px;
      justify-content: space-between;
      align-items: center;
      .ex-title-l {
        display: flex;
        align-items: baseline;
        span {
          color: #888;
          margin-left: 20px;
        }
      }
    }
    .ex-list {
      display: flex;
      justify-content: space-between;
      .ex-list-item {
        width: 340px;
        padding: 20px;
        height: 220px;
        box-shadow: 0px 0px 10px #ccc;
        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 10px;
        }
        div:nth-of-type(1) {
          margin-top: 35px;
          width: 340px;
          height: 63px;
          line-height: 21px;
          font-size: 14px;
          color: #7c7c7c;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        div:nth-of-type(2) {
          height: 1px;
          background-color: #dcdcdc;
          margin-top: 33px;
        }
        div:nth-of-type(3) {
          margin-top: 17px;
          display: flex;
          justify-content: space-between;
          color: #888;
          span {
            font-size: 14px;
          }
        }
      }
    }
    .ex-advert {
      margin-top: 40px;
      ul {
        display: flex;
        li {
          width: 200px;
          height: 500px;
          border: 1px solid #ccc;
          position: relative;
          overflow: hidden;
          transition: all 0.5s;
          div:first-child {
            width: 150px;
            height: 80px;
            background-color: #648ad2;
            border-radius: 10px;
            text-align: center;
            color: #ffffff;
            margin: 40px 0 0 26px;
            h3 {
              font-size: 20px;
              padding-top: 14px;
            }
            p {
              font-size: 14px;
              margin-top: 10px;
            }
          }
          div:last-child {
            visibility: hidden;
            width: 480px;
            display: flex;
            justify-content: space-between;
            position: absolute;
            left: 22px;
            bottom: 40px;
            p {
              width: 100px;
              height: 40px;
              background-color: #648ad2;
              border-radius: 5px;
              line-height: 40px;
              text-align: center;
              color: #fff;
              font-size: 14px;
            }
          }
        }
        li.active {
          width: 600px;
          transition: all 0.5s;
          div:last-child {
            visibility: visible;
          }
        }
        li:nth-child(1) {
          background: url("../assets/images/11.jpg") no-repeat center center;
          background-size: 600px 600px;
        }
        li:nth-child(2) {
          background: url("../assets/images/12.jpg") no-repeat center center;
        }
        li:nth-child(3) {
          background: url("../assets/images/13.jpg") no-repeat center center;
        }
        li:nth-child(4) {
          background: url("../assets/images/14.jpg") no-repeat center center;
          background-size: 600px 600px;
        }
      }
    }
  }
  .about {
    height: 600px;
    background: url("../assets/images/9.jpg") no-repeat center center;
    position: relative;
    .a-box {
      width: 1172px;
      height: 350px;
      border: 1px solid #ccc;
      position: absolute;
      left: 50%;
      margin-left: -586px;
      bottom: 0;
      display: flex;
      .a-box-left {
        width: 436px;
        height: 350px;
        background: url("../assets/images/about1.png") no-repeat center center;
        background-size: 436px 350px;
        box-shadow: -28px 28px 0px #648ad2;
      }
      .a-box-right {
        background: rgba(255, 255, 255, 0.5);
        flex: 1;
        div:nth-child(1) {
          margin: 80px 0 0 50px;
          display: flex;
          align-items: baseline;
          span {
            font-size: 14px;
            color: #7c7c7c;
            margin-left: 10px;
          }
        }
        div:nth-child(2) {
          margin: 28px 0 55px 50px;
          width: 637px;
          height: 63px;
          line-height: 21px;
          font-size: 14px;
          color: #7c7c7c;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        div:nth-child(3) {
          width: 160px;
          height: 40px;
          margin-left: 50px;
          background-color: #ffffff;
          border: solid 1px #dcdcdc;
          text-align: center;
          line-height: 40px;
          font-size: 14px;
          color: #7c7c7c;
          cursor: pointer;
        }
      }
    }
  }
  .cooperation {
    width: 1200px;
    margin: 80px auto;
    .co-wrap {
      display: flex;
      height: 80px;
      justify-content: space-between;
      align-items: center;
      .co-title-l {
        display: flex;
        align-items: baseline;
        span {
          color: #888;
          margin-left: 20px;
        }
      }
    }
    .co-imgList {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      div {
        width: 260px;
        height: 140px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>