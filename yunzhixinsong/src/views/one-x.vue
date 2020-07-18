<!-- 1+x页面 -->
<template>
  <div class="one-x">
    <Header />
    <div class="x-main">
      <div class="image">
        <img :src="onex" alt />
      </div>
      <div class="x-m-title">
        <div class="title-l">
          <h1>产品中心</h1>
          <span>Product Center</span>
        </div>
        <div class="title-r">产品中心</div>
      </div>
      <div class="x-m-list">
        <ul>
          <li>
            <span>工业机器人装调职业技能等级证书试点事项说明</span>
            <span>2020-2-2</span>
          </li>
          <li>
            <span>工业机器人装调职业技能等级证书试点事项说明</span>
            <span>2020-2-2</span>
          </li>
          <li>
            <span>工业机器人装调职业技能等级证书试点事项说明</span>
            <span>2020-2-2</span>
          </li>
          <li>
            <span>工业机器人装调职业技能等级证书试点事项说明</span>
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
      onex: require("../assets/images/1+x.jpg")
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
.x-main {
  .image {
    img {
      width: 100%;
    }
  }
  .x-m-title {
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
  .x-m-list {
    width: 1200px;
    margin: 0 auto;
    ul {
      margin-bottom: 300px;
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
