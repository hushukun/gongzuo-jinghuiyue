<!-- 产品体系页面 -->
<template>
  <div class="system">
    <Header />
    <div class="sy-main">
      <div class="sy-img">
        <img :src="systemImg" alt />
      </div>
      <div class="sy-title">
        <div class="title-l">
          <h1>课程体系</h1>
          <span>Curriculum system</span>
        </div>
        <div class="title-r">工业机器人课程</div>
      </div>
      <div class="sy-nav">
        <div class="active">工业机器人课程</div>
        <div>服务机器人课程</div>
        <div>移动机器人课程</div>
        <div>协作机器人课程</div>
      </div>
      <div class="sy-list">
        <ul>
          <li>
            <span>工业机器人定制课程</span>
            <span>2020-2-2</span>
          </li>
          <li>
            <span>工业机器人定制课程</span>
            <span>2020-2-2</span>
          </li>
          <li>
            <span>工业机器人定制课程</span>
            <span>2020-2-2</span>
          </li>
          <li>
            <span>工业机器人定制课程</span>
            <span>2020-2-2</span>
          </li>
        </ul>
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
      systemImg: require("../assets/images/1+x.jpg")
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
.sy-main {
  .sy-img {
    img {
      width: 100%;
    }
  }
  .sy-title {
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
  .sy-nav {
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    div {
      width: 150px;
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
  .sy-list {
    width: 1200px;
    margin: 0 auto;
    ul {
      margin: 30px 0 200px;
      li {
        height: 45px;
        line-height: 45px;
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px dashed #bfbfbf;
        cursor: pointer;
        span {
          color: #313131;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
