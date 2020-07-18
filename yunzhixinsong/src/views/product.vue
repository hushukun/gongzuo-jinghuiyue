<!-- 产品中心页面 -->
<template>
  <div class="product">
    <Header />
    <div class="p-main">
      <div class="p-m-title">
        <div class="title-l">
          <h1>产品中心</h1>
          <span>Product Center</span>
        </div>
        <div class="title-r">产品中心</div>
      </div>
      <div class="p-m-nav">
        <div class="active">全部</div>
        <div>协作机器人</div>
        <div>工业机器人</div>
        <div>服务机器人</div>
        <div>移动机器人</div>
      </div>
      <div class="p-m-list">
        <ul>
          <li v-for="item in 12" :key="item">
            <img :src="productimg" alt />
            <h5>HSCR5 复合机器人</h5>
            <p>新松复合机器人是国内首台智能型复合协作机器</p>
            <div>查看详情 ></div>
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
      productimg: require("../assets/images/product.png")
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  mounted() {}
};
</script>
<style lang='less'>
.p-main {
  width: 1200px;
  margin: 20px auto 0;
  .p-m-title {
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
  .p-m-nav {
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
  .p-m-list {
    margin-top: 60px;
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 280px;
        height: 360px;
        background-color: #ffffff;
        border: solid 1px #e5e5e5;
        margin-bottom: 40px;
        img {
          width: 100%;
          height: 220px;
        }
        h5 {
          font-size: 16px;
          font-weight: normal;
          color: #313131;
          margin-top: 6px;
          padding: 0 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p {
          height: 40px;
          padding: 0 10px;
          font-size: 14px;
          line-height: 20px;
          color: #7c7c7c;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-top: 5px;
        }
        div {
          margin-top: 24px;
          height: 14px;
          font-size: 14px;
          line-height: 20px;
          color: #7c7c7c;
          padding: 0 10px;
        }
        &:hover {
          box-shadow: 0px 0px 9px 1px rgba(32, 32, 32, 0.2);
        }
      }
    }
  }
}
</style>
